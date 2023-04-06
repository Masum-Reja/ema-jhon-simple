import React, { Children } from 'react';
import './Cart.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//option 3
// const Cart = (props)=>{
//        return (
//             <div>
//                   <h4>Order Summary</h4>
//                 <p>Selected Items: {cart.length}</p>
//             </div>
//       );
// }

const Cart = ({cart, handleClearCart,children}) => {
      //const cart = props.cart; // option 1
      //const { cart } = props; //option 2
      console.log(cart);

      let totalPrice = 0;
      let totalShipping = 0;
      let quantity = 0;
      for (const product of cart) {

            // if (product.quantity === 0) {
            //       product.quantity = 1;
            // }

            product.quantity = product. quantity || 1; //shortcut: if quantity =0 ,then set quantity=1

            totalPrice = totalPrice + product.price * product.quantity;
            
            totalShipping = totalShipping + product.shipping * product.quantity;

            quantity = quantity + product.quantity;
      }
      let tax = totalPrice * 7 / 100; // 7% tax
      let granTotal = totalPrice + totalShipping + tax;

      return (
        <div className="cart">
          <h2 style={{ textAlign: "center" }}>Order Summary</h2>
          <p>Selected Items: {quantity}</p>
          <p>Total Price: ${totalPrice} </p>
          <p>Total Shipping: {totalShipping}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
          <h5>Grand Total: ${granTotal.toFixed(2)}</h5>
          <button onClick={handleClearCart} className='btn-clear'>
            <span>Clear Cart </span>
            <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  {children}
                  
        </div>
      );
};

export default Cart;