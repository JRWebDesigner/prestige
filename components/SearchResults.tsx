'use client';

import { useState, useEffect } from 'react';
import { perfumes } from '@/data/perfumes';
import { Perfume } from '@/types/perfume';
import PerfumeCard from './PerfumeCard';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  searchQuery: string;
}

export default function SearchResults({ searchQuery }: SearchResultsProps) {
  const [searchResults, setSearchResults] = useState<Perfume[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = perfumes.filter(perfume =>
      perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perfume.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perfume.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perfume.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  }, [searchQuery]);

  if (searchQuery.trim() === '') {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-gray-600" />
          <h2 className="text-2xl font-bold text-black">
            Resultados de búsqueda para "{searchQuery}"
          </h2>
        </div>
        <p className="text-gray-600">
          {searchResults.length === 0 
            ? 'No se encontraron resultados' 
            : `${searchResults.length} ${searchResults.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}`
          }
        </p>
      </div>

      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No se encontraron perfumes</p>
          <p className="text-gray-400 mt-1">
            Intenta con otros términos de búsqueda
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      )}
    </div>
  );
}