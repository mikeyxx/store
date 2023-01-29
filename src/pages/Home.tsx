import { useState } from "react";
import { useAppSelector } from "../app/store";
import Cards from "../components/Cards";
import Pdp from "../components/Pdp";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const { byStock, byFastDelivery, sortByPrice, bySearchQuery } =
    useAppSelector((state) => state.filterProduct);
  const products = useAppSelector((state) => state.product.products);

  const handleModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  function filterProducts() {
    let productFiltered = [...products];
    if (bySearchQuery) {
      productFiltered = productFiltered.filter((item) =>
        item.name.toLowerCase().includes(bySearchQuery)
      );
    }

    if (byStock) {
      productFiltered = productFiltered.filter((item) => item.inStock);
    }

    if (byFastDelivery) {
      productFiltered = productFiltered.filter((item) => item.fastDelivery);
    }

    if (sortByPrice) {
      productFiltered = productFiltered.sort((a, b) =>
        sortByPrice === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    return productFiltered;
  }

  return (
    <>
      <div className="gridLayout">
        {filterProducts().map((product) => (
          <Cards key={product.id} product={product} handleModal={handleModal} />
        ))}
      </div>
      {showModal && <Pdp closeModal={closeModal} setShowModal={setShowModal} />}
    </>
  );
};

export default Home;
