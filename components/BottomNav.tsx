import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from '../types';
import { motion } from 'framer-motion';

interface BottomNavProps {
  items: NavItem[];
}

const navItemVariants = {
  hover: { y: -3 },
  tap: { scale: 0.9 },
};


const BottomNav: React.FC<BottomNavProps> = ({ items }) => {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[color:var(--background-nav)]/80 backdrop-blur-md border-t border-border z-50 md:w-24 md:h-screen md:flex-col md:top-0 md:border-t-0 md:border-r md:right-auto">
      <nav className="flex justify-around items-center h-20 md:flex-col md:h-full md:justify-start md:pt-10 md:gap-6">
        {items.map((item) => {
          const isActive = item.path === '/' 
            ? location.pathname === item.path 
            : location.pathname.startsWith(item.path);

          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
              className="h-full flex-1 md:w-full md:flex-initial"
            >
              <Link
                to={item.path}
                className={`flex flex-col items-center justify-center space-y-1 w-full h-full md:w-full md:h-auto md:py-4 transition-colors ${
                  isActive ? 'text-[var(--primary-600)]' : 'text-muted-foreground hover:text-[var(--primary-600)] dark:hover:text-[var(--primary-400)]'
                }`}
              >
                <motion.div animate={isActive ? { scale: [1, 1.15, 1] } : {}} transition={{ duration: 0.3 }}>
                  <Icon className="text-2xl" />
                </motion.div>
                <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </footer>
  );
};

export default BottomNav;