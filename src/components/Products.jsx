import React from 'react';
import { Link } from 'react-router-dom'
import styles from './styles/Products.module.css'

const Products = ({ProductsJson}) => {

    let renderedProductTypes = {};

    return (
        <section className='flex flex-col lg:ml-20 lg:pb-0 pb-20 items-center justify-center min-h-screen text-white'>

            <ul className={styles.gridProducts}>
                {ProductsJson.map(product => {
                    if (product.type && !renderedProductTypes[product.type]) {

                        renderedProductTypes[product.type] = true;

                        return (
                            <Link to={product.type} key={product.id}>
                                <div style={{ background: `url(${product.image})`, backgroundSize:'contain',backgroundPosition:'center'}}>
                                    <h3>{product.type.toUpperCase()}</h3>
                                </div>
                            </Link>
                        );
                    }
                    return null;
                })}
            </ul>
        </section>
    );
};

export default Products;