import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Props {
  rating: number;
}

const Ratings = ({ rating }: Props) => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          {rating > index ? (
            <AiFillStar style={{ color: "orange" }} />
          ) : (
            <AiOutlineStar />
          )}
        </div>
      ))}
    </>
  );
};

export default Ratings;
