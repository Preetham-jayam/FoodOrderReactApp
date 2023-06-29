import React,{useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState={
    items:[],
    totalAmount:0
}

const cartReducer=(state,action)=>{
    if(action.type==='Add_Item'){
        const updatedTotalAmount=state.totalAmount+action.item.price*action.item.amount;
        const existingCartItemIndex=state.items.findIndex(item=>item.id===action.item.id);
        const existingCartItem=state.items[existingCartItemIndex];
       
        let updatedItems;

        if(existingCartItem){
          const updatedItem={
                ...existingCartItem,
                amount:existingCartItem.amount+action.item.amount
            };
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        }
        else{
           
            updatedItems=state.items.concat(action.item);
        }
      
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }

    }
    if(action.type==='Remove_Item'){
        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.id);
        const existingItem=state.items[existingCartItemIndex];
        const updatedTotalAmount=state.totalAmount-existingItem.price;
        let updatedItems;

        if(existingItem.amount===1){
           updatedItems=state.items.filter(item=>item.id!==action.id);
        }
        else{
            const updateditem={...existingItem,amount:existingItem.amount-1};
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex]=updateditem;

        }

        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    if(action.type==='Clear'){
       return defaultCartState;
    }
    return defaultCartState;
}

const CartProvider=(props)=>{
    const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState);
const addItemHandler=(item)=>{
    dispatchCartAction({type:'Add_Item',item:item})
};

const RemoveItemHandler=(id)=>{
    dispatchCartAction({type:'Remove_Item',id:id});
};

const clearCartHandler=()=>{
    dispatchCartAction({type:"Clear"});
}

    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemHandler,
        removeItem:RemoveItemHandler,
        clearCart:clearCartHandler
    };
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};


export default CartProvider;