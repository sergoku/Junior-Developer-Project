import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Register as RegisterUser } from "../../store/storeUser";
import "../../styles/App.css";
import { validate } from "../../services/validateService";
import { useAppDispatch } from "../../hooks/hooksForStoreUser";
const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const registerUserDataSend = async () => {
    const data = await dispatch(RegisterUser(dataInput));
    if (data.meta.requestStatus === "fulfilled") {
      navigate("/", { replace: true });
    } else {
      alert("Этот аккаунт уже когда-то был зарегестрирован");
    }
  };

  const navigate = useNavigate();
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

  return (
    <>
      <h1 className="login-h1-center">Registration</h1>
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
          onClick={registerUserDataSend}
          disabled={!errors}
          type="submit"
          className="btn btn-primary"
        >
          Отправить
        </button>
      </div>
    </>
  );
};

export default Register;
