import { useRef, useEffect } from "react";
import { useAppSelector } from "../app/store";
import { useAppDispatch } from "../app/store";
import { addItemToCart } from "../features/product/ProductSlice";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { formatCurrency } from "../utils/formatCurrency";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
}

const Pdp = ({ setShowModal, closeModal }: Props) => {
  const pdpItems = useAppSelector((state) => state.product.pdp);
  const cartItems = useAppSelector((state) => state.product.cart);

  const dispatch = useAppDispatch();

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    divRef.current = document.getElementById("modal") as HTMLDivElement;

    window.addEventListener("click", function (e) {
      if (e.target === divRef.current) {
        setShowModal(false);
      }
    });
  }, []);

  return (
    <div
      id="modal"
      className="fixed z-[1] py-[100px]  left-0 top-0 w-full h-full overflow-auto bg-black bg-[rgba(0,0,0,0.4)]"
    >
      <div className="bg-[#fefefe] m-auto p-5 border-[1px solid #888] min-[1300px]:w-2/5 min-[320px]:w-[60%] transition-all">
        <span
          onClick={closeModal}
          className="text-[#aaaaaa] float-right text-2xl font-bold cursor-pointer"
        >
          &times;
        </span>
        {pdpItems.map((item) => (
          <div key={item.id} className="flex mb-8 min-[320px]:flex-col">
            <img src={item.img} alt="" className="w-32 h-48 object-contain" />
            <div className="pl-5">
              <div className="flex flex-col">
                <p>{item.name}</p>
                <div className="flex">
                  <Ratings rating={item.rating} />
                </div>
                <p>
                  Price:{" "}
                  <span className="text-cartColor">
                    {formatCurrency(item.price)}
                  </span>
                </p>
              </div>
              <div>
                <h4 className="font-bold my-5">Product Details</h4>
                <p>{item.desc}</p>
              </div>
              <div className="flex items-center">
                {cartItems?.some((cItem) => cItem.id === item.id) ? (
                  <div className="flex items-center rounded-lg py-2 mt-6">
                    <BsFillCheckCircleFill className="text-green-500 mr-3" />
                    <span className="font-bold ">Item Added</span>
                  </div>
                ) : (
                  <button
                    className="rounded-lg bg-green-500 text-card p-2 mt-6"
                    onClick={() => dispatch(addItemToCart({ ...item, qty: 1 }))}
                  >
                    Add to Cart
                  </button>
                )}
                <Link to="/cart">
                  <button className="rounded-lg p-2 mt-6 ml-4 addShadow">
                    Go to Cart
                  </button>
                </Link>
              </div>
              <button className="rounded-lg bg-yellow-500 text-card p-2 mt-6">
                Proceed to checkout ({pdpItems.length}{" "}
                {pdpItems.length <= 1 ? "item" : "items"})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pdp;
