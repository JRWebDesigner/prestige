'use client';

import { useState } from 'react';
import { perfumes } from '@/data/perfumes';
import { Perfume, ComboItem } from '@/types/perfume';
import PerfumeCard from '@/components/PerfumeCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, ShoppingCart, Trash2, Gift } from 'lucide-react';
import Image from 'next/image';

export default function CombosPage() {
  const [comboItems, setComboItems] = useState<ComboItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const addToCombo = (perfume: Perfume) => {
    setComboItems(prev => {
      const existingItem = prev.find(item => item.perfume.id === perfume.id);
      if (existingItem) {
        return prev.map(item =>
          item.perfume.id === perfume.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { perfume, quantity: 1 }];
    });
  };

  const removeFromCombo = (perfumeId: string) => {
    setComboItems(prev => prev.filter(item => item.perfume.id !== perfumeId));
  };

  const updateQuantity = (perfumeId: string, change: number) => {
    setComboItems(prev => {
      return prev.map(item => {
        if (item.perfume.id === perfumeId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const calculateTotals = () => {
    const subtotal = comboItems.reduce((sum, item) => {
      const sizeData = item.perfume.sizes.find(s => s.size === item.selectedSize) || item.perfume.sizes[0];
      return sum + (sizeData.price * item.quantity);
    }, 0);
    const itemCount = comboItems.reduce((sum, item) => sum + item.quantity, 0);
    
    let discount = 0;
    if (itemCount >= 2) discount = 0.05; // 5% descuento por 2 o más
    if (itemCount >= 3) discount = 0.10; // 10% descuento por 3 o más
    if (itemCount >= 4) discount = 0.15; // 15% descuento por 4 o más
    
    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount;
    
    return { subtotal, discount, discountAmount, total, itemCount };
  };

  const handleBuyCombo = () => {
    if (comboItems.length === 0) return;
    
    const totals = calculateTotals();
    const itemsList = comboItems.map(item => 
      `• ${item.perfume.name} - ${item.perfume.brand} (${item.quantity}x) - Bs. ${item.perfume.price * item.quantity}`
    ).join('\n');
    
    const message = `¡Hola! Quiero comprar este Kit de perfumes:

*KIT PERSONALIZADO*
${itemsList}

*RESUMEN:*
Subtotal: Bs. ${totals.subtotal}
*TOTAL: Bs. ${totals.total.toFixed(2)}*

Total de productos: ${totals.itemCount}

¿Está disponible y puedo proceder con la compra?`;

    const whatsappUrl = `https://wa.me/59170000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredPerfumes = perfumes.filter(perfume => 
    perfume.inStock && (selectedCategory === 'all' || perfume.category === selectedCategory)
  );

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Arma tu Kit Perfecto</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecciona múltiples perfumes y obtén descuentos especiales. Mientras más perfumes agregues, mayor será tu ahorro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black">Selecciona tus Perfumes</h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              >
                <option value="all">Todas las categorías</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPerfumes.map((perfume) => (
                <PerfumeCard 
                  key={perfume.id} 
                  perfume={perfume} 
                  onAddToCombo={addToCombo}
                />
              ))}
            </div>
          </div>

          {/* Combo Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Mi Combo ({comboItems.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {comboItems.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Gift className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">Tu combo está vacío</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Agrega perfumes para comenzar
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {comboItems.map((item) => (
                        <div key={item.perfume.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Image
                            src={item.perfume.image}
                            alt={item.perfume.name}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-black truncate">
                              {item.perfume.name}
                            </h4>
                            <p className="text-xs text-gray-600">{item.perfume.brand}</p>
                            <p className="text-sm font-bold text-black">
                              Bs. {item.perfume.price * item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.perfume.id, -1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.perfume.id, 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromCombo(item.perfume.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>Bs. {totals.subtotal}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>Bs. {totals.total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={handleBuyCombo}
                        className="w-full bg-black text-white hover:bg-gray-800 mt-4"
                        size="lg"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Comprar Combo
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
