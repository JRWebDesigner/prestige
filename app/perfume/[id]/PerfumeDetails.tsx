'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, Share2, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Define el tipo de perfume (ajusta según tu estructura real)
type Perfume = {
  id: string;
  name: string;
  brand: string;
  price: number;
  size: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
  inStock: boolean;
  originalPrice?: number;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
};

export default function PerfumeDetails({ 
  perfume,
  relatedPerfumes = [] 
}: { 
  perfume?: Perfume;
  relatedPerfumes?: Perfume[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!perfume) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Perfume no encontrado</h1>
          <Link href="/">
            <Button className="bg-black text-white hover:bg-gray-800">
              Volver al catálogo
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBuyNow = () => {
    const message = `Hola! Me interesa el perfume:
    
*${perfume.name}* - ${perfume.brand}
Precio: Bs. ${perfume.price}
Tamaño: ${perfume.size}
Categoría: ${perfume.category}

Descripción: ${perfume.description}

¿Está disponible para compra inmediata?`;

    const whatsappUrl = `https://wa.me/59170000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-black">Inicio</Link></li>
            <li>/</li>
            <li><Link href="/" className="hover:text-black">Perfumes</Link></li>
            <li>/</li>
            <li className="text-black">{perfume.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ... (resto del código JSX igual que tenías) ... */}
        </div>

        {/* Related Products */}
        {relatedPerfumes.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-black mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPerfumes.map((relatedPerfume) => (
                <Card key={relatedPerfume.id} className="group hover:shadow-lg transition-shadow">
                  {/* ... (contenido de la tarjeta) ... */}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
