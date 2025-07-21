'use client';

import { useState, useEffect } from 'react';
import PerfumeCard from '@/components/PerfumeCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { getPerfumes, getFeaturedPerfumes } from '@/lib/sanity';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Star, Gift, Truck, Shield} from 'lucide-react';
import Link from 'next/link';
import { Perfume } from '@/types/perfume';

export default function Home() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [featuredPerfumes, setFeaturedPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [setPerfumesList, setSetPerfumesList] = useState<Perfume[]>([]);
  const [SumSprPerfumes, setSumSprPerfumes] = useState<Perfume[]>([]);
  const [WinAutPerfumes, setWinAutPerfumes] = useState<Perfume[]>([]);

  useEffect(() => {
    const loadPerfumes = async () => {
      setLoading(true);
      setError(null);
      try {
        const [allPerfumes, featured] = await Promise.all([
          getPerfumes(),
          getFeaturedPerfumes()
        ]);
        
        setPerfumes(allPerfumes);
        setFeaturedPerfumes(featured);
        
        // Filtrar perfumes para diferentes categorías
        setSetPerfumesList(allPerfumes.filter(perfume => perfume.set));
        setSumSprPerfumes(allPerfumes.filter(perfume => 
          perfume.spring || perfume.summer
        ));
        setWinAutPerfumes(allPerfumes.filter(perfume => 
          perfume.winter || perfume.autumn
        ));
        
      } catch (error) {
        console.error('Error loading perfumes:', error);
        setError('Error al cargar los perfumes. Intenta recargar la página.');
      } finally {
        setLoading(false);
      }
    };

    loadPerfumes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Cargando perfumes desde Sanity...</p>
            <p className="text-gray-400 text-sm mt-2">Esto puede tomar unos segundos</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="text-red-500 mb-4">
            <p className="text-lg font-semibold">Error al cargar los datos</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-black text-white hover:bg-gray-800"
          >
            Recargar página
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-white pb-20">
        <div className="h-[500px] md:h-[700px] bg-black"> 
          <video autoPlay loop muted playsInline preload="auto" className="mx-auto h-full w-full md:w-[70%] object-cover object-bottom opacity-70">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-black mb-6">
              Descubre tu Fragancia Perfecta
            </h1>
            <p className="text-sm text-gray-600 mb-8 max-w-6xl mx-auto">
              La vida no es tan larga, como para arrepentirse de un perfume que compraste a ciegas, prueba los aromas de tus sueños antes de comprometerte con un frasco completo, en un solo clic
            </p>
            <Link href="/allperfumes" className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                Comprar Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <img src="/qualitys.webp" className="w-full mx-auto container" alt="Quality features" />

      {/* Featured Perfumes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl font-semibold text-black mb-4">LOS AROMAS MÁS QUERIDOS</h2>
            <p className="text-gray-600">Los perfumes más populares de nuestra colección</p>
          </div>
          
          {featuredPerfumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPerfumes.map((perfume) => (
                <PerfumeCard key={perfume._id} perfume={perfume} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay productos destacados disponibles.</p>
              <p className="text-gray-400 text-sm mt-1">Agrega productos destacados desde el panel de administración.</p>
            </div>
          )}
        </div>
        <Link href="/allperfumes" className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
            Ver Más
          </Button>
        </Link>
      </section>
       
      {/* Build Your Kit Section */}
      <section className="container py-20">
        <h2 className="text-xl font-semibold text-black mb-4 text-center">CONSTRUYE TU PROPIO KIT</h2>
        <img src="/kit.webp" className='mx-auto' alt="Build your kit" />
        <p className="mx-auto md:text-xl text-center font-semibold">
          Mezcla, combina y construye un kit que vaya contigo
        </p>
        <Link href="/combos" className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
            Construir Kit
          </Button>
        </Link>
      </section>
      
      {/* Discovery Sets */}
      <section className="container py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl font-semibold text-black mb-4">CONJUNTOS DE DESCUBRIMIENTO</h2>
          </div>
          {setPerfumesList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {setPerfumesList.map((perfume) => (
                <PerfumeCard key={perfume._id} perfume={perfume} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay conjuntos de descubrimiento disponibles.</p>
            </div>
          )}
        </div>
        <Link href="/setperfumes" className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
            Ver Más
          </Button>
        </Link>
      </section>
      
      {/* Spring/Summer Perfumes */}
      <section className="container py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl font-semibold text-black mb-4">VERANO Y PRIMAVERA</h2>
          </div>
          {SumSprPerfumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SumSprPerfumes.map((perfume) => (
                <PerfumeCard key={perfume._id} perfume={perfume} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay perfumes de verano o primavera disponibles.</p>
            </div>
          )}
        </div>
        <Link href="/seasonal" className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
            Ver Más
          </Button>
        </Link>
      </section>
      
      {/* Autumn/Winter Perfumes */}
      <section className="container py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl font-semibold text-black mb-4">OTOÑO E INVIERNO</h2>
          </div>
          {WinAutPerfumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WinAutPerfumes.map((perfume) => (
                <PerfumeCard key={perfume._id} perfume={perfume} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay perfumes de otoño o invierno disponibles.</p>
            </div>
          )}
        </div>
        <Link href="/seasonal" className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
            Ver Más
          </Button>
        </Link>
      </section>
        <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl font-bold text-black mb-4">Preguntas Frecuentes</h2>
            <p className="text-gray-600">Resolvemos las dudas más comunes sobre nuestros productos y servicios</p>
          </div>
          
          <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">¿SON AUTÉNTICAS NUESTRAS MUESTRAS?</AccordionTrigger>
                <AccordionContent>
                <p className="text-gray-600">
                  SÍ, TODAS LAS MUESTRAS SON GENUINAS Y PROVIENEN DIRECTAMENTE DE MINORISTAS AUTORIZADOS Y PROVEEDORES CONFIABLES.
                </p>
                </AccordionContent>
              </AccordionItem>
            
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">¿CUÁNTO TIEMPO TARDA EL ENVÍO?</AccordionTrigger>
                <AccordionContent>
                <p className="text-gray-600">
                  NUESTRO OBJETIVO ES OFRECER CUMPLIMIENTO DENTRO DE 1 A 2 DÍAS DE LA SEMANA, CON TIEMPOS DE ENTREGA QUE GENERALMENTE OSCILAN ENTRE 1 Y 2 DÍAS HÁBILES, DEPENDIENDO DE SU UBICACIÓN.
                </p>
                </AccordionContent>
              </AccordionItem>
            
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">¿PROBAR ANTES DE COMPRAR UNA BOTELLA LLENA?</AccordionTrigger>
                <AccordionContent>
                <p className="text-gray-600">
                  EVITE ARREPENTIRSE DE SU NUEVA INVERSIÓN EN AROMA CON UNA BOTELLA LLENA. PRUEBE NUESTRAS MUESTRAS DEL TAMAÑO DE UN VIAJE PARA SUMERGIRSE EN EL AROMA Y TOMAR UNA DECISIÓN INFORMADA ANTES DE COMPROMETERSE CON UNA BOTELLA MÁS GRANDE.
                </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">¿Tienes alguna otra pregunta?</p>
            <Button 
              onClick={() => window.open('https://wa.me/59175850708?text=Hola! Tengo una consulta sobre sus perfumes.', '_blank')}
              className="bg-black text-white hover:bg-gray-800"
            >
              Contáctanos por WhatsApp
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
