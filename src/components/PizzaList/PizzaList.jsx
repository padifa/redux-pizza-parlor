import React, { useEffect }  from 'react';
import PizzaItem from '../PizzaItem/PizzaItem.jsx';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import "./PizzaList.css"

export default function PizzaList() {

  const dispatch = useDispatch();
  const pizzas = useSelector((store) => store.pizza.pizzas);

  const fetchPizzas = async () => {
    try {
      const response = await axios.get("/api/pizza");
      dispatch({
        type: "SET_PIZZAS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching pizzas", error);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);
    
    return (
      <div >
        <h1>Hello pizza man?</h1>
        <ul className="pizza-container">
          {pizzas?.map((pizza) => {
            return <PizzaItem key={pizza.id} pizza={pizza} />;
          })}
        </ul>
      </div>
    );
  }

    
