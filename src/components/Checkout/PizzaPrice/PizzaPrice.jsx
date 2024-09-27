import React from 'react';
import { useSelector } from 'react-redux';

export default function PizzaPrice() {
    const pizzas = useSelector((store) => store.pizza.pizzas) || []; 

  
    const totalPrice = pizzas.reduce((total, pizza) => {
        const price = parseFloat(pizza.price) || 0; 
        return total + price;
    }, 0).toFixed(2); 

    return (
        <div>
            <h3>Total Pizza Price: ${totalPrice}</h3>
        </div>
    );
}
