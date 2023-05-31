
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Paypal(props) {
    return (
        <PayPalScriptProvider    options={{ "client-id": "test" }}>
            <PayPalButtons   className='paypal' fundingSource='paypal' style={{
                    layout: 'vertical',
                    shape:  'rect',
                    width: 271, 
                    height: 55,             
                  }}  
                  createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: props.amount
                                                }
                                            }
                                        ]
                                    });               
                                }}
                  />
        </PayPalScriptProvider>
    );
}