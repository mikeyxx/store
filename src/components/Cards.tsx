import { formatCurrency } from "../utils/formatCurrency";
import { Data } from "./DataType";
import { useAppDispatch, useAppSelector } from "../app/store";
import { addItemToPdp } from "../features/product/ProductSlice";

interface Props {
  product: Data;
  handleModal: () => void;
}

const Cards = ({ product, handleModal }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <main
      className="cursor-pointer flex items-center  min-[1001px]:pt-[89px] min-[380px]:pt-[20px] justify-center min-w-[1200px]:h-screen pt-24 pb-4"
      onClick={() => dispatch(addItemToPdp(product))}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          dispatch(addItemToPdp(product));
        }
      }}
    >
      <section
        className="added"
        onClick={handleModal}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleModal();
          }
        }}
      >
        <img src={product.img} alt="" />
        <div className="mt-8">
          <p>{product.name}</p>
          <span>Price: {formatCurrency(product.price)}</span>
        </div>
        <span className="underline text-secondary font-bold block mt-7">
          Shop Now
        </span>
      </section>
    </main>
  );
};

export default Cards;
