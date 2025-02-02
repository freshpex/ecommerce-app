'use client';

import { Product } from '@/types';
import Image from 'next/image';
import { useStore } from '@/store/useStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
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
        onClick={() => addToCart(product)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}