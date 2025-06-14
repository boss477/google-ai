import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from 'components/ui/Header';
import DarkModeToggle from 'components/ui/DarkModeToggle';
import InteractiveChart from 'components/ui/InteractiveChart';
import { NotificationProvider, useNotify } from 'components/ui/NotificationSystem';
import { 
  SkeletonLoader, 
  Spinner, 
  DotsLoader, 
  PulseLoader, 
  WaveLoader, 
  ProgressBar,
  CardSkeleton,
  TableSkeleton 
} from 'components/ui/LoadingComponents';
import Icon from 'components/AppIcon';

const ShowcaseSection = ({ title, children, className = '' }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${className}`}
  >
    <h2 className="text-2xl font-heading font-bold text-text-primary mb-6 text-gradient">
      {title}
    </h2>
    {children}
  </motion.section>
);

const ButtonShowcase = ({ notify }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <button className="btn-primary">Primary Button</button>
    <button className="btn-secondary">Secondary Button</button>
    <button className="btn-ghost">Ghost Button</button>
    <button className="btn-danger">Danger Button</button>
    
    <button className="btn-primary hover-lift">Hover Lift</button>
    <button className="btn-secondary hover-grow">Hover Grow</button>
    <button className="btn-ghost hover-tilt">Hover Tilt</button>
    <button className="btn-primary hover-glow">Hover Glow</button>
    
    <button 
      className="interactive-strong bg-gradient-primary text-white px-4 py-2 rounded-lg"
      onClick={() => notify.success('Button clicked!', { title: 'Success' })}
    >
      Interactive Strong
    </button>
    <button 
      className="interactive-subtle px-4 py-2 rounded-lg border border-border"
      onClick={() => notify.info('Subtle interaction', { title: 'Info' })}
    >
      Interactive Subtle
    </button>
    <button 
      className="interactive px-4 py-2 rounded-lg bg-accent text-white"
      onClick={() => notify.warning('Standard interaction', { title: 'Warning' })}
    >
      Interactive
    </button>
    <button 
      className="px-4 py-2 rounded-lg bg-error text-white animate-heartbeat"
      onClick={() => notify.error('Error occurred!', { title: 'Error' })}
    >
      Animated Button
    </button>
  </div>
);

const CardShowcase = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="card p-6">
      <h3 className="font-heading font-semibold mb-2">Standard Card</h3>
      <p className="text-text-secondary">A basic card with hover effects.</p>
    </div>
    
    <div className="card-interactive p-6">
      <h3 className="font-heading font-semibold mb-2">Interactive Card</h3>
      <p className="text-text-secondary">Click me for enhanced interactions!</p>
    </div>
    
    <div className="card-glass p-6">
      <h3 className="font-heading font-semibold mb-2">Glass Card</h3>
      <p className="text-text-secondary">Beautiful glassmorphism effect.</p>
    </div>
    
    <div className="card p-6 bg-gradient-primary text-white">
      <h3 className="font-heading font-semibold mb-2">Gradient Card</h3>
      <p className="text-white/80">With gradient background.</p>
    </div>
    
    <div className="card p-6 animate-float">
      <h3 className="font-heading font-semibold mb-2">Floating Card</h3>
      <p className="text-text-secondary">Gentle floating animation.</p>
    </div>
    
    <div className="card p-6 hover-glow">
      <h3 className="font-heading font-semibold mb-2">Glow Card</h3>
      <p className="text-text-secondary">Hover for glow effect.</p>
    </div>
  </div>
);

const LoadingShowcase = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <div className="text-center space-y-4">
      <h4 className="font-medium">Spinner</h4>
      <Spinner />
    </div>
    
    <div className="text-center space-y-4">
      <h4 className="font-medium">Dots Loader</h4>
      <DotsLoader />
    </div>
    
    <div className="text-center space-y-4">
      <h4 className="font-medium">Pulse Loader</h4>
      <PulseLoader />
    </div>
    
    <div className="text-center space-y-4">
      <h4 className="font-medium">Wave Loader</h4>
      <WaveLoader />
    </div>
    
    <div className="space-y-2">
      <h4 className="font-medium">Progress Bars</h4>
      <ProgressBar progress={75} showPercentage />
      <ProgressBar progress={45} color="progress-fill-success" />
      <ProgressBar progress={30} color="progress-fill-warning" />
      <ProgressBar progress={90} color="progress-fill-error" />
    </div>
    
    <div className="space-y-2">
      <h4 className="font-medium">Skeleton Loaders</h4>
      <SkeletonLoader />
      <SkeletonLoader width="w-3/4" />
      <SkeletonLoader width="w-1/2" />
    </div>
  </div>
);

const StatusShowcase = () => (
  <div className="space-y-4">
    <div className="flex flex-wrap gap-4">
      <span className="status-success">Success Status</span>
      <span className="status-warning">Warning Status</span>
      <span className="status-error">Error Status</span>
      <span className="status-info">Info Status</span>
    </div>
    
    <div className="space-y-2">
      <div className="notification-success p-4 rounded-lg">
        <h4 className="font-medium">Success Notification</h4>
        <p className="text-sm opacity-80">Operation completed successfully!</p>
      </div>
      
      <div className="notification-warning p-4 rounded-lg">
        <h4 className="font-medium">Warning Notification</h4>
        <p className="text-sm opacity-80">Please review your settings.</p>
      </div>
    </div>
  </div>
);

const ChartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const UIShowcaseContent = () => {
  const notify = useNotify();
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-heading font-bold text-gradient mb-4">
              Enhanced UI Showcase
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Explore the new interactive components, animations, and dark mode features
            </p>
            <div className="flex justify-center items-center space-x-4 mt-6">
              <span className="text-sm text-text-secondary">Dark Mode:</span>
              <DarkModeToggle />
            </div>
          </motion.div>

          {/* Buttons */}
          <ShowcaseSection title="Interactive Buttons">
            <ButtonShowcase notify={notify} />
          </ShowcaseSection>

          {/* Cards */}
          <ShowcaseSection title="Enhanced Cards">
            <CardShowcase />
          </ShowcaseSection>

          {/* Charts */}
          <ShowcaseSection title="Interactive Charts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <InteractiveChart 
                data={ChartData} 
                type="line" 
                title="Line Chart Example"
                animated={true}
              />
              <InteractiveChart 
                data={ChartData} 
                type="bar" 
                title="Bar Chart Example"
                animated={true}
              />
            </div>
          </ShowcaseSection>

          {/* Loading States */}
          <ShowcaseSection title="Loading Components">
            <LoadingShowcase />
          </ShowcaseSection>

          {/* Status Indicators */}
          <ShowcaseSection title="Status & Notifications">
            <StatusShowcase />
          </ShowcaseSection>

          {/* Skeleton Examples */}
          <ShowcaseSection title="Skeleton Loaders">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CardSkeleton />
              <TableSkeleton rows={3} columns={3} />
            </div>
          </ShowcaseSection>
        </div>
      </main>
    </div>
  );
};

const UIShowcase = () => (
  <NotificationProvider>
    <UIShowcaseContent />
  </NotificationProvider>
);

export default UIShowcase;
