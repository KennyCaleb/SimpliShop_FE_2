const intialData = {
    products:[],
    userType: "yu",
    regModal:false,
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

    function handleCart(){

    }

    switch (action.type) {
        case "RENDER_STORE_PRODUCTS":
            return {
                ...state,
                products: action.payload
            }

        case "UPDATE_REG_MODAL_STATE":
            return {
                ...state,
                regModal: action.payload
            }


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