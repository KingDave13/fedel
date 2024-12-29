import { useState, useEffect } from 'react';
import { client } from './sanity';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AboutPage, ContactPage, HomePage, ProductsPage } from './scenes';
import ScrollToTopButton from './constants/ScrollToTop';
import { CategoryPage, ProductPage, CartPage, CheckoutPage, SearchPage } from './pages';
import Announcement from './features/Announcement';


const App = () => {

  const [bannerText, setBannerText] = useState([]);
  
    useEffect(() => {
      const query = `
        *[_type == "banner"] | {
          text,
        }
      `;
  
      client.fetch(query)
        .then((data) => setBannerText(data))
    }, []);

    const bannerTextPresent = bannerText.length > 0

  return (
    <BrowserRouter>
      <div>
        <Announcement bannerText={bannerText} />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/products/:slug' element={<CategoryPage bannerTextPresent={bannerTextPresent} />} />
          <Route path='/products/:categorySlug/:productSlug' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage bannerTextPresent={bannerTextPresent} />} />
          <Route path='/cart/checkout' element={<CheckoutPage />} />
          <Route path='/search' element={<SearchPage bannerTextPresent={bannerTextPresent}/>} />
        </Routes>

        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  )
};

export default App;