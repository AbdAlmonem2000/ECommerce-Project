import React, { useContext, useEffect, useState } from 'react';
import Style from './Login.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';



export default function Login() {

  const [Erorr, setErorr] = useState('');
  const [Spiner, setSpiner] = useState(false);

  let { setUserLogin } = useContext(UserContext);


  let navigat = useNavigate()


  let validationSchema = yup.object().shape({

    email: yup.string().email('the email is not valid').required('the email is required'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'the password is not valid').required('the password is required'),
  })


  function handelLogin(formikValues) {


    setSpiner(true);

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formikValues)
      .then((apiResponse) => {
        if (apiResponse.data.message === 'success') {

          setUserLogin(apiResponse.data.data);

          localStorage.setItem('userToken', apiResponse.data.token);

          navigat('/');

          setSpiner(false);
        }
      })
      .catch(
        (apiResponse) => {


          setSpiner(false);


          setErorr(apiResponse?.response?.data?.message)


            ;
        }
      )





  }



  let formik = useFormik({
    initialValues: {

      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handelLogin
  })


  return <>





    <div data-aos="zoom-in-right" data-aos-duration="1000" className='pt-52  max-w-xl px-10 mx-auto h-[100vh] '>
      <h1 className='text-green-600 font-bold py-5 text-3xl'>Login now</h1>
      <form onSubmit={formik.handleSubmit}>




        {Erorr ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{Erorr}</span>
        </div> : null}







        <div className="relative z-0 w-full mb-5 group">
          <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" id="email" className="block py-2.5 px-0 w-full text-sm rounded-b-md text-green-600  bg-transparent border-0  border-b-2 border-green-600  appearance-none dark:text-gray-800 dark:border-green-600  dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium left-5 absolute text-sm text-green-600  dark:text-green-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email : </label>
        </div>

        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.email}</span>
        </div> : null}

        <div className="relative z-0 w-full mb-5 group">
          <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password" id="password" className="block py-2.5 px-0 w-full text-sm rounded-b-md text-green-600  bg-transparent border-0  border-b-2 border-green-600  appearance-none dark:text-gray-800 dark:border-green-600  dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium left-5 absolute text-sm text-green-600  dark:text-green-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password : </label>
        </div>

        {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.password}</span>
        </div> : null}



        <div className='flex justify-start items-center'>
          <button type="submit" className="text-white me-5 bg-green-700 hover:bg-green-800 focus:ring-4  focus:outline-none focus:ring-green-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {Spiner ? <i className="fa-solid fa-rotate"></i> : 'Login'}
          </button>

          <Link to={'/register'}> GO TO  <span className='hover:text-green-900 text-green-700 font-semibold'>REGISTER</span> </Link>
          <Link to={'/ForgotPasswords'} className="hover:text-green-900 text-green-700 font-semibold pl-4">FORGET PASSWORD </Link>

        </div >


      </form>



    </div>

  </>
}
