'use client';

import { perfumes } from '@/data/perfumes';
import PerfumeCard from '@/components/PerfumeCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Star, Gift, Truck, Shield} from 'lucide-react';
import Link from 'next/link'

export default function Home() {
 

  const featuredPerfumes = perfumes.filter(perfume => perfume.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              Descubre tu
              <span className="block text-gray-600">Fragancia Perfecta</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Prueba Los Aromas De Tus Sueños En La Vida Real (Cita, Escuela, Trabajo) Antes De Comprometerte Con La Botella Completa. Huele A Élite, Sin Compromisos.
            </p>
            <Link href="/allperfumes" className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                Comprar Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Envío Rápido</h3>
              <p className="text-gray-600">Entrega en 24-48 horas</p>
            </div>
            <div className="text-center">
              <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Originales</h3>
              <p className="text-gray-600">Garantía de autenticidad en todos nuestros productos</p>
            </div>
            <div className="text-center">
              <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Combos Especiales</h3>
              <p className="text-gray-600">Descuentos exclusivos al armar tu combo personalizado</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Productos Destacados</h2>
            <p className="text-gray-600">Los perfumes más populares de nuestra colección</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPerfumes.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} />
            ))}
          </div>
        </div>
        <Link href="/allperfumes" className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
            Ver Mas
          </Button>
        </Link>
      </section>
       
      {/* Featured Products */}
      <section>
         <h2 className="text-3xl font-bold text-black mb-4 text-center">Contruye tu kit de perfumes</h2>
         <img src="/kit.webp" className='mx-auto' />
         <Link href="/combos" className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
            Construir Kit
          </Button>
        </Link>
      </section>
      
      <Footer />
    </div>
  );
}
