"use client"
import { useState, useMemo } from 'react';
import { perfumes } from '@/data/perfumes';
import PerfumeCard from '@/components/PerfumeCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Filter } from 'lucide-react';

export default function Allperfumes(){
const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  const filteredPerfumes = useMemo(() => {
    let filtered = perfumes;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(perfume => perfume.category === selectedCategory);
    }

    if (priceRange !== 'all') {
      filtered = filtered.filter(perfume => {
        switch (priceRange) {
          case 'low':
            return perfume.price < 300;
          case 'medium':
            return perfume.price >= 300 && perfume.price < 500;
          case 'high':
            return perfume.price >= 500;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [selectedCategory, priceRange]);

  const featuredPerfumes = perfumes.filter(perfume => perfume.featured);

    return(
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-4 md:mb-0">Todos los Productos</h2>
            
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPerfumes.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
          {filteredPerfumes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron perfumes con los filtros seleccionados.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
     </div>
    )
}
