import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import httpServise from "../services/httpServices";
import { getId } from "../services/localStorageServices";
import User from "../interfaces/user";
import Item from "../interfaces/Item";
import {
  setAccsessToken,
  setExpiresIn,
  setId,
  setRefreshToken,
} from "../services/localStorageServices";
type UserData = {
  user: User | null;
  status: string | null;
  error: string | null;
};
type InputData = {
  email: string;
  password: string;
  image?: string;
};
export const LogIn = createAsyncThunk<User, InputData>(
  "storeUser/LogIn",
  async (dataInput) => {
    const { data } = await httpServise.post(
      "http://localhost:8080/api/auth/login",
      {
        email: dataInput.email,
        password: dataInput.password,
      }
    );
    console.log(data);

    setAccsessToken(data.accsessToken);
    setRefreshToken(data.refreshToken);
    setId(data.id);
    setExpiresIn(data.expiresIn);
    return data;
  }
);
export const Register = createAsyncThunk<User, InputData>(
  "storeUser/Register",
  async (dataInput) => {
    const { data } = await httpServise.post(
      "http://localhost:8080/api/auth/register",
      {
        email: dataInput.email,
        password: dataInput.password,
      }
    );
    setAccsessToken(data.accsessToken);
    setRefreshToken(data.refreshToken);
    setId(data.id);
    setExpiresIn(data.expiresIn);
    return data;
  }
);
export const GetUserById = createAsyncThunk<User, string>(
  "storeUser/GetUserById",
  async (id) => {
    const { data } = await httpServise.get(
      `http://localhost:8080/api/user/${id}`
    );

    return data;
  }
);
export const BuyItemReq = createAsyncThunk<User, Item>(
  "storeUser/BuyItemReq",
  async (updateObj) => {
    const { data } = await httpServise.patch(
      `http://localhost:8080/api/user/buy/${getId()}`,
      {
        basket: updateObj,
      }
    );
    return data;
  }
);
export const UserBasketUpdate = createAsyncThunk<User, Item[]>(
  "storeUser/UserBasketUpdate",
  async (updateObj) => {
    const { data } = await httpServise.patch(
      `http://localhost:8080/api/user/edit/${getId()}`,
      {
        basket: updateObj,
      }
    );
    return data;
  }
);
export const UserDataUpdate = createAsyncThunk<User, InputData>(
  "storeUser/UserDataUpdate",
  async (updateObj) => {
    const { data } = await httpServise.patch(
      `http://localhost:8080/api/user/edit/${getId()}`,
      {
        email: updateObj.email,
        password: updateObj.password,
        image: updateObj.image,
      }
    );

    return data;
  }
);
export const ConfimOrder = createAsyncThunk<User, Item[]>(
  "storeUser/ConfimOrder",
  async (itemsHadBuy) => {
    const { data } = await httpServise.patch(
      `http://localhost:8080/api/user/confimOrder/${getId()}`,
      {
        historyBuy: itemsHadBuy,
      }
    );
    return data;
  }
);

