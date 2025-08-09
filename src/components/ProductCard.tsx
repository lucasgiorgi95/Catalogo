'use client';

import { Product, CatalogTheme, PremiumFeatures } from '@/types/catalog';
import { motion } from 'framer-motion';
import { ShoppingCart, Share2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  index: number;
  theme?: CatalogTheme;
  features?: PremiumFeatures;
  storeName?: string;
}

export default function ProductCard({ product, index, theme, features, storeName }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleShare = () => {
    const message = `¡Mira este producto de ${storeName}!\n\n${product.name}\n${product.description}\nPrecio: $${product.price}\n\n¿Te interesa?`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
      style={{ 
        fontFamily: theme?.fontFamily || 'inherit'
      }}
    >
      {/* Imagen del producto */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center text-6xl font-bold opacity-20"
            style={{ color: theme?.primaryColor || '#6b7280' }}
          >
            {product.name.charAt(0)}
          </div>
        )}
        
        {/* Overlay con precio */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div 
            className="inline-block px-3 py-1 rounded-full text-white font-bold text-lg"
            style={{ backgroundColor: theme?.primaryColor || '#16a34a' }}
          >
            ${product.price.toFixed(2)}
          </div>
        </div>
      </div>
      
      {/* Información del producto */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-opacity-80 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {product.description}
        </p>

        {/* Botones Premium */}
        <div className="flex gap-2 mt-auto">
          {/* Carrito (Premium) */}
          {features?.shoppingCart?.enabled && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="flex-1 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 text-sm font-medium"
            >
              <ShoppingCart size={14} />
              Agregar
            </motion.button>
          )}

          {/* Compartir (Premium) */}
          {features?.shareProducts?.enabled && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              <Share2 size={16} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Indicador de hover */}
      <div 
        className="h-1 w-0 group-hover:w-full transition-all duration-300"
        style={{ backgroundColor: theme?.primaryColor || '#16a34a' }}
      />
    </motion.div>
  );
}