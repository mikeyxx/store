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
        <nav className="bg-primary w-full min-h-[70px] fixed z-10">
          <div className="flex justify-between px-4 h-[70px] items-center">
            <section
              className="hamburgerContainer"
              onClick={() => dispatch(toggleSideBar())}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  dispatch(toggleSideBar());
                }
              }}
            >
              <span className="hamburger1"></span>
              <span className="hamburger2"></span>
              <span className="hamburger3"></span>
            </section>

            <h1 className="logo font-black text-3xl text-secondary">
              Mikey's Store
            </h1>
            <section className="flex items-center max-w-sm bg-white rounded-lg w-full px-1">
              <input
                type="search"
                placeholder="Search..."
                className="border-none w-full bg-transparent outline-none p-1"
                onChange={(e) => dispatch(filterBySearchQuery(e.target.value))}
              />
              <BiSearch className="text-xl" />
            </section>
            <section className="flex items-center max-w-[100px] w-full justify-between">
              <Link to="/cart">
                <div className="text-white flex relative">
                  <BsCart2 className="text-2xl font-bold text-secondary" />
                  <div className="absolute bg-cartColor rounded-full w-6 h-6 text-center top-[-8px] right-[-15px]">
                    <span>{itemsInCart}</span>
                  </div>
                </div>
              </Link>
              <img src={avatar} alt="" />
            </section>
          </div>
        </nav>
      )}

      {navSize <= 1000 && (
        <main className="bg-primary w-full min-h-[70px] items-center p-4">
          <div className="flex items-center mb-3 w-full justify-between">
            <div
              className="hamburgerContainer"
              onClick={() => dispatch(toggleSideBar())}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  dispatch(toggleSideBar());
                }
              }}
            >
              <span className="hamburger1"></span>
              <span className="hamburger2"></span>
              <span className="hamburger3"></span>
            </div>

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
        </main>
      )}
    </>
  );
};

export default Navbar;
