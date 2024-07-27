import React, { useContext, useEffect, useState } from 'react';
import Style from './ProductDatals.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import uesHookCallApi from '../../Hooks/useHookCallApi';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDatals() {

  let { id, category } = useParams();
  const { addToCart } = useContext(CartContext);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green", borderRadius: "5px", padding: "20px", marginLeft: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green", borderRadius: "5px", padding: "20px", marginRight: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    focusOnSelect: true,

    responsive: [
      {
        breakpoint: 1024, // For screens less than 1024px wide
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For screens less than 768px wide
        settings: {
          slidesToShow: 1,
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

  const [ProductDetales, setProductDetales] = useState(null);
  const [RelatedProduct, setRelatedProduct] = useState([]);

  function getProductDetales(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetales(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getRelatedProduct(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        let filteredProducts = allProducts.filter((product) => product.category.name === category);
        setRelatedProduct(filteredProducts);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getProductDetales(id);
    getRelatedProduct(category);
  }, [id, category]);

  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      toast.success(`Product added successfully to your cart`, {
        icon: '👏',
        style: {
          borderRadius: '10px',
          color: 'white',
          backgroundColor: 'green'
        }
      });
    } else {
      toast.error(`Invalid Token. Please login again`);
    }
  }

  return (
    <>
      <div className='row 'data-aos="zoom-out-up" data-aos-duration="1000">
        <div className='xl:w-[30%] lg:w-[30%] w-[90%] p-10'>
          <Slider className='w-full p-10 mx-auto' {...settings}>
            {ProductDetales?.images.map((src) => <img key={ProductDetales?.id} className='w-full rounded-lg' src={src} alt={ProductDetales?.title} />)}
          </Slider>
        </div>
        <div className='lg:w-[70%] mt-3 p-6'>
          <h1 className='text-lg font-normal text-gray-950'>{ProductDetales?.title}</h1>
          <p className='text-gray-600 mt-4 font-light'>{ProductDetales?.description}</p>
          <div className='flex justify-between items-center mt-4'>
            <span>{ProductDetales?.price} EGP</span>
            <span>{ProductDetales?.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
          </div>
          <div>
            <button onClick={() => addProductToCart(ProductDetales?.id)} className='btn'>Add To Cart</button>
          </div>
        </div>
      </div>

      <Slider className='w-[90%] mx-auto p-7' {...settings2}>
        {RelatedProduct.map((prod) => (
          <div key={prod.id} className='p-2'>
            <div className='product py-4 shadow-md hover:scale-105 transition-all mx-auto px-5'>
              <Link to={`/productdetals/${prod.id}/${prod.category.name}`}>
                <img className='w-full' src={prod.imageCover} alt={prod.title} />
                <span className='block mb-2 font-light text-green-600'>{prod.category.name}</span>
                <h3 className='text-lg mb-2 font-normal'>{prod.title.split(' ').slice(0, 2).join(' ')}</h3>
                <div className='flex justify-between items-center'>
                  <span>{prod.price} EGP</span>
                  <span>{prod.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
                </div>
                <div>
                  <button onClick={() => addProductToCart(prod.id)} className='btn'>Add To Cart</button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}
