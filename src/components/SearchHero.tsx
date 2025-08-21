'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function SearchHero() {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would navigate to search results
    console.log('Search data:', searchData);
    alert(`Searching for properties in ${searchData.location} from ${searchData.checkIn} to ${searchData.checkOut}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-16">
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Where
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Search destinations"
                value={searchData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
                Check-in
              </label>
              <input
                id="checkIn"
                name="checkIn"
                type="date"
                value={searchData.checkIn}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
                Check-out
              </label>
              <input
                id="checkOut"
                name="checkOut"
                type="date"
                value={searchData.checkOut}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                required
              />
            </div>
            <div className="flex-shrink-0">
              <Button 
                type="submit" 
                size="lg" 
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}