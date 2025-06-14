import React from 'react';
import InteractiveChart from 'components/ui/InteractiveChart';

const AdditionalInsights = () => {
  // Sample datasets – replace with live data as available
  const productivityData = [
    { name: 'Mon', value: 75 },
    { name: 'Tue', value: 82 },
    { name: 'Wed', value: 78 },
    { name: 'Thu', value: 85 },
    { name: 'Fri', value: 80 },
    { name: 'Sat', value: 88 },
    { name: 'Sun', value: 90 },
  ];

  const soilMoistureData = [
    { name: 'Field 1', value: 65 },
    { name: 'Field 2', value: 72 },
    { name: 'Field 3', value: 68 },
    { name: 'Field 4', value: 75 },
    { name: 'Field 5', value: 70 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Worker Productivity Chart */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <InteractiveChart
          data={productivityData}
          title="Worker Productivity (%)"
          type="line"
          height={240}
        />
      </div>

      {/* Soil Moisture Chart */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <InteractiveChart
          data={soilMoistureData}
          title="Soil Moisture (%)"
          type="bar"
          height={240}
        />
      </div>
    </div>
  );
};

export default AdditionalInsights; 