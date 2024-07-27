import React, { useEffect, useState } from 'react';
import Style from './Notfound.module.css';
import i4o4 from'../../assets/images/404.png'


export default function Notfound() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
    <img data-aos="zoom-in" data-aos-duration="1000" className=' ' src={i4o4} alt="no found page" />
  </>
}
