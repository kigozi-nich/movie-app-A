import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const MenuIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') {
        setOpen(false);
      }
      // Basic focus trap: keep tab within panel
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>('a, button');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };

    if (open) {
      // focus first link when menu opens
      setTimeout(() => firstLinkRef.current?.focus(), 0);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center text-2xl font-bold text-amber-500 hover:text-amber-400 transition-colors">
          <Film className="mr-2" size={28} />
          <span>MovieMaster</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-amber-500 transition-colors font-medium">Home</Link>
          <Link to="/watchlist" className="text-gray-300 hover:text-amber-500 transition-colors font-medium">Watchlist</Link>
          <Link to="/profile" className="text-gray-300 hover:text-amber-500 transition-colors font-medium">Profile</Link>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-lg text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel with backdrop */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <div
            ref={panelRef}
            className="md:hidden fixed top-0 right-0 w-11/12 max-w-xs h-full bg-gray-900 text-white shadow-lg z-50 transform transition-transform duration-300 ease-out"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Link to="/" className="flex items-center text-xl font-bold text-gold">
                  <Film className="mr-2" /> MovieMaster
                </Link>
                <button onClick={() => setOpen(false)} className="p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gold" aria-label="Close menu">
                  <X />
                </button>
              </div>

              <nav>
                <ul className="flex flex-col space-y-3">
                  <li>
                    <Link
                      ref={firstLinkRef}
                      to="/"
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/watchlist"
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      Watchlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;