import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CheckOutProduct = ({
  item: { id, title, description, category, image, price, hasPrime, rating },
}) => {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      description,
      category,
      image,
      price,
      hasPrime,
      rating,
    };
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket(id));
  };

  return (
    <div className="grid grid-cols-5">
      {/* 1st column */}
      <Image src={image} width={200} height={200} objectFit="contain" />

      {/* 2 to 4 column */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs line-clamp-3 my-2">{description}</p>
        <Currency quantity={price} currency="INR" />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              alt=""
              className="w-12"
              loading="lazy"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      {/* 5th column */}
      <div className="flex flex-col space-y-2 justify-self-end my-auto">
        <button onClick={addItemToBasket} className="button">
          Add To Basket
        </button>
        <button onClick={removeItemFromBasket} className="button">
          Remove From Basket
        </button>
      </div>
    </div>
  );
};

export default CheckOutProduct;
