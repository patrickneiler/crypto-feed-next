import Header from '@/components/ui/header'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        <Header><h3>Real Time Markets</h3></Header>

        <main className="grow [&>*:first-child]:scroll-mt-16">
          {children}
        </main>

      </div>

    </div>
  )
}
