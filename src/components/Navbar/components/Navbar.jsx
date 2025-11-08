import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { logoutcall } from '../api/NavbarApi';


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/profile') return 'Profile';
    if (path === '/tickets') return 'Tickets';
    if (path === '/settings') return 'Settings';
    return 'Menon';
  };

  const goTo = (path) => {
    navigate(path);
  };

  // FIXED: Call API + Clear
  const handleLogout = async () => {
    try {
      await logoutcall();
    } catch (err) {
      console.warn("Logout API failed");
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      navigate("/signin");
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-1 left-0 right-0 z-50 lg:left-56 lg:right-2">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT: Logo */}
          <div className="flex items-center space-x-3 lg:hidden">
            <div onClick={() => goTo('/dashboard')} className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1 onClick={() => goTo('/dashboard')} className="text-xl font-bold text-gray-800 cursor-pointer">Menon</h1>
          </div>

          {/* CENTER: Title */}
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{getPageTitle()}</h1>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center space-x-3">

            {/* Notifications */}
            <button onClick={() => goTo('/notifications')} className="relative p-2.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all group">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">3</span>
            </button>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-bold text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-3 border-orange-500 shadow-md" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <button onClick={() => goTo('/profile')} className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition">
                    <User className="w-5 h-5" />
                    <span className="font-medium">My Profile</span>
                  </button>
                  <button onClick={() => goTo('/settings')} className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button onClick={handleLogout} className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-red-50 text-red-600 transition">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;