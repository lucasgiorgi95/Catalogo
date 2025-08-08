'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Catalog } from '@/types/catalog';
import ProductCard from '@/components/ProductCard';
import QRGenerator from '@/components/QRGenerator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CatalogView() {
  const params = useParams();
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    const savedCatalogs = localStorage.getItem('catalogs');
    if (savedCatalogs) {
      const catalogs: Catalog[] = JSON.parse(savedCatalogs);
      const foundCatalog = catalogs.find(c => c.id === params.id);
      setCatalog(foundCatalog || null);
    }
    
    setCurrentUrl(window.location.href);
  }, [params.id]);

  if (!catalog) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Catálogo no encontrado
          </h1>
          <p className="text-gray-600">
            El catálogo que buscas no existe o ha sido eliminado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: catalog.theme.backgroundColor,
        fontFamily: catalog.theme.fontFamily 
      }}
    >
      {/* Hero Section con imagen de fondo */}
      <div 
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: catalog.backgroundImage 
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${catalog.backgroundImage})`
            : `linear-gradient(135deg, ${catalog.theme.primaryColor}, ${catalog.theme.secondaryColor})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >


        {/* Contenido del hero */}
        <div className="text-center text-white px-6 max-w-4xl mx-auto">
          {catalog.logo && (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              src={catalog.logo}
              alt={catalog.storeName}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto mb-6 shadow-2xl border-4 border-white"
            />
          )}
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-shadow"
          >
            {catalog.storeName}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed"
          >
            {catalog.businessInfo}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <div 
              className="inline-block px-6 py-2 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {catalog.products.length} producto{catalog.products.length !== 1 ? 's' : ''} disponible{catalog.products.length !== 1 ? 's' : ''}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sección de productos */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: catalog.theme.textColor }}
            >
              Nuestros Productos
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: catalog.theme.primaryColor }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {catalog.products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                theme={catalog.theme}
              />
            ))}
          </div>
        </div>
      </div>



      {/* Footer elegante */}
      <footer 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${catalog.theme.primaryColor}, ${catalog.theme.secondaryColor})`
        }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            {catalog.logo && (
              <img
                src={catalog.logo}
                alt={catalog.storeName}
                className="w-12 h-12 rounded-full object-cover shadow-lg"
              />
            )}
            <span 
              className="text-2xl font-bold"
              style={{ color: catalog.theme.textColor }}
            >
              {catalog.storeName}
            </span>
          </div>
          
          <p 
            className="text-lg opacity-90 mb-6 max-w-2xl mx-auto"
            style={{ color: catalog.theme.textColor }}
          >
            {catalog.businessInfo}
          </p>

          <div className="border-t border-white border-opacity-20 pt-6 mt-6">
            <p 
              className="text-sm opacity-70"
              style={{ color: catalog.theme.textColor }}
            >
              Catálogo digital • {new Date(catalog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}