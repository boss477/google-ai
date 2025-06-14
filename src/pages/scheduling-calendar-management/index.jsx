import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import CalendarView from './components/CalendarView';
import EventModal from './components/EventModal';
import FilterSidebar from './components/FilterSidebar';
import UpcomingEvents from './components/UpcomingEvents';
import AddEventButton from './components/AddEventButton';

const SchedulingCalendarManagement = () => {
  const [currentView, setCurrentView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    members: [],
    locations: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: "Crop Health Assessment - Field A",
      description: "Comprehensive health evaluation of wheat crops in the northern field section",
      startTime: new Date(2024, 11, 15, 9, 0),
      endTime: new Date(2024, 11, 15, 11, 0),
      category: "health-assessment",
      attendees: ["Dr. Sarah Johnson", "Farm Manager Tom"],
      location: "Field A - North Section",
      status: "scheduled",
      priority: "high",
      recurring: false
    },
    {
      id: 2,
      title: "Worker Health Check-up",
      description: "Routine health screening for seasonal workers including blood pressure and general wellness check",
      startTime: new Date(2024, 11, 16, 14, 0),
      endTime: new Date(2024, 11, 16, 16, 0),
      category: "worker-checkup",
      attendees: ["Nurse Maria Lopez", "HR Coordinator"],
      location: "Medical Station",
      status: "scheduled",
      priority: "medium",
      recurring: true
    },
    {
      id: 3,
      title: "Equipment Maintenance - Irrigation",
      description: "Scheduled maintenance and inspection of irrigation system pumps and controllers",
      startTime: new Date(2024, 11, 18, 8, 0),
      endTime: new Date(2024, 11, 18, 12, 0),
      category: "equipment-maintenance",
      attendees: ["Maintenance Team", "Technical Supervisor"],
      location: "Pump Station 1",
      status: "in-progress",
      priority: "high",
      recurring: false
    },
    {
      id: 4,
      title: "Soil Quality Inspection",
      description: "Monthly soil testing and analysis for nutrient levels and pH balance across multiple field sections",
      startTime: new Date(2024, 11, 20, 10, 0),
      endTime: new Date(2024, 11, 20, 15, 0),
      category: "crop-inspection",
      attendees: ["Soil Specialist", "Agronomist"],
      location: "Fields B, C, D",
      status: "scheduled",
      priority: "medium",
      recurring: true
    },
    {
      id: 5,
      title: "Safety Training Session",
      description: "Mandatory safety training covering equipment handling, chemical safety, and emergency procedures",
      startTime: new Date(2024, 11, 22, 13, 0),
      endTime: new Date(2024, 11, 22, 17, 0),
      category: "worker-checkup",
      attendees: ["All Farm Workers", "Safety Officer"],
      location: "Training Center",
      status: "scheduled",
      priority: "high",
      recurring: false
    }
  ];

  const categoryConfig = {
    "health-assessment": {
      label: "Health Assessments",
      color: "bg-emerald-500",
      icon: "Activity"
    },
    "worker-checkup": {
      label: "Worker Check-ups",
      color: "bg-blue-500",
      icon: "Users"
    },
    "crop-inspection": {
      label: "Crop Inspections",
      color: "bg-green-500",
      icon: "Leaf"
    },
    "equipment-maintenance": {
      label: "Equipment Maintenance",
      color: "bg-orange-500",
      icon: "Settings"
    }
  };

  const viewModes = [
    { key: 'month', label: 'Month', icon: 'Calendar' },
    { key: 'week', label: 'Week', icon: 'CalendarDays' },
    { key: 'day', label: 'Day', icon: 'Clock' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Check online status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  const filteredEvents = mockEvents.filter(event => {
    if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(event.category)) {
      return false;
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="animate-pulse">
              <div className="h-8 bg-border rounded w-1/3 mb-4"></div>
              <div className="h-12 bg-border rounded mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="h-96 bg-border rounded-lg"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-32 bg-border rounded-lg"></div>
                  <div className="h-32 bg-border rounded-lg"></div>
                </div>
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
      
      {/* Offline Indicator */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-header left-0 right-0 bg-warning text-white px-4 py-2 text-center text-sm font-medium z-50"
          >
            <Icon name="WifiOff" size={16} className="inline mr-2" />
            You're offline. Changes will sync when connection is restored.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb />
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Scheduling & Calendar Management
              </h1>
              <p className="text-text-secondary font-body">
                Manage appointments, tasks, and events for agricultural health operations
              </p>
            </div>
            
            {/* View Mode Selector */}
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <div className="flex bg-surface border border-border rounded-lg p-1">
                {viewModes.map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => setCurrentView(mode.key)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-quick ${
                      currentView === mode.key
                        ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-background'
                    }`}
                  >
                    <Icon name={mode.icon} size={16} />
                    <span className="hidden sm:inline">{mode.label}</span>
                  </button>
                ))}
              </div>
              
              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary transition-quick"
              >
                <Icon name="Filter" size={16} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calendar Section */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-surface border border-border rounded-lg shadow-elevation-1 overflow-hidden"
              >
                <CalendarView
                  currentView={currentView}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  events={filteredEvents}
                  onEventClick={handleEventClick}
                  categoryConfig={categoryConfig}
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Filter Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}
              >
                <FilterSidebar
                  activeFilters={activeFilters}
                  onFiltersChange={setActiveFilters}
                  categoryConfig={categoryConfig}
                  onClose={() => setIsFilterOpen(false)}
                />
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <UpcomingEvents
                  events={filteredEvents}
                  onEventClick={handleEventClick}
                  categoryConfig={categoryConfig}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Button */}
      <AddEventButton onClick={handleAddEvent} />

      {/* Event Modal */}
      <AnimatePresence>
        {isEventModalOpen && (
          <EventModal
            event={selectedEvent}
            onClose={handleCloseModal}
            categoryConfig={categoryConfig}
          />
        )}
      </AnimatePresence>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-modal"
            onClick={() => setIsFilterOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SchedulingCalendarManagement;