import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            state = action.payload;
            return state;
        },
        removeNotification() {
            return null;
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
