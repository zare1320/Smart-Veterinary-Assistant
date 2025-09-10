import React from 'react';
import type { NavItem, NavItemKey } from '../types';

interface BottomNavProps {
  items: NavItem[];
  activeItem: NavItemKey;
  onItemClick: (key: NavItemKey) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ items, activeItem, onItemClick }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
      <nav className="flex justify-around items-center h-20">
        {items.map((item) => {
          const isActive = item.key === activeItem;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onItemClick(item.key)}
              className={`flex flex-col items-center justify-center space-y-1 w-full h-full transition-colors ${
                isActive ? 'text-[var(--primary-600)]' : 'text-slate-500 hover:text-[var(--primary-600)] dark:hover:text-[var(--primary-400)]'
              }`}
            >
              <Icon className="text-2xl" />
              <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
};

export default BottomNav;
