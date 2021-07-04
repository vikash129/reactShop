//importin styling
import {  ThemeProvider , createMuiTheme} from '@material-ui/core'
import {  blue, red} from '@material-ui/core/colors'
import 'fontsource-roboto'

//react necc modules
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useCookies } from 'react-cookie'

//componnet
import { Header } from './MyComp/Header'
import { Shop } from './MyComp/Shop';
import { UserLogin } from './MyComp/UserLogin';
import { ProductCreate } from "./MyComp/ProductCreate";
import { ProductEdit } from "./MyComp/ProductEdit";
import { ProductView } from './MyComp/ProductView';
import { CheckOutForm } from './MyComp/CheckOutForm';
import { UserSignIn } from './MyComp/UserSignIn';
import {Footer} from './MyComp/Footer'


const theme = createMuiTheme ({
  palette : {
      secondary : {
          main : red[500]
      } ,
       primary : {
         main : blue[200]
       }
  }
})

!localStorage.getItem('cartList') && localStorage.setItem('cartList', JSON.stringify([]))

const App = () => {

  const [setCookie, removeCookie] = useCookies(['loginUser'])
  const cookies = { loginUser: { username: 'vikash' } }

  const [cartList, setCartList] = useState(
    localStorage.getItem('cartList')
      ?
      JSON.parse(localStorage.getItem('cartList'))
      :
      []
  )


  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList))
  }, [cartList])


  const handleCart = (e, product) => {

    e.preventDefault()

    cartList.push(product)
    setCartList([...cartList])
  }


  return (
    <ThemeProvider theme = {theme} >
<h1>chl gya bc</h1>

      <Router>
        <Header loginUser={cookies.loginUser} removeCookie={removeCookie} cartList={cartList} />

        <Switch>

          <Route exact path='/'>
            <Shop logginUser={cookies.loginUser} handleCart={handleCart} />
          </Route>

          <Route path='/create' component={ProductCreate} />
          <Route exact path='/edit' component={ProductEdit} />


          <Route
            path='/view/:id'
            render={(props) =>
              (<ProductView id={props.match.params.id} />)
            }
          />


          <Route path='/checkOut/:totalPrice'
            render={(props) =>
              (<CheckOutForm loginUser={cookies.loginUser}  {...props} />)
            } />


          <Route path='/login'>
            <UserLogin setCookie={setCookie} />
          </Route>

          <Route path='/signin'>
            <UserSignIn setCookie={setCookie} />
          </Route>



        </Switch>
      </Router>






      <Footer />

      </ThemeProvider>

  );
}






export default App;

