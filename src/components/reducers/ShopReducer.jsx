const intialData = {
    userType: "",
    cart:[],
    filters: {
        searchQuery: "",
        category: "all",
        displayOrder:"",
        minPrice: "",
        maxPrice: "",
        freeShipping: false,
        ratings: 0,
    }
}

function ShopReducer(state = intialData, action) {

    switch (action.type) {

        case "UPDATE_USER_TYPE":
            return {
                ...state,
                userType: action.payload
            }

        case "UPDATE_CART":
            return{
                ...state,
                cart: action.payload
            }

        case "UPDATE_FILTERS":
            return {
                ...state,
                filters: { ...state.filters, ...action.payload }
            }

        default: {
            return state
        }
    }

}

export default ShopReducer