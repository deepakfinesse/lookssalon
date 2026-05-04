// lib/getCollections.js
export async function getCollections() {
  const collections = [
    { title: 'Hair Care', handle: 'hair-care-products' },
    { title: 'Skin Care', handle: 'skincare-products' },
    { title: 'Men Care', handle: 'men' },
    { title: 'Combos', handle: 'brasil-cacau' },
  ]

  try {
    const results = await Promise.all(
      collections.map(async (col) => {
        const res = await fetch(
          `https://lookskart.com/collections/${col.handle}/products.json?limit=1`,
          { cache: 'no-store' }
        )

        const data = await res.json()

        return {
          ...col,
          image: data.products?.[0]?.images?.[0]?.src || null,
          url: `https://lookskart.com/collections/${col.handle}`,
        }
      })
    )

    return results
  } catch (err) {
    console.error(err)
    return collections
  }
}

