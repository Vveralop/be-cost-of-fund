import { createSlice } from "@reduxjs/toolkit";
import { fetchGetProducts } from "../../thunks/costfund";
import { PURGE } from "reduxjs-toolkit-persist";

// initial state

const initialState = {
  _products: [],
  _cashflows: [],
  status: "idle",
};

// ========== || SLICE - COSTFUND || ======== //

const costfundSlice = createSlice({
  name: "costfund",
  initialState,
  reducers: {
    // 1 - Reset "costfund" state
    resetCostfundState(state, action) {
      state._products = [];
    },
    // 3 - Reset "cashflows" state
    resetCashflowState(state, action) {
      state._cashflows = [];
    },
    // 3 - Fill "cashflows" state
    setCashflowState(state, action) {
      state._cashflows = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetProducts.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchGetProducts.fulfilled, (state, action) => {
        console.log("costfund-get-all", action);
        if (action.payload) {
          if (action.payload.statusCode === 401) {
            state._products = [];
            state.status = "JWT-EXPIRED";
          } else {
            state._products = action.payload.data;
            state.status = "Success";
          }
        } else {
          state.status = "Error";
        }
      })
      .addCase(fetchGetProducts.rejected, (state, action) => {
        console.log("costfund-get-all", action);
        state.status = "Error";
      })
      .addCase(PURGE, (state) => {
        state._products = [];
        state.status = "idle";
      });
  },
});

export default costfundSlice.reducer;

export const { resetParkingState, resetCashflowState, setCashflowState } =
  costfundSlice.actions;
