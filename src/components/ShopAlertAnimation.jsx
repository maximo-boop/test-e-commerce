import React, {useEffect,useState} from 'react';
import IconShopAlert from '../../public/assets/icons/IconShopAlert.jsx'
import styles from './styles/ShopAlertAnimation.module.css'

const ShopAlertAnimation = () => {
  const [iconAnimation,setIconAnimation] = useState(false)

    useEffect(()=>{
      setIconAnimation(true)
    },[])

    return (
      <div className={`${iconAnimation} ? ${styles.shake} : ''`}>
        <IconShopAlert />
      </div>
    );
}

export default ShopAlertAnimation;