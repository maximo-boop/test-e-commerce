import React, { useState, useRef, useEffect } from 'react';
import CardProducts from './CardProducts.jsx';
import IconDown from '../../public/assets/icons/IconDown.jsx';
import IconBack from '../../public/assets/icons/IconBack.jsx';
import styles from './styles/Garments.module.css';
import { Link } from 'react-router-dom';

const Caps = ({ ProductsJson, type, setCartItems, cartItems, enterMessage }) => {
  let capsProducts = ProductsJson.filter((product) => product.type === type);
  const [showOptions, setShowOptions] = useState(false);
  const [filters, setFilters] = useState({ operation: 'Higher price' });
  const modalRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && event.target !== buttonRef.current) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const showModal = () => {
    setShowOptions(!showOptions);
  };

  const handleOperationChange = (value) => {
    setFilters({ ...filters, operation: value });
    setShowOptions(!showOptions)
  };

  const sortOptions = {
    'Higher price': (a, b) => b.price - a.price,
    'Lower price': (a, b) => a.price - b.price,
    'More relevant': (a, b) => b.description.length - a.description.length,
  };

  if (sortOptions[filters.operation]) {
    capsProducts = [...capsProducts].sort(sortOptions[filters.operation]);
  }

  return (
    <section className={`md:ml-20 ${styles.caps}`}>
      <div className={styles.div}>
          <Link to='/products' className='bg-white px-5 py-2 rounded-3xl flex items-center gap-1'>
            <IconBack />Back
          </Link>
          <button className='bg-white px-5 py-2 rounded-3xl flex items-center gap-1' onClick={showModal} ref={buttonRef}>
            {filters.operation}
            <IconDown />
          </button>
        {showOptions && (
          <div id='options' className='absolute top-12 flex flex-col bg-white px-5 py-3 rounded-xl z-10 right-0' ref={modalRef}>
            <p className='py-2 px-3 font-semibold'>Filter by:</p>
            <button className={`${styles.button}`} onClick={() => handleOperationChange('More relevant')}>
              More relevant
            </button>
            <button className={`${styles.button}`} onClick={() => handleOperationChange('Higher price')}>
              Higher price
            </button>
            <button className={`${styles.button}`} onClick={() => handleOperationChange('Lower price')}>
              Lower price
            </button>
          </div>
        )}
      </div>
      <ul className={styles.ul}>
        {capsProducts.map((product) => (
          <CardProducts key={product.id} product={product} setCartItems={setCartItems} cartItems={cartItems} enterMessage={enterMessage} />
        ))}
      </ul>
    </section>
  );
};

export default Caps;