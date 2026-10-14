import { Routes, Route } from 'react-router';
import './App.css'
import Home from './pages/Home';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App
