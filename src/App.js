import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ProductsPage } from './scenes';
import ScrollToTopButton from './constants/ScrollToTop';
import { CategoryPage, ProductPage } from './pages';


const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:slug' element={<CategoryPage />} />
          <Route path='/product/:slug' element={<ProductPage />} />
          {/* <Route path='/journals' element={<JournalsPage />} />
          <Route path='/contact' element={<ContactPage />} /> */}
        </Routes>

        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  )
};

export default App;
