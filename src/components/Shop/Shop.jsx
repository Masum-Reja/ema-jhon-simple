import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const saveCart = [];
        //step 1: get id
        for (const id in storedCart) {
            //console.log(id);
            //step 2: get the product by using id
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                //step 3: get the quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                 //console.log(addedProduct);
                
                //step 4: add the added product to  the save cart
                saveCart.push(addedProduct);
            }
            //console.log('added Product ', addedProduct);
        }
        //step 5: set cart 
        setCart(saveCart);
    },[products])


    const handleAddToCart = (product) => {
        // cart.push(product); 
        //const newCart = [...cart, product];


        let newCart = [];

        //      ***ADVANCE***

        //if  product dose'nt exist in the cart, then set quantity = 1
        //if exist update quantity by 1
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            newCart = [...cart, product];
        }

        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart=[...remaining,exists]
        }

        setCart(newCart);
        addToDb(product.id)
    }

    const handleClearCart = () => {
      setCart([]);
        deleteShoppingCart();
    };

    return (
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link className="proceed" to={"/orders"}>
              {" "}
              <button className="btn-proceed">
                Review Order
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
    );
};

export default Shop;