import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetUserById } from "../../store/storeUser";
import "../../styles/App.css";
import { getId, userIsAuthorized } from "../../services/localStorageServices";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksForStoreUser";
import User from "../../interfaces/user";
const UserPage: React.FC = () => {
  const [data, setData] = useState<User>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getUser = useAppSelector((state) => state.user.user);

  const userId = getId();
  useEffect(() => {
    if (
      userIsAuthorized() &&
      !data?.email &&
      userId !== null &&
      !getUser?._id
    ) {
      dispatch(GetUserById(userId));
    }
    if (getUser?.email) {
      setData(getUser);
    }
  }, [setData, dispatch, data?.email, userId, getUser]);
  return (
    <>
      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        Back
      </button>
      {data?.email ? (
        <div className="user-data-container">
          <div className="user-data">
            <img
              alt="user-data-img"
              className="user-data-img"
              src={data.image}
            ></img>
          </div>
          <div className="user-data">name: {data.email}</div>
          <div className="user-data">createdAt: {data.createdAt}</div>
          <Link to="edit" className="btn btn-primary">
            Изменить
          </Link>
        </div>
      ) : (
        "loading..."
      )}
    </>
  );
};

export default UserPage;
