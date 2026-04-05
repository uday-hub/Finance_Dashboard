import { useState } from "react";

export default function AddTransactionModal({ onAdd, onClose }) {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const handleSubmit = () => {
    if (!form.amount || !form.category || !form.date) return;

    onAdd({
      ...form,
      id: Date.now(),
      amount: Number(form.amount),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-96 shadow-lg space-y-5 transition-transform transform scale-100 animate-slide-in">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Add Transaction
        </h2>

        <div className="flex flex-col gap-3">
          {/* Date */}
          <input
            type="date"
            className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-800 transition"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          {/* Amount */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              ₹
            </span>
            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-700 px-7 py-2 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-800 transition appearance-none"
              style={{ MozAppearance: "textfield" }}
            />
          </div>

          {/* Category */}
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-800 transition"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          {/* Type */}
          <div className="relative">
            <select
              className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-800 appearance-none"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            {/* Custom Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
              ▼
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
