import React, { useEffect, useState } from 'react';
import Style from './Footer.module.css';


export default function Footer() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {

  }, []);
  return <>




    <footer className='bg-gray-100 py-16 dark:text-white dark:bg-gray-700'>
      <div className='ml-20 my-6'>

      <h2>Get The Fresh Cart App</h2>
      <small className='text-gray-400'>We will send you a link, open it on your phone to download the app</small>

      </div>
      
      <form className="w-[90%] mx-auto ">
        <div className="mb-5 flex justify-around">
          <input type="email" id="email" className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-3/4 p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
          <button type="submit" className="text-white md:w-2/12 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Share App Link</button>
        </div>
      </form>
    </footer>



  </>
}
