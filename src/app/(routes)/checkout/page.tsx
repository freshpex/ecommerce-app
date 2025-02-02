'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import CartItem from '@/components/CartItem';
import { ShippingDetails } from '@/types';

export default function CheckoutPage() {
  const { cart, totalAmount, clearCart } = useStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<ShippingDetails>>({});

  const validateForm = () => {
    const newErrors: Partial<ShippingDetails> = {};
    if (!shippingDetails.name) newErrors.name = 'Name is required';
    if (!shippingDetails.address) newErrors.address = 'Address is required';
    if (!shippingDetails.phone) newErrors.phone = 'Phone is required';
    if (!shippingDetails.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(shippingDetails.email))
      newErrors.email = 'Email is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    clearCart();
    setShowConfirmation(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Your Cart
          </h2>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="mt-4 text-xl font-semibold dark:text-white">
            Total: ${totalAmount.toFixed(2)}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Shipping Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block dark:text-white">Name</label>
              <input
                type="text"
                value={shippingDetails.name}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block dark:text-white">Address</label>
              <textarea
                value={shippingDetails.address}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    address: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded"
              />
              {errors.address && (
                <p className="text-red-600 text-sm">{errors.address}</p>
              )}
            </div>
            <div>
              <label className="block dark:text-white">Phone</label>
              <input
                type="tel"
                value={shippingDetails.phone}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, phone: e.target.value })
                }
                className="w-full px-4 py-2 border rounded"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block dark:text-white">Email</label>
              <input
                type="email"
                value={shippingDetails.email}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Confirm Order
            </h3>
            <p className="dark:text-gray-300">
              Are you sure you want to place this order?
            </p>
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleConfirm}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}