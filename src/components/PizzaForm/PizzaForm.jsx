import { useState } from 'react';
import axios from 'axios';
import "./PizzaForm.css"
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
export default function PizzaForm() {
    const [customerName, setName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [type, setType] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    
    const handleSubmit = (event) => {
        event.preventDefault();

        const orderData = {
            customer_name: customerName,       
            street_address: streetAddress,
            city: city,
            zip: zip,
            type: type,        
        };

        console.log('the order', orderData );

        //dispatch to "CUSTOMER_ORDER"
        dispatch({type: "CUSTOMER_ORDER", payload: orderData})

        //navigate using history.push to the /checkout page
       
        history.push('/checkout');

        const clearFormInputs = () => {
            //clear form inputs
            setName("");
            setStreetAddress("");
            setCity("");
            setZip("");
            setType("");
      }
     
      clearFormInputs();

    };

    

    const handleType = (event) => { 
        console.log('type selection ', event.target.id);
        setType(event.target.id);
    }
return (
    <>
<Container>
    <section>
<h2>Add Order</h2>
<form onSubmit={handleSubmit} className="add-pizza-form">
<label>Name</label>
    <input required placeholder="Name" value={customerName} onChange={(event) => setName(event.target.value)} />
    <label>Street Address</label>
    <input required placeholder="Street Address" value={streetAddress} onChange={(event) => setStreetAddress(event.target.value)} />
    <label>City</label>
    <input required placeholder="City" value={city} onChange={(event) => setCity(event.target.value)} />
    <label>Zip</label>
    <input required placeholder="Zip" value={zip} onChange={(event) => setZip(event.target.value)} />
    {/* <DropdownButton id="dropdown-basic-button" title="Type">
  <Dropdown.Item className='dropdown-item-one'>Pickup</Dropdown.Item>
  <Dropdown.Item className='dropdown-item-one'>Delivery</Dropdown.Item>
</DropdownButton> */}

<button type="button" id="delivery" onClick={handleType}>Delivery</button>
<button type="button" id="pickup" onClick={handleType}>Pickup</button>

   <button type="submit" onClick={handleSubmit}>Next</button>
    </form>

    </section>
    </Container>
    </>
)
}

