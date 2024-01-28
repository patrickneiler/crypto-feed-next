import Market from "@/components/market"
import MarketTabs from "@/components/tabs"

export const metadata = {
  title: 'Real Time Markets - Cryto, Forex, Stocks, and More',
  description: 'Real time market data for crypto, forex, stocks, and more.',
}

const apiKey = process.env.POLYGON_API_KEY || '';

export default function RealTimeMarkets() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Market Tabs */}
      <div className="col-span-full ">
        <MarketTabs tabs={[
          { name: 'Crypto', component: <Market apiKey={apiKey} cluster='crypto' ev="XT" tickers={['BTC-USD', 'ETH-USD']} /> },
          { name: 'Forex', component: <Market apiKey={apiKey} cluster='forex' ev="CAS" tickers={['USD/EUR', 'CHY/USD']} /> },
          // Ability to add different markets with parameters
          // { name: 'Stocks', component: <Market cluster='stocks' ev="T" tickers={['AAPL', 'GOOG']} /> },
        ]} />
      </div>
    </div>
  )
}
