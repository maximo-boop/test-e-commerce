import React from 'react';
import styles from './styles/Hero.module.css'
import Header from './Header.jsx'
import { Link } from 'react-router-dom'
import IconRight from '../../public/assets/icons/IconRight.jsx'
import IconGmail from '../../public/assets/icons/IconGmail.jsx'
import IconWshp from '../../public/assets/icons/IconWhsp.jsx'
import IconIg from '../../public/assets/icons/IconIg.jsx'

const Hero = ({enterMessage,setCartItems}) => {
    return (
        <>
            <Header enterMessage={enterMessage} setCartItems={setCartItems}/>
            <div className='lg:pl-20'>

                <main className={`flex items-center justify-around py-20 px-5 lg:px-20 flex-col ${styles.main}`}>

                    <div className='text-white z-0'>
                        <h1 className='text-2xl lg:text-5xl font-bold'>FIND YOUR UNIQUE STYLE</h1>
                        <h2 className='text-xl lg:text-2xl'>Your Style, Our Passion!</h2>
                    </div>

                    <div className="flex gap-5 font-bold text-sm lg:text-base">
        	            <Link to='/products' className={`text-white border-2 ${styles.button}`} aria-label="Explore our collection">EXPLORE OUR COLLECTION<IconRight /></Link>
                    </div>

                    <ul className='flex flex-col gap-2 absolute right-10 items-center'>
                        <li className={styles.firstChild}>
                            <a href="mailto:maximo2004lfn@gmail.com?subject=Tus Servicios&body=Hola, me interesan tus servicios" aria-label='Contact me by gmail'>
                                <IconGmail className='animation-delay-2' />    
                            </a>
                        </li>
                        <li className={styles.secondChild}>
                            <a href="https://wa.me/5493512377435?text=Hola%2C%20me%20interesan%20tus%20servicios" aria-label='Contact me by whatsapp'>
                                <IconWshp />
                            </a>
                        </li>
                        <li className={styles.lastChild}>
                            <a href="#" aria-label='Contact me by instagram'>
                                <IconIg style={styles.lastChild} />    
                            </a>
                        </li>
                    </ul>

                </main>
            </div>
        </>
    );
};

export default Hero;
