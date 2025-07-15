'use client';

import { perfumes } from '@/data/perfumes';
import PerfumeCard from '@/components/PerfumeCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

export default function UnisexPage() {
  const unisexPerfumes = perfumes.filter(perfume => perfume.category === 'unisex');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 text-black" />
            <h1 className="text-4xl font-bold text-black">Perfumes Unisex</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fragancias versátiles que rompen barreras. Perfectas para cualquier persona que busque una experiencia olfativa única.
          </p>
          <Badge className="mt-4 bg-black text-white">
            {unisexPerfumes.length} productos disponibles
          </Badge>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {unisexPerfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
        
        {unisexPerfumes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay perfumes unisex disponibles en este momento.</p>
          </div>
        )}
      </div>
      
      <Footer />    
    </div>
  );
}