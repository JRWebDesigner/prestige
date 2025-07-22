'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getPerfumes } from '@/lib/sanity';
import { Perfume } from '@/types/perfume';
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
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [relatedPerfumes, setRelatedPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadPerfume = async () => {
      try {
        const allPerfumes = await getPerfumes();
        const foundPerfume = allPerfumes.find(p => p.id === params.id);
        
        if (foundPerfume) {
          setPerfume(foundPerfume);
          
          // Find related perfumes
          const related = allPerfumes.filter(p => 
            p.id !== foundPerfume.id && 
            (p.category === foundPerfume.category || p.brand === foundPerfume.brand)
          ).slice(0, 3);
          setRelatedPerfumes(related);
        } else {
          setError('Perfume no encontrado');
        }
      } catch (error) {
        console.error('Error loading perfume:', error);
        setError('Error al cargar el perfume');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadPerfume();
    }
  }, [params.id]);

  // Set default size when perfume loads
  useEffect(() => {
    if (perfume && !selectedSize) {
      setSelectedSize(perfume.sizes[0].size);
    }
  }, [perfume, selectedSize]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Cargando perfume...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!perfume) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            {error || 'Perfume no encontrado'}
          </h1>
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
            <div className="relative bg-gray-100 rounded-lg overflow-hidden w-[90%] h-[550px]">
              <Image
                src={perfume.image}
                alt={perfume.name}
                fill
                className="object-contain"
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

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  onClick={handleBuyNow}
                  disabled={!perfume.inStock}
                  className="flex-1 bg-black text-white hover:bg-gray-800 py-3 text-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Comprar Ahora
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={!perfume.inStock}
                  variant="outline"
                  className="px-4 py-3 border-gray-300 hover:border-black"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Carrito
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedPerfumes.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-black mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPerfumes.map((relatedPerfume) => (
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
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-black mb-1">{relatedPerfume.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{relatedPerfume.brand}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-black">
                          Bs. {relatedPerfume.sizes[0].price}
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
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
