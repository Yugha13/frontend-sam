import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import {
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
} from 'lucide-react'

interface NavbarProps {
  onMenuClick: () => void
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { user, logout } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={onMenuClick}
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex ml-2 md:mr-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                Admin Dashboard
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100"
              aria-label="View notifications"
            >
              <Bell className="w-6 h-6" />
            </button>
            <div className="relative ml-3">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-label="Open user menu"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                  alt="user photo"
                />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-900">{user?.name}</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <ul>
                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 