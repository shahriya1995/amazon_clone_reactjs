import React, {useEffect, useState} from "react";
import Order from './Order'
import {db} from "../../firebase"
import {useStateValue} from "../Provider";
import './Orders.css'


function Orders() {
    const [orders,setOrders] = useState([]);
    const [{basket,user},dispatch] = useStateValue();

    useEffect(()=>{
        if (user){
        db.collection('users')
          .doc(user?.uid).collection('orders').orderBy('created','desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc=>({
                    id:doc.id,
                    data:doc.data()
                })))
            ))
        }else{
            setOrders([])
        }
    },[user])


    return(
        <div className="orders">
             <div className="orders__order">
                 {orders?.map(item=>(
                     <Order order={item} />
                 ))}
             </div>
        </div>
    )

}

export default Orders;
