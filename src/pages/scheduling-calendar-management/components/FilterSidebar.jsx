import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const FilterSidebar = ({ activeFilters, onFiltersChange, categoryConfig, onClose }) => {
  const teamMembers = [
    { id: 1, name: "Dr. Sarah Johnson", role: "Health Specialist" },
    { id: 2, name: "Tom Wilson", role: "Farm Manager" },
    { id: 3, name: "Maria Lopez", role: "Nurse" },
    { id: 4, name: "John Smith", role: "Maintenance Lead" },
    { id: 5, name: "Emily Chen", role: "Agronomist" }
  ];

  const locations = [
    { id: 1, name: "Field A - North Section" },
    { id: 2, name: "Field B - South Section" },
    { id: 3, name: "Medical Station" },
    { id: 4, name: "Equipment Shed" },
    { id: 5, name: "Training Center" },
    { id: 6, name: "Pump Station 1" }
  ];

  const handleCategoryToggle = (category) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter(c => c !== category)
      : [...activeFilters.categories, category];
    
    onFiltersChange({
      ...activeFilters,
      categories: newCategories
    });
  };

  const handleMemberToggle = (memberId) => {
    const newMembers = activeFilters.members.includes(memberId)
      ? activeFilters.members.filter(m => m !== memberId)
      : [...activeFilters.members, memberId];
    
    onFiltersChange({
      ...activeFilters,
      members: newMembers
    });
  };

  const handleLocationToggle = (locationId) => {
    const newLocations = activeFilters.locations.includes(locationId)
      ? activeFilters.locations.filter(l => l !== locationId)
      : [...activeFilters.locations, locationId];
    
    onFiltersChange({
      ...activeFilters,
      locations: newLocations
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      members: [],
      locations: []
    });
  };

  const hasActiveFilters = activeFilters.categories.length > 0 || 
                          activeFilters.members.length > 0 || 
                          activeFilters.locations.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-border rounded-lg shadow-elevation-1 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-text-primary">Filters</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-text-secondary hover:text-primary transition-quick"
            >
              Clear All
            </button>
          )}
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-background rounded transition-quick"
          >
            <Icon name="X" size={16} className="text-text-secondary" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Event Categories */}
        <div>
          <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="Tag" size={16} />
            <span>Event Categories</span>
          </h4>
          
          <div className="space-y-2">
            {Object.entries(categoryConfig).map(([key, config]) => (
              <label key={key} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={activeFilters.categories.includes(key)}
                  onChange={() => handleCategoryToggle(key)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
                <span className="text-sm text-text-primary group-hover:text-primary transition-quick">
                  {config.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="Users" size={16} />
            <span>Team Members</span>
          </h4>
          
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {teamMembers.map(member => (
              <label key={member.id} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={activeFilters.members.includes(member.id)}
                  onChange={() => handleMemberToggle(member.id)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-text-primary group-hover:text-primary transition-quick truncate">
                    {member.name}
                  </div>
                  <div className="text-xs text-text-secondary truncate">
                    {member.role}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <h4 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="MapPin" size={16} />
            <span>Locations</span>
          </h4>
          
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {locations.map(location => (
              <label key={location.id} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={activeFilters.locations.includes(location.id)}
                  onChange={() => handleLocationToggle(location.id)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-primary group-hover:text-primary transition-quick">
                  {location.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border">
          <h4 className="font-medium text-text-primary mb-3">Quick Actions</h4>
          
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-2 p-2 text-left text-sm text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-quick">
              <Icon name="Download" size={16} />
              <span>Export Calendar</span>
            </button>
            
            <button className="w-full flex items-center space-x-2 p-2 text-left text-sm text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-quick">
              <Icon name="Share" size={16} />
              <span>Share Calendar</span>
            </button>
            
            <button className="w-full flex items-center space-x-2 p-2 text-left text-sm text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-quick">
              <Icon name="Settings" size={16} />
              <span>Calendar Settings</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSidebar;