'use client';

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import Image from 'next/image';

interface CartDrawerProps {
  children: React.ReactNode;
}

export default function CartDrawer({ children }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.items.length === 0) return;
    
    const itemsList = cart.items.map(item => 
      `• ${item.perfume.name} - ${item.perfume.brand} (${item.selectedSize}) (${item.quantity}x) - Bs. ${item.perfume.price * item.quantity}`
    ).join('\n');
    
    const message = `¡Hola! Quiero comprar estos perfumes:

*CARRITO DE COMPRAS*
${itemsList}

*TOTAL: Bs. ${cart.total}*
Total de productos: ${cart.itemCount}

¿Están disponibles y puedo proceder con la compra?`;

    const whatsappUrl = `https://wa.me/59175850708?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Carrito de Compras
            {cart.itemCount > 0 && (
              <Badge className="bg-black text-white">
                {cart.itemCount}
              </Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Revisa tus productos antes de realizar la compra
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cart.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                <p className="text-sm text-gray-400 mt-1">
                  Agrega perfumes para comenzar
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={`${item.perfume.id}-${item.selectedSize}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
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
                        <p className="text-xs text-gray-500">{item.selectedSize}</p>
                        <p className="text-sm font-bold text-black">
                          Bs. {item.perfume.price * item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.perfume.id, item.selectedSize, item.quantity - 1)}
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
                          onClick={() => updateQuantity(item.perfume.id, item.selectedSize, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.perfume.id, item.selectedSize)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Vaciar Carrito
                  </Button>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total de productos: {cart.itemCount}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>Bs. {cart.total}</span>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white hover:bg-gray-800"
                  size="lg"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Comprar Ahora
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
