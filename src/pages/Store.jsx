import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

function Store() {
    const [products , setProducts] =useState([])
    const [loading , setLoading] = useState(true)
    const [error , setError]= useState("")
    


    const getProducts= async()=>{
        try{
            const res = await fetch("https://fakestoreapi.com/products")

            if (!res.ok){
                throw new Error("Failed to fetch products")
            }

            const data = await res.json()
            setProducts(data)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getProducts()
    }, [])
      if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;





  return (
      <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Our Store
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}

export default Store