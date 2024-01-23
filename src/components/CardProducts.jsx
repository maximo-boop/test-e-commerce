import React, {useState,useEffect} from 'react';
import styles from './styles/CardProducts.module.css'
import IconShopAdd from '../../public/assets/icons/IconShopAdd.jsx'
import IconShopSuccess from '../../public/assets/icons/IconShopSuccess.jsx'
import IconClose from '../../public/assets/icons/IconClose.jsx'
    

const CardProducts = ({product,setCartItems,cartItems,enterMessage}) => {

    const [iconClicked, setIconClicked] = useState(false);
    const isInCart = cartItems.some((item) => item.name === product.name);

    const addToCart = () => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            setIconClicked(true);
            if(!isInCart) {
                const updatedCart = [...cartItems, { id:product.id, name: product.name, price: product.price, image: product.image }];
                setCartItems(updatedCart);
            }
        } else {
            enterMessage('You must be logged in to add products to the cart.')
        }
    };

    return (
        <>
            <li className={`relative flex flex-col bg-white p-5 ${styles.li} text-black shadow-lg`}>
                <img src={product.image} alt={product.name} />
                <h3 className="font-bold text-xl">{product.name}</h3>
                <p className='font-bold text-2xl'>${product.price}</p>
                <div onClick={addToCart} className={`absolute absolute -right-2 -bottom-2 bg-black p-3 rounded-full ${isInCart ? '' : 'cursor-pointer'}`}>
                    {isInCart ? <IconShopSuccess /> : <IconShopAdd />}
                </div>
            </li>
        </>
    );
};

export default CardProducts;