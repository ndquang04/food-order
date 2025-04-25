import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {
    _id: '',
    name: '',
    email: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.data = action.payload;
    },
    logout: (state, action) => {
      state.data = {
        _id: '',
        name: '',
        email: '',
      };
    },
  },
});

export const {setUserDetails, logout} = userSlice.actions;

export default userSlice.reducer;
