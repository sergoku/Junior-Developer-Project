import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksForStoreUser";
import { fetchItems } from "../../store/storeItems";

import Header from "../header/Header";

const Videocards: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.store.items);
  const title = "videocards";
  useEffect(() => {
    dispatch(fetchItems(title));
  }, [dispatch]);
  return <Header items={items} />;
};

export default Videocards;
