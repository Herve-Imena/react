import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

        useEffect(()=>{
            const abort = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abort.signal})
        .then(res =>{
            console.log(res)
            if (!res.ok){
                throw Error ("could not fetch the requested data")
            }
            return res.json();})
        .then((data)=>{
            setIsPending(false)
            setData(data)
        })
        .catch(err => {
            if(err.name === 'AbortError'){
                console.log('fetch aborted')
            }else{
            setIsPending(false)
        setError(err.message)
        }})
        }, 1000);      
        return ()=>{
            abort.abort();
        }  
    }, [url]);
    return {data, isPending, error}
}
export default useFetch;