import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/App.css";
import { GetUserById, UserDataUpdate } from "../../store/storeUser";
import { getId } from "../../services/localStorageServices";

import { validate } from "../../services/validateService";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksForStoreUser";
import User from "../../interfaces/user";
const ChangeUserPage: React.FC = () => {
  const [data, setData] = useState<User>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getUser = useAppSelector((state) => state.user.user);
  const userId = getId();
  useEffect(() => {
    if (userId && !data && getUser) {
      dispatch(GetUserById(userId));
      setData(getUser);
    }
  }, [userId, dispatch, getUser, data]);
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const ChangeData = async () => {
    if (data) {
      await dispatch(
        UserDataUpdate({
          ...data,
          email: dataInput.email,
          password: dataInput.password,
        })
      );
      navigate("/");
    } else {
      alert("something is wrong");
    }
  };

  const [dataInput, setDataInput] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const handleChange = (e: { target: { type: any; value: any } }) => {
    setDataInput((prevState) => ({
      ...prevState,
      [e.target.type]: e.target.value,
    }));
  };

  useEffect(() => {
    validate({ dataInput, setErrors });
  }, [dataInput]);
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    validate({ dataInput, setErrors });
  };
  const inputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev?.target?.result && data) {
        const image: string = ev.target.result.toString();
        setData({ ...data, image });
      } else {
        return;
      }
    };
    if (file !== null) {
      reader.readAsDataURL(file[0]);
    }
  };
  return (
    <>
      <h1 className="login-h1-center">ChangeData</h1>
      <div className="align-center">
        <img
          alt="user-data-img"
          className="user-data-img"
          src={data?.image}
        ></img>
      </div>
      <div className="align-center">
        <input
          className="align-center"
          onChange={(e) => inputEvent(e)}
          type="file"
          accept=".png,.jpg,.jpeg"
          id="file"
        ></input>
      </div>

      <div onSubmit={handleSubmit} className="form-floating mb-3">
        <input
          type="email"
          value={dataInput.email}
          onChange={handleChange}
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">
          Email address{errors ? errors.email : ""}
        </label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          value={dataInput.password}
          onChange={handleChange}
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label htmlFor="floatingPassword">
          Password{errors ? errors.password : ""}
        </label>
      </div>
      <div className="form-submite">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Назад
        </button>
        <button
          onClick={ChangeData}
          disabled={!errors}
          type="submit"
          className="btn btn-primary"
        >
          Изменить
        </button>
      </div>
    </>
  );
};
export default ChangeUserPage;
