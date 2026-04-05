import { useState, useEffect } from "react";
import { transactions as initialData } from "../data/mockData";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import Charts from "../components/Charts";
import Insights from "../components/Insights";
import AddTransactionModal from "../components/AddTransactionModal";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

export default function Dashboard() {
  const [role, setRole] = useState("viewer");
  // const [transactions, setTransactions] = useState(initialData);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const prevIncome = transactions
    .filter(
      (t) =>
        t.type === "income" &&
        new Date(t.date).getMonth() === new Date().getMonth() - 1,
    )
    .reduce((acc, t) => acc + t.amount, 0);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // last month (handles Jan → Dec correctly)
  const lastMonthDate = new Date(currentYear, currentMonth - 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  // THIS MONTH INCOME
  const thisMonthIncome = transactions
    .filter((t) => {
      const d = new Date(t.date);
      return (
        t.type === "income" &&
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      );
    })
    .reduce((acc, t) => acc + t.amount, 0);

  // LAST MONTH INCOME
  const lastMonthIncome = transactions
    .filter((t) => {
      const d = new Date(t.date);
      return (
        t.type === "income" &&
        d.getMonth() === lastMonth &&
        d.getFullYear() === lastMonthYear
      );
    })
    .reduce((acc, t) => acc + t.amount, 0);

  const incomeChange =
    lastMonthIncome === 0
      ? 0
      : ((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-950">
      <Sidebar
        role={role}
        activePage={activePage}
        setActivePage={setActivePage}
         isOpen={isSidebarOpen}
  setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
        <Header role={role} setRole={setRole} />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard
            title="Available Balance"
            amount={balance}
            color="text-gray-900 dark:text-white"
            change={incomeChange}
            icon={
              <Wallet className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            }
          />

          <SummaryCard
            title="Total Income"
            amount={totalIncome}
            color="text-green-600"
            change={4.2}
            icon={<ArrowUpRight className="w-5 h-5 text-green-600" />}
          />

          <SummaryCard
            title="Total Expenses"
            amount={totalExpense}
            color="text-red-600"
            change={3.5}
            icon={<ArrowDownRight className="w-5 h-5 text-red-600" />}
          />
        </div>

        {/* 🔥 DASHBOARD (ALL) */}
        {activePage === "dashboard" && (
          <>
            <Charts transactions={transactions} />
            <Insights transactions={transactions} />
            <TransactionTable
              transactions={transactions}
              role={role}
              onDelete={handleDelete}
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
              setShowModal={setShowModal}
            />
          </>
        )}

        {/* 🔥 TRANSACTIONS ONLY */}
        {activePage === "transactions" && (
          <TransactionTable
            transactions={transactions}
            role={role}
            onDelete={handleDelete}
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            setShowModal={setShowModal}
          />
        )}

        {/* 🔥 INSIGHTS ONLY */}
        {activePage === "insights" && <Insights transactions={transactions} />}
      </main>
      {showModal && (
        <AddTransactionModal
          onAdd={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
