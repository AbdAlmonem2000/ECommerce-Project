import React, { useEffect, useState } from 'react';
import Style from './BrandDatals.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function BrandDatals() {
  let { id ,category} = useParams();
  const [Brand, setBrand] = useState(null);


  function getBrandDatals(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then(({ data }) => { setBrand(data.data) })
      .catch((err) => { console.log(err); });
  }




  
  useEffect(() => {
    getBrandDatals(id);
  }, [id]);

  return (
    <div className='row mt-16 h-[100vh]'>
      {Brand && (<div key={Brand._id} className='md:w-1/3 xl:w-1/5 lg:w-1/4 p-3 rounded-lg'>
          <div className='branduct py-4 shadow-md hover:scale-105 transition-all mx-auto px-4'>
            <div  >
              <img className='w-full' src={Brand.image} alt={Brand.name} />
              <h3 className='text-lg mb-2 font-normal'>{Brand.slug}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
