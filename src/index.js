import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './contexts/Cart';
import { CategoriesProvider } from './contexts/Categories';
import './index.scss';
import { store } from './store/store';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CartProvider>
          <CategoriesProvider>
            <App />
          </CategoriesProvider>
        </CartProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
