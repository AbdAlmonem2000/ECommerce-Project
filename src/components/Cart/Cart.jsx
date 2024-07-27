import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function Cart() {
  const [CartDetails, setCartDetails] = useState(null);

  let { getCart, removeItem, updateItem , setCart} = useContext(CartContext);




  async function getProductToCart() {
    let respons = await getCart();
    setCartDetails(respons?.data);
    setCart(respons?.data)

  }

  async function removeCartItem(productId) {
    let respons = await removeItem(productId);
    setCartDetails(respons?.data);
    setCart(respons?.data)
  }

  async function updateCartItem(productId, count) {
    if (count < 1) return;

    let respons = await updateItem(productId, count);
    setCartDetails(respons?.data);
    setCart(respons?.data)

  }

  useEffect(() => {
    getProductToCart();
  }, []);

  return (
    <div className="relative overflow-x-auto dark:bg-gray-800 dark:text-gray-400">
      {CartDetails?.data.products.length > 0 ? (
        <table className="w-[90%] mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

          <tbody>
            {CartDetails?.data.products.map((prod) => (
              <tr data-aos="zoom-in-left" data-aos-duration="1000" key={prod.product.id} className="bg-white border-b-2  dark:bg-gray-800 dark:border-gray-700 ">
                <td className="py-4">
                  <img src={prod.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                </td>
                <td className="py-4 font-semibold text-gray-900 dark:text-white">
                  {prod.product.title.split(' ').slice(0, 2).join(' ')}
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <button onClick={() => updateCartItem(prod.product.id, prod.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Decrease quantity</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <div>
                      <span>{prod.count}</span>
                    </div>
                    <button onClick={() => updateCartItem(prod.product.id, prod.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Increase quantity</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="py-4 font-semibold text-gray-900 dark:text-white">
                  {prod.price} EGP
                </td>
                <td className="py-4">
                  <span onClick={() => removeCartItem(prod.product.id)} className="font-medium cursor-pointer text-red-600 dark:text-red-500 "><i className="fa-regular fa-trash-can text-2xl"></i></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      ) : (
        <h1 className='text-8xl text-center my-96'>Not Found </h1>
      )}
      <Link  to={`/orderUsers/` + CartDetails?.data._id}>
        <button className="btn">Check Out<i className="ms-3 text-2xl fa-solid fa-money-check-dollar"></i></button>
      </Link>
    </div>

  );
}
