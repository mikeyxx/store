import avatar from "../assets/avatar.png";
import { AiOutlineStar } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  filterByStock,
  filterbyDeliveryStatus,
  filterByPrice,
  resetFilters,
} from "../features/product/ProductFilterSlice";
const SideBar = () => {
  const slideInToggle = useAppSelector((state) => state.product.slideIn);
  const { byStock, byFastDelivery, sortByPrice } = useAppSelector(
    (state) => state.filterProduct
  );
  const dispatch = useAppDispatch();

  return (
    <main
      className={`sideBarMenu-slider ${
        slideInToggle ? "active" : ""
      }  px-4 min-[1001px]:pt-[125px] min-[320px]:pt-[30px]`}
    >
      <section className="max-[500px]:block min-[501px]:hidden">
        <div className="flex items-center mb-4">
          <img src={avatar} alt="" />
        </div>
      </section>

      <h2 className="mb-4">Product Filter</h2>
      <section className="text-xl">
        <div className="my-2">
          <label htmlFor="ascend">
            <input
              type="radio"
              id="ascend"
              className="mr-4"
              onChange={() => dispatch(filterByPrice("lowToHigh"))}
              checked={sortByPrice === "lowToHigh" ? true : false}
            />
            Ascending
          </label>
        </div>
        <div className="my-2">
          <label htmlFor="decend">
            <input
              type="radio"
              id="decend"
              className="mr-4"
              onChange={() => dispatch(filterByPrice("highToLow"))}
              checked={sortByPrice === "highToLow" ? true : false}
            />
            Decending
          </label>
        </div>
        <div className="my-2">
          <label htmlFor="stock">
            <input
              type="checkbox"
              id="stock"
              className="mr-4"
              onChange={() => dispatch(filterByStock())}
              checked={byStock}
            />
            Out of Stock
          </label>
        </div>
        <div className="my-2">
          <label htmlFor="delivery">
            <input
              type="checkbox"
              id="delivery"
              className="mr-4"
              onChange={() => dispatch(filterbyDeliveryStatus())}
              checked={byFastDelivery}
            />
            Fast Delivery
          </label>
        </div>
        <div className="my-2 bg-white rounded-md text-center cursor-pointer">
          <button onClick={() => dispatch(resetFilters())}>Clear Filter</button>
        </div>
      </section>
    </main>
  );
};

export default SideBar;
