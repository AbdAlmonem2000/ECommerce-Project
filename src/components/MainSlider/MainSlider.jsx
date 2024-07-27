import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Style from './MainSlider.module.css';
import maineSlider from '../../assets/images/slider-image-3.jpeg'
import maineSlider1 from '../../assets/images/slider-image-2.jpeg'
import maineSlider2 from '../../assets/images/slider-image-1.jpeg'
import Slider1 from '../../assets/images/blog-img-1.jpeg'
import Slider2 from '../../assets/images/blog-img-2.jpeg'



export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false,
  };
  return <>

  <div className='row mt-2 '>
    <div className='w-3/4'>
      <Slider className=''  {...settings}>
        <img src={maineSlider} className='w-full  rounded-s-md rounded-none h-[400px]' />
        <img src={maineSlider1} className='w-full rounded-s-md  rounded-none h-[400px]' />
        <img src={maineSlider2} className='w-full rounded-s-md  rounded-none h-[400px]' />
      </Slider>
    </div>
    <div className='w-1/4'>
    <img src={Slider1} className='w-full rounded-none h-[200px] ' />
    <img src={Slider2} className='w-full rounded-none h-[200px]' />
    </div>
  </div>

    

  </>
}
