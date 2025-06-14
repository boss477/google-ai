import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from 'components/AppIcon';

const HealthTrendsChart = () => {
  const [activeTab, setActiveTab] = useState('crop');
  const [chartType, setChartType] = useState('line');

  const cropHealthData = [
    { month: 'Jan', score: 82, workers: 89, compliance: 95 },
    { month: 'Feb', score: 85, workers: 91, compliance: 96 },
    { month: 'Mar', score: 83, workers: 88, compliance: 94 },
    { month: 'Apr', score: 87, workers: 93, compliance: 97 },
    { month: 'May', score: 89, workers: 95, compliance: 98 },
    { month: 'Jun', score: 91, workers: 94, compliance: 97 },
    { month: 'Jul', score: 88, workers: 92, compliance: 96 },
    { month: 'Aug', score: 90, workers: 96, compliance: 98 },
    { month: 'Sep', score: 87, workers: 94, compliance: 97 },
    { month: 'Oct', score: 89, workers: 95, compliance: 99 },
    { month: 'Nov', score: 86, workers: 93, compliance: 98 },
    { month: 'Dec', score: 87, workers: 94, compliance: 98 }
  ];

  const tabs = [
    { id: 'crop', label: 'Crop Health', icon: 'Leaf', color: 'var(--color-success)' },
    { id: 'workers', label: 'Worker Wellness', icon: 'Heart', color: 'var(--color-primary)' },
    { id: 'compliance', label: 'Compliance', icon: 'Shield', color: 'var(--color-warning)' }
  ];

  const getDataKey = () => {
    switch (activeTab) {
      case 'crop':
        return 'score';
      case 'workers':
        return 'workers';
      case 'compliance':
        return 'compliance';
      default:
        return 'score';
    }
  };

  const getColor = () => {
    const tab = tabs.find(t => t.id === activeTab);
    return tab ? tab.color : 'var(--color-primary)';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-body font-medium text-text-primary mb-1">{label}</p>
          <p className="font-body text-sm" style={{ color: getColor() }}>
            {`${tabs.find(t => t.id === activeTab)?.label}: ${payload[0].value}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
            Health Trends Analytics
          </h2>
          <p className="text-text-secondary font-body text-sm">
            Seasonal health trends and predictive analytics
          </p>
        </div>

        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <div className="flex items-center bg-background rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-md transition-quick ${
                chartType === 'line' ?'bg-surface shadow-sm text-primary' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="TrendingUp" size={16} />
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`p-2 rounded-md transition-quick ${
                chartType === 'area' ?'bg-surface shadow-sm text-primary' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="BarChart3" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-quick ${
              activeTab === tab.id
                ? 'bg-primary text-white' :'bg-background text-text-secondary hover:text-text-primary hover:bg-surface'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon 
              name={tab.icon} 
              size={16} 
              color={activeTab === tab.id ? 'white' : 'currentColor'} 
            />
            <span className="text-sm">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Chart Container */}
      <motion.div
        key={`${activeTab}-${chartType}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={cropHealthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                fontFamily="var(--font-body)"
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                fontFamily="var(--font-body)"
                domain={[70, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={getDataKey()}
                stroke={getColor()}
                strokeWidth={3}
                dot={{ fill: getColor(), strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: getColor(), strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <AreaChart data={cropHealthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                fontFamily="var(--font-body)"
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                fontFamily="var(--font-body)"
                domain={[70, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={getDataKey()}
                stroke={getColor()}
                fill={getColor()}
                fillOpacity={0.1}
                strokeWidth={3}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      {/* Chart Insights */}
      <div className="mt-4 p-4 bg-background rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
          </div>
          <div>
            <h4 className="font-body font-medium text-text-primary text-sm mb-1">
              Key Insights
            </h4>
            <p className="font-body text-text-secondary text-xs leading-relaxed">
              {activeTab === 'crop' && "Crop health shows steady improvement with seasonal variations. Peak performance in May-June."}
              {activeTab === 'workers' && "Worker wellness metrics demonstrate consistent upward trend with effective safety programs."}
              {activeTab === 'compliance' && "Compliance rates maintain excellent standards above 94% throughout the year."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTrendsChart;