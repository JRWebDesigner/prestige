'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { perfumes } from '@/data/perfumes';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, Share2, Star, Check, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export default function PerfumePage() {
  const params = useParams();
  const perfume = perfumes.find(p => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    if (perfume && !selectedSize && perfume.sizes.length > 0) {
      setSelectedSize(perfume.sizes[0].size);
    }
  }, [perfume, selectedSize]);

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

  const currentSizeData = perfume.sizes.find(s => s.size === selectedSize) || perfume.sizes[0];

  const handleBuyNow = () => {
    const message = `Hola! Me interesa el perfume:
    
*${perfume.name}* - ${perfume.brand}
Precio: Bs. ${currentSizeData.price}
Tamaño: ${selectedSize}
Categoría: ${perfume.category}

Descripción: ${perfume.description}

¿Está disponible para compra inmediata?`;

    const whatsappUrl = `https://wa.me/59175850708?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(perfume, selectedSize);
  };

  const relatedPerfumes = perfumes.filter(p => 
    p.id !== perfume.id && 
    (p.category === perfume.category || p.brand === perfume.brand)
  ).slice(0, 3);

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
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={perfume.image}
                alt={perfume.name}
                fill
                className="object-cover"
              />
              {perfume.featured && (
                <Badge className="absolute top-4 left-4 bg-black text-white">
                  Destacado
                </Badge>
              )}
              {!perfume.inStock && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  Agotado
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">{perfume.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{perfume.brand}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-sm">
                  {perfume.category.charAt(0).toUpperCase() + perfume.category.slice(1)}
                </Badge>
                {/* Eliminado: perfume.size no existe */}
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-black">
                  Bs. {currentSizeData.price}
                </span>
                {currentSizeData.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    Bs. {currentSizeData.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-3 block">Selecciona el tamaño:</label>
              <div className="grid grid-cols-2 gap-3">
                {perfume.sizes.map((sizeOption) => (
                  <button
                    key={sizeOption.size}
                    onClick={() => setSelectedSize(sizeOption.size)}
                    className={`p-3 border rounded-lg text-left transition-all ${
                      selectedSize === sizeOption.size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold">{sizeOption.size}</div>
                    <div className="text-sm">
                      Bs. {sizeOption.price}
                      {sizeOption.originalPrice && (
                        <span className={`ml-2 line-through ${
                          selectedSize === sizeOption.size ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Bs. {sizeOption.originalPrice}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {perfume.description}
            </p>

            
            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white hover:bg-gray-800"
                disabled={!perfume.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Añadir al carrito
              </Button>
              <Button 
                onClick={handleBuyNow}
                className="flex-1 border border-black text-black hover:bg-gray-100"
                variant="outline"
                disabled={!perfume.inStock}
              >
                Comprar ahora
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedPerfumes.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-black mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPerfumes.map((relatedPerfume) => {
                // Precio del primer tamaño disponible
                const minPrice = relatedPerfume.sizes[0]?.price || 0;
                
                return (
                  <Card key={relatedPerfume.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={relatedPerfume.image}
                          alt={relatedPerfume.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {!relatedPerfume.inStock && (
                          <Badge variant="destructive" className="absolute top-2 right-2">
                            Agotado
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-black mb-1">{relatedPerfume.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{relatedPerfume.brand}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-black">
                            Bs. {minPrice}
                          </span>
                          <Link href={`/perfume/${relatedPerfume.id}`}>
                            <Button size="sm" variant="outline" className="border-gray-300 hover:border-black">
                              Ver más
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
