// src/pages/data-management-reporting/components/DataPreview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from 'components/AppIcon';

const DataPreview = ({ config, data, filters, isMobile = false }) => {
  const renderComponent = (component, index) => {
    switch (component.type) {
      case 'metric-card':
        return renderMetricCard(component, index);
      case 'chart':
        return renderChart(component, index);
      case 'table':
        return renderTable(component, index);
      case 'text':
        return renderText(component, index);
      case 'image':
        return renderImage(component, index);
      case 'divider':
        return renderDivider(component, index);
      default:
        return null;
    }
  };

  const renderMetricCard = (component, index) => {
    const metrics = [
      { title: 'Worker Safety Score', value: data?.workerSafety?.complianceScore || 94, unit: '%', icon: 'Shield', color: 'success' },
      { title: 'Crop Health Score', value: data?.cropHealth?.avgHealthScore || 87, unit: '%', icon: 'Leaf', color: 'primary' },
      { title: 'Active Incidents', value: data?.workerSafety?.incidentRate || 2.3, unit: '', icon: 'AlertTriangle', color: 'warning' },
      { title: 'Training Complete', value: data?.workerSafety?.trainingCompleted || 89, unit: '%', icon: 'GraduationCap', color: 'primary' }
    ];
    
    const metric = metrics[index % metrics.length];
    
    return (
      <motion.div
        key={component.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-surface border border-border rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            metric.color === 'success' ? 'bg-success/10' :
            metric.color === 'warning'? 'bg-warning/10' : 'bg-primary/10'
          }`}>
            <Icon 
              name={metric.icon} 
              size={24} 
              color={`var(--color-${metric.color === 'success' ? 'success' : metric.color === 'warning' ? 'warning' : 'primary'})`} 
            />
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-baseline space-x-1">
            <span className={`text-3xl font-heading font-bold ${
              metric.color === 'success' ? 'text-success' :
              metric.color === 'warning'? 'text-warning' : 'text-primary'
            }`}>
              {metric.value}
            </span>
            <span className="text-lg font-body text-text-secondary">{metric.unit}</span>
          </div>
        </div>
        <h3 className="text-text-primary font-body font-semibold text-sm mb-2">
          {metric.title}
        </h3>
        <p className="text-text-secondary font-body text-xs">
          Real-time monitoring and assessment
        </p>
      </motion.div>
    );
  };

  const renderChart = (component, index) => {
    const chartData = data?.trends || [];
    
    return (
      <motion.div
        key={component.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-surface border border-border rounded-lg p-6"
      >
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
          Health Trends Overview
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {component.config?.chartType === 'bar' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="safety" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="health" fill="var(--color-success)" radius={[2, 2, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="safety" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="health" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="compliance" 
                  stroke="var(--color-warning)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-warning)', strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </motion.div>
    );
  };

  const renderTable = (component, index) => {
    const tableData = [
      { field: 'Field A', workers: 24, healthScore: 92, incidents: 0, compliance: '100%' },
      { field: 'Field B', workers: 18, healthScore: 87, incidents: 1, compliance: '94%' },
      { field: 'Field C', workers: 31, healthScore: 89, incidents: 0, compliance: '100%' },
      { field: 'Field D', workers: 22, healthScore: 85, incidents: 2, compliance: '89%' },
    ];
    
    return (
      <motion.div
        key={component.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-surface border border-border rounded-lg overflow-hidden"
      >
        <div className="p-4 border-b border-border">
          <h3 className="font-heading font-semibold text-lg text-text-primary">
            Field Health Summary
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="px-4 py-3 text-left font-body font-medium text-text-primary text-sm">
                  Location
                </th>
                <th className="px-4 py-3 text-left font-body font-medium text-text-primary text-sm">
                  Workers
                </th>
                <th className="px-4 py-3 text-left font-body font-medium text-text-primary text-sm">
                  Health Score
                </th>
                <th className="px-4 py-3 text-left font-body font-medium text-text-primary text-sm">
                  Incidents
                </th>
                <th className="px-4 py-3 text-left font-body font-medium text-text-primary text-sm">
                  Compliance
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-border hover:bg-background/50">
                  <td className="px-4 py-3 font-body text-sm text-text-primary">
                    {row.field}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-text-secondary">
                    {row.workers}
                  </td>
                  <td className="px-4 py-3 font-body text-sm">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      row.healthScore >= 90 ? 'bg-success/10 text-success' :
                      row.healthScore >= 80 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
                    }`}>
                      {row.healthScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-text-secondary">
                    {row.incidents}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-text-secondary">
                    {row.compliance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  };

  const renderText = (component, index) => (
    <motion.div
      key={component.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-surface border border-border rounded-lg p-6"
    >
      <div className="prose max-w-none">
        <p className="font-body text-text-primary leading-relaxed">
          {component.config?.content || 'This is a sample text block that can contain important information about your agricultural health monitoring report. You can customize this content to include relevant details, explanations, or insights.'}
        </p>
      </div>
    </motion.div>
  );

  const renderImage = (component, index) => (
    <motion.div
      key={component.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-surface border border-border rounded-lg overflow-hidden"
    >
      <div className="aspect-video bg-background flex items-center justify-center">
        <div className="text-center text-text-secondary">
          <Icon name="Image" size={48} className="mx-auto mb-2 opacity-50" />
          <p className="font-body text-sm">Image placeholder</p>
        </div>
      </div>
      {component.config?.caption && (
        <div className="p-4">
          <p className="font-body text-sm text-text-secondary text-center">
            {component.config.caption}
          </p>
        </div>
      )}
    </motion.div>
  );

  const renderDivider = (component, index) => (
    <motion.div
      key={component.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="my-6"
    >
      <hr className="border-border" />
    </motion.div>
  );

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-lg text-text-primary">
            Live Preview
          </h2>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
              <div className="w-2 h-2 bg-success rounded-full mr-1 animate-pulse"></div>
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {config.components.length === 0 ? (
          <div className="text-center py-12 text-text-secondary">
            <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="font-heading font-medium text-lg mb-2">No Components Added</h3>
            <p className="font-body text-sm">
              Start building your report by dragging components from the builder panel
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Report Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                {config.title}
              </h1>
              <p className="text-text-secondary font-body text-sm">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </motion.div>

            {/* Report Components */}
            <div className={`space-y-6 ${
              config.layout === 'compact' ? 'space-y-4' :
              config.layout === 'detailed'? 'space-y-8' : 'space-y-6'
            }`}>
              {config.components.map((component, index) => renderComponent(component, index))}
            </div>

            {/* Report Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: config.components.length * 0.1 + 0.2 }}
              className="mt-12 pt-6 border-t border-border text-center"
            >
              <p className="text-text-secondary font-body text-xs">
                Agricultural Health Management System - Data Management & Reporting
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPreview;