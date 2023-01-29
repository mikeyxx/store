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
    <div
      className="min-[1001px]:pt-[120px] min-[320px]:pt-[30px] cursor-pointer flex w-full items-center justify-center"
      onClick={() => dispatch(addItemToPdp(product))}
    >
      <div className="added" onClick={handleModal}>
        <img src={product.img} alt="" />
        <div>
          <p>{product.name}</p>
          <span>Price: {formatCurrency(product.price)}</span>
        </div>
        <span className="underline text-secondary">Shop Now</span>
      </div>
    </div>
  );
};

export default Cards;
