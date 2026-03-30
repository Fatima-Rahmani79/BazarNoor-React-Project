import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productsAPI";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    return await getProducts();
});

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: "idle", // Idle, loading, succeeded, failed
        error: null,
        category: "all",
        query: "",
        sort: "featured", //price-asc, price-desc, ...
    },

    reducers: {
        setCategory(state, action) {
            state.category = action.payload;
        },
        setQuery(state, action) {
            state.query = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
    }و

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state)=> {
            state.status = "loading";
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action)=> {
            state.status = "succeeded";
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action)=> {
            state.status = "failed";
            state.error = action.error?.message || "Failed to fetch products";
        })
    }
});

export const { setCategory, setQuery, setSort } = productSlice.actions;

export default productSlice.reducer;