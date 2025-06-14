import './App.css';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Login from './components/user/Login';
import Register from './components/user/Register';
import Footer from './components/layouts/Footer';
import ProductSearch from './components/product/ProductSearch';

function App() {
  return (
    <Router>
      <div>
        <HelmetProvider>
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search/:keyword' element={<ProductSearch />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </div>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
