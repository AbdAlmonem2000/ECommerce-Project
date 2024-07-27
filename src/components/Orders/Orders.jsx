import React, { useContext, useEffect, useState } from 'react';
import Style from './Orders.module.css';
import image from '../../assets/images/blog-img-2.jpeg'
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../../Context/userContext';
import axios from 'axios';
import i4o4 from'../../assets/images/404.png'




export default function Orders() {

  // const { UserLogin } = useContext(UserContext);
  // const [orders, setOrders] = useState([]);


  // let { id } = jwtDecode(UserLogin);

  // const getAllOrders = (userId) => {
  //   const headers = {
  //     Authorization:localStorage.getItem('userToken'),
  //   };

  //   axios.get(`https://ecommerce.routemisr.com/api/v1/orders/${userId}`, { headers })
  //     .then(({ data }) => {
  //       setOrders(data?.data);
  //       console.log(data?.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // getAllOrders(id);



  return <>
  <img data-aos="zoom-in" data-aos-duration="1000" className=' ' src={i4o4} alt="no found page" />
</>
}
