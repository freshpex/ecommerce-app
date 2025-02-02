# E-commerce App

## Overview

This project is a simplified e-commerce platform built with React, Next.js, TypeScript, and Tailwind CSS. It includes functionalities for product listing, cart management, and checkout with API integration for product data.

## Features

- **Product Listing Page**: Displays a list of products fetched from a mock API. Each product has an image, name, price, and an "Add to Cart" button. The layout is responsive using Tailwind CSS.
- **Cart Management**: Users can add and remove items from the cart. The total price of the selected items is displayed dynamically. Zustand is used for global state management.
- **Checkout Page**: Users can see their selected items and total amount. A form is included for entering shipping details with basic form validation.
- **API Integration**: Product data is fetched from a mock API. Loading states and error handling are implemented gracefully.
- **Dark Mode**: Implemented using Tailwind CSS.
- **Search Bar**: Allows users to filter products dynamically.
- **Confirmation Modal**: Shown before finalizing the checkout.
- **Local Storage**: Cart data is persisted using local storage.
- **Deployment**: The project is deployed using Vercel.

## Technical Requirements

- **Framework**: React (Next.js)
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Responsiveness**: Fully responsive and mobile-friendly

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ecommerce-app
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```
2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

### Deployment

The project can be deployed using Vercel. Follow the Vercel documentation for deployment instructions.

## Project Structure

```
ecommerce-app/
├── public/                 # Public assets
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── (routes)/       # Application routes
│   │   │   └── checkout/   # Checkout page
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── providers.tsx   # Theme provider
│   ├── components/         # Reusable components
│   │   ├── CartItem.tsx    # Cart item component
│   │   ├── Navbar.tsx      # Navbar component
│   │   ├── ProductCard.tsx # Product card component
│   │   └── ProductList.tsx # Product list component
│   ├── store/              # Zustand store
│   │   └── useStore.ts     # Store implementation
│   ├── styles/             # Global styles
│   │   └── globals.css     # Global CSS
│   └── types/              # TypeScript types
│       └── index.ts        # Type definitions
├── .eslintrc.json          # ESLint configuration
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Usage

### Product Listing

- The product listing page fetches products from the mock API `https://fakestoreapi.com/products`.
- Each product is displayed with an image, name, price, and an "Add to Cart" button.
- Users can search for products using the search bar.

### Cart Management

- Users can add products to the cart by clicking the "Add to Cart" button.
- The cart displays the selected items and the total amount.
- Users can update the quantity of items or remove items from the cart.
- The cart data is persisted using local storage.

### Checkout

- The checkout page displays the selected items and the total amount.
- Users can enter their shipping details in the provided form.
- Basic form validation is implemented to ensure all fields are filled correctly.
- A confirmation modal is shown before finalizing the checkout.

### Dark Mode

- Users can toggle between light and dark modes using the "Toggle Theme" button.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with a descriptive message.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License.
