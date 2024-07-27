import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswords() {
    let navigate = useNavigate("")
    const [api, setApi] = useState('');
    const [lodeing, setLodeing] = useState(false);

    async function handleForgotPasswords(values) {
        setLodeing(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
            .then((apiResponse) => {
                if (apiResponse?.data?.statusMsg === 'success') {
                    console.log("cmsklcklsdj");
                    console.log("kslajcfksdlf");
                    navigate('/resetCode');
                    setLodeing(false);
                }
                
            })
            .catch((apiResponse) => {
                setLodeing(false);
                setApi(apiResponse?.response?.data?.message);
            })
    }

    let validationSchema = yup.object().shape({
        email: yup.string().email('the email is not valid').required('the email is required'),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: handleForgotPasswords,
    });

    return (
           
            <div className="bg-[#fff] container flex flex-col justify-start items-center py-6 mt-5 pt-11 w-full mx-auto">
                <div className="container">
                    <div className="container py-1 ]">

                        <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto py-4  rounded-xl relative my-96 mt-1">

                            {api ? <div className="absolute top-[50%] right-0  p-4 my-1 text-sm w-1/5 mx-auto text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
                                <span className="font-extrabold mx-2">x</span>{api} <span className="mx-2 font-extrabold">x</span></div> : null}
                            <div className="relative z-0 md:w-1/2 w-11/12 mx-auto py-7 group">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="text-start block px-0 w-full text-base font text-black-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:focus:border-dark-500 focus:outline-none focus:ring-0 focus:border-dark-600 peer"
                                    placeholder=""
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                <label
                                    htmlFor="email"
                                    className="peer-focus: absolute text-lg text-green-600 dark:text-green-600 duration-300 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-dark-600 peer-focus:dark:text-dark-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Email:
                                </label>
                                {formik.errors.email && formik.touched.email ? (
                                    <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
                                        <span className="font-semibold text-start flex justify-start">{formik.errors.email}</span>
                                    </div>
                                ) : null}
                            </div>

                            <div className="relative z-0 md:w-1/2 w-11/12 mx-auto  group">
                                <div className="flex w-full items-center">

                                    {lodeing ? <button className="btn">
                                        <span className="font-bold">Plase wait <i className="fas fa-spinner fa-spin mx-3"></i></span>
                                    </button> : <button type="submit" className="btn ">
                                        OK
                                    </button>}
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
    );
}
