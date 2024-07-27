import React, { useContext, useEffect, useState } from 'react';
import Style from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';




export default function Register() {

  const [Erorr, setErorr] = useState('');
  const [Spiner, setSpiner] = useState(false);

  let { setUserLogin } = useContext(UserContext);


  let navigat = useNavigate()


  let validationSchema = yup.object().shape({
    name: yup.string().min(5, 'the min lenth is 5').max(15, 'the max lenth is 15').required('the name is required'),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, 'the phone must egyption number').required('the phone is required'),
    email: yup.string().email('the email is not valid').required('the email is required'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'the password is not valid').required('the password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], 'the password is not match').required('the rePassword is required')
  })


  function handelRegister(formikValues) {


    setSpiner(true);

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formikValues)
      .then((apiResponse) => {

        if (apiResponse.data.message === 'success') {

          setUserLogin(apiResponse.data.token)

          localStorage.setItem('userToken', apiResponse.data.token);



          navigat('/');

          setSpiner(false);
        }




      })
      .catch(
        (apiResponse) => {


          setSpiner(false);


          setErorr(apiResponse?.response?.data?.message)

          console.log(apiResponse);



          ;
        }
      )





  }



  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    },
    validationSchema,
    onSubmit: handelRegister
  })


  return <>





    <div data-aos="zoom-in-up" data-aos-duration="1000" className='pt-40 px-10 max-w-xl mx-auto h-[100vh] '>
      <h1 className='text-green-600 font-bold py-5 text-3xl'>Register now</h1>
      <form onSubmit={formik.handleSubmit}>




        {Erorr ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{Erorr}</span>
        </div> : null}


        <div className="relative z-0 w-full mb-5 group">
          <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name="name" id="name" className="block py-2.5 px-0 w-full text-sm rounded-b-md text-green-600  bg-transparent border-0  border-b-2 border-green-600  appearance-none dark:text-gray-800 dark:border-green-600  dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="name" className="peer-focus:font-medium left-5 absolute text-sm text-green-600  dark:text-green-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name : </label>
        </div>
        {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.name}</span>
        </div> : null}


        <div className="relative z-0 w-full mb-5 group">
          <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm rounded-b-md text-green-600  bg-transparent border-0  border-b-2 border-green-600  appearance-none dark:text-gray-800 dark:border-green-600  dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="phone" className="peer-focus:font-medium left-5 absolute text-sm text-green-600  dark:text-green-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone : </label>
        </div>

        {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.phone}</span>
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

        <div className="relative z-0 w-full mb-5 group">
          <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm rounded-b-md text-green-600  bg-transparent border-0  border-b-2 border-green-600  appearance-none dark:text-gray-800 dark:border-green-600  dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="rePassword" className=" peer-focus:font-medium left-5 absolute text-sm text-green-600  dark:text-green-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-6">rePassword : </label>
        </div>

        {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.rePassword}</span>
        </div> : null}


        <div className='flex justify-start items-center'>
          <button type="submit" className="text-white me-5 bg-green-700 hover:bg-green-800 focus:ring-4  focus:outline-none focus:ring-green-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {Spiner ? <i className="fa-solid fa-rotate"></i> : 'Register'}
          </button>

          <Link to={'/login'}> GO TO  <span className='hover:text-green-900 text-green-700 font-semibold'>LOGIN</span> </Link>
          <Link to={'/ForgotPasswords'} className="hover:text-green-900 text-green-700 font-semibold pl-4">FORGET PASSWORD </Link>

        </div>

      </form>



    </div>

  </>
}
