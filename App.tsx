import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Price from './pages/Price';
import Calculator from './pages/Calculator';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contacts from './pages/Contacts';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/price" element={<Price />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  );
}
