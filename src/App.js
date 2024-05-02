import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './scenes';


const App = () => {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/about' element={<AboutPage />} />
          <Route path='/journals' element={<JournalsPage />} />
          <Route path='/contact' element={<ContactPage />} /> */}
        </Routes>
    </BrowserRouter>
  )
};

export default App;
