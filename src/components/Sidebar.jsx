export default function Sidebar({
  role,
  activePage,
  setActivePage,
  isOpen,
  setIsOpen,
}) {
  const menu = [
    { name: "dashboard", label: "Dashboard" },
    { name: "transactions", label: "Transactions" },
    { name: "insights", label: "Insights" },
  ];
  return (
    <aside
      className={`fixed sm:static top-0 left-0 h-full w-64 bg-gray-900 text-gray-300 flex flex-col z-50
  transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
  sm:translate-x-0`}
    >
      {isOpen && (
  <div
    className="fixed inset-0 bg-black/40 z-40 sm:hidden"
    onClick={() => setIsOpen(false)}
  />
)}
      <div className="p-6 text-white text-2xl font-bold border-b border-gray-800 flex items-center gap-2">
        <img src="/favicon.svg" alt="FinDash Logo" className="w-8 h-8" />
        FinDash
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setActivePage(item.name);
              setIsOpen(false); // 🔥 close on mobile
            }}
            className={`px-4 py-2 rounded-lg cursor-pointer transition ${
              activePage === item.name
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