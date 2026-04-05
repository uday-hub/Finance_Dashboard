export default function Sidebar({ role, activePage, setActivePage }) {
  const menu = [
    { name: "dashboard", label: "Dashboard" },
    { name: "transactions", label: "Transactions" },
    { name: "insights", label: "Insights" },
  ];
  return (
    <aside className="w-64 h-full bg-gray-900 text-gray-300 flex flex-col">
      <div className="p-6 text-white text-2xl font-bold border-b border-gray-800 flex items-center gap-2">
      <img src="/favicon.svg" alt="FinDash Logo" className="w-8 h-8" />
        FinDash
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <div
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`px-4 py-2 rounded-lg cursor-pointer transition ${activePage === item.name
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-800"
              }`}
          >
            {item.label}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800 text-sm">
        Role: <span className="text-white capitalize">{role}</span>
      </div>
    </aside>
  );
}