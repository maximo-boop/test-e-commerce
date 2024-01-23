import React, {useState,useEffect} from 'react';
import styles from './styles/ShoppingCart.module.css'
import IconClose from '../../public/assets/icons/IconClose.jsx'
import IconUp from '../../public/assets/icons/IconUp.jsx'
import IconRowDown from '../../public/assets/icons/IconRowDown.jsx'
import IconCheck from '../../public/assets/icons/IconCheck.jsx'

const ShoppingCart = ({cartItems,setCartItems,enterMessage}) => {
    const [quantities, setQuantities] = useState({});
    const [viewAside, setViewAside] = useState(false);
    const [confirmPurchase, setConfirmPurchase] = useState(false);
    const [successFulConfirmation, setSuccessFulConfirmation] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const handleDecrement = (productId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
        }));
    };

    const handleIncrement = (productId) => {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [productId]: (prevQuantities[productId] || 0) + 1,
        }));
    };

    const handleRemove = (productId) => {
        const updatedCartItems = cartItems.filter((product) => product.id !== productId);
        setCartItems(updatedCartItems);
    };

    const handleViewAside = ()=> {
        setViewAside(!viewAside)
    }

    const subtotal = cartItems.reduce((acc, product) => {
        return acc + (quantities[product.id] || 1) * product.price;
    }, 0);

    const shipping = cartItems.length > 0 ? 5.00 : 0;
    const total = subtotal + shipping;

    const handlePurchase = ()=> {
        if(cartItems.length <= 0){
            return enterMessage('Please add products to cart')
        }
        setConfirmPurchase(!confirmPurchase)
        if(!confirmPurchase){
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'auto'
        }
    }

    const handleConfirmPurchase = () => {
        const currentPurchase = {
          date: new Date().toLocaleString(),
          products: [...cartItems],
          total,
        };

        const previousPurchases = JSON.parse(localStorage.getItem('totalProducts')) || [];
        const updatedPurchases = [...previousPurchases, currentPurchase];
        localStorage.setItem('totalProducts', JSON.stringify(updatedPurchases));

        setSuccessFulConfirmation(true);
        if(successFulConfirmation) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'auto'
        }
        setCartItems([]);
    };


    useEffect(() => {
        let timeoutId;

        if (confirmPurchase && successFulConfirmation) {
          timeoutId = setTimeout(() => {
            setShowLoading(true);
          }, 2000);
        }

        return () => {
          clearTimeout(timeoutId);
        };
    }, [confirmPurchase, successFulConfirmation]);

    return (
        <section className='lg:pl-20 mb-20 lg:mb-0 flex lg:justify-start m-auto max-w-[2000px]'>
            <div className='w-full py-20 px-5 lg:px-20'>
                <header className='flex justify-between items-center border-b-2 pb-5 mb-5'>
                    <h2  className='text-black text-2xl font-bold'>Shopping Cart</h2>
                    <p className='font-bold text-xl'>{cartItems.length} Items</p>
                </header>
                <footer>
                    <ul className={`font-medium mb-5 ${styles.gridContainer}`}>
                        <li>
                            <p>Product details</p>
                        </li>
                        <li>
                            <p>Quantity</p>
                        </li>
                        <li>
                            <p>Price</p>
                        </li>
                        <li>
                            <p>Total</p>
                        </li>
                        <li>
                            <p>Remove</p>
                        </li>
                    </ul>
                    <div className='flex flex-col gap-4'>
                        {cartItems.map((product) => (
                            <ul key={product.id} className={`bg-white rounded-3xl ${styles.gridContainerTwo} relative`}>
                                <li>
                                    <img src={product.image} className='h-[60px] lg:h-[120px] rounded-3xl' />
                                    <p className='text-xs lg:text-sm'>{product.name}</p>
                                </li>
                                <li className='w-full'>
                                    <button onClick={() => handleDecrement(product.id)} className='font-black text-2xl'>
                                        -
                                    </button>
                                    <p className='border px-2 rounded-3xl border-[#aaa]'>{quantities[product.id] || 1}</p>
                                    <button onClick={() => handleIncrement(product.id)} className='font-black text-xl'>
                                        +
                                    </button>
                                </li>
                                <li>
                                    <p>${product.price}</p>
                                </li>
                                <li>
                                    <p>${(quantities[product.id] || 1) * product.price}</p>
                                </li>
                                <li>
                                    <IconClose styles='w-[20px] h-[20px] cursor-pointer' onClick={() => handleRemove(product.id)} />
                                </li>
                            </ul>
                        ))}
                        {cartItems.length <= 0 && (
                            <p className='mt-28 m-auto text-[#bbb]'>Your shopping cart is empty</p>
                        )}
                    </div>
                </footer>
            </div>
            <aside className={`${styles.aside} bg-white py-5 px-10 fixed w-full lg:w-1/4 bottom-16 lg:bottom-0 lg:right-10 ${viewAside ? styles.viewAside : ''}`}>
                <header className='flex justify-between'>
                    <p className='font-bold text-xl'>Order summary</p>
                    <div onClick={handleViewAside} className='h-max w-max'>
                        {!viewAside ? <IconUp  styles='cursor-pointer h-[30px] w-[30px]'/> : <IconRowDown  styles='cursor-pointer h-[30px] w-[30px]'/>}
                    </div>
                </header>
                {viewAside && (
                    <footer className={`flex flex-col items-center justify-around py-5 lg:justify-center lg:gap-7 h-full${viewAside ? '' : ''}`}>
                        <ul>
                            <li><p className='text-xl font-semibold'>Subtotal:</p></li>
                            <li><p className='text-xl font-semibold'>${subtotal}</p></li>
                        </ul>
                        <ul>
                            <li><p className='text-xl font-semibold'>Shipping:</p></li>
                            <li><p className='text-xl font-semibold'>${shipping}.00</p></li>
                        </ul>
                        <ul>
                            <li><p className='text-xl font-bold'>Total:</p></li>
                            <li><p className='text-xl font-bold'>${total}</p></li>
                        </ul>
                        <button className='py-4 bg-black text-white font-semibold w-full' onClick={handlePurchase}>Continue</button>
                    </footer>
                )}
            </aside>
             {confirmPurchase && (
                <div className='fixed flex items-center justify-center w-full h-full top-0 left-0 bg-[#0006] z-10'>
                    <div className='bg-white py-5 lg:py-10 w-[350px] px-10 lg:w-[400px] rounded-3xl flex flex-col items-center gap-2'>
                        {!successFulConfirmation ? (
                            <>
                                <p className='font-semibold'>Confirm purchase?</p>
                                <p className='text-[#999]'>This is just a test example. In a real scenario, actual payment methods would be used.</p>
                                <ul className='flex gap-2 mt-3'>
                                    <li className=''>
                                        <button className='px-10 py-4 font-semibold border border-black' onClick={handlePurchase}>Cancel</button>
                                    </li>
                                    <li className=''>
                                        <button className='px-10 py-4 bg-black text-white font-semibold border border-black' onClick={handleConfirmPurchase}>Continue</button>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <div className={`flex text-4xl font-bold h-40 w-full items-center ${styles.loadingContainer}`}>
                                {!showLoading ? (
                                    <div className='flex justify-center items-center w-full'>
                                        <span>.</span>
                                        <span>.</span>
                                        <span>.</span>
                                    </div>
                                ) : (
                                    <div className='flex flex-col w-full items-center justify-center px-5 h-full'>
                                        <IconCheck />
                                        <p className='text-xl mt-1 mb-5'>Successful purchase!</p>
                                        <button className='text-sm bg-black text-white w-full py-4' onClick={()=> setConfirmPurchase(false)}>Confirm</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

export default ShoppingCart;