import { Order, ShippingDetails, OrderInput } from '@/types';

export const sendOrderConfirmationEmail = async (
  order: Order | OrderInput,
  shippingDetails: ShippingDetails
): Promise<boolean> => {
  try {
    const orderWithId = 'id' in order ? order : {
      ...order,
      id: Date.now().toString() // Generate temporary ID if not present
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: shippingDetails.email,
        subject: `Order Confirmation #${orderWithId.id}`,
        order: orderWithId,
        shippingDetails,
      }),
    });

    return response.ok;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending confirmation email:', errorMessage);
    return false;
  }
};
