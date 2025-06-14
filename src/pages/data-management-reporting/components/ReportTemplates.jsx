// src/pages/data-management-reporting/components/ReportTemplates.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const ReportTemplates = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templateCategories = [
    { id: 'all', label: 'All Templates', icon: 'Grid3x3' },
    { id: 'safety', label: 'Worker Safety', icon: 'Shield' },
    { id: 'crop', label: 'Crop Health', icon: 'Leaf' },
    { id: 'compliance', label: 'Compliance', icon: 'CheckCircle' },
    { id: 'trends', label: 'Trend Analysis', icon: 'TrendingUp' }
  ];

  const reportTemplates = [
    {
      id: 1,
      name: 'Worker Safety Compliance Report',
      category: 'safety',
      description: 'Comprehensive safety metrics, incident reports, and compliance status',
      icon: 'Shield',
      color: 'success',
      components: [
        { id: 'metric-1', type: 'metric-card', name: 'Safety Score' },
        { id: 'chart-1', type: 'chart', name: 'Incident Trends' },
        { id: 'table-1', type: 'table', name: 'Safety Violations' },
        { id: 'text-1', type: 'text', name: 'Compliance Summary' }
      ],
      frequency: 'Weekly',
      lastUsed: '2024-01-15'
    },
    {
      id: 2,
      name: 'Crop Health Assessment',
      category: 'crop',
      description: 'Disease monitoring, treatment effectiveness, and yield projections',
      icon: 'Leaf',
      color: 'primary',
      components: [
        { id: 'metric-2', type: 'metric-card', name: 'Health Score' },
        { id: 'chart-2', type: 'chart', name: 'Disease Progression' },
        { id: 'image-1', type: 'image', name: 'Field Photos' },
        { id: 'table-2', type: 'table', name: 'Treatment Records' }
      ],
      frequency: 'Bi-weekly',
      lastUsed: '2024-01-12'
    },
    {
      id: 3,
      name: 'Seasonal Trend Analysis',
      category: 'trends',
      description: 'Long-term health trends and seasonal pattern analysis',
      icon: 'TrendingUp',
      color: 'warning',
      components: [
        { id: 'chart-3', type: 'chart', name: 'Seasonal Trends' },
        { id: 'chart-4', type: 'chart', name: 'Year-over-Year' },
        { id: 'metric-3', type: 'metric-card', name: 'Performance Metrics' },
        { id: 'text-2', type: 'text', name: 'Analysis Summary' }
      ],
      frequency: 'Monthly',
      lastUsed: '2024-01-10'
    },
    {
      id: 4,
      name: 'Regulatory Compliance Summary',
      category: 'compliance',
      description: 'Comprehensive compliance status and regulatory requirements',
      icon: 'CheckCircle',
      color: 'primary',
      components: [
        { id: 'metric-4', type: 'metric-card', name: 'Compliance Rate' },
        { id: 'table-3', type: 'table', name: 'Requirements Checklist' },
        { id: 'text-3', type: 'text', name: 'Regulatory Updates' },
        { id: 'divider-1', type: 'divider', name: 'Section Divider' }
      ],
      frequency: 'Monthly',
      lastUsed: '2024-01-08'
    },
    {
      id: 5,
      name: 'Environmental Impact Report',
      category: 'compliance',
      description: 'Environmental monitoring and sustainability metrics',
      icon: 'Globe',
      color: 'success',
      components: [
        { id: 'chart-5', type: 'chart', name: 'Environmental Metrics' },
        { id: 'metric-5', type: 'metric-card', name: 'Sustainability Score' },
        { id: 'table-4', type: 'table', name: 'Resource Usage' }
      ],
      frequency: 'Quarterly',
      lastUsed: '2024-01-05'
    },
    {
      id: 6,
      name: 'Equipment Health Dashboard',
      category: 'safety',
      description: 'Equipment maintenance status and performance monitoring',
      icon: 'Wrench',
      color: 'warning',
      components: [
        { id: 'metric-6', type: 'metric-card', name: 'Equipment Status' },
        { id: 'chart-6', type: 'chart', name: 'Maintenance Schedule' },
        { id: 'table-5', type: 'table', name: 'Service Records' }
      ],
      frequency: 'Weekly',
      lastUsed: '2024-01-03'
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? reportTemplates 
    : reportTemplates.filter(template => template.category === selectedCategory);

  const handleSelectTemplate = (template) => {
    const templateConfig = {
      title: template.name,
      components: template.components,
      layout: 'standard'
    };
    onSelectTemplate(templateConfig);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      success: 'bg-success/10 text-success border-success/20',
      primary: 'bg-primary/10 text-primary border-primary/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      error: 'bg-error/10 text-error border-error/20'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
          Report Templates
        </h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {templateCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-quick ${
                selectedCategory === category.id
                  ? 'bg-primary text-white' :'bg-background text-text-secondary hover:text-text-primary hover:bg-border'
              }`}
            >
              <Icon name={category.icon} size={14} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-300 cursor-pointer group"
              onClick={() => handleSelectTemplate(template)}
            >
              {/* Template Header */}
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(template.color)}`}>
                  <Icon 
                    name={template.icon} 
                    size={20} 
                    color={`var(--color-${template.color})`} 
                  />
                </div>
                <div className="flex items-center space-x-1 text-text-secondary">
                  <Icon name="Clock" size={12} />
                  <span className="text-xs font-body">{template.frequency}</span>
                </div>
              </div>

              {/* Template Info */}
              <div className="mb-4">
                <h3 className="font-body font-semibold text-text-primary mb-2 group-hover:text-primary transition-quick">
                  {template.name}
                </h3>
                <p className="text-text-secondary font-body text-sm leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Components Preview */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {template.components.slice(0, 3).map((component, componentIndex) => (
                    <span
                      key={componentIndex}
                      className="inline-flex items-center px-2 py-1 bg-background text-text-secondary rounded text-xs font-body"
                    >
                      {component.name}
                    </span>
                  ))}
                  {template.components.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded text-xs font-body">
                      +{template.components.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Template Footer */}
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span className="font-body">
                  Last used: {new Date(template.lastUsed).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-quick">
                  <Icon name="ArrowRight" size={12} />
                  <span className="font-body">Use Template</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
            <h3 className="font-heading font-medium text-lg text-text-primary mb-2">
              No Templates Found
            </h3>
            <p className="text-text-secondary font-body">
              No templates available for the selected category.
            </p>
          </div>
        )}
      </div>

      {/* Custom Template Option */}
      <div className="p-4 border-t border-border bg-background/50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-body font-medium text-text-primary mb-1">
              Create Custom Template
            </h4>
            <p className="text-text-secondary font-body text-sm">
              Build a new template from scratch using the report builder
            </p>
          </div>
          <button
            onClick={() => onSelectTemplate({ title: 'Custom Report', components: [], layout: 'standard' })}
            className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-primary/90 transition-quick"
          >
            <Icon name="Plus" size={16} />
            <span>Create</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportTemplates;