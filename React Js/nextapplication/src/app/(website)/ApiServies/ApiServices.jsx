import axios from "axios"
import { toast } from "react-toastify"

const menProducts = () => {
    return axios.get('https://wscubetech.co/ecommerce-api/products.php', {
      params : {
        limit : 8,
        categories : 'mens-shirts,mens-shoes' 
      }
    })
    .then((result) => {
      return result.data.data
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
}

const womenProducts = () => {
    return axios.get('https://wscubetech.co/ecommerce-api/products.php', {
      params : {
        limit : 8,
        categories : 'tops,skin-care' 
      }
    })
    .then((result) => {
      return result.data.data
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
}


export { menProducts, womenProducts }