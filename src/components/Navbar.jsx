import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown, Menu } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/login';
const Navbar = ({ onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
 const dispatch = useDispatch();
  // Mock user data - replace with actual user context/state
  const user = {
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/40', // Placeholder avatar
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear tokens, redirect to login)
   dispatch(logout());
    navigate('/login');

  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 px-4 md:px-6 py-3 flex justify-between items-center">
      {/* Left side - Hamburger menu and title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-lg font-semibold text-orange-500">Dashboard</h2>
      </div>

      {/* Right side - Profile Card */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg shadow shadow-gray-200 hover:bg-gray-100 transition-colors"
        >
          <img
            src={user.avatar}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="hidden sm:inline text-sm font-medium text-gray-700">{user.name}</span>
          <ChevronDown size={16} className="text-gray-500" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-5 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700   hover:bg-gray-100 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <User size={16} />
              Profile
            </Link>
          
            <button
              onClick={() => {
                setDropdownOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
