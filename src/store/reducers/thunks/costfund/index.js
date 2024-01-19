import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../../../../config/api/services/index";

// Set thunks!

export const fetchGetProducts = createAsyncThunk(
  "parking/fetchGetProducts",
  async (arg, { getState }) => {
    let response;

    try {
      response = await getAllProducts();
      return response;
    } catch (error) {
      console.log("thunk-get-all-products", error);
    }
  }
);


