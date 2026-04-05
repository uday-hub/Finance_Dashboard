export default function Insights({ transactions }) {
  const expenseTransactions = transactions.filter(t => t.type === "expense");

  if (expenseTransactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border dark:border-gray-700 shadow-sm text-center text-gray-400 dark:text-gray-500">
        No expense data available
      </div>
    );
  }

  const categoryMap = {};
  expenseTransactions.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const topCategory = Object.keys(categoryMap).reduce(
    (a, b) => (categoryMap[a] > categoryMap[b] ? a : b),
    "-"
  );

  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonthDate = new Date(currentYear, currentMonth - 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  const getMonthData = (month, year) => {
    return transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          d.getMonth() === month &&
          d.getFullYear() === year &&
          t.type === "expense"
        );
      })
      .reduce((acc, t) => acc + t.amount, 0);
  };

  const thisMonthExpense = getMonthData(currentMonth, currentYear);
  const lastMonthExpense = getMonthData(lastMonth, lastMonthYear);

  const difference = thisMonthExpense - lastMonthExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Monthly Comparison */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-md border dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
          Monthly Comparison
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          This Month: ₹{thisMonthExpense.toLocaleString("en-IN")}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Last Month: ₹{lastMonthExpense.toLocaleString("en-IN")}
        </p>

        <p
          className={`mt-2 text-sm font-medium ${
            difference > 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {difference > 0
            ? `↑ Spending increased by ₹${Math.abs(difference).toLocaleString("en-IN")}`
            : `↓ Spending decreased by ₹${Math.abs(difference).toLocaleString("en-IN")}`}
        </p>
      </div>

      {/* Insights */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border dark:border-gray-700 shadow-sm">
        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
          Insights
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Highest spending category:{" "}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {topCategory}
          </span>
        </p>
      </div>
    </div>
  );
}