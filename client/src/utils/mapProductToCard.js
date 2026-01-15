// client/src/utils/mapProductToCard.js
export function mapProductToCard(p) {
  return {
    // Mongo usa _id, seu front às vezes usa id
    id: p._id || p.id,

    // seu ProductCard usa title e image
    title: p.name || p.title,
    image: p.imageUrl || p.image,

    // valores do backend
    price: Number(p.price || 0),

    // como o backend não tem oldPrice/discount, a gente simula pra ficar igual ao Figma
    oldPrice: Number(p.oldPrice ?? (p.price ? p.price * 1.15 : 0)),
    discount: p.discount || "15% OFF",

    // rating/reviews não existem no schema, então deixamos fixo pro visual
    rating: p.rating ?? 5,
    reviews: p.reviews ?? 65,
  };
}
