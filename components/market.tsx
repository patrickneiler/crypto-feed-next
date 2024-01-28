'use client';
import React from 'react';
import usePolygonWebSocket, { CryptoMessage } from './utils/use-polygon-websocket';

interface MarketProps {
    apiKey: string;
    cluster: string;
    ev: string;
    tickers: string[];
}

const Market: React.FC<MarketProps> = ({ apiKey, cluster, ev, tickers }) => {
    const { messages } = usePolygonWebSocket(apiKey, cluster, ev, tickers);
    return (
        <div className='w-full mt-4'>
            <div className="flex space-x-8 w-full">
                {messages.map((pair, index) => {
                    return (
                        <div key={index} className="flex flex-col space-y-2 grow">
                            <div className="flex items-center space-x-2 grow justify-between">
                                <div className="font-bold text-lg">{pair.pair}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex space-x-8 w-full mt-4">
                {messages.map((pair, index) => {
                    return (
                        <div key={index} className="flex flex-col space-y-2 grow justify-between">
                            {pair.messages.sort(sortByTimestamp).map((message, index) => {
                                return (
                                    <div key={index} className={`flex items-center space-x-2 grow justify-between ${index === 0 ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                        <div className="text-xs text-gray-400">{formatTimestamp(message.t)}</div>
                                        <div className="font-medium">{formatCurrency(message.p)}</div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

const sortByTimestamp = (a: CryptoMessage, b: CryptoMessage) => {
    return b.t - a.t;
}

export default Market;