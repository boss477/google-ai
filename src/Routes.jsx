// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import DashboardOverview from "pages/dashboard-overview";
import SchedulingCalendarManagement from "pages/scheduling-calendar-management";
import HealthMonitoringAnalytics from "pages/health-monitoring-analytics";
import DataManagementReporting from "pages/data-management-reporting";
import NotFound from "pages/NotFound";
import WorkerWellnessPage from 'pages/health-monitoring-analytics/worker-wellness';
import UIShowcase from 'pages/ui-showcase';
import DarkModeShowcase from 'components/ui/DarkModeShowcase';
import EnhancedAnimationsShowcase from 'components/ui/EnhancedAnimationsShowcase';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/dashboard-overview" element={<DashboardOverview />} />
          <Route path="/scheduling-calendar-management" element={<SchedulingCalendarManagement />} />
          <Route path="/health-monitoring-analytics" element={<HealthMonitoringAnalytics />} />
          <Route path="/health-monitoring-analytics/worker-wellness" element={<WorkerWellnessPage />} />
          <Route path="/data-management-reporting" element={<DataManagementReporting />} />
          <Route path="/ui-showcase" element={<UIShowcase />} />
          <Route path="/dark-mode-showcase" element={<DarkModeShowcase />} />
          <Route path="/enhanced-animations" element={<EnhancedAnimationsShowcase />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;