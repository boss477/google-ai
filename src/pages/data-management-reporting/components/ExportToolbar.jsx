// src/pages/data-management-reporting/components/ExportToolbar.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const ExportToolbar = ({ onExport }) => {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleConfig, setScheduleConfig] = useState({
    frequency: 'weekly',
    format: 'pdf',
    email: '',
    time: '09:00'
  });

  const exportFormats = [
    {
      id: 'pdf',
      label: 'PDF Document',
      icon: 'FileText',
      description: 'Print-friendly format with formatted layouts'
    },
    {
      id: 'excel',
      label: 'Excel Spreadsheet',
      icon: 'FileSpreadsheet',
      description: 'Data in Excel format for analysis'
    },
    {
      id: 'csv',
      label: 'CSV Data',
      icon: 'Database',
      description: 'Raw data in comma-separated format'
    },
    {
      id: 'json',
      label: 'JSON Data',
      icon: 'Code',
      description: 'Structured data for API integration'
    }
  ];

  const handleExport = (format) => {
    onExport(format);
    setIsExportMenuOpen(false);
    
    // Show success notification (could be replaced with actual toast)
    console.log(`Exporting in ${format} format...`);
  };

  const handleScheduleExport = () => {
    console.log('Scheduling automated export:', scheduleConfig);
    setIsScheduleModalOpen(false);
    // Reset form
    setScheduleConfig({
      frequency: 'weekly',
      format: 'pdf',
      email: '',
      time: '09:00'
    });
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
          className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-primary/90 transition-quick"
        >
          <Icon name="Download" size={16} />
          <span>Export</span>
          <Icon name="ChevronDown" size={14} />
        </button>

        {/* Export Menu */}
        {isExportMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-72 bg-surface border border-border rounded-lg shadow-elevation-2 py-2 z-dropdown"
          >
            {/* Quick Export */}
            <div className="px-3 py-2 border-b border-border">
              <h4 className="font-body font-medium text-text-primary text-sm mb-2">
                Quick Export
              </h4>
              <div className="grid grid-cols-2 gap-1">
                {exportFormats.slice(0, 4).map((format) => (
                  <button
                    key={format.id}
                    onClick={() => handleExport(format.id)}
                    className="flex items-center space-x-2 p-2 hover:bg-background rounded-lg transition-quick text-left"
                  >
                    <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                      <Icon name={format.icon} size={12} color="var(--color-primary)" />
                    </div>
                    <span className="font-body text-xs text-text-primary">
                      {format.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Export Options */}
            <div className="px-3 py-2 border-b border-border">
              <h4 className="font-body font-medium text-text-primary text-sm mb-2">
                Export Options
              </h4>
              <div className="space-y-1">
                {exportFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => handleExport(format.id)}
                    className="flex items-start space-x-3 p-2 hover:bg-background rounded-lg transition-quick text-left w-full"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-0.5">
                      <Icon name={format.icon} size={16} color="var(--color-primary)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-body font-medium text-sm text-text-primary">
                        {format.label}
                      </div>
                      <div className="font-body text-xs text-text-secondary">
                        {format.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div className="px-3 py-2">
              <button
                onClick={() => {
                  setIsScheduleModalOpen(true);
                  setIsExportMenuOpen(false);
                }}
                className="flex items-center space-x-3 p-2 hover:bg-background rounded-lg transition-quick text-left w-full"
              >
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={16} color="var(--color-secondary)" />
                </div>
                <div className="flex-1">
                  <div className="font-body font-medium text-sm text-text-primary">
                    Schedule Export
                  </div>
                  <div className="font-body text-xs text-text-secondary">
                    Set up automated recurring reports
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleExport('print')}
                className="flex items-center space-x-3 p-2 hover:bg-background rounded-lg transition-quick text-left w-full"
              >
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Printer" size={16} color="var(--color-accent)" />
                </div>
                <div className="flex-1">
                  <div className="font-body font-medium text-sm text-text-primary">
                    Print Report
                  </div>
                  <div className="font-body text-xs text-text-secondary">
                    Print-optimized layout
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* Overlay */}
        {isExportMenuOpen && (
          <div 
            className="fixed inset-0 z-dropdown" 
            onClick={() => setIsExportMenuOpen(false)}
          />
        )}
      </div>

      {/* Schedule Export Modal */}
      {isScheduleModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4"
          onClick={() => setIsScheduleModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-surface rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-lg text-text-primary">
                Schedule Automated Export
              </h3>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-2 hover:bg-background rounded-lg transition-quick"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Frequency */}
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Frequency
                </label>
                <select
                  value={scheduleConfig.frequency}
                  onChange={(e) => setScheduleConfig({ ...scheduleConfig, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Export Format
                </label>
                <select
                  value={scheduleConfig.format}
                  onChange={(e) => setScheduleConfig({ ...scheduleConfig, format: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {exportFormats.map((format) => (
                    <option key={format.id} value={format.id}>
                      {format.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Email Recipients
                </label>
                <input
                  type="email"
                  value={scheduleConfig.email}
                  onChange={(e) => setScheduleConfig({ ...scheduleConfig, email: e.target.value })}
                  placeholder="Enter email addresses (comma-separated)"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-body font-medium text-text-primary mb-2">
                  Delivery Time
                </label>
                <input
                  type="time"
                  value={scheduleConfig.time}
                  onChange={(e) => setScheduleConfig({ ...scheduleConfig, time: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="px-4 py-2 bg-surface border border-border text-text-primary rounded-lg hover:bg-background transition-quick"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleExport}
                disabled={!scheduleConfig.email}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-quick disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Schedule Export
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ExportToolbar;