// src/pages/data-management-reporting/components/ReportBuilder.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const ReportBuilder = ({ config, onChange, isMobile = false }) => {
  const [draggedComponent, setDraggedComponent] = useState(null);
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const availableComponents = [
    {
      id: 'metric-card',
      name: 'Metric Card',
      icon: 'BarChart3',
      description: 'Display key performance indicators'
    },
    {
      id: 'chart',
      name: 'Chart',
      icon: 'LineChart',
      description: 'Visualize data trends and patterns'
    },
    {
      id: 'table',
      name: 'Data Table',
      icon: 'Table',
      description: 'Structured data display'
    },
    {
      id: 'text',
      name: 'Text Block',
      icon: 'Type',
      description: 'Add descriptive text or notes'
    },
    {
      id: 'image',
      name: 'Image',
      icon: 'Image',
      description: 'Insert images or charts'
    },
    {
      id: 'divider',
      name: 'Divider',
      icon: 'Minus',
      description: 'Section separator'
    }
  ];

  const handleDragStart = (component) => {
    setDraggedComponent(component);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedComponent) {
      const newComponent = {
        id: `${draggedComponent.id}-${Date.now()}`,
        type: draggedComponent.id,
        name: draggedComponent.name,
        config: getDefaultConfig(draggedComponent.id)
      };
      
      onChange({
        ...config,
        components: [...config.components, newComponent]
      });
      
      setDraggedComponent(null);
    }
  };

  const getDefaultConfig = (type) => {
    switch (type) {
      case 'metric-card':
        return { title: 'New Metric', value: 0, unit: '' };
      case 'chart':
        return { chartType: 'line', dataSource: 'trends' };
      case 'table':
        return { columns: [], dataSource: 'general' };
      case 'text':
        return { content: 'Enter your text here...' };
      case 'image':
        return { src: '', alt: '', caption: '' };
      default:
        return {};
    }
  };

  const removeComponent = (componentId) => {
    onChange({
      ...config,
      components: config.components.filter(comp => comp.id !== componentId)
    });
  };

  const moveComponent = (fromIndex, toIndex) => {
    const components = [...config.components];
    const [moved] = components.splice(fromIndex, 1);
    components.splice(toIndex, 0, moved);
    
    onChange({
      ...config,
      components
    });
  };

  const updateReportTitle = (title) => {
    onChange({
      ...config,
      title
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-lg text-text-primary">
            Report Builder
          </h2>
          {isMobile && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-background rounded-lg transition-quick"
            >
              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`${isMobile && !isExpanded ? 'hidden' : 'block'}`}>
        {/* Report Title */}
        <div className="p-4 border-b border-border">
          <label className="block text-sm font-body font-medium text-text-primary mb-2">
            Report Title
          </label>
          <input
            type="text"
            value={config.title}
            onChange={(e) => updateReportTitle(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter report title"
          />
        </div>

        {/* Available Components */}
        <div className="p-4 border-b border-border">
          <h3 className="font-body font-medium text-text-primary mb-3">
            Available Components
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {availableComponents.map((component) => (
              <motion.div
                key={component.id}
                draggable
                onDragStart={() => handleDragStart(component)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-3 border border-border rounded-lg cursor-move hover:border-primary hover:bg-primary/5 transition-quick"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={component.icon} size={16} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body font-medium text-sm text-text-primary">
                      {component.name}
                    </div>
                    <div className="font-body text-xs text-text-secondary truncate">
                      {component.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Report Structure */}
        <div className="p-4">
          <h3 className="font-body font-medium text-text-primary mb-3">
            Report Structure
          </h3>
          
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`min-h-32 border-2 border-dashed rounded-lg p-4 transition-quick ${
              draggedComponent
                ? 'border-primary bg-primary/5' :'border-border bg-background/50'
            }`}
          >
            {config.components.length === 0 ? (
              <div className="text-center text-text-secondary">
                <Icon name="Plus" size={24} className="mx-auto mb-2 opacity-50" />
                <p className="font-body text-sm">
                  Drag components here to build your report
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {config.components.map((component, index) => (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                        <Icon 
                          name={availableComponents.find(c => c.id === component.type)?.icon || 'Square'} 
                          size={12} 
                          color="var(--color-primary)" 
                        />
                      </div>
                      <span className="font-body text-sm text-text-primary">
                        {component.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {index > 0 && (
                        <button
                          onClick={() => moveComponent(index, index - 1)}
                          className="p-1 hover:bg-background rounded transition-quick"
                        >
                          <Icon name="ChevronUp" size={14} />
                        </button>
                      )}
                      {index < config.components.length - 1 && (
                        <button
                          onClick={() => moveComponent(index, index + 1)}
                          className="p-1 hover:bg-background rounded transition-quick"
                        >
                          <Icon name="ChevronDown" size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => removeComponent(component.id)}
                        className="p-1 hover:bg-error/10 text-error rounded transition-quick"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Layout Options */}
        <div className="p-4 border-t border-border">
          <h3 className="font-body font-medium text-text-primary mb-3">
            Layout Options
          </h3>
          <div className="space-y-2">
            {['standard', 'compact', 'detailed'].map((layout) => (
              <label key={layout} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="layout"
                  value={layout}
                  checked={config.layout === layout}
                  onChange={(e) => onChange({ ...config, layout: e.target.value })}
                  className="text-primary focus:ring-primary"
                />
                <span className="font-body text-sm text-text-primary capitalize">
                  {layout}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;