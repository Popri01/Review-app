import {Product} from "./ui/ProductInterface";

interface CardComponentProps {
  Productos: Product[];
  openModal: (id: string) => void;
}

function CardComponent({Productos, openModal}: CardComponentProps) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Productos.map((product) => (
        <div
          key={product.id}
          className="col-span-1 cursor-pointer rounded-lg border border-slate-200 bg-slate-800 p-4 text-center text-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          onClick={() => openModal(product.id)}
        >
          <div className="flex w-full flex-col items-center gap-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md">
              <img alt={product.name} className="h-full w-full object-cover" src={product.image} />
            </div>

            <div className="mt-2 text-lg font-bold">{product.name}</div>

            <div className="mt-1 text-xl font-semibold">${product.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardComponent;
