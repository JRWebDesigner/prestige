'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Eye, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PerfumeCardProps {
  perfume: Perfume;
  onAddToCombo?: (perfume: Perfume) => void;
}

export default function PerfumeCardKit({ perfume, onAddToCombo }: PerfumeCardProps) {
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
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {perfume.description}
          </p>
          
          {/* Size Selection */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Tamaño:</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {perfume.sizes.map((sizeOption) => (
                  <SelectItem key={sizeOption.size} value={sizeOption.size}>
                    {sizeOption.size} - Bs. {sizeOption.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-black">
                Bs. {currentSizeData.price}
              </span>
              {currentSizeData.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  Bs. {currentSizeData.originalPrice}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleBuyNow}
              disabled={!perfume.inStock}
              className="flex-1 bg-black text-white hover:bg-gray-800 transition-colors text-sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Comprar
            </Button>
            
            <Link href={`/perfume/${perfume.id}`}>
              <Button variant="outline" size="icon" className="border-gray-300 hover:border-black">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
            
            <Button
              onClick={handleAddToCart}
              disabled={!perfume.inStock}
              variant="outline"
              size="icon"
              className="border-gray-300 hover:border-black"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {onAddToCombo && (
            <Button
              onClick={() => onAddToCombo({ ...perfume, selectedSize, currentPrice: currentSizeData.price })}
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
