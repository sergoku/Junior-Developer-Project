import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/App.css";
import { getId } from "../../services/localStorageServices";
import { addNewItem } from "../../store/storeItems";
import { useAppDispatch } from "../../hooks/hooksForStoreUser";

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = getId();
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);
  const id = getId();
  const addItemFunc = async () => {
    if (id) {
      await dispatch(addNewItem({ ...dataInput, categoria, id, count: 1 }));
    }

    navigate(`/api/${categoria}s`);
  };
  const [dataInput, setDataInput] = useState({
    title: "",
    price: 0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY7TGHfeixhepAnH0c538QZvMnj2lZMfM2SDlvhGnP1BK8ZIMp9I50ELNBDwcaY5z5eY4&usqp=CAU",
  });
  const [categoria, setСategoria] = useState("processor");

  const handleChange = (e: { target: { placeholder: any; value: any } }) => {
    setDataInput((prevState) => ({
      ...prevState,
      [e.target.placeholder]: e.target.value,
    }));
  };

  const inputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev?.target?.result) {
        const image: string = ev.target.result.toString();
        setDataInput({ ...dataInput, image: image });
      } else {
        return;
      }
    };
    if (file !== null) {
      reader.readAsDataURL(file[0]);
    }
  };

  const handleChangeRadio = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setСategoria(event.target.value);
  };

  return (
    <>
      <h1 className="login-h1-center">Добавить товар</h1>
      <div className="align-center">
        <img
          alt="item-data-img"
          className="item-data-img"
          src={dataInput.image}
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
      {/*  */}
      <div className="align-center margin-top-bottom-25">
        <div>
          <input
            type="radio"
            id="processor"
            name="choose"
            value="processor"
            checked={categoria === "processor"}
            onChange={handleChangeRadio}
          />
          <label className="margin-right-20" htmlFor="processor">
            Процессор
          </label>

          <input
            type="radio"
            id="videocard"
            name="choose"
            value="videocard"
            onChange={handleChangeRadio}
            checked={categoria === "videocard"}
          />
          <label className="margin-right-20" htmlFor="videocard">
            Видеокарта
          </label>

          <input
            type="radio"
            id="motherboard"
            name="choose"
            value="motherboard"
            onChange={handleChangeRadio}
            checked={categoria === "motherboard"}
          />
          <label className="margin-right-20" htmlFor="motherboard">
            Материнская плата
          </label>
        </div>
      </div>
      {/*  */}
      <div className="form-floating mb-3">
        <input
          minLength={3}
          required
          type="text"
          value={dataInput.title}
          onChange={handleChange}
          className="form-control"
          id="nameItem"
          placeholder="title"
        />
        <label htmlFor="nanameItemme">Название товара</label>
      </div>
      <div className="form-floating">
        <input
          minLength={1}
          required
          type="number"
          value={dataInput.price}
          onChange={handleChange}
          className="form-control"
          id="price"
          placeholder="price"
        />
        <label htmlFor="price">Стоимость</label>
      </div>

      <div className="form-submite">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Назад
        </button>
        <button onClick={addItemFunc} type="submit" className="btn btn-primary">
          Добавить
        </button>
      </div>
    </>
  );
};
export default AddItem;
