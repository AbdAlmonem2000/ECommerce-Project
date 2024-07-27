import React from 'react';
import Style from './Categories.module.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


export default function Categories() {

  function recentcategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  let { data, error, isError, isLoading, isFetched } = useQuery({
    queryKey: ['recentcategories'],
    queryFn: recentcategories,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    select: (data) => data?.data?.data,
    staleTime: 3000,
  });

  if (isLoading) {
    return <div className='flex justify-center items-center my-96'><span className="loader "></span></div>
  }


  if (isError) {
    return <div className='flex justify-center items-center'><h1 className='text-3xl font-bold'>{error.message}</h1></div>
  }

  return (

    <div>


      <div>
        <h1 data-aos="zoom-in-up" data-aos-duration="1000" className='text-green-600 text-3xl font-bold p-8'>Shop Popular Categories</h1>

      </div>

      <div className='my-16 row'>

        {data && data.map((cate) => (
          <div data-aos="zoom-in-down" data-aos-duration="1000" className='md:w-1/3 xl:w-1/5 lg:w-1/4 p-3 hover:scale-105 transition-all hover:bg-gray-100 rounded-md' key={cate._id}>
            <img className='w-full rounded-none h-[300px]' src={cate.image} alt={cate?.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
