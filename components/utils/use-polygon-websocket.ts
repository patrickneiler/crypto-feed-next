// Import the hook and interface from the previous context or directly on top of your file
import { useState } from 'react';
import useWebSocket from 'react-use-websocket';

export interface CryptoMessage {
    ev: string;
    pair: string;
    p: number;
    t: number;
    s: number;
    c: number[];
    i: string;
    x: number;
    r: number;
}
export interface CryptoPair {
    pair: string;
    messages: CryptoMessage[];
}

const usePolygonWebSocket = (apiKey: string, cluster: string, ev: string, tickers: string[]) => {
    const [messages, setMessages] = useState<CryptoPair[]>([]);
    const formatPairs = (pairs: string[]) => {
        return pairs.map(pair => `${ev}.${pair}`);
    }
    const { sendMessage, getWebSocket } = useWebSocket(
        `wss://socket.polygon.io/${cluster}`,
        {
            share: true,
            shouldReconnect: () => true,
            onOpen: () => {
                sendMessage(JSON.stringify({ "action": "auth", "params": apiKey }));
            },
            onMessage: (event) => {
                const [message] = JSON.parse(event.data);
                switch (message?.ev) {
                    case 'status':
                        if (message?.status === 'auth_success') {
                            sendMessage(JSON.stringify({ "action": "subscribe", "params": formatPairs(tickers).join(',') }));
                        }
                        break;
                    case ev:
                        setMessages(prevCryptoPairs => {
                            const pairIndex = prevCryptoPairs.findIndex(pair => pair.pair === message.pair);
                            if (pairIndex !== -1) {
                                // Pair found, append the new message
                                prevCryptoPairs[pairIndex].messages.push(message);
                                // If messages array length exceeds 20, remove the oldest message
                                if (prevCryptoPairs[pairIndex].messages.length > 20) {
                                    prevCryptoPairs[pairIndex].messages.shift();
                                }
                            } else {
                                // Pair not found, create a new pair with the new message
                                prevCryptoPairs.push({ pair: message.pair, messages: [message] });
                            }
                            return [...prevCryptoPairs];
                        });
                        break;
                    default:
                        // Handle other cases if necessary
                        break;
                }
            },
            onClose: () => {
                disconnect();
            },
            onError: (error) => {
                console.log(error)
            }
        }
    );

    const disconnect = () => {
        sendMessage(JSON.stringify({ "action": "unsubscribe", "params": formatPairs(tickers).join(',') }));
    }

    return { messages };
};
export default usePolygonWebSocket;