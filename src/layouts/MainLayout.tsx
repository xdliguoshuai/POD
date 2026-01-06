import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  User,
  Bell,
  Wand2,
  ChevronDown,
} from "lucide-react";

import { Button } from "antd";
import { cn } from "../lib/utils";

export const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showAiPulse, setShowAiPulse] = useState(false);
  const location = useLocation();

  const isCustomizer = location.pathname.includes("/customize");

  // AI Shortcut Discovery Effect (Sync with sidebar logic)
  useEffect(() => {
    const SEEN_COUNT_KEY = "ai_header_shortcut_seen";
    const seenCount = parseInt(localStorage.getItem(SEEN_COUNT_KEY) || "0", 10);

    if (seenCount < 2) {
      setShowAiPulse(true);
      localStorage.setItem(SEEN_COUNT_KEY, (seenCount + 1).toString());
      const timer = setTimeout(() => setShowAiPulse(false), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      {/* Header - Premium Redesign */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-[#1a472a]"
            >
              MODULA
            </Link>

            {/* Center: Main Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <div className="group relative">
                <Link
                  to="/products"
                  className="flex items-center gap-1 text-[#1a472a]/80 hover:text-[#1a472a] transition-colors py-2"
                >
                  Collection{" "}
                  <ChevronDown
                    size={14}
                    className="opacity-50 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
                {/* Simple Dropdown Hover Effect */}
                <div className="absolute top-full left-0 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="p-2 flex flex-col gap-1">
                    <Link
                      to="/products?type=t-shirt"
                      className="px-3 py-2 text-sm text-[#1a472a]/80 hover:bg-[#1a472a]/5 hover:text-[#1a472a] rounded-md"
                    >
                      T-Shirts
                    </Link>
                    <Link
                      to="/products?type=hoodie"
                      className="px-3 py-2 text-sm text-[#1a472a]/80 hover:bg-[#1a472a]/5 hover:text-[#1a472a] rounded-md"
                    >
                      Hoodies
                    </Link>
                    <Link
                      to="/products?type=sweatshirt"
                      className="px-3 py-2 text-sm text-[#1a472a]/80 hover:bg-[#1a472a]/5 hover:text-[#1a472a] rounded-md"
                    >
                      Sweatshirts
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                to="/about"
                className="text-[#1a472a]/80 hover:text-[#1a472a] transition-colors"
              >
                Studio
              </Link>
              <Link
                to="/journal"
                className="text-[#1a472a]/80 hover:text-[#1a472a] transition-colors"
              >
                Journal
              </Link>
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              type="text"
              shape="circle"
              icon={<Search className="h-5 w-5" />}
              className="text-[#1a472a]/80 hover:text-[#1a472a] hover:bg-[#1a472a]/5"
            />

            {/* AI Shortcut */}
            <Link to="/customizer?tab=ai-assist">
              <Button
                type="text"
                shape="circle"
                className={cn(
                  "text-[#1a472a]/80 hover:text-[#1a472a] hover:bg-[#1a472a]/5 relative flex items-center justify-center",
                  showAiPulse && "bg-[#1a472a]/10 text-[#1a472a]"
                )}
              >
                <Wand2
                  className={cn("h-5 w-5", showAiPulse && "animate-pulse")}
                />
                {showAiPulse && (
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </Button>
            </Link>

            <div className="h-6 w-px bg-[#1a472a]/10 mx-1 hidden md:block" />

            <div className="h-6 w-px bg-[#1a472a]/10 mx-1 hidden md:block" />

            <Button
              type="text"
              shape="circle"
              icon={<Bell className="h-5 w-5" />}
              className="text-[#1a472a]/80 hover:text-[#1a472a] hover:bg-[#1a472a]/5 hidden md:flex"
            />

            <Button
              type="text"
              shape="circle"
              icon={<User className="h-5 w-5" />}
              className="text-[#1a472a]/80 hover:text-[#1a472a] hover:bg-[#1a472a]/5 hidden md:flex"
            />

            <Button
              type="text"
              shape="circle"
              className="relative text-[#1a472a]/80 hover:text-[#1a472a] hover:bg-[#1a472a]/5 flex items-center justify-center"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#1a472a] ring-2 ring-white" />
            </Button>

            <Button
              type="text"
              shape="circle"
              className="md:hidden text-[#1a472a]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              icon={
                isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )
              }
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b bg-background p-4 space-y-4">
          <Link
            to="/products"
            className="block text-sm font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Collection
          </Link>
          <Link
            to="/about"
            className="block text-sm font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Studio
          </Link>
          <Link
            to="/journal"
            className="block text-sm font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Journal
          </Link>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer - Minimalist */}
      {!isCustomizer && (
        <footer className="border-t py-12 md:py-16 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">MODULA</h4>
              <p className="text-sm text-muted-foreground">
                Premium customization platform for modern brands.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Product Types</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/products?type=t-shirt"
                    className="hover:text-foreground transition-colors"
                  >
                    T-Shirts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?type=hoodie"
                    className="hover:text-foreground transition-colors"
                  >
                    Hoodies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?type=sweatshirt"
                    className="hover:text-foreground transition-colors"
                  >
                    Sweatshirts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-foreground transition-colors"
                  >
                    View All
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Templates</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/customizer?category=brand"
                    className="hover:text-foreground transition-colors"
                  >
                    Brand Merch
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customizer?category=events"
                    className="hover:text-foreground transition-colors"
                  >
                    Events & Teams
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customizer?category=corporate"
                    className="hover:text-foreground transition-colors"
                  >
                    Corporate Gifting
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customizer"
                    className="hover:text-foreground transition-colors"
                  >
                    Start Customizing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    Quality Standards
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t text-center md:text-left text-xs text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
            <span>© 2026 MODULA Inc. All rights reserved.</span>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
