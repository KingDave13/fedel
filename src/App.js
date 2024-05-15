import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ProductsPage } from './scenes';
import ScrollToTopButton from './constants/ScrollToTop';


const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          {/* <Route path='/journals' element={<JournalsPage />} />
          <Route path='/contact' element={<ContactPage />} /> */}
        </Routes>

        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  )
};

export default App;
