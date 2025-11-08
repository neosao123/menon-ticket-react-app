import React, { useState } from 'react';
import { Menu, X, Home, Users } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Dashboard", active: true },
    { icon: <Users className="w-5 h-5" />, label: "Tickets" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-orange-600 text-white p-2 rounded-md shadow-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-54 bg-white text-black transform transition-transform duration-300 z-40 shadow-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:shadow-none`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Logo Section - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex items-center space-x-3 mb-8 pb-4 border-b border-gray-200">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Menon</h1>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-8 lg:hidden">Menu</h2>
          <nav className="space-y-2">
            {menuItems.map((item, i) => (
              <a
                key={i}
                href="#"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  item.active
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-orange-400 hover:text-white hover:shadow-md'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;