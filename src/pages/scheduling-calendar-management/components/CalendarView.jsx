import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const CalendarView = ({ 
  currentView, 
  selectedDate, 
  onDateSelect, 
  events, 
  onEventClick, 
  categoryConfig 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentMonth);

    return (
      <div className="p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-background rounded-lg transition-quick"
          >
            <Icon name="ChevronLeft" size={20} className="text-text-secondary" />
          </button>
          
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-background rounded-lg transition-quick"
          >
            <Icon name="ChevronRight" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-text-secondary">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`min-h-24 p-1 border border-border rounded-lg cursor-pointer transition-quick ${
                  date ? 'hover:bg-background' : ''
                } ${
                  isSelected(date) ? 'bg-primary/10 border-primary' : ''
                } ${
                  isToday(date) ? 'bg-accent/10' : ''
                }`}
                onClick={() => date && onDateSelect(date)}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday(date) ? 'text-accent font-semibold' : 'text-text-primary'
                    }`}>
                      {date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <motion.div
                          key={event.id}
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(event);
                          }}
                          className={`text-xs p-1 rounded text-white truncate cursor-pointer ${
                            categoryConfig[event.category]?.color || 'bg-gray-500'
                          }`}
                        >
                          {event.title}
                        </motion.div>
                      ))}
                      
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-text-secondary">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(selectedDate.getDate() - 7);
              onDateSelect(newDate);
            }}
            className="p-2 hover:bg-background rounded-lg transition-quick"
          >
            <Icon name="ChevronLeft" size={20} className="text-text-secondary" />
          </button>
          
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Week of {weekDays[0].toLocaleDateString()}
          </h2>
          
          <button
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(selectedDate.getDate() + 7);
              onDateSelect(newDate);
            }}
            className="p-2 hover:bg-background rounded-lg transition-quick"
          >
            <Icon name="ChevronRight" size={20} className="text-text-secondary" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map(date => {
            const dayEvents = getEventsForDate(date);
            
            return (
              <div key={date.toISOString()} className="border border-border rounded-lg p-3">
                <div className={`text-center mb-3 ${
                  isToday(date) ? 'text-accent font-semibold' : 'text-text-primary'
                }`}>
                  <div className="text-sm font-medium">{dayNames[date.getDay()]}</div>
                  <div className="text-lg">{date.getDate()}</div>
                </div>
                
                <div className="space-y-2">
                  {dayEvents.map(event => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => onEventClick(event)}
                      className={`text-xs p-2 rounded text-white cursor-pointer ${
                        categoryConfig[event.category]?.color || 'bg-gray-500'
                      }`}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="opacity-80">
                        {new Date(event.startTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(selectedDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(selectedDate.getDate() - 1);
              onDateSelect(newDate);
            }}
            className="p-2 hover:bg-background rounded-lg transition-quick"
          >
            <Icon name="ChevronLeft" size={20} className="text-text-secondary" />
          </button>
          
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
          
          <button
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(selectedDate.getDate() + 1);
              onDateSelect(newDate);
            }}
            className="p-2 hover:bg-background rounded-lg transition-quick"
          >
            <Icon name="ChevronRight" size={20} className="text-text-secondary" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {hours.map(hour => (
            <div key={hour} className="flex border-b border-border">
              <div className="w-16 p-2 text-sm text-text-secondary">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="flex-1 p-2 min-h-12">
                {dayEvents
                  .filter(event => new Date(event.startTime).getHours() === hour)
                  .map(event => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => onEventClick(event)}
                      className={`p-2 rounded text-white cursor-pointer mb-1 ${
                        categoryConfig[event.category]?.color || 'bg-gray-500'
                      }`}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm opacity-80">
                        {new Date(event.startTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })} - {new Date(event.endTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentView === 'month' && renderMonthView()}
        {currentView === 'week' && renderWeekView()}
        {currentView === 'day' && renderDayView()}
      </motion.div>
    </AnimatePresence>
  );
};

export default CalendarView;