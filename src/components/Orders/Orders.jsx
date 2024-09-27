import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import "./Orders.css"

export default function Orders() {
    const dispatch = useDispatch();
    const customers = useSelector((store) => store.pizza.customer);
    const orders = useSelector((store) => store.pizza.orders);

    useEffect(() => {
        const fetchCustomers = () => {
            axios.get('/api/order')
                .then(response => {
                    const allOrders = response.data;
                    console.log(`Orders: `, allOrders);
                    dispatch({
                        type: 'CUSTOMER_ORDER',
                        payload: allOrders
                    });
                })
                .catch(err => {
                    alert('Error fetching orders');
                    console.error(err);
                });
        };

        fetchCustomers();
    }, [dispatch]);

    console.log(customers);
    console.log(orders);

    return (
        <div className="orders-container">
            <h1>Orders</h1>
            {customers && customers.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Zip</th>
                            <th>Order Type</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index}>
                                <td>{customer.customer_name}</td>
                                <td>{customer.street_address}</td>
                                <td>{customer.city}</td>
                                <td>{customer.zip}</td>
                                <td>{customer.type}</td>
                                <td>${customer.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found</p>
            )}
        </div>
    );    
}
