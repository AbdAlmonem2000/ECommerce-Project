import React, { useContext, useState } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import * as yup from "yup";
import { useParams } from 'react-router-dom';

export default function OrderUsers() {
    const [loading, setLoading] = useState(false);
    let { cartId } = useParams();

    console.log(cartId);

    let validationSchema = yup.object().shape({
        details: yup.string().min(3, "Details min length is 3").max(20, "Details max length is 20").required("Details are required"),
        city: yup.string().min(3, "City min length is 3").max(20, "City max length is 20").required("City is required"),
        phone: yup.string().matches(/^01[0125][0-9]{8}$/, "Phone must be a valid Egyptian number").required("Phone is required"),
    });

    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        validationSchema,
        onSubmit: (values) => {
            createCashOrder(values);
        },
    });

    async function createCashOrder(address) {
        setLoading(true);
        try {
            let response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
                {
                    shippingAddress: address
                }, {
                params: {
                    url: window.location.origin
                },
                headers: {
                    token: localStorage.getItem("userToken")
                }
            }
            );

            let { data } = response;
            console.log(data.session.url);
            window.open(data.session.url, '_self');
        } catch (err) {
            console.error("Error placing order:", err);
        } finally {
            setLoading(false);
        }
    }

    return (

        <div data-aos="zoom-in" data-aos-duration="1000" className='container flex justify-between flex-wrap mx-auto my-12 pt-6'>

            <form className='md:w-1/2 w-[90%] mx-auto p-3' onSubmit={formik.handleSubmit}>
                <label className='text-start flex justify-start my-3 text-green-600 text-[1rem] tracking-[0.3] ms-auto' htmlFor="details">Details:</label>
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.details}
                    name='details'
                    id='details'
                    className="flex py-3 rounded-md px-2 focus:border-green-500 border-green-500 border outline-none flex-wrap items-center mx-auto w-full placeholder text-[1.1rem] tracking-[0.1rem]"
                    type="text"
                />
                {formik.touched.details && formik.errors.details ? (
                    <div className="text-red-500">{formik.errors.details}</div>
                ) : null}

                <label className='text-start flex justify-start my-3 text-green-600 text-[1rem] tracking-[0.3] ms-auto' htmlFor="phone">Phone:</label>
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    name='phone'
                    id='phone'
                    className="flex py-2 rounded-md px-2 focus:border-green-500 border-green-500 border outline-none  flex-wrap items-center mx-auto w-full placeholder text-[1.1rem] tracking-[0.1rem]"
                    type="tel"
                />
                {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-500">{formik.errors.phone}</div>
                ) : null}

                <label className='text-start flex justify-start my-3 text-green-600 text-[1rem] tracking-[0.3] ms-auto' htmlFor="city">City:</label>
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    name='city'
                    id='city'
                    className="flex py-2 rounded-md px-2 focus:border-green-500 border-green-500 border outline-none  flex-wrap items-center mx-auto w-full placeholder text-[1.1rem] tracking-[0.1rem]"
                    type="text"
                />
                {formik.touched.city && formik.errors.city ? (
                    <div className="text-red-500">{formik.errors.city}</div>
                ) : null}

                <div className='flex'>
                    {loading ? (
                        <button className="btn" >
                            <i className="fas fa-spinner fa-spin mx-3"></i>
                        </button>
                    ) : (
                        <button type="submit" className="btn">
                            Go to Visa <i className="fa-brands text-lg fa-cc-visa mx-3"></i>
                        </button>
                    )}

                </div>
            </form>
        </div>
    );
}

