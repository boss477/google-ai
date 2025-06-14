import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const EventModal = ({ event, onClose, categoryConfig }) => {
  const [isEditing, setIsEditing] = useState(!event);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(event || {
    title: '',
    description: '',
    category: 'health-assessment',
    startTime: new Date(),
    endTime: new Date(),
    attendees: [],
    location: '',
    priority: 'medium',
    recurring: false,
    status: 'scheduled'
  });

  const steps = [
    { number: 1, title: 'Event Details', icon: 'Info' },
    { number: 2, title: 'Attendees & Location', icon: 'Users' },
    { number: 3, title: 'Schedule & Recurrence', icon: 'Clock' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-red-600' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving event:', formData);
    onClose();
  };

  const handleDelete = () => {
    // Mock delete functionality
    console.log('Deleting event:', event.id);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Event Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter event title"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={!isEditing}
              >
                {Object.entries(categoryConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={!isEditing}
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter event description"
                disabled={!isEditing}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter location"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Attendees
              </label>
              <div className="space-y-2">
                {Array.isArray(formData.attendees) && formData.attendees.map((attendee, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-background rounded-lg">
                    <Icon name="User" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{attendee}</span>
                    {isEditing && (
                      <button
                        onClick={() => {
                          const newAttendees = formData.attendees.filter((_, i) => i !== index);
                          handleInputChange('attendees', newAttendees);
                        }}
                        className="text-error hover:text-error/80"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <button className="flex items-center space-x-2 p-2 border border-dashed border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-primary transition-quick">
                    <Icon name="Plus" size={16} />
                    <span className="text-sm">Add Attendee</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Start Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.startTime instanceof Date ? 
                    formData.startTime.toISOString().slice(0, 16) : 
                    formData.startTime
                  }
                  onChange={(e) => handleInputChange('startTime', new Date(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  End Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.endTime instanceof Date ? 
                    formData.endTime.toISOString().slice(0, 16) : 
                    formData.endTime
                  }
                  onChange={(e) => handleInputChange('endTime', new Date(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.recurring}
                  onChange={(e) => handleInputChange('recurring', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                  disabled={!isEditing}
                />
                <span className="text-sm text-text-primary">Recurring Event</span>
              </label>
            </div>

            {formData.recurring && (
              <div className="p-4 bg-background rounded-lg border border-border">
                <h4 className="font-medium text-text-primary mb-3">Recurrence Pattern</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Repeat Every
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      disabled={!isEditing}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-modal"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-surface rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            {event && categoryConfig[event.category] && (
              <div className={`w-4 h-4 rounded-full ${categoryConfig[event.category].color}`}></div>
            )}
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              {event ? (isEditing ? 'Edit Event' : 'Event Details') : 'Create New Event'}
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-background rounded-lg transition-quick"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Step Indicator (for new events) */}
        {!event && (
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep >= step.number 
                      ? 'bg-primary text-white' :'bg-background text-text-secondary'
                  }`}>
                    {currentStep > step.number ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step.icon} size={16} />
                    )}
                  </div>
                  
                  <div className="ml-2 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-text-primary' : 'text-text-secondary'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-primary' : 'bg-border'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex space-x-2">
            {event && !isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-quick"
                >
                  <Icon name="Edit" size={16} />
                  <span>Edit</span>
                </button>
                
                <button
                  onClick={handleDelete}
                  className="flex items-center space-x-2 px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-quick"
                >
                  <Icon name="Trash2" size={16} />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>

          <div className="flex space-x-2">
            {!event && currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-background transition-quick"
              >
                Previous
              </button>
            )}
            
            {isEditing && (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    if (!event) onClose();
                  }}
                  className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-background transition-quick"
                >
                  Cancel
                </button>
                
                {!event && currentStep < steps.length ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-quick"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-quick"
                  >
                    <Icon name="Save" size={16} />
                    <span>Save Event</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;