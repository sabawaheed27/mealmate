
"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { Utensils, Menu, X } from "lucide-react";
import Link from "next/link";


const Navbar = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false); //toggles mobile menu

  if (!userContext) return null;
  const { user, logout } = userContext;

  const handleLogout = () => {
    logout();
    router.replace("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-900 via-emerald-700 to-emerald-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 rounded-b-xl">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:scale-105 transition">
          <Utensils className="w-7 h-7 text-orange-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
            FlavorQuest
          </h1>
        </Link>

        {/* Desktop Links */}
        {user && (
          <div className="hidden md:flex items-center gap-6">
            {["Home", "Profile", "Categories"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative font-medium hover:text-orange-300 after:block after:h-0.5 after:bg-orange-400 after:scale-x-0 hover:after:scale-x-100 after:transition after:origin-left">
                {item}
              </Link>
            ))}

            <span className="font-semibold text-orange-300">
              Hi, {user.name}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg shadow-md hover:shadow-lg transition">
              Logout
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        {user && (
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && user && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {["Home", "Profile", "Categories"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-lg hover:text-orange-300 transition-colors">
              {item}
            </Link>
          ))}
          <div className="border-t border-emerald-600 pt-4">
            <span className="block font-semibold text-orange-300 mb-2">
              Hi, {user.name}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg shadow-md transition">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>

  );
};

export default Navbar;
