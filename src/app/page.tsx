"use client";

import {ThumbsUp, ThumbsDown} from "lucide-react";
import {useState, useEffect} from "react";

import {Product, Reviews, Users} from "@/components/ui/ProductInterface";
import {Button} from "@/components/ui/button";
import {
  fetchProductos,
  fetchReviews,
  fetchUsusarios,
  UpdateReviews,
  PostReviews,
} from "@/components/api";

export default function HomePage() {
  const [Usuarios, setUsuarios] = useState<Users[]>([]);
  const [Productos, setProductos] = useState<Product[]>([]);
  const [Reviews, setReviews] = useState<Reviews[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [SelectedReviews, setSelectedReviews] = useState<string>("");
  const [isAddReviewModalOpen, setisAddReviewModalOpen] = useState<boolean>(false);
  const [user, setuser] = useState<string>("");
  const [content, setcontent] = useState<string>("");

  useEffect(() => {
    const cargarProductos = async () => {
      const data: Product[] = await fetchProductos();

      setProductos(data);
    };

    const cargarReviews = async () => {
      const data: Reviews[] = await fetchReviews();

      setReviews(data);
    };

    const cargarUsuarios = async () => {
      const data: Users[] = await fetchUsusarios();

      setUsuarios(data);
    };

    cargarReviews();
    cargarProductos();
    cargarUsuarios();
  }, []);

  const openModal = (productId: string) => {
    setSelectedReviews(productId);

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLike = (reviewId: Reviews) => {
    setReviews((prevReviews) => {
      return prevReviews.map((review) => {
        return review.id === reviewId.id ? {...review, likes: review.likes + 1} : review;
      });
    });

    UpdateReviews(reviewId.likes + 1, reviewId.dislikes, reviewId.id);
  };

  const handleDisLike = (reviewId: Reviews) => {
    setReviews((prevReviews) => {
      return prevReviews.map((review) =>
        review.id === reviewId.id ? {...review, dislikes: review.dislikes + 1} : review,
      );
    });
    UpdateReviews(reviewId.likes, reviewId.dislikes + 1, reviewId.id);
  };

  const openAddReview = () => {
    setisAddReviewModalOpen(true);

    /*if (!selectedProduct) return;

    selectedProduct.reviews.push({
      id: "r1",
      productId: "p2",
      userId: "u1",
      content: "Muy mala loco todo ,a",
      likes: 0,
      dislikes: 0,
    });
    setSelectedProduct(selectedProduct);*/
  };

  const AddReview = async () => {
    if (!user || user.trim() === "") {
      alert("Por favor, selecciona un usuario válido.");

      return;
    }

    if (!content) {
      alert("Por favor, ingresa un comentario.");

      return;
    }

    await PostReviews(content, SelectedReviews, user);

    setReviews(await fetchReviews());
    setisAddReviewModalOpen(false);
    setcontent("");
    setuser("");
  };

  return (
    <div className="flex max-w-[1920px] flex-col items-center">
      <section className="mt-8 w-full">
        <h2 className="mb-6 text-center text-3xl font-bold">Productos</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Productos.map((product) => (
            <div
              key={product.id}
              className="col-span-1 cursor-pointer rounded-lg border border-slate-200 bg-slate-800 p-4 text-center text-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => openModal(product.id)}
            >
              <div className="flex w-full flex-col items-center gap-2">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md">
                  <img
                    alt={product.name}
                    className="h-full w-full object-cover"
                    src={product.image}
                  />
                </div>

                <div className="mt-2 text-lg font-bold">{product.name}</div>

                <div className="mt-1 text-xl font-semibold">${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && SelectedReviews ? (
        <dialog open className=" inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative h-[600px] w-[650px] rounded-lg bg-slate-800 p-6 text-white">
            <button
              className="absolute right-4 top-4 text-white hover:text-red-500"
              type="button"
              onClick={closeModal}
            >
              <span className="text-3xl">&times;</span>
            </button>

            <div>
              <h1 className="mb-6 text-center text-4xl font-bold">Comentarios</h1>
            </div>

            <div className="max-h-[400px] space-y-4 overflow-y-auto">
              {Reviews.filter((rev) => rev.productId === SelectedReviews).map((review) => {
                const user = Usuarios.find((user) => user.id === review.userId);

                return (
                  <section key={review.id} className="rounded-lg bg-slate-600 p-5 shadow-lg">
                    <div className="mb-2 text-lg font-bold text-white">
                      {user ? user.name : "Usuario desconocido"}
                    </div>

                    <div className="mb-4 text-gray-300">{review.content}</div>

                    <div className="flex items-center justify-between text-gray-300">
                      <button
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-400"
                        type="button"
                        onClick={() => {
                          handleLike(review);
                        }}
                      >
                        <ThumbsUp className="h-5 w-5" />
                        <span>{review.likes}</span>
                      </button>

                      <button
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 focus:ring-2 focus:ring-red-400"
                        type="button"
                        onClick={() => {
                          handleDisLike(review);
                        }}
                      >
                        <ThumbsDown className="h-5 w-5" />
                        <span>{review.dislikes}</span>
                      </button>
                    </div>
                  </section>
                );
              })}
            </div>
            <div className="flex justify-center p-5">
              <Button onClick={openAddReview}> Agregar Comentario </Button>

              {isAddReviewModalOpen ? (
                <dialog
                  className="inset-0 z-50 flex items-center justify-center bg-black/50"
                  open={isAddReviewModalOpen}
                >
                  <div className="relative h-[600px] w-[650px] rounded-lg bg-slate-800 p-6 text-white">
                    <button
                      className="absolute right-4 top-4 text-white hover:text-red-500"
                      type="button"
                      onClick={() => setisAddReviewModalOpen(false)}
                    >
                      X
                    </button>

                    <h2 className="mb-4 text-center text-3xl font-bold">Agregar Comentario</h2>

                    <div className="mb-4">
                      <label className="mb-2 block text-lg font-bold" htmlFor="userSelect">
                        Usuario:
                      </label>
                      <select
                        className="w-full rounded-lg p-2 text-black"
                        id="userSelect"
                        onChange={(eve) => setuser(eve.target.value)}
                      >
                        <option>Selecciona un Usuario</option>
                        {Usuarios.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="mb-2 block text-lg font-bold" htmlFor="comment">
                        Comentario:
                      </label>
                      <textarea
                        className="w-full rounded-lg p-2 text-black"
                        id="comment"
                        rows={4}
                        onChange={(eve) => setcontent(eve.target.value)}
                      />
                    </div>

                    <div className="flex justify-center">
                      <Button onClick={AddReview}>Enviar Comentario</Button>
                    </div>
                  </div>
                </dialog>
              ) : null}
            </div>
          </div>
        </dialog>
      ) : null}
    </div>
  );
}
