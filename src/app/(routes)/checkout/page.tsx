'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import CartItem from '@/components/CartItem';
import { ShippingDetails, OrderInput } from '@/types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FiShoppingBag, FiArrowLeft, FiCheck, FiTruck } from 'react-icons/fi';
import PaymentSection from '@/components/PaymentSection';
import { sendOrderConfirmationEmail } from '@/utils/emailService';

export default function CheckoutPage() {
  const { cart, totalAmount, clearCart, setShippingDetails, closeCart, addOrder } = useStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [shippingDetails, setLocalShippingDetails] = useState<ShippingDetails>({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<ShippingDetails>>({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

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
      setShippingDetails(shippingDetails);
      setShowConfirmation(true);
    }
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      const orderInput: OrderInput = {
        items: cart,
        totalAmount,
        shippingDetails,
        status: 'pending' as const,
        paymentMethod: selectedPaymentMethod,
      };

      // First create the order to get the ID
      const createdOrder = {
        ...orderInput,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };

      addOrder(orderInput);
      await sendOrderConfirmationEmail(createdOrder, shippingDetails);
      
      clearCart();
      closeCart();
      setShowConfirmation(false);
      toast.success('Order placed successfully! Check your email for confirmation.');
      router.push('/orders');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to process order. Please try again. ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <FiArrowLeft />
            Continue Shopping
          </button>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-blue-600">
              <FiShoppingBag />
              <span className="hidden sm:inline">Cart</span>
            </span>
            <span className="h-px w-8 bg-gray-300 dark:bg-gray-600" />
            <span className="flex items-center gap-2">
              <FiTruck />
              <span className="hidden sm:inline">Shipping</span>
            </span>
          </div>
        </div>

        {/* Main Content - Improve mobile layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Cart Section */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 lg:p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
              <FiShoppingBag /> Your Cart
            </h2>
            
            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-lg font-semibold dark:text-white">
                    <span>Subtotal:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Shipping:</span>
                    <span>Calculated at next step</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold dark:text-white">
                      <span>Total:</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-gray-600 dark:text-gray-300">Your cart is empty</p>
                <button
                  onClick={() => router.push('/')}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Shipping Form Section */}
          <div className="lg:col-span-5 order-first lg:order-last">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 lg:p-6">
              <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
                <FiTruck /> Shipping Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {Object.entries({
                  name: "Full Name",
                  email: "Email Address",
                  phone: "Phone Number",
                  address: "Shipping Address"
                }).map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {label}
                    </label>
                    {key === 'address' ? (
                      <textarea
                        value={shippingDetails[key as keyof ShippingDetails]}
                        onChange={(e) =>
                          setLocalShippingDetails({
                            ...shippingDetails,
                            [key]: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        rows={3}
                      />
                    ) : (
                      <input
                        type={key === 'email' ? 'email' : 'text'}
                        value={shippingDetails[key as keyof ShippingDetails]}
                        onChange={(e) =>
                          setLocalShippingDetails({
                            ...shippingDetails,
                            [key]: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    )}
                    {errors[key as keyof ShippingDetails] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[key as keyof ShippingDetails]}
                      </p>
                    )}
                  </div>
                ))}

                <PaymentSection
                  onSelect={setSelectedPaymentMethod}
                  selectedMethod={selectedPaymentMethod}
                />

                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FiCheck /> Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-8 max-w-md w-full mx-auto">
            <h3 className="text-2xl font-bold mb-4 dark:text-white">
              Confirm Order
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">
                  Total Amount: ${totalAmount.toFixed(2)}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Shipping to: {shippingDetails.name}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Payment Method: {selectedPaymentMethod}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Confirm Order'}
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}