
"use client";

import Link from "next/link";
import { Utensils, Github, Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-emerald-900 via-emerald-700 to-emerald-900 text-white mt-10">

     {/* Wave separator   */}
      <div className="absolute -top-6 w-full overflow-hidden leading-none rotate-180">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-6"
          preserveAspectRatio="none">
          <path
            d="M0,32L48,37.3C96,43,192,53,288,69.3C384,85,480,107,576,112C672,117,768,107,864,101.3C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            className="fill-white/10"
          ></path>
        </svg>
      </div> 

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">

        {/* Branding */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <div className="flex items-center gap-2">
            <Utensils className="w-7 h-7 text-orange-400" />
            <span className="font-bold text-xl sm:text-2xl">FlavorQuest</span>
          </div>
          <p className="text-sm text-gray-200 max-w-xs text-center md:text-left">
            Discover, cook, and enjoy recipes from all over the world 🌍
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center space-y-3">
          <h3 className="text-lg font-semibold text-yellow-300">Explore</h3>
          <div className="flex flex-col gap-2">
            {["Home", "Categories", "Profile"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-orange-300 transition-colors font-medium">
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          <h3 className="text-lg font-semibold text-orange-300">Contact Us</h3>
          <p className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-orange-300" />
            <a
              href="mailto:saba_sh27@hotmail.com"
              className="hover:underline hover:text-orange-300">
              youremail@example.com
            </a>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-300" />
            <a
              href="https://maps.google.com/?q=Stockholm,Hammarby"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-yellow-300">
               FutureGames Stockholm, Hammarby
            </a>
          </p>

          {/* Socials */}
          <div className="flex gap-4 mt-2">
            <Link
              href="https://github.com/sabawaheed27"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition">
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="border-t border-white/20 py-4 text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} FlavorQuest. Powered by{" "}
        <Link
          href="https://www.themealdb.com/"
          target="_blank"
          className="underline hover:text-orange-300"
          rel="noopener noreferrer">
          TheMealDB
        </Link>
      </div>
    </footer>
  );
}
