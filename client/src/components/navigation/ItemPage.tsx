import React, { useEffect } from "react";
import { fetchCurrentPageItem } from "../../store/storeItems";
import NavBar from "../navbar/NavBar";
import { BuyItemReq } from "../../store/storeUser";
import { useNavigate } from "react-router-dom";
import { getAccsessToken } from "../../services/localStorageServices";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksForStoreUser";
import Item from "../../interfaces/Item";

const ItemPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const item = useAppSelector((state) => state.store.CurrentPageItem);
  const url_string = window.location.href.split("item/");

  const buy = async (proudct: Item) => {
    if (getAccsessToken()) {
      await dispatch(BuyItemReq({ ...proudct, count: 1 }));
    } else {
      navigate("/api/auth/login");
    }
  };
  useEffect(() => {
    dispatch(fetchCurrentPageItem(url_string[1]));
  }, [dispatch, url_string]);
  return (
    <>
      {item ? (
        <div className="container">
          <div className="row align-center">
            <NavBar />
            <span>{item.title}</span>
            <div>
              <img src={item.image} className="item-image" alt="" />
            </div>
            <span className="price">{item.price} грн</span>
            <button
              className="btn btn-success button"
              onClick={() => buy(item)}
            >
              Купить
            </button>
          </div>
        </div>
      ) : (
        "loading..."
      )}
    </>
  );
};

export default ItemPage;
