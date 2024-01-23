import React, { useState, useEffect } from 'react';
import styles from './styles/Header.module.css';
import IconClose from '../../public/assets/icons/IconClose.jsx';
import IconGoogle from '../../public/assets/icons/IconGoogle.jsx';
import IconGitHub from '../../public/assets/icons/IconGitHub.jsx';
import IconLogOut from '../../public/assets/icons/IconLogOut.jsx';

const Header = ({ enterMessage,setCartItems }) => {
  const userId = localStorage.getItem('userId');
  const [showModal, setShowModal] = useState(false);
  const [showModalAccount, setShowModalAccount] = useState(false);

  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [surName, setSurName] = useState('');
  const [surNameError, setSurNameError] = useState('');

  const [loggedIn, setLoggedIn] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setUserName('');
    setShowModalAccount(false);
  };

  const modalAccount = () => {
    setShowModalAccount(true);
  };

  const createAccount = (e) => {
    e.preventDefault();
    setUserNameError('')
    setSurNameError('')

    if (!userName.trim()) {
      return setUserNameError('Enter a valid name');
    } else if((!surName.trim())) {
      return setSurNameError('Enter a valid surname');
    }

    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(userName)) {
      return setUserNameError('Enter a valid name');
    } else if (!namePattern.test(surName)) {
      return setSurNameError('Enter a valid surname');
    }

    if (userName.includes(' ') || userName.length <= 2) {
      return setUserNameError('Enter a valid name');
    } else if (surName.includes(' ') || surName.length <= 2) {
      return setSurNameError('Enter a valid surname');
    }

    const date = new Date()
    const creationDate = date.toLocaleString();
    localStorage.setItem('userId', userName);
    localStorage.setItem('surNameId', surName);
    localStorage.setItem('date', creationDate);
    localStorage.setItem('logIn', true);

    closeModal();
    enterMessage('Registration successful!');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userCreationDate');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('logIn');
    localStorage.removeItem('totalProducts');
    setCartItems([])
    setLoggedIn(false);
  };

  useEffect(() => {
    if (userId) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [userId]);

  return (
    <>
      <header className="absolute md:pl-20 z-10 w-full top-10">
        <nav className='flex justify-end px-5 lg:px-10 items-center'>
          {!loggedIn ? (
            <button className='bg-white text-black px-7 py-3 rounded-3xl' onClick={openModal}>Sign Up</button>
          ) : (
            <button onClick={handleLogout} className={`bg-white text-black px-7 py-3 rounded-3xl flex gap-2 items-center ${styles.logOut}`}>Log Out<IconLogOut /></button>
          )}
        </nav>
      </header>
      {showModal && (
        <div className={styles.modal}>
          <button onClick={closeModal}><IconClose styles="absolute top-12 lg:right-16 right-10 text-[#000]" /></button>
          {!showModalAccount ? (
            <div className={styles.container}>
              <p className='text-xl mx-auto mb-10 font-bold'>Welcome to my app!</p>
              <div className={styles.firstDiv}>
                <button onClick={modalAccount}>Test Account</button>
              </div>
              <div className={styles.lastDiv}>
                <button><IconGoogle />Continue with Google</button>
                <button><IconGitHub />Continue with GitHub</button>
                <p>Do you already have an account?</p>
              </div>
            </div>
          ) : (
            <form className={styles.container}>
              <p className='text-xl mx-auto font-bold'>Create your account</p>
              <p className='text-medium  mb-10 font-semibold'>Don't worry, we won't do anything with your sensitive data :)</p>
              <div className='flex flex-col gap-5 relative'>
                {userNameError && (
                  <p className='text-medium font-semibold absolute -top-8 text-red-400'>{userNameError}</p>
                )}
                {surNameError && (
                  <p className='text-medium font-semibold absolute -top-8 text-red-400'>{surNameError}</p>
                )}
                <input
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value)
                    setUserNameError('')
                  }}
                />
                <input
                  type="text"
                  placeholder="Surname"
                  value={surName}
                  onChange={(e) => {
                    setSurName(e.target.value)
                    setSurNameError('')
                  }}
                />

              </div>
              <button className='bg-black text-white py-4 font-semibold rounded-full' onClick={(e) => createAccount(e)}>Create Account</button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default Header;