import React, { useState, useCallback } from 'react';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react';


const FormField = ({ name,    type = 'text', required=false,   label,    placeholder,    options = [],    rows = 3,    disabled = false,    className = '',  
     field,   value,   error,   touched,   onChange,  onBlur,   showPassword,   togglePassword }) => {

  const baseInputClasses = `w-full px-10 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
    error && touched 
      ? 'border-red-400 bg-red-50/50 focus:border-red-400' 
      : 'border-gray-200 bg-white hover:border-gray-300 focus:border-blue-400'
  } ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-50' : ''} ${className}`;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            name={name}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={baseInputClasses}
          >
            <option value="">{placeholder || `Select ${label}`}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            name={name}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={`${baseInputClasses} resize-y`}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name={name}
              checked={!!value}
              onChange={(e) => onChange({ target: { name, value: e.target.checked } })}
              onBlur={onBlur}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
              {label}
            </span>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  onBlur={onBlur}
                  disabled={disabled}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        );

      case 'password':
        return (
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name={name}
              value={value || ''}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              className={`${baseInputClasses} pr-12`}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        );

      default:
        return (
          <input
            type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={baseInputClasses}
          />
        );
    }
  };

  if (type === 'checkbox') {
    return (
      <div className="space-y-2">
        {renderInput()}
        {error && touched && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && type !== 'checkbox' && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && touched && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};


export default FormField;
