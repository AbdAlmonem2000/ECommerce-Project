import React, { useEffect, useState } from 'react';
import Style from './Home.module.css';
import ProductHome from '../ProductHome/ProductHome';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';




export default function Home() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
return <>
    <MainSlider/>
    <CategoriesSlider/>
    <ProductHome/>
  </>
}
