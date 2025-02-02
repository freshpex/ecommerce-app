export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface ShippingDetails {
    name: string;
    address: string;
    phone: string;
    email: string;
  }
  