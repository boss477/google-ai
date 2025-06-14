// src/pages/data-management-reporting/components/DataTable.jsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const DataTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditingCell, setIsEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Sample data structure
  const tableData = [
    {
      id: 1,
      date: '2024-01-15',
      location: 'Field A - North Sector',
      category: 'Worker Safety',
      metric: 'Safety Score',
      value: 94,
      unit: '%',
      status: 'compliant',
      inspector: 'John Smith',
      notes: 'All safety protocols followed'
    },
    {
      id: 2,
      date: '2024-01-15',
      location: 'Field B - South Sector',
      category: 'Crop Health',
      metric: 'Disease Index',
      value: 2.3,
      unit: 'scale',
      status: 'warning',
      inspector: 'Sarah Johnson',
      notes: 'Minor fungal presence detected'
    },
    {
      id: 3,
      date: '2024-01-14',
      location: 'Greenhouse 1',
      category: 'Environmental',
      metric: 'Humidity Level',
      value: 68,
      unit: '%',
      status: 'compliant',
      inspector: 'Mike Wilson',
      notes: 'Optimal conditions maintained'
    },
    {
      id: 4,
      date: '2024-01-14',
      location: 'Field C - East Sector',
      category: 'Worker Safety',
      metric: 'PPE Compliance',
      value: 87,
      unit: '%',
      status: 'warning',
      inspector: 'Emily Davis',
      notes: 'Missing safety equipment for 2 workers'
    },
    {
      id: 5,
      date: '2024-01-13',
      location: 'Field D - West Sector',
      category: 'Crop Health',
      metric: 'Growth Rate',
      value: 15.2,
      unit: 'cm/week',
      status: 'compliant',
      inspector: 'Tom Anderson',
      notes: 'Above average growth observed'
    },
    {
      id: 6,
      date: '2024-01-13',
      location: 'Processing Area',
      category: 'Equipment',
      metric: 'Maintenance Score',
      value: 76,
      unit: '%',
      status: 'non-compliant',
      inspector: 'Lisa Rodriguez',
      notes: 'Requires immediate maintenance'
    },
    {
      id: 7,
      date: '2024-01-12',
      location: 'Storage Facility',
      category: 'Environmental',
      metric: 'Temperature',
      value: 18.5,
      unit: '°C',
      status: 'compliant',
      inspector: 'David Kim',
      notes: 'Optimal storage conditions'
    },
    {
      id: 8,
      date: '2024-01-12',
      location: 'Field A - North Sector',
      category: 'Worker Safety',
      metric: 'Incident Rate',
      value: 0.2,
      unit: 'per day',
      status: 'compliant',
      inspector: 'John Smith',
      notes: 'Minor injury reported and treated'
    }
  ];

  const columns = [
    { key: 'date', label: 'Date', sortable: true, width: '110px' },
    { key: 'location', label: 'Location', sortable: true, width: '160px' },
    { key: 'category', label: 'Category', sortable: true, width: '130px' },
    { key: 'metric', label: 'Metric', sortable: true, width: '140px' },
    { key: 'value', label: 'Value', sortable: true, width: '80px', editable: true },
    { key: 'unit', label: 'Unit', sortable: false, width: '60px' },
    { key: 'status', label: 'Status', sortable: true, width: '100px' },
    { key: 'inspector', label: 'Inspector', sortable: true, width: '120px' },
    { key: 'notes', label: 'Notes', sortable: false, width: '200px', editable: true }
  ];

  // Filtering and searching
  const filteredData = useMemo(() => {
    return tableData.filter(row => {
      const searchString = searchTerm.toLowerCase();
      return Object.values(row).some(value => 
        value?.toString().toLowerCase().includes(searchString)
      );
    });
  }, [searchTerm]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleRowSelect = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(row => row.id)));
    }
  };

  const handleCellEdit = (rowId, columnKey, value) => {
    setIsEditingCell({ rowId, columnKey });
    setEditValue(value);
  };

  const handleCellSave = () => {
    // In a real application, this would update the data source
    console.log('Saving cell value:', {
      rowId: isEditingCell.rowId,
      column: isEditingCell.columnKey,
      value: editValue
    });
    setIsEditingCell(null);
    setEditValue('');
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action ${action} on rows:`, Array.from(selectedRows));
    // Implement bulk actions
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'non-compliant':
        return 'bg-error/10 text-error';
      default:
        return 'bg-background text-text-secondary';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              Data Table
            </h2>
            <p className="text-text-secondary font-body text-sm">
              Comprehensive data view with sorting, filtering, and bulk operations
            </p>
          </div>
          
          {/* Search and Controls */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
              <input
                type="text"
                placeholder="Search data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent w-64"
              />
            </div>
            
            {selectedRows.size > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary font-body">
                  {selectedRows.size} selected
                </span>
                <button
                  onClick={() => handleBulkAction('export')}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-quick"
                >
                  <Icon name="Download" size={12} />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-error text-white text-sm rounded-lg hover:bg-error/90 transition-quick"
                >
                  <Icon name="Trash2" size={12} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  className="text-primary focus:ring-primary"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left font-body font-medium text-text-primary text-sm ${column.sortable ? 'cursor-pointer hover:bg-border' : ''}`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <Icon 
                          name="ChevronUp" 
                          size={12} 
                          className={`${sortConfig.key === column.key && sortConfig.direction === 'asc' ? 'text-primary' : 'text-text-secondary'}`}
                        />
                        <Icon 
                          name="ChevronDown" 
                          size={12} 
                          className={`${sortConfig.key === column.key && sortConfig.direction === 'desc' ? 'text-primary' : 'text-text-secondary'} -mt-1`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIndex * 0.02 }}
                className={`border-t border-border hover:bg-background/50 ${selectedRows.has(row.id) ? 'bg-primary/5' : ''}`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                    className="text-primary focus:ring-primary"
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 font-body text-sm">
                    {column.key === 'status' ? (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row[column.key])}`}>
                        {row[column.key].replace('-', ' ')}
                      </span>
                    ) : column.editable && isEditingCell?.rowId === row.id && isEditingCell?.columnKey === column.key ? (
                      <div className="flex items-center space-x-1">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleCellSave}
                          onKeyPress={(e) => e.key === 'Enter' && handleCellSave()}
                          className="flex-1 px-2 py-1 border border-border rounded text-xs focus:ring-1 focus:ring-primary focus:border-transparent"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div 
                        className={`${column.editable ? 'cursor-pointer hover:bg-background p-1 rounded' : ''} ${column.key === 'value' ? 'font-data font-medium text-text-primary' : 'text-text-secondary'}`}
                        onClick={() => column.editable && handleCellEdit(row.id, column.key, row[column.key])}
                      >
                        {column.key === 'notes' && row[column.key]?.length > 30 
                          ? `${row[column.key].substring(0, 30)}...` 
                          : row[column.key]
                        }
                        {column.editable && (
                          <Icon name="Edit3" size={12} className="inline ml-1 opacity-0 group-hover:opacity-100" />
                        )}
                      </div>
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary font-body">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 border border-border rounded text-sm focus:ring-1 focus:ring-primary focus:border-transparent"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-text-secondary font-body">per page</span>
              </div>
              
              <div className="text-sm text-text-secondary font-body">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-border rounded-lg hover:bg-background transition-quick disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-quick ${
                        currentPage === page
                          ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-background'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-border rounded-lg hover:bg-background transition-quick disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;