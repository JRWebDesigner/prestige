'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CartDrawer from './CartDrawer';
import { Search, Menu, X, Package,ShoppingBag } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { cart } = useCart();


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
        <div className="bg-blue-900 flex justify-center items-center py-3 px-5">
            <div className="container text-center text-white md:text-lg font-bold">
              Muestra de regalo en ventas mayores a 300 bs 🎁
            </div>
        </div>
        <header className="bg-white py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:mb-8">
            <div className="flex items-center justify-around h-16 md:grid md:grid-cols-3 justify-center items-center place-items-center mx-auto">
             
              {/* Desktop Navigation */}
             
              {/* Search Bar */}
              <div className="hidden md:flex items-center space-x-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar perfumes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 border-gray-300 focus:border-black"
                  />
                </form>
              </div>
               {/* Logo */}
              <Link href="/" className="flex items-center">
                <img className="w-[200px]" src="/logo.png" />
              </Link>

              <div className="hidden md:flex items-center space-x-4">  
                {/* Cart Button */}
                <CartDrawer>
                  <Button variant="outline" size="icon" className="relative border-gray-300 hover:border-black">
                    <ShoppingBag className="w-5 h-5" />
                    {cart.itemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-black text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                        {cart.itemCount}
                      </Badge>
                    )}
                  </Button>
                </CartDrawer>
              </div>
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200">
                <div className="flex flex-col space-y-4">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Buscar perfumes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full border-gray-300 focus:border-black"
                    />
                  </form>
                  <Link href="/" className="text-gray-700 hover:text-black transition-colors">
                    Catálogo
                  </Link>
                  <Link href="/combos" className="text-gray-700 hover:text-black transition-colors">
                    Combos
                  </Link>
                  <Link href="/masculino" className="text-gray-700 hover:text-black transition-colors">
                    Masculino
                  </Link>
                  <Link href="/femenino" className="text-gray-700 hover:text-black transition-colors">
                    Femenino
                  </Link>
                  <Link href="/unisex" className="text-gray-700 hover:text-black transition-colors">
                    Unisex
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="hidden md:flex justify-center">
             <nav className="flex gap-7 items-center justify-center">
                <Link href="/" className="text-gray-700 hover:text-black transition-colors">
                    Inicio
                  </Link>
                  <Link href="/combos" className="text-gray-700 hover:text-black transition-colors">
                    Arma tu KIT
                  </Link>
                  <Link href="/sets" className="text-gray-700 hover:text-black transition-colors">
                    Descubre Sets
                  </Link>
                  <Link href="/masculino" className="text-gray-700 hover:text-black transition-colors">
                    Para Hombres
                  </Link>
                  <Link href="/femenino" className="text-gray-700 hover:text-black transition-colors">
                    Para Mujeres
                  </Link>
                  <Link href="/unisex" className="text-gray-700 hover:text-black transition-colors">
                    Contactos
                  </Link>
             </nav>
          </div>
        </header>
    </>
  );
}
