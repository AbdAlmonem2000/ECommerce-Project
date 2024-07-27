import { useQuery } from '@tanstack/react-query'
import { data } from 'autoprefixer'
import axios from 'axios'
import React from 'react'


export default function uesHookCallApi() {


    function recentProduct() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    let recentProudect = useQuery({
        queryKey: ['recentProducts'],
        queryFn: recentProduct,
        refetchInterval: 5000,
        refetchIntervalInBackground:true,
        select:(data) =>data?.data?.data,
        staleTime: 3000,
    })






  return recentProudect
}
