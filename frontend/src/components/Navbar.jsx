import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed w-full top-0 bg-black/80 backdrop-blur-lg border-b border-lavender-200 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-yellow-500" />
          <h1 className="text-xl font-serif text-yellow-500">Ping Pong</h1>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/settings" className="text-yellow-500 hover:text-yellow-700">
            <Settings size={20} />
          </Link>
          {authUser && (
            <>
              <Link to="/profile" className="text-yellow-500 hover:text-yellow-700">
                <User size={20} />
              </Link>
              <button onClick={logout} className="text-yellow-500 hover:text-yellow-700 flex items-center gap-1">
                <LogOut size={20} />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
