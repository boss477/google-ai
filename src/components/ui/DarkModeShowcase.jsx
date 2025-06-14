import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';
import DarkModeToggle from './DarkModeToggle';
import { useNotify } from './NotificationSystem';

const DarkModeShowcase = () => {
  const notify = useNotify();
  const [selectedTab, setSelectedTab] = useState('colors');

  const colorPalette = [
    { name: 'Primary', var: '--color-primary', class: 'bg-primary' },
    { name: 'Primary Light', var: '--color-primary-light', class: 'bg-primary-light' },
    { name: 'Primary Dark', var: '--color-primary-dark', class: 'bg-primary-dark' },
    { name: 'Secondary', var: '--color-secondary', class: 'bg-secondary' },
    { name: 'Secondary Light', var: '--color-secondary-light', class: 'bg-secondary-light' },
    { name: 'Secondary Dark', var: '--color-secondary-dark', class: 'bg-secondary-dark' },
    { name: 'Accent', var: '--color-accent', class: 'bg-accent' },
    { name: 'Accent Light', var: '--color-accent-light', class: 'bg-accent-light' },
    { name: 'Accent Dark', var: '--color-accent-dark', class: 'bg-accent-dark' },
  ];

  const statusColors = [
    { name: 'Success', class: 'status-success', icon: 'CheckCircle' },
    { name: 'Warning', class: 'status-warning', icon: 'AlertTriangle' },
    { name: 'Error', class: 'status-error', icon: 'XCircle' },
    { name: 'Info', class: 'status-info', icon: 'Info' },
  ];

  const backgroundLayers = [
    { name: 'Background', class: 'bg-background' },
    { name: 'Background Secondary', class: 'bg-background-secondary' },
    { name: 'Surface', class: 'bg-surface' },
    { name: 'Surface Elevated', class: 'bg-surface-elevated' },
  ];

  const testNotifications = () => {
    notify.success('Enhanced dark mode colors look amazing!', { 
      title: 'Success',
      duration: 3000 
    });
    setTimeout(() => {
      notify.info('Modern cyan-teal primary color provides excellent contrast', { 
        title: 'Info',
        duration: 3000 
      });
    }, 500);
    setTimeout(() => {
      notify.warning('Status colors are now more vibrant and distinguishable', { 
        title: 'Warning',
        duration: 3000 
      });
    }, 1000);
  };

  const tabs = [
    { id: 'colors', label: 'Color Palette', icon: 'Palette' },
    { id: 'components', label: 'Components', icon: 'Layout' },
    { id: 'effects', label: 'Effects', icon: 'Sparkles' },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              Enhanced Dark Mode Showcase
            </h1>
            <p className="text-text-secondary">
              Modern, accessible dark theme with improved contrast and visual hierarchy
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <button 
              onClick={testNotifications}
              className="btn-primary"
            >
              <Icon name="Bell" size={16} className="mr-2" />
              Test Notifications
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-surface rounded-lg p-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-smooth ${
                selectedTab === tab.id
                  ? 'bg-primary text-white shadow-elevation-1'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Color Palette Tab */}
        {selectedTab === 'colors' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Primary Colors */}
            <div className="card p-6">
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Primary Color Palette
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
                {colorPalette.map((color) => (
                  <div key={color.name} className="text-center">
                    <div 
                      className={`w-16 h-16 rounded-lg ${color.class} shadow-elevation-1 mb-2 mx-auto`}
                    />
                    <p className="text-xs font-medium text-text-primary">{color.name}</p>
                    <p className="text-xs text-text-tertiary font-mono">{color.var}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Colors */}
            <div className="card p-6">
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Status Indicators
              </h3>
              <div className="flex flex-wrap gap-4">
                {statusColors.map((status) => (
                  <div key={status.name} className="flex items-center space-x-3">
                    <span className={`${status.class} flex items-center space-x-2`}>
                      <Icon name={status.icon} size={14} />
                      <span>{status.name}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Background Layers */}
            <div className="card p-6">
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Background Hierarchy
              </h3>
              <div className="space-y-4">
                {backgroundLayers.map((layer, index) => (
                  <div 
                    key={layer.name}
                    className={`${layer.class} p-4 rounded-lg border border-border`}
                    style={{ marginLeft: `${index * 20}px` }}
                  >
                    <p className="text-text-primary font-medium">{layer.name}</p>
                    <p className="text-text-secondary text-sm">Layer {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Components Tab */}
        {selectedTab === 'components' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Buttons */}
            <div className="card p-6">
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Enhanced Buttons
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">Primary Button</button>
                <button className="btn-secondary">Secondary Button</button>
                <button className="btn-ghost">Ghost Button</button>
                <button className="btn-danger">Danger Button</button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6">
                <h4 className="font-heading font-semibold text-text-primary mb-2">Standard Card</h4>
                <p className="text-text-secondary">Enhanced with better contrast and depth</p>
              </div>
              <div className="card-glass p-6">
                <h4 className="font-heading font-semibold text-text-primary mb-2">Glass Card</h4>
                <p className="text-text-secondary">Improved glassmorphism effects</p>
              </div>
              <div className="card-interactive p-6">
                <h4 className="font-heading font-semibold text-text-primary mb-2">Interactive Card</h4>
                <p className="text-text-secondary">Hover for enhanced interactions</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Effects Tab */}
        {selectedTab === 'effects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Glassmorphism Examples */}
            <div className="card p-6">
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Glassmorphism Effects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-subtle p-6 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">Subtle Glass</h4>
                  <p className="text-text-secondary text-sm">Light blur effect</p>
                </div>
                <div className="glass p-6 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">Standard Glass</h4>
                  <p className="text-text-secondary text-sm">Medium blur effect</p>
                </div>
                <div className="glass-strong p-6 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">Strong Glass</h4>
                  <p className="text-text-secondary text-sm">Heavy blur effect</p>
                </div>
              </div>
            </div>

            {/* Shadow Examples */}
            <div className="card p-6">
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Enhanced Shadows
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-surface p-4 rounded-lg shadow-elevation-1">
                  <p className="text-text-primary font-medium">Elevation 1</p>
                </div>
                <div className="bg-surface p-4 rounded-lg shadow-elevation-2">
                  <p className="text-text-primary font-medium">Elevation 2</p>
                </div>
                <div className="bg-surface p-4 rounded-lg shadow-elevation-3">
                  <p className="text-text-primary font-medium">Elevation 3</p>
                </div>
                <div className="bg-surface p-4 rounded-lg shadow-elevation-4">
                  <p className="text-text-primary font-medium">Elevation 4</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DarkModeShowcase;
