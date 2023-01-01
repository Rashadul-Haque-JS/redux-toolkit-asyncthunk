import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

export type TUser = {
  id: number;
  name: string;
  email: string;
};

interface IUsers {
  users: TUser[];
  status: string;
  error: any;
}

const initialState: IUsers = {
  users: [],
  status: "idle",
  error: "",
};

export const userSlicer = createSlice({
  name: "user",
  initialState,

  // This main reducer is for all actions outside API
  reducers: {
    addUser: (state, action: PayloadAction<TUser>) => {
      state.users = [...state.users, action.payload];
    },
    editUser: (state, action: PayloadAction<TUser>) => {
      state.users.find((user) => {
        if (user.id === action.payload.id) {
          user = action.payload;
          state.users = state.users.filter(
            (user) => user.id !== action.payload.id
          );
          state.users = [...state.users, action.payload];
          state.users.sort((a, b) => {
            return -(b.id - a.id || a.name.localeCompare(b.name));
          });
        }
      });
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  // This extra reducer is for API ations
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = action.meta.requestStatus;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = action.meta.requestStatus;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { addUser, editUser, removeUser } = userSlicer.actions;
export default userSlicer.reducer;
