import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CropHealthTab = () => {
  const [selectedMetric, setSelectedMetric] = useState('health-index');
  const [viewMode, setViewMode] = useState('charts');

  // Mock data for crop health metrics
  const healthTrendData = [
    { date: '2024-01-01', healthIndex: 85, pestActivity: 12, diseaseRisk: 8, soilMoisture: 65 },
    { date: '2024-01-02', healthIndex: 87, pestActivity: 10, diseaseRisk: 6, soilMoisture: 68 },
    { date: '2024-01-03', healthIndex: 82, pestActivity: 15, diseaseRisk: 12, soilMoisture: 62 },
    { date: '2024-01-04', healthIndex: 89, pestActivity: 8, diseaseRisk: 5, soilMoisture: 70 },
    { date: '2024-01-05', healthIndex: 91, pestActivity: 6, diseaseRisk: 4, soilMoisture: 72 },
    { date: '2024-01-06', healthIndex: 88, pestActivity: 9, diseaseRisk: 7, soilMoisture: 69 },
    { date: '2024-01-07', healthIndex: 93, pestActivity: 5, diseaseRisk: 3, soilMoisture: 75 }
  ];

  const cropDistributionData = [
    { name: 'Healthy', value: 65, color: '#059669' },
    { name: 'At Risk', value: 25, color: '#D97706' },
    { name: 'Critical', value: 10, color: '#DC2626' }
  ];

  const fieldComparisonData = [
    { field: 'Field A-12', healthScore: 92, yield: 85, pestCount: 3 },
    { field: 'Field B-8', healthScore: 88, yield: 82, pestCount: 5 },
    { field: 'Field C-15', healthScore: 76, yield: 70, pestCount: 12 },
    { field: 'Field D-3', healthScore: 94, yield: 90, pestCount: 2 },
    { field: 'Field E-7', healthScore: 81, yield: 75, pestCount: 8 }
  ];

  const cropHealthRecords = [
    {
      id: 1,
      field: 'Field A-12',
      crop: 'Wheat',
      healthScore: 92,
      lastAssessment: '2024-01-07',
      status: 'Healthy',
      issues: 'None detected',
      nextAction: 'Routine monitoring',
      assessor: 'Dr. Sarah Chen',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'
    },
    {
      id: 2,
      field: 'Field B-8',
      crop: 'Corn',
      healthScore: 88,
      lastAssessment: '2024-01-07',
      status: 'Good',
      issues: 'Minor nutrient deficiency',
      nextAction: 'Fertilizer application',
      assessor: 'Dr. Michael Rodriguez',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400'
    },
    {
      id: 3,
      field: 'Field C-15',
      crop: 'Soybeans',
      healthScore: 76,
      lastAssessment: '2024-01-06',
      status: 'At Risk',
      issues: 'Pest infestation detected',
      nextAction: 'Pest control treatment',
      assessor: 'Dr. Emily Johnson',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'
    },
    {
      id: 4,
      field: 'Field D-3',
      crop: 'Rice',
      healthScore: 94,
      lastAssessment: '2024-01-07',
      status: 'Excellent',
      issues: 'None detected',
      nextAction: 'Continue current practices',
      assessor: 'Dr. James Wilson',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
    },
    {
      id: 5,
      field: 'Field E-7',
      crop: 'Tomatoes',
      healthScore: 81,
      lastAssessment: '2024-01-06',
      status: 'Good',
      issues: 'Slight water stress',
      nextAction: 'Irrigation adjustment',
      assessor: 'Dr. Lisa Anderson',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400'
    }
  ];

  const metrics = [
    { id: 'health-index', label: 'Health Index', icon: 'Activity', color: '#059669' },
    { id: 'pest-activity', label: 'Pest Activity', icon: 'Bug', color: '#DC2626' },
    { id: 'disease-risk', label: 'Disease Risk', icon: 'AlertTriangle', color: '#D97706' },
    { id: 'soil-moisture', label: 'Soil Moisture', icon: 'Droplets', color: '#4A90A4' }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'excellent': case'healthy':
        return 'status-success';
      case 'good':
        return 'status-info';
      case 'at risk':
        return 'status-warning';
      case 'critical':
        return 'status-error';
      default:
        return 'text-text-secondary bg-background';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <motion.div
            key={metric.id}
            whileHover={{ scale: 1.02 }}
            className="bg-surface border border-border rounded-container p-4 cursor-pointer transition-quick hover:shadow-elevation-1"
            onClick={() => setSelectedMetric(metric.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-interactive flex items-center justify-center" style={{ backgroundColor: `${metric.color}20` }}>
                <Icon name={metric.icon} size={20} color={metric.color} />
              </div>
              <div className={`w-3 h-3 rounded-full ${selectedMetric === metric.id ? 'bg-primary' : 'bg-border'}`}></div>
            </div>
            <h3 className="font-heading font-semibold text-text-primary text-sm mb-1">{metric.label}</h3>
            <p className="text-2xl font-heading font-bold text-text-primary">
              {metric.id === 'health-index' && '87%'}
              {metric.id === 'pest-activity' && '8'}
              {metric.id === 'disease-risk' && '6%'}
              {metric.id === 'soil-moisture' && '69%'}
            </p>
            <p className="text-xs text-text-secondary mt-1">
              {metric.id === 'health-index' && '+2% from yesterday'}
              {metric.id === 'pest-activity' && '-3 from yesterday'}
              {metric.id === 'disease-risk' && '-1% from yesterday'}
              {metric.id === 'soil-moisture' && '+4% from yesterday'}
            </p>
          </motion.div>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-text-primary">Health Analytics</h2>
        <div className="flex items-center space-x-2 bg-background border border-border rounded-interactive p-1">
          <button
            onClick={() => setViewMode('charts')}
            className={`px-3 py-1 rounded-interactive text-sm font-body font-medium transition-quick ${
              viewMode === 'charts' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Charts
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 rounded-interactive text-sm font-body font-medium transition-quick ${
              viewMode === 'table' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Charts View */}
      {viewMode === 'charts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Health Trend Chart */}
          <div className="bg-surface border border-border rounded-container p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Health Trends (7 Days)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="var(--color-text-secondary)"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--color-surface)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="healthIndex" 
                    stroke="#059669" 
                    strokeWidth={2}
                    name="Health Index"
                    dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pestActivity" 
                    stroke="#DC2626" 
                    strokeWidth={2}
                    name="Pest Activity"
                    dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Crop Health Distribution */}
          <div className="bg-surface border border-border rounded-container p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Crop Health Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {cropDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Field Comparison */}
          <div className="lg:col-span-2 bg-surface border border-border rounded-container p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Field Performance Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fieldComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="field" stroke="var(--color-text-secondary)" fontSize={12} />
                  <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--color-surface)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="healthScore" fill="#059669" name="Health Score" />
                  <Bar dataKey="yield" fill="#4A90A4" name="Expected Yield %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-surface border border-border rounded-container overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 sm:mb-0">
                Crop Health Records
              </h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search records..."
                    className="pl-10 pr-4 py-2 border border-border rounded-interactive text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <button className="btn-primary">
                  <Icon name="Plus" size={16} />
                  <span className="font-body font-medium text-sm">Add Record</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Field & Crop</th>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Health Score</th>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Status</th>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Issues</th>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Next Action</th>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Assessor</th>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cropHealthRecords.map((record) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-border hover:bg-background transition-quick"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-interactive overflow-hidden">
                          <Image
                            src={record.image}
                            alt={record.crop}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-body font-medium text-text-primary">{record.field}</p>
                          <p className="font-body text-sm text-text-secondary">{record.crop}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-heading font-semibold text-text-primary">{record.healthScore}</span>
                        <div className="w-16 h-2 bg-background rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-success rounded-full transition-all duration-500"
                            style={{ width: `${record.healthScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-interactive text-xs font-body font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-body text-sm text-text-primary">{record.issues}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-body text-sm text-text-primary">{record.nextAction}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-body text-sm text-text-primary">{record.assessor}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-text-secondary hover:text-primary transition-quick rounded-interactive hover:bg-background">
                          <Icon name="Eye" size={16} />
                        </button>
                        <button className="p-2 text-text-secondary hover:text-primary transition-quick rounded-interactive hover:bg-background">
                          <Icon name="Edit" size={16} />
                        </button>
                        <button className="p-2 text-text-secondary hover:text-error transition-quick rounded-interactive hover:bg-background">
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropHealthTab;