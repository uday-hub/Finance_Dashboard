import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function TransactionTable({
  transactions,
  role,
  onDelete,
  search,
  setSearch,
  filter,
  setFilter,
  setShowModal,
}) {
  const filteredTransactions = transactions
    .filter((t) =>
      [t.category, t.type]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    .filter((t) => (filter === "all" ? true : t.type === filter));

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredTransactions.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Transactions
        </h2>

        <div className="flex flex-wrap gap-3 sm:gap-2 items-center">
          {/* Search */}
          <input
            type="text"
            placeholder="Search Category, Type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-800 dark:text-white transition"
          />

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {["all", "income", "expense"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded-lg text-sm capitalize font-medium transition ${
                  filter === type
                    ? "bg-gray-900 text-white dark:bg-gray-700"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Add Transaction */}
          {role === "admin" && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
            >
              + Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm border-collapse">
          {/* Header */}
          <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
            <tr className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 border-b">
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-4 text-center">Type</th>
              {role === "admin" && (
                <th className="py-3 px-4 text-right">Actions</th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? 5 : 4}
                  className="text-center py-14"
                >
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <svg
                      className="w-12 h-12 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-2a4 4 0 014-4h3M3 9h4l1 5h5a2 2 0 100-4H6V5h12v2"
                      />
                    </svg>
                    <span>No transactions found</span>
                  </div>
                </td>
              </tr>
            ) : (
              currentData.map((t) => (
                <tr
                  key={t.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {/* Date */}
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {t.date}
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 font-medium text-gray-800 dark:text-white">
                    {t.category}
                  </td>

                  {/* Amount (RIGHT ALIGNED ✅) */}
                  <td className="py-3 px-4 text-right font-semibold text-gray-900 dark:text-white">
                    ₹{Number(t.amount).toLocaleString("en-IN")}
                  </td>

                  {/* Type (CENTERED ✅) */}
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        t.type === "income"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                          : "bg-red-100 text-red-600 dark:bg-red-900/30"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>

                  {/* Actions (RIGHT ALIGNED ✅) */}
                  {role === "admin" && (
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "This action is permanent. Do you really want to delete this record?",
                            )
                          ) {
                            onDelete(t.id);
                          }
                        }}
                        className="group inline-flex items-center gap-1.5 px-3 py-1.5 
                    text-xs font-semibold text-red-600 
                    border border-red-200 rounded-md
                    bg-white hover:bg-red-50 
                    hover:border-red-300 hover:text-red-700
                    focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1
                    active:scale-95 transition-all duration-150"
                      >
                        <Trash2 className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50 dark:bg-gray-800 text-sm">
          {/* Left: Showing info */}
          <div className="text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {Math.min(startIndex + rowsPerPage, totalItems)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {totalItems}
            </span>{" "}
            results
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-md border text-xs font-medium
                 bg-white dark:bg-gray-700
                 hover:bg-gray-100 dark:hover:bg-gray-600
                 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition
            ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-md border text-xs font-medium
                 bg-white dark:bg-gray-700
                 hover:bg-gray-100 dark:hover:bg-gray-600
                 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
