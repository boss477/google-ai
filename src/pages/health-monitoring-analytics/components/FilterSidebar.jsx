import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const FilterSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    dateRange: true,
    location: true,
    healthCategory: true,
    severity: true,
    status: false
  });

  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: 'last-7-days',
    locations: ['field-a12', 'field-b8'],
    categories: ['crop-health', 'worker-wellness'],
    severity: ['medium', 'high'],
    status: []
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      if (filterType === 'dateRange') {
        return { ...prev, [filterType]: value };
      }
      
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [filterType]: newValues };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      dateRange: 'last-7-days',
      locations: [],
      categories: [],
      severity: [],
      status: []
    });
  };

  const filterSections = [
    {
      id: 'dateRange',
      title: 'Date Range',
      icon: 'Calendar',
      type: 'radio',
      options: [
        { value: 'today', label: 'Today' },
        { value: 'last-7-days', label: 'Last 7 days' },
        { value: 'last-30-days', label: 'Last 30 days' },
        { value: 'last-quarter', label: 'Last quarter' },
        { value: 'custom', label: 'Custom range' }
      ]
    },
    {
      id: 'location',
      title: 'Locations',
      icon: 'MapPin',
      type: 'checkbox',
      options: [
        { value: 'field-a12', label: 'Field A-12', count: 45 },
        { value: 'field-b8', label: 'Field B-8', count: 32 },
        { value: 'field-c15', label: 'Field C-15', count: 28 },
        { value: 'greenhouse-1', label: 'Greenhouse 1', count: 15 },
        { value: 'greenhouse-2', label: 'Greenhouse 2', count: 12 },
        { value: 'storage-facility', label: 'Storage Facility', count: 8 }
      ]
    },
    {
      id: 'healthCategory',
      title: 'Health Categories',
      icon: 'Activity',
      type: 'checkbox',
      options: [
        { value: 'crop-health', label: 'Crop Health', count: 156 },
        { value: 'worker-wellness', label: 'Worker Wellness', count: 89 },
        { value: 'equipment-safety', label: 'Equipment Safety', count: 34 },
        { value: 'environmental', label: 'Environmental', count: 67 },
        { value: 'pest-control', label: 'Pest Control', count: 23 }
      ]
    },
    {
      id: 'severity',
      title: 'Severity Levels',
      icon: 'AlertTriangle',
      type: 'checkbox',
      options: [
        { value: 'low', label: 'Low', count: 78, color: '#059669' },
        { value: 'medium', label: 'Medium', count: 45, color: '#D97706' },
        { value: 'high', label: 'High', count: 23, color: '#DC2626' },
        { value: 'critical', label: 'Critical', count: 8, color: '#7C2D12' }
      ]
    },
    {
      id: 'status',
      title: 'Status',
      icon: 'CheckCircle',
      type: 'checkbox',
      options: [
        { value: 'healthy', label: 'Healthy', count: 89 },
        { value: 'at-risk', label: 'At Risk', count: 34 },
        { value: 'requires-attention', label: 'Requires Attention', count: 12 },
        { value: 'critical', label: 'Critical', count: 3 }
      ]
    }
  ];

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedFilters.dateRange !== 'last-7-days') count++;
    count += selectedFilters.locations?.length || 0;
    count += selectedFilters.categories?.length || 0;
    count += selectedFilters.severity?.length || 0;
    count += selectedFilters.status?.length || 0;
    return count;
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Filter Header */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-text-primary">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm font-body font-medium text-primary hover:text-primary/80 transition-quick"
            >
              Clear All
            </button>
          )}
        </div>
        {getActiveFilterCount() > 0 && (
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={14} className="text-text-secondary" />
            <span className="text-sm font-body text-text-secondary">
              {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} applied
            </span>
          </div>
        )}
      </div>

      {/* Filter Sections */}
      <div className="p-4 space-y-4">
        {filterSections.map((section) => (
          <div key={section.id} className="border border-border rounded-container overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-3 bg-surface hover:bg-background transition-quick"
            >
              <div className="flex items-center space-x-2">
                <Icon name={section.icon} size={16} className="text-text-secondary" />
                <span className="font-body font-medium text-text-primary">{section.title}</span>
              </div>
              <motion.div
                animate={{ rotate: expandedSections[section.id] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icon name="ChevronDown" size={16} className="text-text-secondary" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedSections[section.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 bg-background border-t border-border space-y-2">
                    {section.options.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type={section.type}
                          name={section.id}
                          value={option.value}
                          checked={
                            section.type === 'radio'
                              ? selectedFilters[section.id] === option.value
                              : selectedFilters[section.id]?.includes(option.value)
                          }
                          onChange={() => handleFilterChange(section.id, option.value)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                        />
                        <div className="flex-1 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {option.color && (
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: option.color }}
                              ></div>
                            )}
                            <span className="font-body text-sm text-text-primary group-hover:text-primary transition-quick">
                              {option.label}
                            </span>
                          </div>
                          {option.count && (
                            <span className="font-body text-xs text-text-secondary bg-surface px-2 py-1 rounded-interactive">
                              {option.count}
                            </span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="border border-border rounded-container p-3 bg-surface">
          <h4 className="font-body font-medium text-text-primary mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-2 p-2 text-left text-text-secondary hover:text-text-primary hover:bg-background rounded-interactive transition-quick">
              <Icon name="Download" size={16} />
              <span className="font-body text-sm">Export Filtered Data</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-2 text-left text-text-secondary hover:text-text-primary hover:bg-background rounded-interactive transition-quick">
              <Icon name="Bell" size={16} />
              <span className="font-body text-sm">Set Alert for Filters</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-2 text-left text-text-secondary hover:text-text-primary hover:bg-background rounded-interactive transition-quick">
              <Icon name="Save" size={16} />
              <span className="font-body text-sm">Save Filter Preset</span>
            </button>
          </div>
        </div>

        {/* Filter Presets */}
        <div className="border border-border rounded-container p-3 bg-surface">
          <h4 className="font-body font-medium text-text-primary mb-3">Saved Presets</h4>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-2 text-left hover:bg-background rounded-interactive transition-quick">
              <span className="font-body text-sm text-text-primary">Critical Issues</span>
              <Icon name="ChevronRight" size={14} className="text-text-secondary" />
            </button>
            <button className="w-full flex items-center justify-between p-2 text-left hover:bg-background rounded-interactive transition-quick">
              <span className="font-body text-sm text-text-primary">Weekly Review</span>
              <Icon name="ChevronRight" size={14} className="text-text-secondary" />
            </button>
            <button className="w-full flex items-center justify-between p-2 text-left hover:bg-background rounded-interactive transition-quick">
              <span className="font-body text-sm text-text-primary">Field Operations</span>
              <Icon name="ChevronRight" size={14} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;