import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false
    },
    reducers: {
        productRequest(state, action) {
            return {
                loading: true
            }
        },
        productSuccess(state, action) {
            return {
                loading: false,
                product: action.payload.products,
            }
        },
        productFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = productSlice;

export const {
    productRequest,
    productSuccess,
    productFail
} = actions;

export default reducer;