# Real Time Market App

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Overview

The main files are `app/(default)/dashboard/page.tsx`, `components/tabs.tsx`, `components/market.tsx`, and `components/utils/use-polygon-websocket.ts`.

The application is designed to have it's context provided to the children components through parameters.
```jsx
<MarketTabs tabs={[
    { name: 'Crypto', component: <Market cluster='crypto' ev="XT" tickers={['BTC-USD', 'ETH-USD']} /> },
    { name: 'Forex', component: <Market cluster='forex' ev="CAS" tickers={['USD/EUR', 'CHY/USD']} /> },
    // Ability to add different markets with parameters
    // { name: 'Stocks', component: <Market cluster='stocks' ev="T" tickers={['AAPL', 'GOOG']} /> },
]} />
```

## Known Issues

### Forex Data Subscriptions

There is a known issue where subscriptions to Forex data may not receive messages as expected. This could be due to a variety of reasons such as network issues, API limitations, or issues with the data provider.

## Further Enhancements

### Data Visualizations

The current application provides real-time data updates. As an additional challenge, consider enhancing the application by adding data visualizations.

### Improved Naming Conventions

The current naming conventions in the codebase could be improved for better readability and maintainability.

### Improved Teardown Logic

The current teardown logic in the `usePolygonWebSocket` hook could be improved. Right now, it simply disconnects the WebSocket when the component unmounts. As an additional challenge, consider how this could be enhanced to handle more complex scenarios, such as retrying the connection if it fails or handling different types of disconnection events.
