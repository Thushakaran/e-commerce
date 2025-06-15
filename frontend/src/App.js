import './App.css';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Login from './components/user/Login';
import Register from './components/user/Register';
import Footer from './components/layouts/Footer';
import ProductSearch from './components/product/ProductSearch';
import ProtectedRoute from './components/route/ProtectedRoute';
import Profile from './components/user/Profile';
import { useEffect } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Header from './components/layouts/Header';

function App() {
  useEffect(() => {
    store.dispatch(loadUser)
  })
  return (
    <Router>
      <div>
        <HelmetProvider>
          <Header />
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search/:keyword' element={<ProductSearch />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </div>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
