// src/pages/data-management-reporting/components/FilterPanel.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const FilterPanel = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState({
    dateRange: {
      start: '',
      end: ''
    },
    locations: [],
    healthCategories: [],
    complianceStatus: 'all',
    reportType: 'all',
    ...filters
  });

  const [savedFilterSets, setSavedFilterSets] = useState([
    {
      id: 1,
      name: 'Monthly Safety Report',
      filters: {
        dateRange: { start: '2024-01-01', end: '2024-01-31' },
        healthCategories: ['worker-safety'],
        complianceStatus: 'compliant'
      }
    },
    {
      id: 2,
      name: 'Crop Health Assessment',
      filters: {
        dateRange: { start: '2024-01-01', end: '2024-06-30' },
        healthCategories: ['crop-health'],
        locations: ['field-a', 'field-b']
      }
    }
  ]);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newFilterSetName, setNewFilterSetName] = useState('');

  const locationOptions = [
    { id: 'field-a', label: 'Field A - North Sector' },
    { id: 'field-b', label: 'Field B - South Sector' },
    { id: 'field-c', label: 'Field C - East Sector' },
    { id: 'field-d', label: 'Field D - West Sector' },
    { id: 'greenhouse-1', label: 'Greenhouse 1' },
    { id: 'greenhouse-2', label: 'Greenhouse 2' }
  ];

  const healthCategoryOptions = [
    { id: 'worker-safety', label: 'Worker Safety & Wellness' },
    { id: 'crop-health', label: 'Crop Health & Disease' },
    { id: 'environmental', label: 'Environmental Monitoring' },
    { id: 'equipment', label: 'Equipment & Infrastructure' },
    { id: 'compliance', label: 'Regulatory Compliance' }
  ];

  const handleFilterUpdate = (key, value) => {
    const updatedFilters = {
      ...localFilters,
      [key]: value
    };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleMultiSelectChange = (key, optionId) => {
    const currentValues = localFilters[key] || [];
    const updatedValues = currentValues.includes(optionId)
      ? currentValues.filter(id => id !== optionId)
      : [...currentValues, optionId];
    
    handleFilterUpdate(key, updatedValues);
  };

  const handleDateRangeChange = (field, value) => {
    const updatedDateRange = {
      ...localFilters.dateRange,
      [field]: value
    };
    handleFilterUpdate('dateRange', updatedDateRange);
  };

  const applyFilterSet = (filterSet) => {
    setLocalFilters({ ...localFilters, ...filterSet.filters });
    onFilterChange({ ...localFilters, ...filterSet.filters });
  };

  const saveCurrentFilters = () => {
    if (newFilterSetName.trim()) {
      const newFilterSet = {
        id: Date.now(),
        name: newFilterSetName.trim(),
        filters: { ...localFilters }
      };
      setSavedFilterSets([...savedFilterSets, newFilterSet]);
      setNewFilterSetName('');
      setShowSaveDialog(false);
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: { start: '', end: '' },
      locations: [],
      healthCategories: [],
      complianceStatus: 'all',
      reportType: 'all'
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.dateRange?.start || localFilters.dateRange?.end) count++;
    if (localFilters.locations?.length > 0) count++;
    if (localFilters.healthCategories?.length > 0) count++;
    if (localFilters.complianceStatus !== 'all') count++;
    if (localFilters.reportType !== 'all') count++;
    return count;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-surface border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-heading font-semibold text-lg text-text-primary">
              Advanced Filters
            </h3>
            {getActiveFilterCount() > 0 && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                {getActiveFilterCount()} active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSaveDialog(true)}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-surface border border-border text-text-primary text-xs rounded-lg hover:bg-background transition-quick"
            >
              <Icon name="Save" size={12} />
              <span>Save</span>
            </button>
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-surface border border-border text-text-primary text-xs rounded-lg hover:bg-background transition-quick"
            >
              <Icon name="RotateCcw" size={12} />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              Date Range
            </label>
            <div className="space-y-2">
              <input
                type="date"
                value={localFilters.dateRange?.start || ''}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Start date"
              />
              <input
                type="date"
                value={localFilters.dateRange?.end || ''}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="End date"
              />
            </div>
          </div>

          {/* Locations */}
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              Locations
            </label>
            <div className="max-h-32 overflow-y-auto border border-border rounded-lg p-2 space-y-1">
              {locationOptions.map((option) => (
                <label key={option.id} className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-background p-1 rounded">
                  <input
                    type="checkbox"
                    checked={localFilters.locations?.includes(option.id) || false}
                    onChange={() => handleMultiSelectChange('locations', option.id)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="font-body text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Health Categories */}
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              Health Categories
            </label>
            <div className="max-h-32 overflow-y-auto border border-border rounded-lg p-2 space-y-1">
              {healthCategoryOptions.map((option) => (
                <label key={option.id} className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-background p-1 rounded">
                  <input
                    type="checkbox"
                    checked={localFilters.healthCategories?.includes(option.id) || false}
                    onChange={() => handleMultiSelectChange('healthCategories', option.id)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="font-body text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Compliance Status */}
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              Compliance Status
            </label>
            <select
              value={localFilters.complianceStatus || 'all'}
              onChange={(e) => handleFilterUpdate('complianceStatus', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="compliant">Compliant</option>
              <option value="non-compliant">Non-Compliant</option>
              <option value="pending">Pending Review</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Saved Filter Sets */}
        {savedFilterSets.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-body font-medium text-text-primary mb-3">
              Saved Filter Sets
            </h4>
            <div className="flex flex-wrap gap-2">
              {savedFilterSets.map((filterSet) => (
                <button
                  key={filterSet.id}
                  onClick={() => applyFilterSet(filterSet)}
                  className="inline-flex items-center space-x-2 px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-quick"
                >
                  <Icon name="Filter" size={12} />
                  <span>{filterSet.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4"
          onClick={() => setShowSaveDialog(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-surface rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-heading font-semibold text-lg text-text-primary mb-4">
              Save Filter Set
            </h4>
            <input
              type="text"
              value={newFilterSetName}
              onChange={(e) => setNewFilterSetName(e.target.value)}
              placeholder="Enter filter set name"
              className="w-full px-3 py-2 border border-border rounded-lg mb-4 focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 bg-surface border border-border text-text-primary rounded-lg hover:bg-background transition-quick"
              >
                Cancel
              </button>
              <button
                onClick={saveCurrentFilters}
                disabled={!newFilterSetName.trim()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-quick disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterPanel;