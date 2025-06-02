import './App.css';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import Footer from './components/layouts/Footer';

function App() {
  return (
    <Router>
      <div>
        <HelmetProvider>
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
