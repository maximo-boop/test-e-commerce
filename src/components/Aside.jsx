import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './styles/Aside.css';
import IconHome from '../../public/assets/icons/IconHome.jsx';
import IconGrid from '../../public/assets/icons/IconGrid.jsx';
import IconShop from '../../public/assets/icons/IconShop.jsx';
import IconShopAlert from './ShopAlertAnimation.jsx';
import IconUser from '../../public/assets/icons/IconUser.jsx';

const Aside = ({ cartItems }) => {
    const location = useLocation();
    const path = location.pathname;
    const [selectedItem, setSelectedItem] = useState('');
    const [lastCartItemCount, setLastCartItemCount] = useState(0);
    const [showShopAlert, setShowShopAlert] = useState(false);

    const handleClick = (item) => {
        setSelectedItem(item);

        if (item === 'shop') {
            setShowShopAlert(false);
        }
    };

    useEffect(() => {
        if (path === '/') {
            setSelectedItem('home');
        } else if (path === '/products') {
            setSelectedItem('grid');
        } else if (path === '/shopping-cart') {
            setSelectedItem('shop');
        } else if (path === '/profile') {
            setSelectedItem('user');
        }
    }, [path]);

    useEffect(() => {
        if (cartItems.length > lastCartItemCount) {
          setShowShopAlert(true);
        }
        setLastCartItemCount(cartItems.length);
    }, [cartItems, lastCartItemCount]);

    return (
        <footer className='fixed bottom-0 left-0 w-full py-3 bg-white lg:h-screen lg:w-20'>
            <nav className='h-full'>
                <ul className='icons flex justify-around items-center h-full lg:flex-col'>
                    <li className={selectedItem === 'home' ? 'itemSelected' : ''}>
                        <NavLink to='/' aria-label='Go to home page' onClick={() => handleClick('home')}>
                            <IconHome />
                        </NavLink>
                    </li>
                    <li className={selectedItem === 'grid' ? 'itemSelected' : ''}>
                        <NavLink to='/products' aria-label='Go to product page' onClick={() => handleClick('grid')}>
                            <IconGrid />
                        </NavLink>
                    </li>
                    <li className={selectedItem === 'shop' ? 'itemSelected' : ''}>
                        <NavLink to='/shopping-cart' aria-label='Go to shopping cart' onClick={() => handleClick('shop')}>
                            {!showShopAlert ? <IconShop /> : <IconShopAlert />}
                        </NavLink>
                    </li>
                    <li className={selectedItem === 'user' ? 'itemSelected' : ''}>
                        <NavLink to='/profile' aria-label='Go to profile page' onClick={() => handleClick('user')}>
                            <IconUser />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Aside;
