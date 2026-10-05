import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function ProductDetails(){
    const {id}=useParams();
    const api="https://dummyjson.com/products/" + id;
      const [loading,setLoading]=useState(true);
    const [message,setMessage]=useState("");
    const [product,setProduct]=useState({})
    async function getProduct() {
        try{
            const response=await fetch(api);
            if(response.ok){
                const data=await response.json();
                setProduct(data);
            }
        }catch(e){
             setMessage("Fetch Error ! cannot resolve api url [" + e.message + "]")
        }finally{
             setLoading(false);
        }
    }

    useEffect(()=>{
        getProduct()
    },[id])
    return(
        <>
          {
            loading && <h3>loading .. </h3>
        }
        {
            message && <p style={{color:"red"}}>{message}</p>
        }
        {
          <img src={product.images} />
        }
        </>
    )
}