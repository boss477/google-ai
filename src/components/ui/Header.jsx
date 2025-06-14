import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-overview',
      icon: 'LayoutDashboard',
      tooltip: 'Central command center for operational overview'
    },
    {
      label: 'Health Analytics',
      path: '/health-monitoring-analytics',
      icon: 'Activity',
      tooltip: 'Comprehensive monitoring and health data analysis'
    },
    {
      label: 'Schedule',
      path: '/scheduling-calendar-management',
      icon: 'Calendar',
      tooltip: 'Calendar-based coordination and appointments'
    },
    {
      label: 'Reports',
      path: '/data-management-reporting',
      icon: 'FileText',
      tooltip: 'Data management and compliance reporting'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-b border-border z-header"
    >
      <div className="flex items-center justify-between h-header px-nav lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link to="/dashboard-overview" className="flex items-center space-x-3" onClick={closeMenus}>
            <div className="w-8 h-8 bg-primary rounded-container flex items-center justify-center">
              <Icon name="Leaf" size={20} color="white" />
            </div>
            <span className="font-heading font-semibold text-xl text-text-primary hidden sm:block">
              AgriHealth
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-interactive transition-quick hover:bg-background group ${
                isActiveRoute(item.path)
                  ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
              }`}
              title={item.tooltip}
              onClick={closeMenus}
            >
              <Icon 
                name={item.icon} 
                size={18} 
                color={isActiveRoute(item.path) ? 'white' : 'currentColor'}
              />
              <span className="font-body font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <DarkModeToggle className="hidden sm:flex" />
          {/* Notifications */}
          <button className="relative p-2 text-text-secondary hover:text-text-primary transition-quick rounded-interactive hover:bg-background">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 p-2 rounded-interactive hover:bg-background transition-quick"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-secondary hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-container shadow-elevation-2 py-2 z-dropdown">
                <div className="px-4 py-2 border-b border-border">
                  <p className="font-body font-medium text-sm text-text-primary">John Smith</p>
                  <p className="font-body text-xs text-text-secondary">Farm Manager</p>
                </div>
                
                <Link
                  to="/user-profile-settings"
                  className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-background transition-quick"
                  onClick={closeMenus}
                >
                  <Icon name="Settings" size={16} />
                  <span className="font-body text-sm">Profile & Settings</span>
                </Link>
                
                <button className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-background transition-quick w-full text-left">
                  <Icon name="HelpCircle" size={16} />
                  <span className="font-body text-sm">Help & Support</span>
                </button>
                
                <div className="border-t border-border mt-2 pt-2">
                  <button className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:text-error hover:bg-background transition-quick w-full text-left">
                    <Icon name="LogOut" size={16} />
                    <span className="font-body text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-quick rounded-interactive hover:bg-background"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-surface border-t border-border shadow-elevation-2 z-modal overflow-hidden"
          >
            <nav className="px-nav py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-interactive transition-quick ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-background'
                }`}
                onClick={closeMenus}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  color={isActiveRoute(item.path) ? 'white' : 'currentColor'}
                />
                <div>
                  <span className="font-body font-medium text-sm block">{item.label}</span>
                  <span className="font-body text-xs text-current opacity-75 block">{item.tooltip}</span>
                </div>
              </Link>
            ))}
          </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      {(isMenuOpen || isProfileOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-dropdown lg:hidden"
          onClick={closeMenus}
        ></div>
      )}
    </motion.header>
  );
};

export default Header;