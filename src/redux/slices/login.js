import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token:null,
  user: null,
};

const loginSlice = createSlice({
  name: 'login',
    initialState, 
    reducers: {
      login: (state, action) => {
            state.isLoggedIn = true;    
            state.user = action.payload;
            state.token = action.payload.token;
           
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
        }
        ,   
        logout: (state) => {
            state.isLoggedIn = false;    
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
