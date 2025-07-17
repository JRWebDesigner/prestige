'use client';
import { useState } from 'react';
import { Perfume } from '@/types/perfume';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PerfumeCardProps {
  perfume: Perfume;
  onAddToCombo?: (perfume: Perfume) => void;
}

export default function PerfumeCard({ perfume, onAddToCombo }: PerfumeCardProps) {
   const [selectedSize, setSelectedSize] = useState(perfume.sizes[0].size);
  const { addToCart } = useCart();

  const currentSizeData = perfume.sizes.find(s => s.size === selectedSize) || perfume.sizes[0];

  const handleBuyNow = () => {
    const message = `Hola! Me interesa el perfume:
    
*${perfume.name}* - ${perfume.brand}
Precio: Bs. ${currentSizeData.price}
Tamaño: ${selectedSize}

¿Está disponible?`;

    const whatsappUrl = `https://wa.me/59175850708?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(perfume, selectedSize);
  };

  return (
    <Link href={`/perfume/${perfume.id}`}>
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-gray-300">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={perfume.image}
            alt={perfume.name}
            width={400}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {perfume.featured && (
            <Badge className="absolute top-3 left-3 bg-black text-white">
              Destacado
            </Badge>
          )}
          {!perfume.inStock && (
            <Badge variant="destructive" className="absolute top-3 right-3">
              Agotado
            </Badge>
          )}
        </div>
        <div className="p-6">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors">
              {perfume.name}
            </h3>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg text-black">
                Bs. {perfume.sizes.size[0]}
              </span>
              {perfume.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  Bs. {perfume.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
