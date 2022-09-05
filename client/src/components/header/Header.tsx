import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/App.css";
import { BuyItemReq } from "../../store/storeUser";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksForStoreUser";
import { paginate } from "../../utils/paginate";
import NavBar from "../navbar/NavBar";
import Pagination from "../pagination/pagination";
import { useNavigate } from "react-router-dom";
import { getAccsessToken, getId } from "../../services/localStorageServices";
import Search from "../navbar/Search";

import Item from "../../interfaces/Item";
import {
  deleteCreatedItem,
  updateItemsAfterDeleteOne,
} from "../../store/storeItems";

interface HeaderProps {
  items: Array<Item>;
}

const Header: React.FC<HeaderProps> = ({ items }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [arrayItems, setArrayItems] = useState<Item[] | undefined>([]);

  const onPageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
  };
  const buy = async (product: Item) => {
    if (getAccsessToken()) {
      await dispatch(BuyItemReq({ ...product, count: 1 }));
    } else {
      navigate("/api/auth/login");
    }
  };
  const deleteItem = async (product: Item) => {
    if (getAccsessToken()) {
      await dispatch(deleteCreatedItem(product));
      const filtered = items.filter((item: Item) => item.id !== product.id);
      await dispatch(updateItemsAfterDeleteOne(filtered));
      navigate(`/api/${product.categoria}s`);
    } else {
      navigate("/api/auth/login");
    }
  };
  const searchItems = useAppSelector((state) => state.store.searchItem);
  const searchStoreInputValue = useAppSelector(
    (state) => state.store.searchInput
  );
  useEffect(() => {
    if (searchItems?.length > 0 && searchStoreInputValue?.length > 0) {
      setArrayItems(paginate(searchItems, page, 6));
    } else if (searchItems?.length < 0 && searchStoreInputValue?.length > 0) {
      alert("По вашему запросу ничего не найдено");
    } else {
      setArrayItems(paginate(items, page, 6));
    }
  }, [page, items, searchItems, searchStoreInputValue]);
  return (
    <div className="container">
      <NavBar></NavBar>

      <div className="categorian-items-container">
        <div className="categorian">
          <Search />
          <Link to="/" className="categoria">
            <p className="categoria-img-1"></p>
            <span className="categoria-title-img">Популярное</span>
          </Link>
          <Link to="/api/motherboards" className="categoria">
            <p className="categoria-img-2"></p>
            <span className="categoria-title-img">Материнские платы</span>
          </Link>
          <Link to="/api/processors" className="categoria">
            <p className="categoria-img-3"></p>
            <span className="categoria-title-img">Процессоры</span>
          </Link>
          <Link to="/api/videocards" className="categoria">
            <p className="categoria-img-4"></p>
            <span className="categoria-title-img">Видеокарты</span>
          </Link>
        </div>
        <div className="container-fluid">
          <div className="row">
            {arrayItems
              ? arrayItems.map((item, i) => {
                  return (
                    <div
                      key={Date.now() + i}
                      className="col-xxl-4 col-lg-6 col-md-12 item-in-container-flex"
                    >
                      <Link to={`/item/${item.id}`} className="color-standart">
                        <span>{item.title}</span>

                        <div>
                          <img
                            src={item.image}
                            className="item-image item-image"
                            alt=""
                          />
                        </div>
                        <span className="price">{item.price} грн</span>
                      </Link>
                      <button
                        className="btn btn-success"
                        onClick={() => buy(item)}
                      >
                        Купить
                      </button>
                      {item?.createdBy === getId() ? (
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteItem(item)}
                        >
                          Удалить
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })
              : "Произошла ошибка, попробуйте позже"}
          </div>
        </div>
      </div>
      <Pagination
        itemsCount={
          searchItems?.length || searchStoreInputValue?.length
            ? searchItems.length
            : items?.length
            ? items.length
            : null
        }
        pageSize={6}
        onPageChange={onPageChange}
        currentPage={page}
      />
    </div>
  );
};

export default Header;
