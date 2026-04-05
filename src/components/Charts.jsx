import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function Charts({ transactions }) {
  // If no transactions, show empty state
  if (!transactions || transactions.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-center text-gray-400 dark:text-gray-500 h-64">
          No balance data to display
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-center text-gray-400 dark:text-gray-500 h-64">
          No spending data to display
        </div>
      </div>
    );
  }

  // Line Data (by date)
  const lineData = transactions.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  // Pie Data (expense categories)
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  // If no expenses, show empty pie chart state
  const isPieEmpty = pieData.length === 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart */}
      {/* <div className="bg-white p-6 rounded-2xl border shadow-sm"> */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-800 dark:text-gray-200">
          Balance Trend
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          {lineData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              No balance data to display
            </div>
          ) : (
            <LineChart data={lineData}>
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4ade80"
                strokeWidth={2}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      {/* <div className="bg-white p-6 rounded-2xl border shadow-sm"> */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-800 dark:text-gray-200">
          Spending Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          {isPieEmpty ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              No expense data to display
            </div>
          ) : (
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={80}
                fill="#4ade80"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
