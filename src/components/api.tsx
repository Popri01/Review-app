import {Product, Reviews, Users} from "@/components/ui/ProductInterface";

export const fetchProductos = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:3001/api/productos");

  return await response.json();
};

export const fetchReviews = async (): Promise<Reviews[]> => {
  const response = await fetch("http://localhost:3001/api/reviews");

  return await response.json();
};

export const fetchUsusarios = async (): Promise<Users[]> => {
  const response = await fetch("http://localhost:3001/api/users");

  return await response.json();
};

export const UpdateReviews = async (likes: number, dislikes: number, idReview: string) => {
  await fetch(`http://localhost:3001/api/reviews/${idReview}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes,
      dislikes,
    }),
  });
};

export const PostReviews = async (content: string, productId: string, userid: string) => {
  await fetch("http://localhost:3001/api/Reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
      productId: productId,
      userId: userid,
    }),
  });
};
