import { Bell, Moon } from "lucide-react";
export default function Header({
  role,
  setRole,
  setIsSidebarOpen,
  isSidebarOpen,
}) {
  const user = {
    name: "John Doe",
  };
  return (
    <div
      className={`sticky top-0 backdrop-blur-lg bg-white/40 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center transition-all
  ${isSidebarOpen ? "z-30" : "z-50"}`}
    >
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="sm:hidden fixed top-4 right-4 z-[60] p-2 rounded-lg border bg-white dark:bg-gray-800 shadow"
      >
        ☰
      </button>
      {/* Left Section */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Financial Dashboard
        </h1>
        <p className="text-sm text-gray-500">Welcome back 👋</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Role Selector */}
        <div className="relative">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setRole("viewer")}
              className={`px-3 py-1 text-sm rounded-md transition ${
                role === "viewer"
                  ? "bg-white dark:bg-gray-900 shadow text-gray-900 dark:text-white"
                  : "text-gray-500"
              }`}
            >
              Viewer
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`px-3 py-1 text-sm rounded-md transition ${
                role === "admin"
                  ? "bg-white dark:bg-gray-900 shadow text-gray-900 dark:text-white"
                  : "text-gray-500"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}
          className="p-2 rounded-lg border bg-gray-100 dark:bg-gray-800 dark:text-white hover:scale-105 transition"
        >
          <Moon className="w-5 h-5" />
        </button>

        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full overflow-hidden border group-hover:scale-105 transition">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name + Role */}
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {user.name} {role === "admin" && "(Admin)"}
            </p>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
