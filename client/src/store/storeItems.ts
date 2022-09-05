import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Item from "../interfaces/Item";
import httpServise from "../services/httpServices";

interface ItemData {
  items: Item[];
  searchItem: Item[];
  searchInput: string;
  CurrentPageItem: Item | null;
  status: string | null;
  error: string | null;
}

export const fetchItems = createAsyncThunk<Item[], string>(
  "storeItems/fetchItems",
  async (title) => {
    const { data } = await httpServise.get(
      `http://localhost:8080/api/${title}`
    );

    return data;
  }
);
export const fetchCurrentPageItem = createAsyncThunk<Item, string>(
  "storeItems/fetchCurrentPageItem",
  async (id) => {
    const { data } = await httpServise.get(
      `http://localhost:8080/api/popular/item/${id}`
    );

    return data;
  }
);
export const getSearchItem = createAsyncThunk<Item, string>(
  "storeItems/getSearchItem",
  async (title) => {
    const { data } = await httpServise.get(
      `http://localhost:8080/api/popular/${title}`
    );

    return data;
  }
);
export const addNewItem = createAsyncThunk<Item, Item>(
  "storeItems/addNewItem",
  async (item) => {
    const { id, categoria } = item;
    const { data } = await httpServise.post(
      `http://localhost:8080/api/${categoria}s/addItem/${id}`,
      {
        ...item,
      }
    );
    return data;
  }
);
export const deleteCreatedItem = createAsyncThunk<Item, Item>(
  "storeItems/deleteCreatedItem",
  async (title) => {
    const { categoria, createdBy } = title;
    const { data } = await httpServise.delete(
      `http://localhost:8080/api/${categoria}s/deleteItem/${createdBy}`
    );
    return data;
  }
);

const storeItemsSlice = createSlice({
  name: "storeItems",
  initialState: {
    items: [],
    searchItem: [],
    searchInput: "",
    CurrentPageItem: null,
    status: null,
    error: null,
  } as ItemData,
  reducers: {
    changeSearchInputValue: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    updateItemsAfterDeleteOne: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "resolved";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.error = "error: Не смогли загрузить товары";
      })
      .addCase(fetchCurrentPageItem.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrentPageItem.fulfilled, (state, action) => {
        state.status = "resolved";
        state.CurrentPageItem = action.payload;
      })
      .addCase(fetchCurrentPageItem.rejected, (state) => {
        state.error = "error: Не смогли загрузить товар";
      })
      .addCase(getSearchItem.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSearchItem.fulfilled, (state, action) => {
        state.status = "resolved";
        state.searchItem = action.payload as unknown as Item[];
      })
      .addCase(getSearchItem.rejected, (state) => {
        state.error = "error: Что то пошло не по плану";
      })
      .addCase(addNewItem.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addNewItem.fulfilled, (state) => {
        state.status = "resolved";
      })
      .addCase(addNewItem.rejected, (state) => {
        state.error = "error: Мы не смоги добавить новый товар";
      })
      .addCase(deleteCreatedItem.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCreatedItem.fulfilled, (state) => {
        state.status = "resolved";
      })
      .addCase(deleteCreatedItem.rejected, (state) => {
        state.error = "error: Мы не смоги удалить этот товар";
      });
  },
});
export const { changeSearchInputValue, updateItemsAfterDeleteOne } =
  storeItemsSlice.actions;
export default storeItemsSlice.reducer;
