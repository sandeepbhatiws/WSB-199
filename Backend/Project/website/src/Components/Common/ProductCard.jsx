import { FaRegHeart } from "react-icons/fa";

export default function ProductCard({ title, name, price, image, oldPrice }) {
  return (
    <div className="bg-white rounded-lg shadow-2xl w-full">
      <div>
        <img src={image} alt={title} className="w-full" />
      </div>

      <div className="p-4 text-center">
        <p className="text-gray-500 text-sm">{title}</p>

        <h3 className="text-lg font-semibold text-gray-800 mt-1">
          {name}
        </h3>

        <div className="mt-2 flex justify-center items-center gap-2 ">
          {oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              Rs.{oldPrice}
            </span>
          )}
          <span className="text-yellow-600 font-bold text-lg">
            Rs.{price}
          </span>
        </div>

        <div className="mt-4 flex justify-center items-center gap-3">
          <button className="border p-2 rounded hover:bg-gray-100">
            <FaRegHeart />
          </button>

          <button className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 text-sm">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}