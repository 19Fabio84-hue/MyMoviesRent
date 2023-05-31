import React from 'react'
import '../style/cart.css'

export default function Cart({itemCart , remove , handleQuantity , total} ){
    return (
        <div className='cart-ctn'>
            <div className='cart-map-ctn'>
                <div className='cart-img-ctn'>
                    <img className='cart-img' src={itemCart.img} alt={itemCart.title} />
                    <h3 className='cart-title'>{itemCart.title}</h3>
                </div>
                <div className='quantity-ctn'>
                    {itemCart.quantity === 5 && <p className='maximum'>maximum days for rent are five</p>}
                    {itemCart.quantity === 5 ? <i className="ri-add-line cart-plus"></i>:<i className="ri-add-line cart-plus" onClick={()=>handleQuantity(itemCart.id , +1)}></i>}
                    <p className='cart-quantity'>{itemCart.quantity}</p>
                    {itemCart.quantity === 0 ? <i className="ri-subtract-line cart-plus-remove"></i> : <i className="ri-subtract-line cart-plus-remove" onClick={()=>handleQuantity(itemCart.id , -1)}></i>}
                    <p className='cart-quantity price'>{total}</p>
                    <i className="ri-delete-bin-line cart-remove" onClick={()=>remove(itemCart.id)}  />
                </div>
            </div>
        </div>
    )
}