import React , {useState , useContext} from 'react'
import { Link } from 'react-router-dom'
import {Context} from '../context'
import Cart from '../componentChild/cart'
import Header from '../componentChild/header'
import Paypal from '../componentChild/paypal';
import GooglePay from '../componentChild/googlePay';
import '../style/cart.css'


export default function CartPages(){
    const {CartMovie , removeToCart , emptyCart} = useContext(Context)
    const [ hover ,setHover] = useState(false)
    const [getPayement ,setGetPayement] = useState(false)
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [confirmButton , setConfirmButton] = useState('Confirm')  
    const [thanksMessage ,setThankMessage] = useState('Sorry your cart is empty...')

    const convertPrice = (price) => {    
        const conversionRates = {
          USD: 1, 
          EUR: 0.85,
          GBP: 0.73        
        };     
        const convertedPrice = price * conversionRates[selectedCurrency];     
        switch(selectedCurrency) {
          case 'USD':
            return `$${convertedPrice.toFixed(2)}`;
          case 'EUR':
            return `€${convertedPrice.toFixed(2)}`;
          case 'GBP':
            return `£${convertedPrice.toFixed(2)}`;       
          default:
            return `$${convertedPrice.toFixed(2)}`;
        }     
      };
      function Form() {               
        const handleCurrencyChange = (event) => {
          setSelectedCurrency(event.target.value);
        };      
        return (
           <div className='select-currency-ctn'>
           <h3 className='currency-title'>Please select currency : </h3>
          {hover ? <div className='currency-ctn' onChange={handleCurrencyChange} onMouseLeave={()=>setHover(!hover)}>
          <button className={ hover && selectedCurrency === 'USD' ? 'currency-flex-hover hover us' :
                                     selectedCurrency  === 'EUR' ? 'currency-flex-hover hover italy' :
                                     selectedCurrency  === 'USD' ? 'currency-flex-hover hover us' :
                                     selectedCurrency  === 'GBP' ? 'currency-flex-hover hover gbp': 'currency-flex-hover'} onClick={handleCurrencyChange}   value='USD'>{selectedCurrency} /
                  </button>             
             <button className='currency-flex us' onClick={handleCurrencyChange} value='USD'>USD /  </button>
             
             <button className='currency-flex italy' onClick={handleCurrencyChange} value='EUR'>EUR / </button>
             <div onClick={handleCurrencyChange}>
             <button className='currency-flex gbp gbp-radius' onClick={handleCurrencyChange} value='GBP'>GBP / </button>
             </div>
           </div> 
                  :
              <div className='currency-ctn' onChange={handleCurrencyChange} onMouseEnter={()=>setHover(!hover)}>

                  <button className={ hover ? 'currency-flex-hover hover' :
                                     selectedCurrency  === 'EUR' ? 'currency-flex-hover italy' :
                                     selectedCurrency  === 'USD' ? 'currency-flex-hover us' :
                                     selectedCurrency  === 'GBP' ? 'currency-flex-hover gbp': 'currency-flex-hover'} onClick={handleCurrencyChange}   value='USD'>{selectedCurrency} /
                  </button>
                  </div>}
          
          </div>
        );
      }
    const [totalPrice ,setTotalPrice] = useState(CartMovie.length * 2.99)
       
    function totalCount(){
        let total = 0
        CartMovie.map(movie => total +=  movie.price * movie.quantity )
            setTotalPrice(Number(total).toFixed(2))
    }
    function handleQuantity(id , index){
          CartMovie.map(movie => {
           if( movie.id === id ){
             const  newQuantiy = movie.quantity + index
               movie.quantity = newQuantiy
               totalCount()
           }  
           return movie         
        })
        
    }
    
    const cartMap = CartMovie.map(movie => {
        return <Cart 
                   key={movie.id}
                   remove={removeToCart} 
                   handleQuantity={handleQuantity}
                   total={convertPrice(movie.quantity * 2.99)}
                   quantity={movie.quantity}              
                   itemCart={{id:movie.id , img : movie.img,
                    title : movie.title , price:movie.price ,quantity : movie.quantity }}
                     />
    })
    function handleQuantityPayment(){
      let cartQuantity = []
      if(CartMovie.length > 0){
        cartQuantity = cartMap.map(movie => movie.props.quantity).reduce(( a , b)=> a+b)
      }
      return cartQuantity
    }
    const  quantity  = handleQuantityPayment()
   
    //  FORM PYMENT
    const [paymentForm , setPaymentForm] = useState(false)
    const [errorNumber , seterrorNumber] = useState(null)   
    const [errorDate , seterrorDate] = useState(null)   
    

    const [cardNumber ,setCardNumber] = useState(false)
    const [cardNumberValue , setCardNumberValue] = useState('')   
    function cardValue(e){     
        const { value } = e.target;
        const formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ') 
     setCardNumberValue(formattedValue)
    }
    // value.replace(/[^a-zA-Z0-9]/g, '').replace(/(.{4})/g, '$1 ').trim(); Codice per IBAN

    const [expiratinDate , setExpirationDate] = useState(false)
    const [expiratinDateValue , setExpirationDateValue] = useState('')
    function dateValue(e){
      const { value } = e.target;
        const formattedValue =value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1    ')
        setExpirationDateValue(formattedValue) 
    }
   
    const [cvcValue , setCvcValue] = useState('')
    const [ cvc ,setCvc] = useState(false)
    const [ errorCvc , setErrorCvc] = useState(false)
    
    function ValueCvc(e){
      const { value } = e.target
      const cvcFormat = value.replace(/\D/g, '')
      setCvcValue(cvcFormat)
    }
    const [name ,setName] = useState(false)
    const [nameValue ,setNameValue] = useState('')
    const [ errorName ,setErrorName] = useState(false)
    function NameValue(e){
      const { value } = e.target;
      const onlyLetters = /^[a-zA-Z]*$/;
      if (onlyLetters.test(value) || value === '') {
        setNameValue(value);
      }
    }
    const [LastName ,setLastName] = useState(false)
    const [LastNameValue ,setLastNameValue] = useState('')
    const [ errorLastName ,setErrorLastName] = useState(false)
    function LastValue(e){
      const { value } = e.target;
      const onlyLetters = /^[a-zA-Z]*$/;
      if (onlyLetters.test(value) || value === '') {
        setLastNameValue(value);
      }
    }
   
    function PaymentProcessed(){      
      if(CartMovie.length > 0){
        if(cardNumberValue.length !== 19){
          seterrorNumber(true)       
        }else if(cardNumberValue.length === 19){
          seterrorNumber(false)
        }if(expiratinDateValue.length !== 8){
          seterrorDate(true)
     
        }else if(expiratinDateValue.length === 8){
          seterrorDate(false)
        }
      }if(cardNumberValue.length === 19 && expiratinDateValue.length === 8 ){
        if(nameValue === ''){
          setErrorName(true)          
        }else if(nameValue !== ''){
          setErrorName(false)
        }if(LastNameValue === ''){
          setErrorLastName(true)
        }else if(LastNameValue !== ''){
           setErrorLastName(false)
        }
       }if(cvcValue.length !== 3 || cvcValue !== ''){
        setErrorCvc(true)
       }
       if(nameValue !== ''  && LastNameValue !== '' && cardNumberValue.length === 19 && expiratinDateValue.length === 8 && cvcValue !== '' && cvcValue.length === 3){
        setConfirmButton('Loading...')
        setPaymentForm(true)
        setTimeout(()=>{
          setGetPayement(!getPayement)
          emptyCart()  
          setThankMessage('Thanks your order has been Processed!')         
        },1500)
      }
    }
    const [paypal ,setPaypal] = useState(false)
    const [creditCard ,setCreditCard] = useState(false)
    const [googlePay , setGooglePay] = useState(false)
    
   
    function paypalTrue(){
      setPaypal(!paypal)
      setCreditCard(false)
      setGooglePay(false)
    }
    function creditCardTrue(){
      setPaypal(false)
      setGooglePay(false)
      setCreditCard(!creditCard)
    }
    function googlePayTrue(){
      setPaypal(false)
      setGooglePay(!googlePay)
      setCreditCard(false)
    }
    function paypalOnClick(){
      setConfirmButton('Loading...')
        setPaymentForm(true)
        setTimeout(()=>{
          setGetPayement(!getPayement)
          emptyCart()  
          setThankMessage('Thanks your order has been Processed!')         
        },1500)
    }
    function GetPayement(){
  
      return (<>
        {paymentForm ?       
          <div className='payement-ctn'> 
            <button className='place-order payement after-payment' onClick={PaymentProcessed}>{confirmButton}</button>
          </div>
          :    <>  <h1 className='check-out'>Payemt Form</h1>
          <div className='payement-ctn' onSubmit={PaymentProcessed}>
          {creditCard ? <div className='input-ctn'>
            <div className='paypal-ctn'>
              <div className={paypal ? 'paypal-selected border' :'paypal-selected'} onClick={paypalTrue}></div>
                  <p className='paypal-title'>Paypal</p>
            </div>
            <div className='paypal-ctn'>
                 <div className={googlePay ? 'paypal-selected border' :'paypal-selected'} onClick={googlePayTrue}></div>
                     <p className='paypal-title'>Google Pay</p>
            </div>
            <div className='paypal-ctn'>
              <div className={creditCard ? 'paypal-selected border' :'paypal-selected'} onClick={creditCardTrue}></div>
              <p style={{color:'#FFF'}} className='icon-secure'><img src='/images/credit.png' alt='visa card'/> Credit or debit card</p>
            </div>
            <p style={{color:'#FFF'}} className='secure'>Your payment is secure.Your card details will not be shared.</p>
                                     {/* CARD  */}
            <div className='input-form-ctn' onClick={()=>setCardNumber(true)} onMouseLeave={()=>setCardNumber(false)}>
              <p className={errorNumber ? 'error-p proviamo' :cardNumber ? 'proviamo' : cardNumberValue === '' ? 'card-number-p' : 'proviamo'}  >Card number</p>
              <input onChange={cardValue}  minLength={19} maxLength={19} 
                     placeholder={cardNumber ? '0000 0000 0000 0000' : ''}
                      name='number' className={ errorNumber ? 'input-payement error'  :'input-payement'} value={cardNumberValue} ></input>
                      {errorNumber && <span style={{color:'red'}} className='error-span'>Error : number is incorrect</span>}
            </div>
                                     {/* Date  */}
            <div className='input-form-ctn' onClick={()=>setExpirationDate(true)} onMouseLeave={()=>setExpirationDate(false)}>
               <p className={errorDate ? 'error-p proviamo' : expiratinDate ? 'proviamo' : expiratinDateValue === '' ?'card-number-p' : 'proviamo'}>Expiration date</p>
              <input   minLength={8} maxLength={8}  onChange={dateValue}
                       name='expired'  className={ errorDate ? 'input-payement error'  :'input-payement'} placeholder={expiratinDate ? 'MM / YY' : ''}
                        value={expiratinDateValue}
                         />
                         {errorDate && <span style={{color:'red'}} className='error-span'>Error : date is incorrect</span>}
                        {expiratinDateValue.length >= 3 && <p className='p-slash'>/</p>}
            </div> 
                                   {/* CVC  */}
            <div className='input-form-ctn' onClick={()=>setCvc(true)} onMouseLeave={()=>setCvc(false)}>
               <p className={errorCvc ? 'error-p proviamo' : cvc ? 'proviamo' : cvcValue === '' ?'card-number-p' : 'proviamo'}>Cvc</p>
              <input   minLength={3} maxLength={3}  onChange={ValueCvc}
                       name='expired'  className={ errorCvc ? 'input-payement error'  :'input-payement'} placeholder={cvc ? '000' : ''}
                        value={cvcValue}
                         />
                         {errorDate && <span style={{color:'red'}} className='error-span'>Error : date is incorrect</span>}
                        {expiratinDateValue.length >= 3 && <p className='p-slash'>/</p>}
            </div> 
                                  {/* NAME  */}
            <div className='input-form-ctn' onClick={()=>setName(true)} onMouseLeave={()=>setName(false)}>
              <p className={name ? 'proviamo' :nameValue === '' ?'card-number-p':'proviamo'}>Name</p>
              <input className='input-payement' name='Name' value={nameValue}  onChange={NameValue}  ></input>
              {errorName && <span style={{color:'red'}} className='error-span'>Error : Name is incorrect</span>}
            </div>
                               {/* LAST NAME  */}
            <div className='input-form-ctn' onClick={()=>setLastName(true)} onMouseLeave={()=>setLastName(false)}>
              <p className={LastName ? 'proviamo' :LastNameValue === '' ? 'card-number-p' : 'proviamo'}>Last name</p>
              <input className='input-payement' name='LastName' value={LastNameValue} onChange={LastValue} ></input>
              { errorLastName && <span style={{color:'red'}} className='error-span'>Error : Lastname is incorrect</span>}
            </div>
            
            
          </div> : 
               <div className='input-ctn'>
               <div className='paypal-ctn'>
                 <div className={paypal ? 'paypal-selected border' :'paypal-selected'} onClick={paypalTrue}></div>
                     <p className='paypal-title'>Paypal</p>
               </div>
               <div className='paypal-ctn'>
                 <div className={googlePay ? 'paypal-selected border' :'paypal-selected'} onClick={googlePayTrue}></div>
                     <p className='paypal-title'>Google Pay</p>
               </div>
               <div className='paypal-ctn'>
                 <div className={creditCard ? 'paypal-selected border' :'paypal-selected'} onClick={creditCardTrue}></div>
                 <p style={{color:'#FFF'}} className='icon-secure'><img src='/images/credit.png' alt='visa card'/> Credit or debit card</p>
               </div>
               </div>  }
         
          <div className='deatil-order'>
            <p>Total items : {CartMovie.length}</p>
            <p>Total day Rent : {quantity}</p>
            <hr style={{color:'#FFF'}}></hr>
            <p>Order total : {convertPrice(totalPrice)} </p>
           
            {paypal ?<div className='paypal-button-ctn'>
                        <Paypal amount={convertPrice(totalPrice)}/><button onClick={paypalOnClick} className='payement ok' type='submit' >payment ? continue</button>
                      </div>
             : googlePay ? <div className='paypal-button-ctn'>
                             <GooglePay amount={totalPrice} /><button onClick={paypalOnClick} className='payement ok' type='submit' >payment ? continue</button>
                            </div>  
             :creditCard ?<button className='place-order payement' type='submit' onClick={PaymentProcessed} >{confirmButton}</button>
             :<button className='choose payement' type='submit' >Choose method</button>}
          </div>
        </div></>}
        </> 
      )
    }
    const [series ,setSeries] = useState(false)  
    function setMovie(){ setSeries(false)  }
    function setTv(){ setSeries(true)  }
    return (<>
       <Header movies={setMovie} series={setTv} value={series} />
       <div className='cart-pages'>
            {CartMovie.length === 0 ?
             <h1 className='check-out'>{thanksMessage} <Link to='/' style={{color :`#FF0000` , textDecoration :'none'}}>Continue with shopping</Link></h1> 
              : <h1 className={getPayement ? 'none' : 'check-out'} >{getPayement ? '' : 'Check Out'}</h1>}
                        
             {getPayement ?  CartMovie.length >= 1 &&    
                <>{GetPayement()}
                </>
              : 
              CartMovie.length >=1 && <div className='cart-pages'>
                {Form()}
                {cartMap}
                <hr></hr>
               <h1 className='total'>Total : {convertPrice(totalPrice)}</h1>  
               <div className='total-ctn'>     
                <button className='place-order' onClick={()=>setGetPayement(!getPayement)}>Place Order</button>
               </div>
             </div>}              
        </div>
        </>
        )}
             