const storeUser = createSlice({
  name: "storeUser",
  initialState: {
    user: null,
    status: null,
    error: null,
  } as UserData,
  reducers: {
    incrementCountValue: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.basket.forEach((item: Item) => {
          if (item.count) {
            return item._id === action.payload ? item.count++ : item;
          }
        });
      }
    },
    decrementCountValue: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.basket.forEach((item) => {
          if (item.count) {
            return item._id === action.payload
              ? (item.count = item.count - 1)
              : item;
          }
        });
      }
    },
    exit: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LogIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(LogIn.fulfilled, (state, action) => {
        state.status = "resolved";
        state.user = action.payload;
      })
      .addCase(LogIn.rejected, (state) => {
        state.error = "error: Не удалось войти";
      })
      .addCase(Register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.status = "resolved";
        state.user = action.payload;
      })
      .addCase(Register.rejected, (state) => {
        state.error = "error: Не удалось зарегестрироваться";
      })
      .addCase(GetUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(GetUserById.fulfilled, (state, action) => {
        state.status = "resolved";
        state.user = action.payload;
      })
      .addCase(GetUserById.rejected, (state) => {
        state.error = "error: Не удалось зарегестрироваться";
      })
      .addCase(BuyItemReq.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(BuyItemReq.fulfilled, (state, action) => {
        state.status = "resolved";
        state.user = action.payload;
      })
      .addCase(BuyItemReq.rejected, (state) => {
        state.error = "error: Не удалось получить товар";
      })
      .addCase(UserBasketUpdate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(UserBasketUpdate.fulfilled, (state, action) => {
        state.status = "resolved";
        state.user = action.payload;
      })
      .addCase(UserBasketUpdate.rejected, (state) => {
        state.error = "error: Не удалось добавить товар в корзину";
      })
      .addCase(UserDataUpdate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(UserDataUpdate.fulfilled, (state, action) => {
        state.status = "resolved";
        state.user = action.payload;
      })
      .addCase(UserDataUpdate.rejected, (state) => {
        state.error = "error: Не удалось обновить данные";
      })
      .addCase(ConfimOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(ConfimOrder.fulfilled, (state, action) => {
        state.status = "resolved";
        state.user = action.payload;
      })
      .addCase(ConfimOrder.rejected, (state) => {
        state.error = "error: Не удалось оформить заказ";
      });
  },
  // extraReducers: {
  //  1 [LogIn.pending]: (state) => {
  //     state.status = "loading";
  //     state.error = null;
  //   },
  //   [LogIn.fulfilled]: (state, action) => {
  //     state.status = "resolved";
  //     state.user = action.payload;
  //   },
  //   [LogIn.rejected]: (state) => {
  //     state.error = "error";
  //   },
  //  2 [Register.pending]: (state) => {
  //     state.status = "loading";
  //     state.error = null;
  //   },
  //   [Register.fulfilled]: (state, action) => {
  //     state.status = "resolved";
  //     state.user = action.payload;
  //   },
  //   [Register.rejected]: (state) => {
  //     state.error = "error";
  //   },
  //  3 [GetUserById.pending]: (state) => {
  //     state.status = "loading";
  //     state.error = null;
  //   },
  //   [GetUserById.fulfilled]: (state, action) => {
  //     state.status = "resolved";
  //     state.user = action.payload;
  //   },
  //   [GetUserById.rejected]: (state) => {
  //     state.error = "error";
  //   },
  //  4 [BuyItemReq.pending]: (state) => {
  //     state.status = "loading";
  //     state.error = null;
  //   },
  //   [BuyItemReq.fulfilled]: (state, action) => {
  //     state.status = "resolved";
  //     state.user = action.payload;
  //   },
  //   [BuyItemReq.rejected]: (state) => {
  //     state.error = "error";
  //   },
  //  5 [UserBasketUpdate.pending]: (state) => {
  //     state.status = "loading";
  //     state.error = null;
  //   },
  //   [UserBasketUpdate.fulfilled]: (state, action) => {
  //     state.status = "resolved";
  //     state.user = action.payload;
  //   },
  //   [UserBasketUpdate.rejected]: (state) => {
  //     state.error = "error";
  //   },
  //  6 [UserDataUpdate.pending]: (state) => {
  //     state.status = "loading";
  //     state.error = null;
  //   },
  //   [UserDataUpdate.fulfilled]: (state, action) => {
  //     state.status = "resolved";
  //     state.user = action.payload;
  //   },
  //   [UserDataUpdate.rejected]: (state) => {
  //     state.error = "error";
  //   },
  //  7 [ConfimOrder.pending]: (state) => {
  //     state.status = "loading";
  //     state.error = null;
  //   },
  //   [ConfimOrder.fulfilled]: (state, action) => {
  //     state.status = "resolved";
  //     state.user = action.payload;
  //   },
  //   [ConfimOrder.rejected]: (state) => {
  //     state.error = "error";
  //   },
  // },
});
export const { incrementCountValue, decrementCountValue, exit } =
  storeUser.actions;
// export const getUserData = () => (state) => state.user.user;
export default storeUser.reducer;
