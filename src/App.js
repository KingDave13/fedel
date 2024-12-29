import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AboutPage, ContactPage, HomePage, ProductsPage } from './scenes';
import ScrollToTopButton from './constants/ScrollToTop';
import { CategoryPage, ProductPage, CartPage, CheckoutPage, SearchPage } from './pages';
import Announcement from './features/Announcement';


const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Announcement />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/products/:slug' element={<CategoryPage />} />
          <Route path='/products/:categorySlug/:productSlug' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/cart/checkout' element={<CheckoutPage />} />
          <Route path='/search' element={<SearchPage />} />
        </Routes>

        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  )
};

export default App;