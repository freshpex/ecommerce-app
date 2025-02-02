'use client';

import { Product } from '@/types';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div onClick={onClick} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transform transition-transform hover:scale-105 cursor-pointer">
      <div className="relative h-48 w-full mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 dark:text-white truncate">
        {product.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        ${product.price.toFixed(2)}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart();
        }}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded hover:from-blue-600 hover:to-purple-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}