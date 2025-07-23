'use client'

import { useState, useEffect, useMemo } from 'react';
import { getPerfumes } from '@/lib/sanity';
import { Perfume } from '@/types/perfume';
import PerfumeCard from '@/components/PerfumeCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Filter } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AllPerfumes() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPerfumes = async () => {
      setLoading(true);
      setError(null);
      try {
        const allPerfumes = await getPerfumes();
        setPerfumes(allPerfumes);
      } catch (error) {
        console.error('Error loading perfumes:', error);
        setError('Error al cargar los perfumes. Intenta recargar la página.');
      } finally {
        setLoading(false);
      }
    };

    loadPerfumes();
  }, []);

  const filteredPerfumes = useMemo(() => {
    let filtered = perfumes;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(perfume => perfume.category === selectedCategory);
    }

    if (priceRange !== 'all') {
      filtered = filtered.filter(perfume => {
        const minPrice = Math.min(...perfume.sizes.map(s => s.price));
        switch (priceRange) {
          case 'low':
            return minPrice < 300;
          case 'medium':
            return minPrice >= 300 && minPrice < 500;
          case 'high':
            return minPrice >= 500;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [selectedCategory, priceRange, perfumes]);

  // Manejar estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <Skeleton className="h-10 w-64" />
              
              <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-48" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="border rounded-lg p-4">
                  <Skeleton className="h-48 w-full rounded-md mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-5 w-1/2 mb-3" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Manejar estado de error
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-red-500 mb-4">
              <p className="text-lg font-semibold">Error al cargar los perfumes</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md"
            >
              Recargar página
            </button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-4 md:mb-0">
              {perfumes.length > 0 
                ? `Todos los Productos (${perfumes.length})`
                : 'Todos los Productos'}
            </h2>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Filtrar por:</span>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black"
              >
                <option value="all">Todas las categorías</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="unisex">Unisex</option>
              </select>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black"
              >
                <option value="all">Todos los precios</option>
                <option value="low">Hasta Bs. 300</option>
                <option value="medium">Bs. 300 - 500</option>
                <option value="high">Más de Bs. 500</option>
              </select>
            </div>
          </div>
          
          {perfumes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No hay perfumes disponibles</p>
              <p className="text-gray-400 text-sm mt-1">
                Agrega perfumes desde el panel de administración
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPerfumes.map((perfume) => (
                  <PerfumeCard key={perfume._id} perfume={perfume} />
                ))}
              </div>
              
              {filteredPerfumes.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No se encontraron perfumes con los filtros seleccionados.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceRange('all');
                    }}
                    className="mt-4 px-4 py-2 border border-black text-black hover:bg-black hover:text-white rounded-md"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
