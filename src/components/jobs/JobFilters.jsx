import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export function JobFilters({ filters, onFilterChange, onClearFilters }) {
  const handleInputChange = (field, value) => {
    onFilterChange(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field, checked) => {
    onFilterChange(prev => ({ ...prev, [field]: checked }));
  };

  return (
    <div className="bg-paper-50 rounded-xl2 p-6 shadow-soft border border-line">
      <h3 className="text-lg font-semibold text-ink-900 mb-6">Filters</h3>
      
      {/* Keyword Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-ink-700 mb-2">
          Keyword
        </label>
        <Input
          placeholder="Search by title, company, or skills..."
          value={filters.keyword || ''}
          onChange={(e) => handleInputChange('keyword', e.target.value)}
        />
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-ink-700 mb-2">
          Location
        </label>
        <Input
          placeholder="City or state..."
          value={filters.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
        />
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-ink-700 mb-2">
          Job Type
        </label>
        <Select
          value={filters.type || ''}
          onChange={(e) => handleInputChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </Select>
      </div>

      {/* Remote Only */}
      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.remote || false}
            onChange={(e) => handleCheckboxChange('remote', e.target.checked)}
            className="mr-2 rounded border-brand-900 text-brand-900 focus:ring-brand-900"
          />
          <span className="text-sm font-medium text-ink-700">Remote only</span>
        </label>
      </div>

      {/* Salary Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-ink-700 mb-2">
          Salary Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Select
            value={filters.salaryMin || ''}
            onChange={(e) => handleInputChange('salaryMin', e.target.value ? Number(e.target.value) : '')}
          >
            <option value="">Min Salary</option>
            <option value="50000">$50k</option>
            <option value="75000">$75k</option>
            <option value="100000">$100k</option>
            <option value="125000">$125k</option>
            <option value="150000">$150k</option>
          </Select>
          <Select
            value={filters.salaryMax || ''}
            onChange={(e) => handleInputChange('salaryMax', e.target.value ? Number(e.target.value) : '')}
          >
            <option value="">Max Salary</option>
            <option value="75000">$75k</option>
            <option value="100000">$100k</option>
            <option value="125000">$125k</option>
            <option value="150000">$150k</option>
            <option value="200000">$200k+</option>
          </Select>
        </div>
      </div>

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={onClearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}
