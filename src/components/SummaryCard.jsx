export default function SummaryCard({ title, amount, color, icon, change }) {
  const displayAmount = amount || 0; // default to 0
  const displayChange = change ?? 0; // default to 0 if undefined

  return (
    <>
    <div className="relative bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
          {icon}
        </div>
      </div>

      {/* Amount */}
      <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight mt-4 ${color}`}>
        ₹{displayAmount.toLocaleString("en-IN")}
      </h2>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <span
          className={`px-2 py-1 rounded-md ${
            displayChange >= 0
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {displayChange >= 0 ? "↑" : "↓"} &nbsp;
          {displayChange}%
        </span>
        <span className="text-gray-400">vs last month</span>
      </div>
    </div>
    </>
  );
}
