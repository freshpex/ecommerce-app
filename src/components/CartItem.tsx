'use client';

import { CartItem as CartItemType } from '@/types';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useStore();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input for backspace/delete operations
    if (value === '') {
      updateQuantity(item.id, 1);
      return;
    }
    
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(item.id, quantity);
    }
  };

  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b dark:border-gray-700">
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
        <div className="flex items-center border rounded-lg dark:border-gray-600">
          <button
            onClick={decrementQuantity}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-l-lg transition-colors"
            disabled={item.quantity <= 1}
          >
            <FiMinus size={14} />
          </button>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center border-x px-2 py-1 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={incrementQuantity}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
          >
            <FiPlus size={14} />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Remove item"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
}