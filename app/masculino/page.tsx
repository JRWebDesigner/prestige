'use client';

import { useState, useEffect } from 'react';
import { getPerfumes } from '@/lib/sanity';
import { Perfume } from '@/types/perfume';
import PerfumeCard from '@/components/PerfumeCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

export default function MasculinoPage() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPerfumes = async () => {
      try {
        const allPerfumes = await getPerfumes();
        setPerfumes(allPerfumes.filter(perfume => perfume.category === 'masculino'));
      } catch (error) {
        console.error('Error loading perfumes:', error);
        setError('Error al cargar los perfumes');
      } finally {
        setLoading(false);
      }
    };

    loadPerfumes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Cargando perfumes masculinos...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

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
            {perfumes.length} productos disponibles
          </Badge>
        </div>

        {/* Products Grid */}
        {perfumes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay perfumes masculinos disponibles en este momento.</p>
            <p className="text-gray-400 text-sm mt-1">
              Agrega perfumes desde el <a href="/admin" className="text-black hover:underline">panel de administración</a>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {perfumes.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
