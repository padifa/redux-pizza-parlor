import "./PizzaItem.css"
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect }  from 'react';
export default function PizzaItem({ pizza }) {
  const dispatch = useDispatch();
  const pizzas = useSelector((store) => store.pizza.pizzas);
 
  

  const addPizzaToCart = (event) => {
    console.log(pizza);
    //what a pizza needs to be in the order, id {id: pizza.id, quantity: 1}
  //dispatch to the pizzaReducer ADD_ORDER
  let newPizza = {
    id: pizza.id,
    quantity: 1
  }
  dispatch({type: 'ADD_ORDER', payload: newPizza})
   
  }
        return (
          <li className="pizza-item">
            <div className="pizza-content">
              <h2>{pizza.name}</h2>
              <p className="pizza-price">Price: ${pizza.price}</p>
              <p>{pizza.description}</p>
              {pizza.image_path && <img className="pizza-image" src={pizza.image_path} alt={pizza.name} style={{ width: '100px', borderRadius: '8px' }} />}
              <div>
              <button onClick={() => addPizzaToCart(pizza)}>Add to Cart</button>
              </div>
            </div>
          </li>
        );
      }
    

