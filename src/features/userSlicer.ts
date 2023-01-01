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
  reducers: {
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
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

export const { removeUser } = userSlicer.actions;
export default userSlicer.reducer;
