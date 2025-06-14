import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const routeMap = {
    '/dashboard-overview': 'Dashboard Overview',
    '/health-monitoring-analytics': 'Health Monitoring & Analytics',
    '/scheduling-calendar-management': 'Scheduling & Calendar Management',
    '/data-management-reporting': 'Data Management & Reporting',
    '/user-profile-settings': 'User Profile & Settings'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/dashboard-overview' }];
    
    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeMap[currentPath] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-body py-3" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center space-x-2">
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
          )}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-text-primary font-medium truncate max-w-xs sm:max-w-none">
              {crumb.label}
            </span>
          ) : (
            <Link
              to={crumb.path}
              className="text-text-secondary hover:text-primary transition-quick truncate max-w-xs sm:max-w-none"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;