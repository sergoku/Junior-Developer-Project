import { Link } from "react-router-dom";
import "../../styles/App.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksForStoreUser";
import { exit, GetUserById } from "../../store/storeUser";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getId, userIsAuthorized } from "../../services/localStorageServices";
import User from "../../interfaces/user";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const getUser = useAppSelector((state) => state.user.user);
  const [data, setData] = useState<User | null>();
  const userId = getId();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setData(getUser);
  }, [getUser]);
  const logOut = () => {
    dispatch(exit());
    setData(null);
    navigate("/");
  };

  useEffect(() => {
    if (userIsAuthorized() && !data?.email && userId !== null) {
      dispatch(GetUserById(userId));
    }
    setData(getUser);
  }, [setData, dispatch, data?.email, userId, getUser]);

  return (
    <div className="nav-bar">
      <div className="nav-buttons">
        <Link className="categoria-title-img" to="/">
          <img
            alt="logo-img"
            className="logo-img"
            src="https://telemart.ua/themes/hardevel/images/nvx-logo.svg"
          ></img>
        </Link>
      </div>

      {data && data.email && data._id ? (
        <>
          <div className="dropdown">
            <Link to="/api/user/basket">
              <img
                alt="basket-img"
                className="basket-img"
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 34 32'%3E%3Cdefs%3E%3Cstyle%3E.cls-1 %7B fill:%23fff; fill-rule:evenodd; %7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M32.1 11.4h-5.7l-6.5-8.3v-.3C20 1.3 18.7 0 17.1 0c-1.6 0-2.9 1.3-2.9 2.9v.4l-6.8 8.2H2c-1.1 0-1.9.9-2 1.9v1.3c0 .9.6 1.6 1.4 1.8.2.1.4.3.4.5l3.4 12.7c.1.6.7 2.3 2.3 2.3h18.9c1.2 0 2-1.1 2.3-2.1L32.1 17c.1-.2.2-.4.4-.5.8-.2 1.4-1 1.4-1.9v-1.3c.1-1-.7-1.9-1.8-1.9zM17 1.5c.7 0 1.3.6 1.3 1.3S17.7 4 17 4c-.7 0-1.3-.6-1.3-1.3s.6-1.2 1.3-1.2zm-1.3 3.9c.4.2.9.4 1.4.4.5 0 .9-.1 1.4-.4l4.7 6H10.8l4.9-6zm16 8.9c-.8.2-1.5.8-1.7 1.7l-3.5 13.3c0 .2-.1.3-.2.4H7.7c-.1-.1-.1-.3-.2-.5L4 15.9c-.2-.8-.8-1.4-1.6-1.6 0 0-.2 0-.2-.3s.2-.3.2-.3h29.4s.2 0 .2.2c0 .3-.3.4-.3.4z'/%3E%3Cpath class='cls-1' d='M12.3 18.2c-.6 0-1.2.5-1.2 1.2v5.5c0 .6.5 1.2 1.2 1.2s1.2-.5 1.2-1.2v-5.5c0-.7-.5-1.2-1.2-1.2zm4.7 0c-.6 0-1.2.5-1.2 1.2v5.5c0 .6.5 1.2 1.2 1.2s1.2-.5 1.2-1.2v-5.5c0-.7-.5-1.2-1.2-1.2zm4.7 0c-.6 0-1.2.5-1.2 1.2v5.5c0 .6.5 1.2 1.2 1.2s1.2-.5 1.2-1.2v-5.5c0-.7-.6-1.2-1.2-1.2z'/%3E%3C/svg%3E"
              />
              {data?.basket?.length > 0 ? (
                <span className="icon-button-badge">
                  {data?.basket?.length}
                </span>
              ) : (
                ""
              )}
            </Link>

            <div
              className="btn btn-secondary dropdown-toggle"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {data.image ? (
                <img
                  alt="profile-img"
                  className="profile-img"
                  src={data.image}
                ></img>
              ) : (
                ""
              )}
              {data.email ? data.email : "user"}
            </div>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <Link to={`/api/user/${data._id}`} className="dropdown-item">
                  Профиль
                </Link>
              </li>
              <li>
                <Link to={`/api/history/${data._id}`} className="dropdown-item">
                  История покупок
                </Link>
              </li>
              <li>
                <Link
                  to={`/api/user/addItem/${data._id}`}
                  className="dropdown-item"
                >
                  Добавить товар
                </Link>
              </li>
              <li>
                <Link to="/" onClick={logOut} className="dropdown-item">
                  Выход
                </Link>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="nav-buttons">
          <div className="nav-button">
            <Link to="/api/auth/register">register</Link>
          </div>
          <div className="nav-button">
            <Link to="/api/auth/login">login</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
