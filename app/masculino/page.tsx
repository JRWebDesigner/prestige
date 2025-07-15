'use client';

import { perfumes } from '@/data/perfumes';
import PerfumeCard from '@/components/PerfumeCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

export default function MasculinoPage() {
  const masculinePerfumes = perfumes.filter(perfume => perfume.category === 'masculino');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="w-8 h-8 text-black" />
            <h1 className="text-4xl font-bold text-black">Perfumes Masculinos</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección exclusiva de fragancias masculinas. Desde frescas y deportivas hasta intensas y sofisticadas.
          </p>
          <Badge className="mt-4 bg-black text-white">
            {masculinePerfumes.length} productos disponibles
          </Badge>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {masculinePerfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
        
        {masculinePerfumes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay perfumes masculinos disponibles en este momento.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}