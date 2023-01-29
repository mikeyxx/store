import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import avatar from "../assets/avatar.png";
import { toggleSideBar } from "../features/product/ProductSlice";
import { filterBySearchQuery } from "../features/product/ProductFilterSlice";
const Navbar = () => {
  const [navSize, setNavSize] = useState(window.innerWidth);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.product.cart);
  const itemsInCart = cart.reduce((total, curr) => total + curr.qty, 0);

  function handleResize() {
    setNavSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navSize]);
  return (
    <>
      {navSize > 1000 && (
        <div className="bg-primary w-full min-h-[70px] fixed z-10">
          <div className="flex justify-between px-4 h-[70px] items-center">
            <span
              onClick={() => dispatch(toggleSideBar())}
              className="hamburger"
            ></span>

            <h1 className="logo font-black text-3xl text-secondary">
              Mikey's Store
            </h1>
            <div className="flex items-center max-w-sm bg-white rounded-lg w-full px-1">
              <input
                type="search"
                placeholder="Search..."
                className="border-none w-full bg-transparent outline-none p-1"
                onChange={(e) => dispatch(filterBySearchQuery(e.target.value))}
              />
              <BiSearch className="text-xl" />
            </div>
            <div className="flex items-center max-w-[100px] w-full justify-between">
              <Link to="/cart">
                <div className="text-white flex relative">
                  <BsCart2 className="text-2xl font-bold text-secondary" />
                  <div className="absolute bg-cartColor rounded-full w-6 h-6 text-center top-[-8px] right-[-15px]">
                    <span>{itemsInCart}</span>
                  </div>
                </div>
              </Link>
              <img src={avatar} alt="" />
            </div>
          </div>
        </div>
      )}

      {navSize <= 1000 && (
        <div className="bg-primary w-full min-h-[70px] items-center p-4">
          <div className="flex items-center mb-3 w-full justify-between">
            <span
              onClick={() => dispatch(toggleSideBar())}
              className="hamburger"
            ></span>

            <h1 className="font-black text-3xl text-secondary">
              Mikey's Store
            </h1>
            <div className="flex items-center transition-all">
              <div className="text-white flex relative">
                <BsCart2 className="text-[1.6rem] font-bold text-secondary" />
                <div className="absolute bg-[#F23030] rounded-full w-6 h-6 text-center top-[-8px] right-[-10px]">
                  <span>{itemsInCart}</span>
                </div>
              </div>
              {navSize >= 500 && <img src={avatar} alt="" className=" ml-8" />}
            </div>
          </div>

          <div className="flex items-center justify-center bg-white rounded-lg max-w-md w-full m-auto px-1">
            <input
              type="search"
              placeholder="Search..."
              className="border-none w-full bg-transparent outline-none p-2"
              onChange={(e) => dispatch(filterBySearchQuery(e.target.value))}
            />
            <BiSearch className="text-2xl" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
