import React from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./Checkout.css"
import { useState } from 'react';
import axios from 'axios';
export default function Checkout() {
    const dispatch = useDispatch();
     
    const orders = useSelector((store) => store.pizza.orders);
    const pizzas = useSelector((store) => store.pizza.pizzas);
    const customer = useSelector((store) => store.pizza.customer) || [];
console.log(orders)
  let foundPizzas = [];
    for (let pizza of orders) {
        for (let ordered of pizzas) {
            if (pizza.id === ordered.id) {
                foundPizzas.push(ordered);
            }
        }
       
    }
    console.log(foundPizzas)
    
    
    let totalCost = 0;
    for (let cost of foundPizzas) {
        const price = parseFloat(cost.price) || 0; 
        if (price > 0) {
            totalCost += price;
        }
    }
    
  


    totalCost = totalCost.toFixed(2);
    const [id, setId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [customer_name, setCustomerName] = useState('');
    const [street_address, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [type, setType] = useState('');
   
    const handleCheckout = () => {
        console.log('handling checkout!!')
        const newOrder = {
            customer_name: customer.customer_name,
            street_address: customer.street_address,
            city: customer.city,
            zip: customer.zip,
            total: totalCost,
            type: customer.type,
            pizzas: orders
          }
          console.log("New Order: ====>", newOrder)
      dispatch({ type: "CUSTOMER_ORDER" });
          console.log(newOrder)
      axios.post('/api/order', {...newOrder})
      .then((response) => {
        console.log("Order successful!", response.data);
       setCustomerName('');
       setCustomerName('');
       setCity('');
       setZip('');
       setType('');
      }).catch(err => console.error("Error che", err));
        };
       
        return (
            <>
            <div className='customer-info'>
                <ul>
                    <li>Name: {customer.customer_name}</li>
                    <li>Address: {customer.street_address}</li>
                    <li>City: {customer.city}</li>
                    <li>Zip: {customer.zip}</li>
                    <li>Type: {customer.type}</li>    
                </ul>
            </div>
            <div className='checkout-container'>
                <h2>Checkout</h2>
                <table className='checkout-table'>
                    <thead>
                        <tr>
                            <th>Pizza</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foundPizzas.map((item, id) => (
                            <tr key={id}>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
               
        
                <label>Total:</label>
                <p>${totalCost}</p>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
            </>
        )
    }


    // {
    //     "customer_name": "Donatello",
    //     "street_address": "20 W 34th St",
    //     "city": "New York",
    //     "zip": "10001",
    //     "total": "27.98",
    //     "type": "Pickup",
    //     "pizzas": [{
    //       "id": "1",
    //       "quantity": "1"
    //     },{
    //       "id": "2",
    //       "quantity": "1"
    //     }]
    //   }