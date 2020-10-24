import React from "react";
import './Subtotal.css'
import CurrencyFormat from "react-currency-format"
import {useStateValue} from "../Provider";
import {getBaseketTotal} from "../Reducer";
import {useHistory} from 'react-router-dom';

function Subtotal() {
    const [{basket},dispatch] = useStateValue()
    const history = useHistory();
    return(
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>Subtotal ({basket?.length} items): <strong>{value}</strong></p>
                        <small className="subtotal__gift">
                            <input type="checkbox" className="checkbox"/>
                            This order contains a gift
                        </small>

                    </>
                )}
                decimalScale={2}
                value={getBaseketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={event => history.push('/payment')}>Proceed to checkout</button>
        </div>
    )
}
export default Subtotal;
