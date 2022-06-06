import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

 
export async function getUsers() {
  try {
    const { data: users } = await axios.get('/api/users')
    return users;
  } catch(err) {
    console.error(err)
  }
}


export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function getAllProducts() {
  try {
    //is that /productId? or /:productId
    //is the method get? 
    const { data: products } = await axios.get('/api/product');
    return products;
  } catch (err) {
    console.error(err);
    return  "Whoops, looks like we'er fresh out."  ;
  }
}

export async function retrieve() {
  try {
    //is that /cart? or /:cartItem
    //is the method patch? 
    const { data: cartItem } = await axios.patch('/api/cartItem');
    return cartItem;
  } catch (err) {
    console.error(err);
    return  "Item not found"  ;
  }
}

export async function add() {
  try {
    //is that /add? or /:addItem
    //is the method patch? 
    const { data: addItem } = await axios.patch('/api/addProductTopCart');
    return addItem;
  } catch (err) {
    console.error(err);
    return  "Failed to add.."  ;
  }
}

export async function update() {
  try {
    //is that /update? or /:updateItem
    //is the method post? 
    const { data: updateItem } = await axios.post('/api/updateItem');
    return updateItem;
  } catch (err) {
    console.error(err);
    return  "Item didn't update"  ;
  }
}

export async function remove() {
  try {
    //is that /remove? or /:removeItem
    //is the method delete?
    const { data: removeItem } = await axios.delete('/api/removeItem');
    return removeItem;
  } catch (err) {
    console.error(err);
    return  "Item was not removed"  ;
  }
}

export async function emptyCart() {
  try {
    //is that /emptyCart? or /:emptyCartItemItem
    //is the method delete?
    const { data: emptyCartItem } = await axios.delete('/api/emptyCartItem');
    return emptyCartItem;
  } catch (err) {
    console.error(err);
    return  "Cart can't be emptied"  ;
  }
}

export async function capture() {
  try {
    //is that /capture? or /:captureItem
    //is the method delete?
    const { data: captureCart } = await axios.post('/api/captureCart');
    return captureCart;
  } catch (err) {
    console.error(err);
    return  "We didn't catch that.."  ;
  }
}

export async function refreshCart() {
  try {
    //is that /cart? or /:cartItem
    //is the method delete?
    const { data: cartItem } = await axios.post('/api/cartItem');
    return cartItem;
  } catch (err) {
    console.error(err);
    return  "Cart can't refresh"  ;
  }
}

