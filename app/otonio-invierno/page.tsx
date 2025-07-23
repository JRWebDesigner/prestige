'use client';
import { useState, useEffect } from 'react';
import { getPerfumes } from '@/lib/sanity';
import PerfumeCard from '@/components/PerfumeCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

export default function OtInPage() {
  const [otInPerfumes, setOtinPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPerfumes = async () => {
      try {
        const allPerfumes = await getPerfumes();
        setOtinPerfumes(allPerfumes.filter(perfume => perfume.autumn || perfume.winter));
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
            <p className="text-gray-500">Cargando perfumes...</p>
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
            <h1 className="text-4xl font-bold text-black">Otono e Invierno</h1>
          </div>
          <Badge className="mt-4 bg-black text-white">
            {otInPerfumes.length} productos disponibles
          </Badge>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {otInPerfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
        
        {otInPerfumes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay perfumes disponibles en este momento.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
