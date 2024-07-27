import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ProductDatals from '../ProductDatals/ProductDatals';
import { useQuery } from '@tanstack/react-query';
import uesHookCallApi from '../../Hooks/useHookCallApi';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';




// const [Api, setApi] = useState([]);

// function getApi() {

//     axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//         .then(({ data }) => {

//             setApi(data?.data)
//             // console.log(data?.data);

//         })
//         .catch((error) => { })

// }




// useEffect(() => {


//     getApi()


// }, [])

 // function recentProduct() {
    //     return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    // }

    // let { data, error, isError, isLoading, isFetched } = useQuery({
    //     queryKey: ['recentProducts'],
    //     queryFn: recentProduct,
    //     refetchInterval: 5000,
    //     refetchIntervalInBackground:true,

    //     staleTime: 3000,
    // })  

export default function ProductHome() {

   let { addToCart , setCart } = useContext(CartContext);


  async function addProductToCaret(productId){

       let respons = await addToCart(productId);
       if(respons?.data?.status === "success"){

        setCart(respons.data)
        // console.log(respons.data );
        toast.success(`Product added successfully to your cart`, {
            icon: '👏',
            style:{
                borderRadius: '10px',
                color:'white',
                backgroundColor:'green'
            }
        })
       }
       else{
        toast.error(`Invalid Token. please login again ` )
       }


   }





    let {data , error , isError , isLoading , isFetched } = uesHookCallApi();



    if (isLoading ) {
        return <div className='flex justify-center items-center my-32'><span className="loader "></span></div>
    }


    if (isError) {
        return <div className='flex justify-center items-center'><h1 className='text-3xl font-bold'>{error.message}</h1></div>
    }






    return <>

        <div className='row mt-16 '>
            {data.map((prod) => <div key={prod?.id} data-aos="zoom-in" data-aos-duration="1000" className='  md:w-1/3 xl:w-1/5 lg:w-1/4 p-3 rounded-lg'>
                <div className='product py-4 shadow-md hover:scale-105 transition-all mx-auto px-4'>
                    <Link to={`/productdetals/${prod?.id}/${prod?.category?.name }`} >
                        <img className='w-full' src={prod.imageCover} alt={prod.title} />
                        <span className='block mb-2 font-light text-green-600'>{prod?.category?.name }</span>
                        <h3 className='text-lg mb-2 font-normal'>{prod?.title?.split(' ').slice(0, 2).join(' ')}</h3>
                        <div className='flex  justify-between items-center'>
                            <span>{prod.price} EGP</span>
                            <span>{prod.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
                        </div>
                    </Link>
                        <div>
                            <button onClick={()=>addProductToCaret(prod.id)} className='btn'> Add To Cart</button>
                        </div>
                </div>
            </div>)}

        </div>


    </>
}
