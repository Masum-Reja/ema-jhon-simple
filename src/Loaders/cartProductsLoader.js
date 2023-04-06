import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
     
      const loadedProduct = await fetch('products.json');
      const products = await loadedProduct.json();

      // if cart data is  in database, you  have to  use async await otherwise bellow process
      const storedCart = getShoppingCart();
      const saveCart = [];
      for (const id in storedCart) {
            const addedProduct = products.find(pd => pd.id === id);
            if (addedProduct) {
                  const quantity = storedCart[id];
                  addedProduct.quantity = quantity;
                  saveCart.push(addedProduct);
            }
      }
      // if you  need to send just two  thing
      //return { products, saveCart };
      //another options
      //return { products, cart: saveCart };
            
      //console.log(products);
      return saveCart;
}
export default cartProductsLoader;