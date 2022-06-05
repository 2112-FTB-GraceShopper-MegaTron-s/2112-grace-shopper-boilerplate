import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/
export async function getProducts() {
  try {
    const { data:  products  } = await axios.get('/api/product')
    console.log(products)
    return products;
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

export async function loginUser({username, password}) {
  try{
    const response = await axios.post('/api/users/login',  {username, password})
    localStorage.setItem('token', response.data.token)
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function registerUser({username, password,email}){
  try{
    const response = await axios.post('/api/users/register',  {username, password,email})
    console.log(response);
    localStorage.setItem('token', response.data.token)
    return response;
  }catch(err){
    console.error(err)
  }
}