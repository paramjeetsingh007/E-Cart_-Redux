
import './App.css'
import CheckoutPage from './components/MainComponents/CheckoutPage'
import Header from './components/MainComponents/Header'
import MyCart from './components/MainComponents/MyCart'
import Productcard from './components/MainComponents/Productcard'
import {Route, Routes} from 'react-router-dom'
  import { ToastContainer} from 'react-toastify';


function App() {

  return (
    <>

    <Header/>

    <Routes>
      <Route path='/' element={<Productcard/>}/>
      <Route path='/my-cart' element={<MyCart/>}/>
      <Route path='/checkout' element={<CheckoutPage/>}/>
    </Routes>
    <ToastContainer/>
    

    
    </>
  )
}

export default App
