import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import MetricCard from './components/MetricCard';
import HealthTrendsChart from './components/HealthTrendsChart';
import QuickActionTiles from './components/QuickActionTiles';
import NotificationPanel from './components/NotificationPanel';
import WeatherWidget from './components/WeatherWidget';
import RecentActivity from './components/RecentActivity';
import AdditionalInsights from './components/AdditionalInsights';

const DashboardOverview = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const kpiMetrics = [
    {
      id: 1,
      title: "Crop Health Score",
      value: 87,
      unit: "%",
      trend: "up",
      change: "+5.2%",
      icon: "Leaf",
      color: "success",
      description: "Overall crop health across all monitored fields"
    },
    {
      id: 2,
      title: "Worker Wellness",
      value: 94,
      unit: "%",
      trend: "up",
      change: "+2.1%",
      icon: "Heart",
      color: "primary",
      description: "Agricultural worker health and safety metrics"
    },
    {
      id: 3,
      title: "Active Alerts",
      value: 12,
      unit: "",
      trend: "down",
      change: "-3",
      icon: "AlertTriangle",
      color: "warning",
      description: "Current operational and health alerts requiring attention"
    },
    {
      id: 4,
      title: "Compliance Rate",
      value: 98,
      unit: "%",
      trend: "stable",
      change: "0%",
      icon: "Shield",
      color: "success",
      description: "Health and safety compliance across operations"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-border rounded w-1/3 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-border rounded-lg"></div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-96 bg-border rounded-lg"></div>
                <div className="h-96 bg-border rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb />
          
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-text-secondary font-body">
                  Comprehensive health and operational insights for your agricultural operations
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <button className="inline-flex items-center space-x-2 bg-surface border border-border text-text-primary px-4 py-2 rounded-lg font-body font-medium hover:bg-background transition-quick">
                  <Icon name="Download" size={16} />
                  <span>Export Report</span>
                </button>
                
                <button className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-primary/90 transition-quick">
                  <Icon name="RefreshCw" size={16} />
                  <span>Refresh Data</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* KPI Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {kpiMetrics.map((metric, index) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                index={index}
              />
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Health Trends Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <HealthTrendsChart />
            </motion.div>

            {/* Weather Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <WeatherWidget />
            </motion.div>
          </div>

          {/* Additional Insights Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-8"
          >
            <AdditionalInsights />
          </motion.div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Quick Action Tiles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <QuickActionTiles />
            </motion.div>

            {/* Notification Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <NotificationPanel />
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <RecentActivity />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;