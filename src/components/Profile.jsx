import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconEdit from '../../public/assets/icons/IconEdit.jsx';

const Profile = () => {

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const totalProducts = JSON.parse(localStorage.getItem('totalProducts'));  
  const date = localStorage.getItem('date');
  const login = localStorage.getItem('logIn');
  const [edition, setEdition] = useState(false);
  const [userData, setUserData] = useState({
    Username: localStorage.getItem('userId') && capitalizeFirstLetter(localStorage.getItem('userId')),
    Surname: localStorage.getItem('surNameId') && capitalizeFirstLetter(localStorage.getItem('surNameId')),
    number: '123456789',
    email: 'username@gmail.com',
  });

  const handleInputChange = (field, value) => {
    if (field === 'Username' || field === 'Surname') {
      value = value.trim();
      if (/^\s/.test(value) || /\d/.test(value) || value.length > 10) {
        return;
      }
      value = capitalizeFirstLetter(value);
    }

    if (field === 'number'){
       if (!/^\d*$/.test(value) || value.length > 11) {
            return;
        }
    }

    if (field === 'email') {
        if(value.length > 30) {
            return
        }
    }

    setUserData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  }

  const handleEdition = ()=> {
    if(userData.Username.length <= 2 || userData.Surname.length <= 2) {
      return
    }
    setEdition(!edition)
    localStorage.setItem('userId', userData.Username)
    localStorage.setItem('surNameId', userData.Surname)
  }

  return (
    <section className='flex flex-col w-full h-full min-h-screen items-center justify-center max-w-screen-xl m-auto gap-10 lg:pl-32 lg:pr-10 py-10 pb-24 lg:pb-10 px-5 lg:px-10'>
      <div className='flex flex-col h-full w-full relative justify-center'>
        {login ? (
          <>
            <ul className='grid grid-cols-3 rounded-3xl w-full mb-10 py-10 px-5 lg:px-10 bg-white font-semibold'>
              <li>
                <IconEdit metod={handleEdition} edition={edition} />
              </li>
              <li className='text-end col-start-2 col-span-3'>
                <span className='text-xl lg:text-3xl font-bold'>{userData.Username} {userData.Surname}</span>
              </li>
              {['Username', 'Surname', 'number', 'email'].map((field) => (
                <React.Fragment key={field}>
                  <li className='w-min col-start-1'>{capitalizeFirstLetter(field)}</li>
                  <li className='text-end w-full col-start-2 col-span-3'>
                    {edition ? (
                      <input
                        type="text"
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        value={userData[field]}
                        className='outline-red-200 w-min text-red-400 text-end w-full'
                      />
                    ) : (
                      <p>{userData[field]}</p>
                    )}
                  </li>
                </React.Fragment>
              ))}
              <li>
                Creation date
              </li>
              <li className='text-end col-start-2 col-span-3'>
                {date}
              </li>
            </ul>

            <div className='flex flex-col gap-2 bg-white rounded-3xl p-10 font-semibold h-full min-h-[300px]'>
                  <p className='font-bold text-black text-2xl whitespace-nowrap mb-2'>Shopping history</p>
                {!totalProducts ? (
                  <div className='m-auto'>
                    <p className='text-gray-400 font-normal'>
                      No purchase history
                    </p>
                  </div>
                ) : (
                  totalProducts.map((product,index)=> (
                    <ul key={index} className='grid grid-cols-4 border-b border-b-gray-100 rounded-md py-2 items-center font-normal'>
                      <li className='col-start-1 col-span-2'>Products: {product.products.length}</li>
                      <li className='font-semibold'>${product.total}</li>
                      <li>{product.date}</li>
                    </ul>
                  ))
                )}
            </div>
          </>
        ) : (
          <div className='flex flex-col gap-5 items-center justify-center'>
            <span className='text-[#bbb]'>Not User</span>
            <Link to='/'>You need an account</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
