import { createSlice } from '@reduxjs/toolkit';

const initialState : boolean = true;

const button = createSlice({
  name: 'buttonEnviar',
  initialState,
  reducers: {
   changeBooleanFalse(state){
    return state === false
   },
   changeBooleanTrue(state){
    return true
   }
  },
});

export const { changeBooleanFalse, changeBooleanTrue } = button.actions;
export default button.reducer;
