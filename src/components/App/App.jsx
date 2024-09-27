import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PizzaList from '../PizzaList/PizzaList';
import PizzaForm from '../PizzaForm/PizzaForm';
import Checkout from '../Checkout/Checkout';
import Orders from '../Orders/Orders';
import Footer from './Footer/Footer';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = () => {
    axios.get('api/pizza')
      .then(response => {
        dispatch({
          type: 'SET_PIZZAS',
          payload: response.data
        });
      })
      .catch(err => {
        alert('Error fetching pizzas');
        console.error(err);
      });
  };

  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Prime Pizza</h1>
          <nav>
            <Link to="/pizza">Pizza List</Link>
            <Link to="/order">Order Form</Link>
            <Link to="/checkout">Checkout</Link>
            <Link to="/admin">Orders</Link>
          </nav>
        </header>

        <main>
          <img src='images/pizza_photo.png' alt="Delicious Pizza" />
          <p>Pizza is great.</p>

          <Switch>
            <Route exact path="/pizza">
              <PizzaList />
            </Route>
            <Route exact path="/order">
              <PizzaForm fetchPizzas={fetchPizzas} />
            </Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
            <Route exact path="/admin">
              <Orders />
            </Route>
          </Switch>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
