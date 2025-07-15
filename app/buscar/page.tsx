'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { perfumes } from '@/data/perfumes';
import { Perfume } from '@/types/perfume';
import PerfumeCard from '@/components/PerfumeCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults: Perfume[] = query.trim() === '' ? [] : perfumes.filter(perfume =>
    perfume.name.toLowerCase().includes(query.toLowerCase()) ||
    perfume.brand.toLowerCase().includes(query.toLowerCase()) ||
    perfume.category.toLowerCase().includes(query.toLowerCase()) ||
    perfume.description.toLowerCase().includes(query.toLowerCase()) ||
    perfume.notes.top.some(note => note.toLowerCase().includes(query.toLowerCase())) ||
    perfume.notes.heart.some(note => note.toLowerCase().includes(query.toLowerCase())) ||
    perfume.notes.base.some(note => note.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-gray-600" />
          <h1 className="text-3xl font-bold text-black">
            Resultados de búsqueda
          </h1>
        </div>
        {query && (
          <p className="text-gray-600">
            Búsqueda para: "<span className="font-semibold">{query}</span>" - {' '}
            {searchResults.length === 0 
              ? 'No se encontraron resultados' 
              : `${searchResults.length} ${searchResults.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}`
            }
          </p>
        )}
      </div>

      {!query.trim() ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">Ingresa un término de búsqueda</p>
          <p className="text-gray-400 mt-1">
            Busca por nombre, marca, categoría o notas del perfume
          </p>
        </div>
      ) : searchResults.length === 0 ? (
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

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500">Cargando resultados...</p>
          </div>
        </div>
      }>
        <SearchResultsContent />
      </Suspense>
      <Footer />
    </div>
  );
}