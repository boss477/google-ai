import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import { useNotify } from './NotificationSystem';

const EnhancedAnimationsShowcase = () => {
  const notify = useNotify();
  const [activeTab, setActiveTab] = useState('micro-interactions');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    newsletter: false,
    plan: 'basic'
  });

  // Simulate progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'micro-interactions', label: 'Micro-Interactions', icon: 'Zap' },
    { id: 'form-animations', label: 'Form Animations', icon: 'Edit3' },
    { id: 'loading-states', label: 'Loading States', icon: 'Loader' },
    { id: 'navigation', label: 'Navigation', icon: 'Navigation' },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    notify.success('Form submitted with beautiful animations!', {
      title: 'Success',
      duration: 3000
    });
  };

  const testNotifications = () => {
    notify.info('Enhanced dark mode with deeper backgrounds!', { 
      title: 'Dark Mode Enhanced',
      duration: 3000 
    });
    setTimeout(() => {
      notify.success('WCAG AAA contrast ratios achieved!', { 
        title: 'Accessibility',
        duration: 3000 
      });
    }, 500);
    setTimeout(() => {
      notify.warning('Vibrant status colors for better visibility!', { 
        title: 'Status Colors',
        duration: 3000 
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Enhanced Animations */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-heading font-bold text-text-primary mb-2 animate-fade-in-up">
              Enhanced Micro-Animations & Dark Mode
            </h1>
            <p className="text-text-secondary animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Sophisticated interactions with deeper contrast and WCAG AAA compliance
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Animated Hamburger Menu */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`icon-hamburger ${isMenuOpen ? 'active' : ''} p-2 hover-scale focus-enhanced`}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            <button 
              onClick={testNotifications}
              className="btn-primary hover-glow"
            >
              <Icon name="Bell" size={16} className="mr-2 icon-animated" />
              Test Notifications
            </button>
          </div>
        </motion.div>

        {/* Enhanced Tab Navigation */}
        <div className="flex space-x-1 bg-surface rounded-xl p-1 mb-8 shadow-elevation-2">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-item flex items-center space-x-2 px-6 py-3 rounded-lg transition-smooth ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-elevation-3 animate-scale-in'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Icon name={tab.icon} size={16} className="icon-animated" />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'micro-interactions' && (
            <motion.div
              key="micro-interactions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Enhanced Buttons */}
              <div className="card p-6 animate-fade-in-up">
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                  Enhanced Button Interactions
                </h3>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-primary hover-lift">
                    Primary with Shimmer
                  </button>
                  <button className="btn-secondary hover-scale">
                    Secondary Hover
                  </button>
                  <button className="btn-ghost hover-glow">
                    Ghost with Glow
                  </button>
                  <button className="btn-danger animate-heartbeat">
                    Danger Heartbeat
                  </button>
                </div>
              </div>

              {/* Interactive Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
                <div className="card-interactive p-6 hover-lift">
                  <Icon name="Zap" size={24} className="text-primary mb-3 icon-animated" />
                  <h4 className="font-heading font-semibold text-text-primary mb-2">
                    Hover Lift Effect
                  </h4>
                  <p className="text-text-secondary">
                    Smooth elevation changes on hover
                  </p>
                </div>
                
                <div className="card-glass p-6 hover-scale">
                  <Icon name="Sparkles" size={24} className="text-secondary mb-3 icon-animated" />
                  <h4 className="font-heading font-semibold text-text-primary mb-2">
                    Scale Animation
                  </h4>
                  <p className="text-text-secondary">
                    Gentle scaling with glassmorphism
                  </p>
                </div>
                
                <div className="card p-6 hover-glow">
                  <Icon name="Star" size={24} className="text-accent mb-3 icon-animated" />
                  <h4 className="font-heading font-semibold text-text-primary mb-2">
                    Glow Effect
                  </h4>
                  <p className="text-text-secondary">
                    Animated glow on hover
                  </p>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                  Animated Progress Indicators
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-text-secondary mb-2">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="progress-bar progress-animated">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'form-animations' && (
            <motion.div
              key="form-animations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Enhanced Form */}
              <div className="card p-8 animate-fade-in-up">
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-6">
                  Enhanced Form Interactions
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="input-floating">
                      <input
                        type="text"
                        id="name"
                        placeholder=" "
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="input-field focus-enhanced"
                      />
                      <label htmlFor="name">Full Name</label>
                    </div>
                    
                    <div className="input-floating">
                      <input
                        type="email"
                        id="email"
                        placeholder=" "
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="input-field focus-enhanced"
                      />
                      <label htmlFor="email">Email Address</label>
                    </div>
                  </div>

                  <div className="input-floating">
                    <textarea
                      id="message"
                      placeholder=" "
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="input-field focus-enhanced resize-none"
                    />
                    <label htmlFor="message">Message</label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={formData.newsletter}
                      onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
                      className="checkbox-custom"
                    />
                    <label htmlFor="newsletter" className="text-text-secondary cursor-pointer">
                      Subscribe to newsletter
                    </label>
                  </div>

                  <div className="space-y-3">
                    <label className="text-text-secondary font-medium">Plan Selection</label>
                    <div className="flex space-x-4">
                      {['basic', 'pro', 'enterprise'].map((plan) => (
                        <label key={plan} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="plan"
                            value={plan}
                            checked={formData.plan === plan}
                            onChange={(e) => setFormData({...formData, plan: e.target.value})}
                            className="radio-custom"
                          />
                          <span className="text-text-secondary capitalize">{plan}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full hover-lift">
                    <Icon name="Send" size={16} className="mr-2" />
                    Submit with Animation
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === 'loading-states' && (
            <motion.div
              key="loading-states"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Loading Animations */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                <div className="card p-6 text-center">
                  <h4 className="font-semibold text-text-primary mb-4">Spinner</h4>
                  <div className="loading-spinner w-8 h-8 mx-auto"></div>
                </div>
                
                <div className="card p-6 text-center">
                  <h4 className="font-semibold text-text-primary mb-4">Dots</h4>
                  <div className="loading-dots justify-center">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                
                <div className="card p-6 text-center">
                  <h4 className="font-semibold text-text-primary mb-4">Wave</h4>
                  <div className="loading-wave justify-center">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                
                <div className="card p-6 text-center">
                  <h4 className="font-semibold text-text-primary mb-4">Shimmer</h4>
                  <div className="loading-shimmer h-4 rounded"></div>
                </div>
                
                <div className="card p-6 text-center">
                  <h4 className="font-semibold text-text-primary mb-4">Skeleton</h4>
                  <div className="space-y-2">
                    <div className="loading-skeleton h-4 rounded"></div>
                    <div className="loading-skeleton h-4 w-3/4 rounded"></div>
                  </div>
                </div>
                
                <div className="card p-6 text-center">
                  <h4 className="font-semibold text-text-primary mb-4">Pulse</h4>
                  <div className="w-8 h-8 bg-primary rounded-full mx-auto animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedAnimationsShowcase;
