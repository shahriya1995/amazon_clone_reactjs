import React, {useEffect, useState} from "react";
import {useStateValue} from "../Provider";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import {Link, useHistory} from "react-router-dom";
import './Payment.css';
import {useElements, useStripe, CardElement} from "@stripe/react-stripe-js";
import {getBaseketTotal} from "../Reducer";
import CurrencyFormat from "react-currency-format";
import axios from '../axios';
import {db,auth} from '../../firebase'


function Payment() {
    const [{basket,user},dispatch] = useStateValue()
    const  history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [processing,setProcessing] = useState("");
    const [succeeded,setSucceeded] = useState(false)

    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true)
    const [clientSecret,setClientSecret] = useState(true)
    // const stringClientSecret = clientSecret.toString();

    useEffect(()=>{
        //generate speacial strype secret
        const getClientSecret = async () =>{
            const response = await axios({
                method:'post',
                url:`/payments/create?total=${getBaseketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();

    },[basket])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{

            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket:basket,
                    amount:paymentIntent.amount,
                    created:paymentIntent.created

                })




            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type:'EMPTY_BASKET'
            })

            history.replace('/orders')
        })


    }

    const handleChange = e =>{
        setDisabled(e.empty);
        setError(e.error? e.error.message:"");

    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>

                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>

                    </div>
                    <div className="payment__items">
                        {/*products*/}
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating} />
                        ))}
                    </div>


                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>

                    </div>
                    <div className="payment__details">
                        {/*strip code*/}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total: {value}</h3>

                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBaseketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded }>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                                </div>

                            {error && <div>{error}</div>}

                        </form>


                    </div>

                </div>
            </div>
        </div>
    )

}

export default Payment
