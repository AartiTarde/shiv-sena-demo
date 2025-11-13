export default function Analytics() {
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-carrot capitalize">
          Analytics
        </h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">
          Track and analyze your data performance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-border-light hover:border-carrot transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-slate-500">
                Page Views
              </p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 md:mt-2">
                12,345
              </p>
            </div>
            <div className="text-3xl md:text-4xl">📈</div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-border-light hover:border-carrot transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-slate-500">
                Bounce Rate
              </p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 md:mt-2">
                32.5%
              </p>
            </div>
            <div className="text-3xl md:text-4xl">📉</div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-border-light hover:border-carrot transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-slate-500">
                Avg. Session
              </p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 md:mt-2">
                4m 32s
              </p>
            </div>
            <div className="text-3xl md:text-4xl">⏱️</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-border-light">
        <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
          Analytics Chart
        </h2>
        <div className="h-64 bg-peach-50 rounded-lg border border-border-light flex items-center justify-center">
          <p className="text-slate-500">Chart visualization will be displayed here</p>
        </div>
      </div>
    </div>
  );
}

