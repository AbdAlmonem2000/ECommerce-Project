import React from 'react';
import Style from './Brands.module.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function Brands() {
  function recentBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  let { data, error, isError, isLoading, isFetched } = useQuery({
    queryKey: ['recentbrand'],
    queryFn: recentBrands,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    select: (data) => data?.data?.data,
    staleTime: 3000,
  });

  if (isLoading) {
    return <div className='flex justify-center items-center mt-64 my-96'><span className="loader"></span></div>;
  }

  if (isError) {
    return <div className='flex justify-center items-center'><h1 className='text-3xl font-bold'>{error.message}</h1></div>;
  }

  // console.log('Fetched data:', data);

  return (


    <div >

      <div>
        <h1 data-aos="zoom-in-up" data-aos-duration="1000" className='text-green-600 text-3xl font-bold p-8 text-center'>Shop Popular Brands</h1>

      </div>

      <div className='my-16 row'>

        {data && data?.length > 0 ? (
          data.map((prand) => (
            <div className='md:w-1/3 xl:w-1/5 lg:w-1/4 p-3 hover:scale-105 transition-all hover:bg-gray-100 rounded-md' data-aos="zoom-in-up" data-aos-duration="1000" key={prand._id}>
              <Link to={`/branddatals/${prand._id}`}>
                <div>
                  <img className='w-full rounded-none' src={prand.image} alt={prand.name} />
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h1 className='text-8xl text-center my-96'>Not Found </h1>
        )}
      </div>
    </div>
  );
}
