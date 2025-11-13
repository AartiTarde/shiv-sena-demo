export default function Reports() {
  const reports = [
    { id: 1, name: "Monthly Sales Report", date: "2024-01-15", status: "Completed" },
    { id: 2, name: "User Activity Report", date: "2024-01-14", status: "Completed" },
    { id: 3, name: "Revenue Analysis", date: "2024-01-13", status: "Pending" },
    { id: 4, name: "Performance Metrics", date: "2024-01-12", status: "Completed" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-carrot capitalize">
          Reports
        </h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">
          View and manage your generated reports
        </p>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-border-light w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900">
            Recent Reports
          </h2>
          <button className="bg-carrot hover:bg-burnt text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap w-full sm:w-auto">
            Generate New
          </button>
        </div>

        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-peach-50 rounded-lg border border-border-light hover:bg-peach-200 transition-colors cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <p className="text-slate-900 font-medium text-sm md:text-base truncate">
                  {report.name}
                </p>
                <p className="text-xs md:text-sm text-slate-500 mt-1">
                  Generated on {report.date}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <span
                  className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    report.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {report.status}
                </span>
                <button className="text-carrot hover:text-burnt text-sm font-medium whitespace-nowrap">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

