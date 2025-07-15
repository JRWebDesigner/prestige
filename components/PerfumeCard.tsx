'use client';

import { Perfume } from '@/types/perfume';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PerfumeCardProps {
  perfume: Perfume;
  onAddToCombo?: (perfume: Perfume) => void;
}

export default function PerfumeCard({ perfume, onAddToCombo }: PerfumeCardProps) {
  const handleBuyNow = () => {
    const message = `Hola! Me interesa el perfume:
    
*${perfume.name}* - ${perfume.brand}
Precio: Bs. ${perfume.price}
Tamaño: ${perfume.size}

¿Está disponible?`;

    const whatsappUrl = `https://wa.me/59175850708?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
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
            <p className="text-sm text-gray-600">{perfume.brand}</p>
          </div>
          
          <div className="mb-3">
            <Badge variant="outline" className="text-xs">
              {perfume.category.charAt(0).toUpperCase() + perfume.category.slice(1)}
            </Badge>
            <span className="ml-2 text-sm text-gray-500">{perfume.size}</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {perfume.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-black">
                Bs. {perfume.price}
              </span>
              {perfume.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  Bs. {perfume.originalPrice}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleBuyNow}
              disabled={!perfume.inStock}
              className="flex-1 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Comprar Ahora
            </Button>
            
            <Link href={`/perfume/${perfume.id}`}>
              <Button variant="outline" size="icon" className="border-gray-300 hover:border-black">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          {onAddToCombo && (
            <Button
              onClick={() => onAddToCombo(perfume)}
              variant="outline"
              className="w-full mt-2 border-gray-300 hover:border-black"
              disabled={!perfume.inStock}
            >
              Agregar a Combo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
