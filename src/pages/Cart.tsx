import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/store";
import {
  incrementCartItemQty,
  decrementCartItemQty,
  deleteItemInCart,
} from "../features/product/ProductSlice";
import { formatCurrency } from "../utils/formatCurrency";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.product.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(cartItems));
  }, [cartItems]);

  const priceOfItemsInCart = cartItems.reduce(
    (total, curr) => total + curr.price * curr.qty,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen min-[1001px]:pt-[89px] px-5 bg-wallpaper">
        <div className="flex max-[700px]:flex-col gap-5">
          <div className="bg-card min-h-min h-full p-4 flex-auto">
            <div>
              <p>Cart is empty.</p>
            </div>
            <hr />
            <div className="text-right">
              <p>
                Subtotal ({cartItems.length}{" "}
                {cartItems.length <= 1 ? "Item" : "items"}):{" "}
                <span className="font-bold">
                  {formatCurrency(priceOfItemsInCart)}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-card min-h-min h-full p-4">
            <p>
              Subtotal ({cartItems.length}{" "}
              {cartItems.length <= 1 ? "Item" : "items"}):{" "}
              <span className="font-bold">
                {formatCurrency(priceOfItemsInCart)}
              </span>
            </p>
            <button className="rounded-lg bg-yellow-500 text-card p-2 mt-4 w-full">
              Proceed to checkout
            </button>

            <Link to="/">
              <button className="w-full rounded-lg bg-gray-600 text-card p-2 mt-4">
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-[1001px]:pt-[89px] px-5 bg-wallpaper">
      <div className="flex max-[700px]:flex-col gap-5">
        <div className="bg-card min-h-min h-full p-4 flex-auto">
          <div className="flex w-full justify-between mb-2">
            <h2>Shopping Cart</h2>
            <small>price</small>
          </div>
          <hr />
          {cartItems.map((item) => (
            <div key={item.id} className="mt-4 flex w-full justify-between">
              <div className="w-[100px] mr-24">
                <img
                  src={item.img}
                  alt=""
                  className="w-24 h-48 object-contain"
                />
              </div>
              <div className="flex flex-col justify-start w-full">
                <p>
                  <strong>{item.name}</strong>
                </p>
                <small
                  style={{
                    color: item.inStock > 0 ? "rgba(34, 197, 94, 1)" : "red",
                  }}
                >
                  {item.inStock > 0 ? "In Stock" : "Out of Stock"}
                </small>
                {item.fastDelivery ? (
                  <span className="text-green-500 block">
                    Express Delivery🚀
                  </span>
                ) : (
                  <span>Delivery with 7 days</span>
                )}
                <div className="mt-4">
                  <button
                    className="px-2 border-2 rounded-lg mr-2 cursor-pointer"
                    onClick={() => dispatch(decrementCartItemQty(item))}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="px-2 border-2 rounded-lg ml-2 cursor-pointer"
                    onClick={() => dispatch(incrementCartItemQty(item))}
                  >
                    +
                  </button>
                  <button
                    className="text-sm ml-4"
                    onClick={() => dispatch(deleteItemInCart(item))}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div>{formatCurrency(item.price)}</div>
            </div>
          ))}
          <hr />
          <div className="text-right">
            <p>
              Subtotal ({cartItems.length}{" "}
              {cartItems.length <= 1 ? "Item" : "items"}):{" "}
              <span className="font-bold">
                {formatCurrency(priceOfItemsInCart)}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-card min-h-min h-full p-4">
          <p>
            Subtotal ({cartItems.length}{" "}
            {cartItems.length <= 1 ? "Item" : "items"}):{" "}
            <span className="font-bold">
              {formatCurrency(priceOfItemsInCart)}
            </span>
          </p>
          <button className="rounded-lg bg-yellow-500 text-card p-2 mt-4 w-full">
            Proceed to checkout
          </button>

          <Link to="/">
            <button className="w-full rounded-lg bg-gray-600 text-card p-2 mt-4">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
