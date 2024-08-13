import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home';
import Login from './components/Login/Login';
import Error from './components/Error';
import Footer from './components/Footer/Footer';
import Banner from './components/Banner/Banner';
import ProtectedRoute from './components/ProtectedRoute'; 
import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  return (
    <>
      <Header />
      <Banner />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ProtectedRoute element={Home} setItems={setItems} />} />
        <Route path='/error' element={<Error />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer hasItems={items.length > 0} />
    </>
  );
}

export default App;
