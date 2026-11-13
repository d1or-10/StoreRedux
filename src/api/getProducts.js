async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Error");
  }
  const data =  response.json()
  return data
}

export { getProducts }
