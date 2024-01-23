import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useEffect,useState,lazy, Suspense} from 'react'
import ProductsJson from './data/Products.js'
import IconClose from '../public/assets/icons/IconClose.jsx'
import styles from './components/styles/CardProducts.module.css'
const Products = lazy(()=> import('./components/Products.js'))
const Profile = lazy(()=> import('./components/Profile.jsx'))
const Garments = lazy(()=> import('./components/Garments.jsx'))
const ShoppingCart = lazy(()=> import('./components/ShoppingCart.jsx'))
import Hero from './components/Hero.jsx'
import Aside from './components/Aside.jsx'

function App() {
  const [timeoutId, setTimeoutId] = useState(null);
  const [message, setMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const handleCloseClick = () => {
    setMessage('');
  };

  const enterMessage = (message)=> {
    const newMessage = message;
    setMessage(newMessage);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(() => {
        setMessage('');
        setTimeoutId(null);
      }, 5000)
    );
  }

  useEffect(() => {
    const cartShopCache = localStorage.getItem('cartItems');

    if (cartShopCache) {
      setCartItems(JSON.parse(cartShopCache));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  const paths = ["/products/caps","/products/pants","/products/t-shirts","/products/hoodies"]

  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<Hero enterMessage={enterMessage} setCartItems={setCartItems}/>} />
            <Route path='/profile' element={
              <Suspense fallback={<div className='flex items-center justify-center h-screen'>Loading profile...</div>}>
                <Profile />
              </Suspense>
            } />
            <Route path='/shopping-cart' element={
              <Suspense fallback={<div className='flex items-center justify-center h-screen'>Loading cart...</div>}>
                <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} enterMessage={enterMessage}/>
              </Suspense>
            } />
            <Route path='/products' element={
              <Suspense fallback={<div className='flex items-center justify-center h-screen'>Loading products...</div>}>
                <Products ProductsJson={ProductsJson} />
              </Suspense>
            } />

           {paths.map(path => {
              const [, , type] = path.split("/");
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <Suspense fallback={<div className='flex items-center justify-center h-screen'>Loading...</div>}>
                      <Garments
                        ProductsJson={ProductsJson}
                        enterMessage={enterMessage}
                        setCartItems={setCartItems}
                        cartItems={cartItems}
                        type={type}
                      />
                    </Suspense>
                  }
                />
              );
            })}
          </Routes>
          {message && (
            <p className={`${styles.textModal} fixed bottom-24 lg:bottom-10 font-semibold max-w-[90%] right-5 bg-white py-3 px-5 rounded-3xl flex items-center gap-5 shadow-md`}>{message}<IconClose styles='text-black w-6 h-6 cursor-pointer' onClick={handleCloseClick} /></p>
          )}
          <Aside cartItems={cartItems} />
      </Router>
    </>
  )
}

export default App
