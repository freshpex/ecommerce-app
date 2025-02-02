'use client';

import { Product } from '@/types';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-800 dark:text-white">
            <FaTimes size={24} />
        </button>
        <div className="relative h-96 w-full mb-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-2xl font-semibold mb-2 dark:text-white">
          {product.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          {product.description}
        </p>
      </div>
    </div>
  );
}
