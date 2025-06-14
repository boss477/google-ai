import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell 
} from 'recharts';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const WorkerWellnessTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [viewMode, setViewMode] = useState('charts');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparedDepartment, setComparedDepartment] = useState(null);

  // Simulate loading when changing views or departments
  useEffect(() => {
    if (selectedDepartment) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [selectedDepartment]);

  // Mock data for worker wellness metrics
  const wellnessTrendData = [
    { date: '2024-01-01', safetyScore: 92, healthIndex: 88, stressLevel: 15, productivity: 85 },
    { date: '2024-01-02', safetyScore: 94, healthIndex: 90, stressLevel: 12, productivity: 88 },
    { date: '2024-01-03', safetyScore: 89, healthIndex: 85, stressLevel: 20, productivity: 82 },
    { date: '2024-01-04', safetyScore: 96, healthIndex: 92, stressLevel: 10, productivity: 90 },
    { date: '2024-01-05', safetyScore: 91, healthIndex: 87, stressLevel: 18, productivity: 84 },
    { date: '2024-01-06', safetyScore: 93, healthIndex: 89, stressLevel: 14, productivity: 87 },
    { date: '2024-01-07', safetyScore: 95, healthIndex: 91, stressLevel: 11, productivity: 89 }
  ];

  const departmentWellnessData = [
    { department: 'Field Operations', score: 88, workers: 45, incidents: 2 },
    { department: 'Greenhouse', score: 92, workers: 28, incidents: 1 },
    { department: 'Equipment Maintenance', score: 85, workers: 15, incidents: 3 },
    { department: 'Quality Control', score: 94, workers: 12, incidents: 0 },
    { department: 'Logistics', score: 87, workers: 20, incidents: 1 }
  ];

  // Department trend data (last 6 months)
  const departmentTrendData = {
    'Field Operations': [
      { month: 'Aug', score: 82, change: -2 },
      { month: 'Sep', score: 84, change: +2 },
      { month: 'Oct', score: 83, change: -1 },
      { month: 'Nov', score: 85, change: +2 },
      { month: 'Dec', score: 87, change: +2 },
      { month: 'Jan', score: 88, change: +1 }
    ],
    'Greenhouse': [
      { month: 'Aug', score: 85, change: +1 },
      { month: 'Sep', score: 87, change: +2 },
      { month: 'Oct', score: 89, change: +2 },
      { month: 'Nov', score: 88, change: -1 },
      { month: 'Dec', score: 90, change: +2 },
      { month: 'Jan', score: 92, change: +2 }
    ],
    'Equipment Maintenance': [
      { month: 'Aug', score: 79, change: -3 },
      { month: 'Sep', score: 78, change: -1 },
      { month: 'Oct', score: 80, change: +2 },
      { month: 'Nov', score: 82, change: +2 },
      { month: 'Dec', score: 83, change: +1 },
      { month: 'Jan', score: 85, change: +2 }
    ],
    'Quality Control': [
      { month: 'Aug', score: 90, change: 0 },
      { month: 'Sep', score: 91, change: +1 },
      { month: 'Oct', score: 93, change: +2 },
      { month: 'Nov', score: 92, change: -1 },
      { month: 'Dec', score: 93, change: +1 },
      { month: 'Jan', score: 94, change: +1 }
    ],
    'Logistics': [
      { month: 'Aug', score: 81, change: -2 },
      { month: 'Sep', score: 83, change: +2 },
      { month: 'Oct', score: 85, change: +2 },
      { month: 'Nov', score: 84, change: -1 },
      { month: 'Dec', score: 86, change: +2 },
      { month: 'Jan', score: 87, change: +1 }
    ]
  };

  // Wellness recommendations based on department scores
  const wellnessRecommendations = {
    'Field Operations': [
      { id: 1, title: 'Ergonomic Training', description: 'Schedule monthly ergonomic training sessions to reduce physical strain', priority: 'high' },
      { id: 2, title: 'Rest Breaks', description: 'Implement structured 15-minute breaks every 2 hours for field workers', priority: 'medium' },
      { id: 3, title: 'Hydration Stations', description: 'Install additional hydration stations in remote field locations', priority: 'high' }
    ],
    'Greenhouse': [
      { id: 1, title: 'Air Quality Monitoring', description: 'Increase frequency of air quality checks in enclosed greenhouse spaces', priority: 'medium' },
      { id: 2, title: 'Rotation Schedule', description: 'Implement task rotation to reduce repetitive strain injuries', priority: 'high' },
      { id: 3, title: 'Temperature Management', description: 'Adjust greenhouse temperature during peak summer months', priority: 'medium' }
    ],
    'Equipment Maintenance': [
      { id: 1, title: 'Safety Equipment Review', description: 'Conduct quarterly review of all safety equipment and PPE', priority: 'high' },
      { id: 2, title: 'Noise Reduction', description: 'Implement noise reduction measures in high-decibel work areas', priority: 'high' },
      { id: 3, title: 'Lifting Assistance', description: 'Provide mechanical lifting assistance for components over 50 lbs', priority: 'medium' }
    ],
    'Quality Control': [
      { id: 1, title: 'Eye Strain Prevention', description: 'Installaudi anti-glare screens and proper lighting for inspection stations', priority: 'medium' },
      { id: 2, title: 'Posture Improvement', description: 'Provide ergonomic chairs and adjustable workstations', priority: 'medium' },
      { id: 3, title: 'Mental Breaks', description: 'Schedule short mental breaks to maintain focus during detailed inspections', priority: 'high' }
    ],
    'Logistics': [
      { id: 1, title: 'Back Support Training', description: 'Conduct monthly training on proper lifting techniques', priority: 'high' },
      { id: 2, title: 'Vehicle Ergonomics', description: 'Upgrade seating in delivery vehicles to reduce driver fatigue', priority: 'medium' },
      { id: 3, title: 'Loading Equipment', description: 'Ensure all loading docks have functioning mechanical assistance', priority: 'high' }
    ]
  };

  const healthMetricsData = [
    { metric: 'Physical Health', score: 89, color: '#059669' },
    { metric: 'Mental Wellness', score: 82, color: '#4A90A4' },
    { metric: 'Safety Compliance', score: 94, color: '#2D5A27' },
    { metric: 'Work-Life Balance', score: 76, color: '#F4A261' }
  ];

  const workerWellnessRecords = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      department: 'Field Operations',
      position: 'Senior Field Worker',
      healthScore: 92,
      lastCheckup: '2024-01-07',
      status: 'Excellent',
      riskFactors: 'None identified',
      nextAction: 'Routine wellness check',
      supervisor: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    // Additional records would be here
  ];

  const wellnessMetrics = [
    { id: 'safety-score', label: 'Safety Score', icon: 'Shield', color: '#059669', value: '93%', change: '+2%' },
    { id: 'health-index', label: 'Health Index', icon: 'Heart', color: '#DC2626', value: '89%', change: '+1%' },
    { id: 'stress-level', label: 'Stress Level', icon: 'Brain', color: '#D97706', value: '14%', change: '-3%' },
    { id: 'productivity', label: 'Productivity', icon: 'TrendingUp', color: '#4A90A4', value: '87%', change: '+4%' }
  ];

  // Calculate overall trend for a department
  const calculateTrend = (department) => {
    if (!department || !departmentTrendData[department]) return 0;
    
    const data = departmentTrendData[department];
    const firstScore = data[0].score;
    const lastScore = data[data.length - 1].score;
    return lastScore - firstScore;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'excellent':
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

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-info';
      default:
        return 'text-text-secondary';
    }
  };

  const handleDepartmentClick = (department) => {
    if (comparisonMode && selectedDepartment) {
      if (department === selectedDepartment) {
        setComparisonMode(false);
        setComparedDepartment(null);
      } else {
        setComparedDepartment(department);
      }
    } else {
      setSelectedDepartment(selectedDepartment === department ? null : department);
      setComparisonMode(false);
      setComparedDepartment(null);
    }
  };

  // Get health metrics data for the selected department
  const getHealthMetricsData = (department) => {
    const deptData = departmentWellnessData.find(d => d.department === department);
    if (!deptData) return healthMetricsData;
    
    const baseScore = deptData.score;
    return [
      { metric: 'Physical Health', score: baseScore - 3, color: '#059669' },
      { metric: 'Mental Wellness', score: baseScore - 8, color: '#4A90A4' },
      { metric: 'Safety Compliance', score: baseScore + 2, color: '#2D5A27' },
      { metric: 'Work-Life Balance', score: baseScore - 12, color: '#F4A261' }
    ];
  };

  // Custom tooltip for the department six-month trend
  const TrendTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { score, change } = payload[0].payload;
      const isPositive = change >= 0;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-surface border border-border rounded-lg p-3 shadow-elevation-1"
        >
          <p className="font-heading font-medium text-text-primary mb-1">{label}</p>
          <div className="flex items-center space-x-1 text-sm font-body">
            <span className="text-text-secondary">Score:</span>
            <span className="font-semibold text-text-primary">{score}%</span>
          </div>
          <div className="flex items-center space-x-1 text-sm font-body mt-1">
            <Icon name={isPositive ? 'ArrowUpRight' : 'ArrowDownLeft'} size={14} color={isPositive ? '#059669' : '#DC2626'} />
            <span className={isPositive ? 'text-success' : 'text-error'}>
              {isPositive ? '+' : ''}{change}%
            </span>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  // Custom dot to visualize improvement / decline per month
  const renderTrendDot = (props) => {
    const { cx, cy, payload } = props;
    const isPositive = payload.change >= 0;
    return (
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={5}
          strokeWidth={2}
          stroke="var(--color-surface)"
          fill={isPositive ? '#059669' : '#DC2626'}
        />
        {payload.change !== 0 && (
          <text
            x={cx}
            y={cy - 10}
            textAnchor="middle"
            fill={isPositive ? '#059669' : '#DC2626'}
            fontSize={10}
            fontWeight="bold"
          >
            {isPositive ? '↑' : '↓'}
          </text>
        )}
      </motion.g>
    );
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-surface/80 backdrop-blur-sm rounded-container z-10">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Quick Stats section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {wellnessMetrics.map((metric) => (
          <motion.div
            key={metric.id}
            whileHover={{ scale: 1.02 }}
            className="bg-surface border border-border rounded-container p-4 transition-quick hover:shadow-elevation-1"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-interactive flex items-center justify-center" style={{ backgroundColor: `${metric.color}20` }}>
                <Icon name={metric.icon} size={20} color={metric.color} />
              </div>
              <span className={`text-xs font-body font-medium px-2 py-1 rounded-interactive ${
                metric.change.startsWith('+') ? 'status-success' : 'status-error'
              }`}>
                {metric.change}
              </span>
            </div>
            <h3 className="font-heading font-semibold text-text-primary text-sm mb-1">{metric.label}</h3>
            <p className="text-2xl font-heading font-bold text-text-primary">{metric.value}</p>
            <p className="text-xs text-text-secondary mt-1">from last week</p>
          </motion.div>
        ))}
      </div>

      {/* Period Selection and View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">Wellness Analytics</h2>
          <div className="flex items-center space-x-2">
            {['week', 'month', 'quarter'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-interactive text-sm font-body font-medium transition-quick ${
                  selectedPeriod === period
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-background'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
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
          {/* Wellness Trend Chart */}
          <div className="bg-surface border border-border rounded-container p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Wellness Trends (7 Days)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wellnessTrendData}>
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
                  <Area 
                    type="monotone" 
                    dataKey="safetyScore" 
                    stackId="1"
                    stroke="#059669" 
                    fill="#059669"
                    fillOpacity={0.3}
                    name="Safety Score"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="healthIndex" 
                    stackId="2"
                    stroke="#4A90A4" 
                    fill="#4A90A4"
                    fillOpacity={0.3}
                    name="Health Index"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Health Metrics Radial Chart */}
          <div className="bg-surface border border-border rounded-container p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Health Metrics Overview</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={healthMetricsData}>
                  <RadialBar
                    dataKey="score"
                    cornerRadius={10}
                    fill={(entry) => entry.color}
                  />
                  <Tooltip />
                  <Legend />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Wellness Comparison - Interactive Bar Chart */}
          <div className="lg:col-span-2 bg-surface border border-border rounded-container p-6">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Department Wellness Comparison</h3>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentWellnessData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="department" stroke="var(--color-text-secondary)" fontSize={12} />
                  <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--color-surface)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  {/* Bar – Wellness Score */}
                  <Bar
                    dataKey="score"
                    name="Wellness Score"
                    cursor="pointer"
                    radius={[4, 4, 0, 0]}
                    onClick={(data) => handleDepartmentClick(data.department)}
                    onMouseEnter={(_, index) => setHoveredBarIndex(index)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                  >
                    {departmentWellnessData.map((entry, index) => (
                      <Cell
                        key={`score-cell-${index}`}
                        fill={
                          hoveredBarIndex === index
                            ? 'var(--color-primary-light, #4ade80)'
                            : 'var(--color-primary)'
                        }
                      />
                    ))}
                  </Bar>

                  {/* Bar – Workers */}
                  <Bar
                    dataKey="workers"
                    name="Total Workers"
                    cursor="pointer"
                    radius={[4, 4, 0, 0]}
                    onClick={(data) => handleDepartmentClick(data.department)}
                    onMouseEnter={(_, index) => setHoveredBarIndex(index)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                  >
                    {departmentWellnessData.map((entry, index) => (
                      <Cell
                        key={`worker-cell-${index}`}
                        fill={
                          hoveredBarIndex === index
                            ? 'var(--color-secondary-light, #60a5fa)'
                            : 'var(--color-secondary)'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              {/* Tooltip to indicate interactivity */}
              {!selectedDepartment && (
                <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm text-text-secondary text-xs px-2 py-1 rounded-lg">
                  Click on a bar to see detailed trends
                </div>
              )}
            </div>
          </div>
          
          {/* NEW: Department Trend Analysis Section */}
          <AnimatePresence>
            {selectedDepartment && (
              <motion.div 
                key={`trend-${selectedDepartment}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-2 bg-surface border border-border rounded-container p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    {selectedDepartment} - 6 Month Trend Analysis
                  </h3>
                  <button 
                    onClick={() => setSelectedDepartment(null)}
                    className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-background transition-quick"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Trend Line Chart */}
                  <div className="lg:col-span-2">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={departmentTrendData[selectedDepartment]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                          <XAxis dataKey="month" stroke="var(--color-text-secondary)" fontSize={12} />
                          <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
                          <Tooltip 
                            content={<TrendTooltip />}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            name="Wellness Score"
                            dot={renderTrendDot}
                            isAnimationActive={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Trend Summary */}
                  <div className="lg:col-span-1">
                    <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">Trend Summary</h4>
                    <div className="bg-background border border-border rounded-container p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-interactive flex items-center justify-center" style={{ backgroundColor: '#05966920' }}>
                          <Icon name="TrendingUp" size={20} color="#059669" />
                        </div>
                        <div>
                          <h5 className="font-heading font-semibold text-text-primary text-sm">Overall Trend</h5>
                          <p className="text-2xl font-heading font-bold text-text-primary">
                            {calculateTrend(selectedDepartment) > 0 ? '+' : ''}{calculateTrend(selectedDepartment)}%
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            {calculateTrend(selectedDepartment) > 0 ? 'Improvement' : 'Decline'} over 6 months
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-interactive flex items-center justify-center" style={{ backgroundColor: '#4A90A420' }}>
                          <Icon name="Calendar" size={20} color="#4A90A4" />
                        </div>
                        <div>
                          <h5 className="font-heading font-semibold text-text-primary text-sm">Current Score</h5>
                          <p className="text-2xl font-heading font-bold text-text-primary">
                            {departmentWellnessData.find(d => d.department === selectedDepartment)?.score || 0}%
                          </p>
                          <p className="text-xs text-text-secondary mt-1">As of latest data</p>
                        </div>
                      </div>
                    </div>

                    {/* Radial metrics visualization */}
                    <div className="mt-6">
                      <ResponsiveContainer width="100%" height={180}>
                        <RadialBarChart
                          innerRadius="40%"
                          outerRadius="90%"
                          data={getHealthMetricsData(selectedDepartment)}
                          cx="50%"
                          cy="50%"
                          startAngle={90}
                          endAngle={-270}
                        >
                          <RadialBar
                            minAngle={15}
                            label={{ position: 'insideStart', fill: 'var(--color-text-primary)', fontSize: 10 }}
                            background
                            clockWise
                            dataKey="score"
                          >
                            {getHealthMetricsData(selectedDepartment).map((entry, index) => (
                              <Cell key={`radial-cell-${index}`} fill={entry.color} />
                            ))}
                          </RadialBar>
                          <Tooltip content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const { metric, score } = payload[0].payload;
                              return (
                                <div className="bg-surface border border-border rounded-lg p-2 text-sm">
                                  <p className="font-medium text-text-primary">{metric}</p>
                                  <p className="text-text-secondary">{score}%</p>
                                </div>
                              );
                            }
                            return null;
                          }} />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-surface border border-border rounded-container overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 sm:mb-0">
                Worker Wellness Records
              </h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search workers..."
                    className="pl-10 pr-4 py-2 border border-border rounded-interactive text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <button className="btn-primary">
                  <Icon name="Plus" size={16} />
                  <span className="font-body font-medium text-sm">Add Assessment</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Worker</th>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Department</th>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Health Score</th>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Status</th>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Risk Factors</th>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Next Action</th>
                  <th className="text-left py-3 px-6 font-body font-medium text-sm text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workerWellnessRecords.map((record) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-border hover:bg-background transition-quick"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={record.avatar}
                            alt={record.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-body font-medium text-text-primary">{record.name}</p>
                          <p className="font-body text-sm text-text-secondary">{record.position}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-body text-sm text-text-primary">{record.department}</p>
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
                      <p className="font-body text-sm text-text-primary">{record.riskFactors}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-body text-sm text-text-primary">{record.nextAction}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-text-secondary hover:text-primary transition-quick rounded-interactive hover:bg-background">
                          <Icon name="Eye" size={16} />
                        </button>
                        <button className="p-2 text-text-secondary hover:text-primary transition-quick rounded-interactive hover:bg-background">
                          <Icon name="Edit" size={16} />
                        </button>
                        <button className="p-2 text-text-secondary hover:text-primary transition-quick rounded-interactive hover:bg-background">
                          <Icon name="Calendar" size={16} />
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

export default WorkerWellnessTab;




