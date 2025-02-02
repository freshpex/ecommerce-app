'use client';

import { FiCreditCard, FiDollarSign, FiSmartphone } from 'react-icons/fi';
import { SiPaypal } from 'react-icons/si';
import { PaymentMethodType } from '@/types';

interface PaymentSectionProps {
  onSelect: (method: PaymentMethodType) => void;
  selectedMethod: string;
}

const PAYMENT_METHODS = [
  { id: 'credit_card' as PaymentMethodType, name: 'Credit Card', icon: <FiCreditCard className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { id: 'paypal' as PaymentMethodType, name: 'PayPal', icon: <SiPaypal className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { id: 'mobile_money' as PaymentMethodType, name: 'Mobile Money', icon: <FiSmartphone className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { id: 'cash' as PaymentMethodType, name: 'Cash on Delivery', icon: <FiDollarSign className="w-5 h-5 sm:w-6 sm:h-6" /> },
] as const;

export default function PaymentSection({ onSelect, selectedMethod }: PaymentSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold dark:text-white">Payment Method</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg border transition-all ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-500'
            }`}
          >
            <div className="text-blue-600 dark:text-blue-400">{method.icon}</div>
            <span className="text-sm sm:text-base font-medium dark:text-white">{method.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
