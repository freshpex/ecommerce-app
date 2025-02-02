'use client';

import { CartItem as CartItemType } from '@/types';
import Image from 'next/image';
import { useStore } from '@/store/useStore';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useStore();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative h-20 w-20">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold dark:text-white">{item.title}</h4>
        <p className="text-gray-600 dark:text-gray-300">
          ${item.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          className="w-16 px-2 py-1 border rounded"
        />
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-600 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
}