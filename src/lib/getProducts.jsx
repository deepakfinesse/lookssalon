// lib/getProducts.js
export async function getProducts() {
  try {
    const res = await fetch(
      'https://lookskart.com/products.json?limit=8',
      { cache: 'no-store' }
    )

    const data = await res.json()

    return data.products || []
  } catch (err) {
    console.error(err)
    return []
  }
}