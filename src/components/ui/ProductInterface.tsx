export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  reviews: Reviews[];
}

export interface Users {
  id: string;
  name: string;
  email: string;
}

export interface Reviews {
  id: string;
  productId: string;
  userId: string;
  content: string;
  likes: number;
  dislikes: number;
}
