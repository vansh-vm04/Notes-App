import axios from "axios"
import { useEffect, useState } from "react"

export const useFetch = (url:string)=>{
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState<unknown>({})
    const [error, seterror] = useState<boolean>(false)

    const fetchData = async (url:string)=>{
        try {
            setloading(true)
            const token = localStorage.getItem('token')
            const response = await axios.get(url,{
                headers:{
                    'Authorization':'Bearer '+token
                }
            })
            setdata(response.data)
        } catch {
            seterror(true);
        }finally{
            setloading(false);
        }
    }

    useEffect(() => {
        fetchData(url)
    }, [url])
    
    return {
        data,
        loading,
        error
    }
}