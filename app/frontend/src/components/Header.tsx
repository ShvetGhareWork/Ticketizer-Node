"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { LogOut, User, Menu, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { authToken, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isBookingPath =
    pathname?.includes("/seats") ||
    pathname?.includes("/checkout") ||
    pathname?.includes("/booking/");

  return (
    <>
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center gap-8 lg:gap-12 min-w-0">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 font-extrabold text-lg sm:text-xl tracking-tight text-gray-900 hover:text-blue-600 transition-colors cursor-pointer flex-shrink-0"
          >
            <div className="w-3 h-3 bg-[#BFFF00]"></div>
            Ticketizer
          </Link>
          
          {/* Desktop Nav Links (Hidden on Mobile) */}
          {!isBookingPath && (
            <div className="hidden md:flex gap-6 lg:gap-8 text-xs lg:text-sm font-extrabold text-gray-500 tracking-wider">
              <Link
                href="/events"
                className={`${
                  pathname?.startsWith("/events")
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "hover:text-gray-900 transition-colors"
                }`}
              >
                EVENTS
              </Link>
              <Link
                href="/my-bookings"
                className={`${
                  pathname === "/my-bookings"
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "hover:text-gray-900 transition-colors"
                }`}
              >
                MY BOOKINGS
              </Link>
              <Link
                href="/notifications"
                className={`${
                  pathname === "/notifications"
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "hover:text-gray-900 transition-colors"
                }`}
              >
                NOTIFICATIONS
              </Link>
            </div>
          )}
        </div>

        {/* Right side Actions */}
        <div className="flex items-center gap-3 lg:gap-6 flex-shrink-0">
          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6">
            {authToken ? (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-3 py-1.5 rounded-sm border border-gray-200">
                  <User size={13} className="text-blue-600" />
                  SECURE KEY ACTIVE
                </span>
                <button
                  onClick={() => {
                    logout();
                    router.push("/auth/login");
                  }}
                  className="flex items-center gap-1.5 text-sm font-bold text-red-600 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  <LogOut size={13.5} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-semibold hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <button
                  onClick={() => router.push("/auth/register")}
                  className="bg-blue-600 text-white px-5 py-2.5 text-sm font-bold rounded hover:bg-blue-700 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          {!isBookingPath && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden text-gray-700 hover:text-blue-600 focus:outline-none p-1.5 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}

          {/* Quick Sign Out / Get Started button for mobile if booking paths */}
          {isBookingPath && (
            authToken ? (
              <button
                onClick={() => {
                  logout();
                  router.push("/auth/login");
                }}
                className="text-[10px] font-bold text-red-600 border border-red-200 px-3 py-1.5 rounded-sm"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => router.push("/auth/register")}
                className="bg-blue-600 text-white px-3 py-1.5 text-[10px] font-bold rounded"
              >
                Get Started
              </button>
            )
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && !isBookingPath && (
        <div className="md:hidden border-b border-gray-200 bg-white py-4 px-4 flex flex-col gap-4 text-sm font-extrabold text-gray-600 tracking-wider shadow-inner">
          <Link
            href="/events"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 px-3 rounded ${
              pathname?.startsWith("/events")
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-50"
            }`}
          >
            EVENTS
          </Link>
          <Link
            href="/my-bookings"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 px-3 rounded ${
              pathname === "/my-bookings"
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-50"
            }`}
          >
            MY BOOKINGS
          </Link>
          <Link
            href="/notifications"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 px-3 rounded ${
              pathname === "/notifications"
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-50"
            }`}
          >
            NOTIFICATIONS
          </Link>
          <hr className="border-gray-100 my-1" />
          {authToken ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
                router.push("/auth/login");
              }}
              className="flex items-center justify-center gap-1.5 text-red-600 bg-red-50 hover:bg-red-100 py-3 rounded text-center w-full font-bold cursor-pointer"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-3 border border-gray-200 rounded font-bold hover:bg-gray-50"
              >
                Sign In
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/auth/register");
                }}
                className="bg-blue-600 text-white text-center py-3 rounded font-bold hover:bg-blue-700 shadow-sm"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
