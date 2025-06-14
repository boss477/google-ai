import React from 'react';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import WorkerWellnessTab from './components/WorkerWellnessTab';
import { Link } from 'react-router-dom';

const WorkerWellnessPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <div className="pt-header px-nav lg:px-6">
      <Breadcrumb />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-heading font-bold text-text-primary">Worker Wellness</h1>
        <Link to="/health-monitoring-analytics" className="text-primary underline font-body text-sm">&larr; Back to Health Monitoring</Link>
      </div>
      <div className="p-nav lg:p-6">
        <WorkerWellnessTab />
      </div>
    </div>
  </div>
);

export default WorkerWellnessPage; 