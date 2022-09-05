import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetUserById } from "../../store/storeUser";

import "../../styles/App.css";
import { getId } from "../../services/localStorageServices";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksForStoreUser";
import Item from "../../interfaces/Item";
const History: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<Array<Item[]>>();
  const userId = getId();
  const getUser = useAppSelector((state) => state.user.user);
  useEffect(() => {
    if (userId && !data && !getUser?.historyBuy) {
      dispatch(GetUserById(userId));
    }
    setData(getUser?.historyBuy);
  }, [setData, dispatch, getUser?.historyBuy, data, userId]);

  return (
    <>
      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        Back
      </button>
      {data?.length ? (
        <div className="user-data-container">
          <div className="user-data">
            {data.map((item) => {
              return (
                <span key={item[0].id} className="dropdown">
                  <div
                    className="btn btn-secondary dropdown-toggle  col-7"
                    id="dropdownMenuButton2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {data ? <span>Order {item[0].id}</span> : ""}
                  </div>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    {item.map((i) => {
                      return (
                        <div key={i._id}>
                          <li>
                            <Link
                              to={`/item/${i.id}`}
                              className="dropdown-item history-dropdown-item"
                            >
                              <div>
                                <span>{i.title}</span>
                              </div>
                              <img
                                alt="history-bought-img"
                                className="history-img"
                                src={`${i.image}`}
                              ></img>
                              <span>{i.price} грн</span>
                            </Link>
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                </span>
              );
            })}
          </div>
        </div>
      ) : (
        <span>History is empty</span>
      )}
    </>
  );
};

export default History;
