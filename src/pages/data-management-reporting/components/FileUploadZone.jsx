// src/pages/data-management-reporting/components/FileUploadZone.jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const FileUploadZone = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const fileInputRef = useRef(null);

  const supportedFormats = [
    { type: 'csv', label: 'CSV Files', icon: 'FileSpreadsheet', description: 'Comma-separated values' },
    { type: 'xlsx', label: 'Excel Files', icon: 'FileSpreadsheet', description: 'Microsoft Excel spreadsheet' },
    { type: 'json', label: 'JSON Files', icon: 'Code', description: 'JavaScript Object Notation' },
    { type: 'xml', label: 'XML Files', icon: 'FileText', description: 'Extensible Markup Language' }
  ];

  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/json', 'text/xml', 'application/xml'];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const validateFile = (file) => {
    const errors = [];
    
    // Check file size
    if (file.size > maxFileSize) {
      errors.push(`File "${file.name}" exceeds the maximum size limit of 10MB`);
    }
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      errors.push(`File "${file.name}" has an unsupported format`);
    }
    
    return errors;
  };

  const handleFiles = (files) => {
    const allErrors = [];
    const validFiles = [];
    
    files.forEach(file => {
      const fileErrors = validateFile(file);
      if (fileErrors.length > 0) {
        allErrors.push(...fileErrors);
      } else {
        validFiles.push(file);
      }
    });
    
    setValidationErrors(allErrors);
    
    if (validFiles.length > 0) {
      uploadFiles(validFiles);
    }
  };

  const uploadFiles = (files) => {
    files.forEach(file => {
      const fileId = `${file.name}-${Date.now()}`;
      
      // Add file to uploaded files list
      setUploadedFiles(prev => [...prev, {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        uploadedAt: new Date().toISOString()
      }]);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Update file status to completed
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === fileId 
                ? { ...f, status: 'completed' }
                : f
            )
          );
          
          // Remove from progress tracking
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileId];
            return newProgress;
          });
        } else {
          setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
        }
      }, 200);
    });
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.includes('csv')) return 'FileSpreadsheet';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'FileSpreadsheet';
    if (type.includes('json')) return 'Code';
    if (type.includes('xml')) return 'FileText';
    return 'File';
  };

  const clearValidationErrors = () => {
    setValidationErrors([]);
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              File Upload & Import
            </h2>
            <p className="text-text-secondary font-body text-sm">
              Import external data to integrate with agricultural health reports
            </p>
          </div>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-primary/90 transition-quick"
          >
            <Icon name="Upload" size={16} />
            <span>Browse Files</span>
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="p-4">
        {/* Drag and Drop Area */}
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
            isDragOver
              ? 'border-primary bg-primary/5' :'border-border bg-background/50 hover:border-primary/50 hover:bg-primary/2'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".csv,.xlsx,.json,.xml"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <motion.div
            animate={{ scale: isDragOver ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Icon 
              name="Upload" 
              size={48} 
              className={`mx-auto mb-4 ${isDragOver ? 'text-primary' : 'text-text-secondary opacity-50'}`} 
            />
            <h3 className="font-heading font-medium text-lg text-text-primary mb-2">
              {isDragOver ? 'Drop files here' : 'Drag and drop files here'}
            </h3>
            <p className="text-text-secondary font-body mb-4">
              or <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-primary hover:text-primary/80 font-medium"
              >
                browse to choose files
              </button>
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
              <span>Max file size: 10MB</span>
              <span>•</span>
              <span>Supported: CSV, Excel, JSON, XML</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Supported Formats */}
        <div className="mt-6">
          <h3 className="font-body font-medium text-text-primary mb-3">
            Supported File Formats
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {supportedFormats.map((format) => (
              <div
                key={format.type}
                className="flex items-center space-x-3 p-3 bg-background border border-border rounded-lg"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={format.icon} size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-body font-medium text-sm text-text-primary">
                    {format.label}
                  </div>
                  <div className="font-body text-xs text-text-secondary truncate">
                    {format.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
                <div>
                  <h4 className="font-body font-medium text-error mb-2">
                    Upload Errors
                  </h4>
                  <ul className="space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index} className="font-body text-sm text-error">
                        • {error}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={clearValidationErrors}
                className="p-1 hover:bg-error/10 rounded transition-quick"
              >
                <Icon name="X" size={16} color="var(--color-error)" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="font-body font-medium text-text-primary mb-3">
              Uploaded Files ({uploadedFiles.length})
            </h3>
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-background border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={getFileIcon(file.type)} size={16} color="var(--color-primary)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-body font-medium text-sm text-text-primary truncate">
                        {file.name}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-text-secondary">
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Progress Bar */}
                    {file.status === 'uploading' && uploadProgress[file.id] !== undefined && (
                      <div className="w-24">
                        <div className="w-full bg-border rounded-full h-2">
                          <motion.div
                            className="bg-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress[file.id]}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <div className="text-xs text-text-secondary text-center mt-1">
                          {Math.round(uploadProgress[file.id])}%
                        </div>
                      </div>
                    )}

                    {/* Status */}
                    {file.status === 'completed' && (
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="CheckCircle" size={16} />
                        <span className="text-xs font-body">Complete</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-1">
                      {file.status === 'completed' && (
                        <button
                          className="p-1 hover:bg-primary/10 text-primary rounded transition-quick"
                          title="Process file"
                        >
                          <Icon name="Play" size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 hover:bg-error/10 text-error rounded transition-quick"
                        title="Remove file"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadZone;