import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function RightSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 h-full z-30 transition-all duration-300 ease-in-out ${
        open ? 'w-80 translate-x-0' : 'w-12 translate-x-[calc(100%-3rem)]'
      }`}
    >
      <div
        className={`h-full flex flex-col transition-all duration-500 ${
          open
            ? 'backdrop-blur-glass bg-gradient-glass shadow-glass border-l border-glass-border/20'
            : ''
        }`}
      >
        <button
          className="self-end m-2 p-2 rounded hover:bg-overlay-light/20 transition-colors flex items-center justify-center"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {open ? (
            <X className="h-5 w-5 text-overlay-light" />
          ) : (
            <Menu className="h-5 w-5 text-overlay-light" />
          )}
        </button>
        <div
          className={`overflow-y-auto flex-1 transition-opacity duration-300 ease-in-out ${
            open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {open && children}
        </div>
      </div>
    </div>
  );
}