// src/pages/data-management-reporting/index.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import ReportBuilder from './components/ReportBuilder';
import DataPreview from './components/DataPreview';
import FilterPanel from './components/FilterPanel';
import ExportToolbar from './components/ExportToolbar';
import ReportTemplates from './components/ReportTemplates';
import DataTable from './components/DataTable';
import FileUploadZone from './components/FileUploadZone';

const DataManagementReporting = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('builder'); // 'builder', 'table', 'templates'
  const [reportData, setReportData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [reportConfig, setReportConfig] = useState({
    title: 'New Report',
    components: [],
    layout: 'standard'
  });
  const [isMobilePreviewVisible, setIsMobilePreviewVisible] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Initialize with sample data
      setReportData({
        workerSafety: {
          totalWorkers: 156,
          incidentRate: 2.3,
          complianceScore: 94,
          trainingCompleted: 89
        },
        cropHealth: {
          avgHealthScore: 87,
          diseaseReports: 12,
          treatmentEffectiveness: 91,
          yieldProjection: 'Above Average'
        },
        trends: [
          { month: 'Jan', safety: 92, health: 85, compliance: 96 },
          { month: 'Feb', safety: 94, health: 87, compliance: 94 },
          { month: 'Mar', safety: 93, health: 89, compliance: 95 },
          { month: 'Apr', safety: 96, health: 87, compliance: 97 },
          { month: 'May', safety: 95, health: 91, compliance: 94 },
          { month: 'Jun', safety: 97, health: 88, compliance: 98 }
        ]
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
    // Apply filters to data
  };

  const handleReportConfigChange = (config) => {
    setReportConfig(config);
  };

  const handleExport = (format) => {
    console.log(`Exporting report in ${format} format`);
    // Implement export functionality
  };

  const toggleMobilePreview = () => {
    setIsMobilePreviewVisible(!isMobilePreviewVisible);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-border rounded w-1/3 mb-8"></div>
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
                  Data Management & Reporting
                </h1>
                <p className="text-text-secondary font-body">
                  Centralized agricultural health information with comprehensive reporting and export capabilities
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <button 
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-quick ${
                    showFilterPanel 
                      ? 'bg-primary text-white' :'bg-surface border border-border text-text-primary hover:bg-background'
                  }`}
                >
                  <Icon name="Filter" size={16} />
                  <span>Filters</span>
                </button>
                
                <ExportToolbar onExport={handleExport} />
              </div>
            </div>
          </motion.div>

          {/* View Toggle (Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:hidden mb-6"
          >
            <div className="flex bg-surface border border-border rounded-lg p-1">
              <button
                onClick={() => setActiveView('builder')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-quick ${
                  activeView === 'builder' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                Builder
              </button>
              <button
                onClick={() => setActiveView('table')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-quick ${
                  activeView === 'table' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                Data Table
              </button>
              <button
                onClick={() => setActiveView('templates')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-quick ${
                  activeView === 'templates' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                Templates
              </button>
            </div>
          </motion.div>

          {/* Filter Panel (Collapsible) */}
          {showFilterPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <FilterPanel
                filters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </motion.div>
          )}

          {/* Main Content Area */}
          <div className="space-y-8">
            {/* Desktop Dual Panel Layout */}
            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Left Panel - Report Builder */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <ReportBuilder
                  config={reportConfig}
                  onChange={handleReportConfigChange}
                />
              </motion.div>

              {/* Right Panel - Live Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <DataPreview
                  config={reportConfig}
                  data={reportData}
                  filters={selectedFilters}
                />
              </motion.div>
            </div>

            {/* Mobile Content */}
            <div className="lg:hidden">
              {activeView === 'builder' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReportBuilder
                    config={reportConfig}
                    onChange={handleReportConfigChange}
                    isMobile={true}
                  />
                  
                  <button
                    onClick={toggleMobilePreview}
                    className="w-full mt-4 bg-primary text-white px-4 py-3 rounded-lg font-body font-medium"
                  >
                    <Icon name="Eye" size={16} className="inline mr-2" />
                    Preview Report
                  </button>
                </motion.div>
              )}

              {activeView === 'table' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DataTable data={reportData} />
                </motion.div>
              )}

              {activeView === 'templates' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReportTemplates onSelectTemplate={handleReportConfigChange} />
                </motion.div>
              )}
            </div>

            {/* Desktop Additional Sections */}
            <div className="hidden lg:block space-y-8">
              {/* Report Templates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ReportTemplates onSelectTemplate={handleReportConfigChange} />
              </motion.div>

              {/* Data Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <DataTable data={reportData} />
              </motion.div>

              {/* File Upload Zone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <FileUploadZone />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Preview Modal */}
      {isMobilePreviewVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-modal lg:hidden"
          onClick={toggleMobilePreview}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-lg text-text-primary">
                  Report Preview
                </h3>
                <button
                  onClick={toggleMobilePreview}
                  className="p-2 hover:bg-background rounded-lg transition-quick"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto">
              <DataPreview
                config={reportConfig}
                data={reportData}
                filters={selectedFilters}
                isMobile={true}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DataManagementReporting;