import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const AddEventButton = ({ onClick }) => {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-elevation-3 hover:shadow-elevation-2 transition-all duration-300 z-50 flex items-center justify-center group"
    >
      <Icon name="Plus" size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-text-primary text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Add New Event
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary"></div>
      </div>
    </motion.button>
  );
};

export default AddEventButton;