import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import { Link } from 'react-router-dom';

import CropHealthTab from './components/CropHealthTab';
import WorkerWellnessTab from './components/WorkerWellnessTab';
import FilterSidebar from './components/FilterSidebar';
import HealthAlerts from './components/HealthAlerts';

const HealthMonitoringAnalytics = () => {
  const [activeTab, setActiveTab] = useState('crop-health');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      type: 'critical',
      category: 'crop',
      title: 'Severe Pest Infestation Detected',
      message: 'Field A-12 showing signs of severe aphid infestation. Immediate intervention required.',
      timestamp: new Date(Date.now() - 300000),
      location: 'Field A-12'
    },
    {
      id: 2,
      type: 'warning',
      category: 'worker',
      title: 'Heat Stress Alert',
      message: 'Temperature exceeding safe working conditions. Consider adjusting work schedules.',
      timestamp: new Date(Date.now() - 600000),
      location: 'Sector B'
    },
    {
      id: 3,
      type: 'info',
      category: 'crop',
      title: 'Irrigation Schedule Update',
      message: 'Optimal irrigation window identified for tomorrow morning.',
      timestamp: new Date(Date.now() - 900000),
      location: 'Field C-8'
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  // Tab configuration
  const tabs = [
    {
      id: 'crop-health',
      label: 'Crop Health',
      icon: 'Leaf'
    },
    {
      id: 'worker-wellness',
      label: 'Worker Wellness',
      icon: 'Heart'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-header">
        <div className="px-nav lg:px-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Health Monitoring & Analytics
              </h1>
              <p className="text-text-secondary font-body">
                Comprehensive tracking of crop health and agricultural worker wellness
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="lg:hidden flex items-center space-x-2 bg-surface border border-border text-text-primary px-4 py-2 rounded-interactive hover:bg-background transition-quick"
              >
                <Icon name="Filter" size={18} />
                <span className="font-body font-medium">Filters</span>
              </button>
              
              <button className="btn-primary">
                <Icon name="Plus" size={18} />
                <span className="font-body font-medium">New Assessment</span>
              </button>
              
              <button className="btn-secondary">
                <Icon name="Download" size={18} />
                <span className="font-body font-medium hidden sm:block">Export</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8" aria-label="Health monitoring tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-body font-medium text-sm transition-quick ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                    }`}
                  >
                    <Icon 
                      name={tab.icon} 
                      size={18} 
                      color={activeTab === tab.id ? 'var(--color-primary)' : 'currentColor'}
                    />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 bg-surface border-r border-border">
            <FilterSidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-modal lg:hidden"
                  onClick={toggleSidebar}
                />
                <motion.div
                  initial={{ x: -320 }}
                  animate={{ x: 0 }}
                  exit={{ x: -320 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed left-0 top-header bottom-0 w-80 bg-surface border-r border-border z-modal lg:hidden overflow-y-auto"
                >
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-semibold text-text-primary">Filters</h3>
                      <button
                        onClick={toggleSidebar}
                        className="p-2 text-text-secondary hover:text-text-primary transition-quick rounded-interactive hover:bg-background"
                      >
                        <Icon name="X" size={20} />
                      </button>
                    </div>
                  </div>
                  <FilterSidebar />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <div className="p-nav lg:p-6">
              {/* Alerts Section */}
              <HealthAlerts alerts={alerts} onDismiss={dismissAlert} />

              {/* Crop Health Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-heading font-bold mb-4">Crop Health</h2>
                <CropHealthTab />
              </div>

              {/* Worker Wellness Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-heading font-bold">Worker Wellness</h2>
                  <Link to="/health-monitoring-analytics/worker-wellness" className="text-primary underline font-body text-sm">View Full Worker Wellness &rarr;</Link>
                </div>
                <WorkerWellnessTab />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitoringAnalytics;