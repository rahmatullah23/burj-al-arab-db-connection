import { set } from 'date-fns/esm';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:4050/bookings?email='+loggedInUser.email,{
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data =>setBookings(data))
    },[])
    
    return (
        <div>
            <h3>Booking list {bookings.length}</h3>
          {
              bookings.map(book => <li key={book._id}>{book.name} 
                                        from {new Date(book.checkIn).toDateString('dd/MM/yy')} 
                                        to {book.checkOut}
                                   </li>)
          }
        </div>
    );
};

export default Booking;