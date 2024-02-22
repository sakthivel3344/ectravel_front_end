const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  travellersList: [],
};

const travellerSlice = createSlice({
  name: "travellersList",
  initialState,
  reducers: {
    addTraveller: (state, action) => {
      state.travellersList.push(action.payload);
    },
    removeTraveller: (state, action) => {
      let arr = state.travellersList;
      arr = arr
        .slice(0, action.payload)
        .concat(arr.slice(action.payload + 1, arr.length));
      state.travellersList = arr;
    },
    editTraveller: (state, action) => {
      let arr = [...state.travellersList];
      arr[action.payload.travellerData.index] = action.payload.travellerData;
      state.travellersList = arr;
    },
    clearTravellers: (state) => {
      state.travellersList = [];
    },
  },
});

export const travellerReducer = travellerSlice.reducer;
export const { addTraveller, removeTraveller, editTraveller } =
  travellerSlice.actions;
