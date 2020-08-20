
import {CART_ADD_ITEM,CART_REMOVE_ITEM} from "../constants/cartConstants";
import Cookie from "js-cookie";
const { default: Axios } = require("axios")



const addToCart = (productId ,qty)=> async(dispathch,getState)=>{

    try {
        const {data}=await Axios.get("http://localhost:5000/api/products/"+productId);
        dispathch({type: CART_ADD_ITEM,payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty

        }
    });
    const {cart:{cartItems}}=getState();
    Cookie.set("cartItems",JSON.stringify(cartItems));
    } catch (error) {
        
    }

}
const removeFromCart=(productId)=>(dispathch,getState)=>{
    dispathch({type:CART_REMOVE_ITEM,payload:productId});
    const {cart:{cartItems}}=getState();
    Cookie.set("cartItems",JSON.stringify(cartItems));
}


export {addToCart,removeFromCart}