import React, { useState, useEffect } from "react";
import {
  GetUserById,
  incrementCountValue,
  decrementCountValue,
} from "../../store/storeUser";
import "../../styles/App.css";
import NavBar from "../navbar/NavBar";
import { ConfimOrder, UserBasketUpdate } from "../../store/storeUser";
import { Link, useNavigate } from "react-router-dom";
import {
  getAccsessToken,
  getId,
  userIsAuthorized,
} from "../../services/localStorageServices";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksForStoreUser";
import User from "../../interfaces/user";
import Item from "../../interfaces/Item";

const Basket: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<User>();
  const userId = getId();
  const storeUserData = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (storeUserData) {
      setData(storeUserData);
    }
  }, [storeUserData]);
  useEffect(() => {
    if (userIsAuthorized() && !data?.email && userId !== null) {
      dispatch(GetUserById(userId));
      if (storeUserData) {
        setData(storeUserData);
      }
    }
  }, [setData, dispatch, data?.email, userId, storeUserData]);

  const changeIncrementCountValue = (id: string) => {
    dispatch(incrementCountValue(id));
  };
  const changeDecrementCountValue = (id: string) => {
    dispatch(decrementCountValue(id));
  };
  const removeItemFromBasket = async (id: string) => {
    if (data) {
      await dispatch(
        UserBasketUpdate(data?.basket?.filter((item: Item) => item._id !== id))
      );
    }
  };

  const finishOrder = async () => {
    if (getAccsessToken() && data) {
      await dispatch(ConfimOrder(data?.basket));
      navigate("/");
    } else {
      navigate("/api/auth/login");
    }
  };
  let count = 0;
  data?.basket?.forEach((item) => (count = count + item.price * item.count));

  return (
    <>
      {data ? (
        <div className="container">
          <NavBar />

          {data?.basket?.map((item) => {
            return (
              <div key={item._id} className="col-12 items-container-basket">
                <Link to={`/item/${item.id}`} className="col-6">
                  <div>
                    <span className="span-basket-title">{item.title}</span>
                  </div>
                  <img src={item.image} className="item-image" alt="" />
                </Link>

                <div className="col-6">
                  <span>{item.price * item.count}грн </span>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      changeIncrementCountValue(item._id ? item._id : "")
                    }
                  >
                    +
                  </button>
                  <span className="multiple-count-value">{item.count}</span>
                  <button
                    disabled={item.count > 1 ? false : true}
                    className="btn btn-primary"
                    onClick={() =>
                      changeDecrementCountValue(item._id ? item._id : "")
                    }
                  >
                    -
                  </button>
                  <button
                    className="btn btn-danger multiple-count-value"
                    onClick={() =>
                      removeItemFromBasket(item._id ? item._id : "")
                    }
                  >
                    remove
                  </button>
                </div>
              </div>
            );
          })}
          {data?.basket?.length > 0 ? (
            <div className="finish-order-button">
              <span>К оплате: {count} грн</span>
              <button onClick={finishOrder} className="btn btn-success">
                Continue
              </button>
            </div>
          ) : (
            "basket is empty"
          )}
        </div>
      ) : (
        "loading..."
      )}
    </>
  );
};

export default Basket;
