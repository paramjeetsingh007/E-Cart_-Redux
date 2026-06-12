
import axios from 'axios'

async function Product() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products')
        return response.data

    } catch (error) {
        return error

    }



}


export default Product