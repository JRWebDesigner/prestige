import { Package, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold">Prestige Scents</span>
            </div>
            <p className="text-gray-300 mb-4">
              Tu destino para las mejores fragancias. Descubre una amplia selección de perfumes 
              originales de las marcas más prestigiosas del mundo.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">Catálogo</a></li>
              <li><a href="/combos" className="hover:text-white transition-colors">Kits</a></li>
              <li><a href="/masculino" className="hover:text-white transition-colors">Masculino</a></li>
              <li><a href="/femenino" className="hover:text-white transition-colors">Femenino</a></li>
              <li><a href="/unisex" className="hover:text-white transition-colors">Unisex</a></li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+591 75850708</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>prestigescents.parfums.bo@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Sucre, Bolivia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Prestige Scents. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
