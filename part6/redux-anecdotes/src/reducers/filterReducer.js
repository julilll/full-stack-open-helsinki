import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterBy(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export const { filterBy } = filterSlice.actions;
export default filterSlice.reducer;
