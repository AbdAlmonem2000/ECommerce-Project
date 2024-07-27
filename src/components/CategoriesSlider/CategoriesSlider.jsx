import React from 'react';
import Style from './CategoriesSlider.module.css';
import axios from 'axios';
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import uesHookCallApi from '../../Hooks/useHookCallApi';


export default function CategoriesSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024, // For screens less than 1024px wide
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For screens less than 768px wide
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For screens less than 480px wide
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function fetchCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['recentCategories'],
    queryFn: fetchCategories,
    refetchInterval: 5000,
    staleTime: 3000,
    refetchIntervalInBackground: true,
  });



 

  if (isError) {
    return <div className='flex justify-center items-center'><h1 className='text-3xl font-bold'>{error.message}</h1></div>;
  }


  return <>
    <div className=''>
      <h1 data-aos="zoom-in" data-aos-duration="1000" className='text-green-600 text-3xl font-bold p-8'>Shop Popular Categories</h1>
      <Slider className='w-[95%] mx-auto' {...settings}>
        {data?.data?.data .map((cate) => (
          <div data-aos="zoom-in" data-aos-duration="1000" key={cate?.name } className=''>
            <div className=''>
              <img className='h-image rounded-none' src={cate?.image} alt={cate?.name } />
              <p className='text-center'>{cate?.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </>;
}
