import React , {useState , useEffect} from 'react'
import { Link , useNavigate, useLocation } from 'react-router-dom'
import { Context } from '../context'
import '../style/header.css'

export default function Login(){
    const { users,setUsers , setUserActive } = React.useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)
    const [erroeMessage , setErrorMessage] = useState('')
    const [createAccount , setCreateAccount] = useState(false)
    const [userName ,setUserName] = useState('')
    const [password ,setPassword] = useState('')
    const [email , setEmail] = useState('')
    // const [users , setUsers] = useState([{
    //     username : 'Bob' ,
    //     email : 'bob@gmail.com',
    //     password : '1234'
    // }])
    
    const handleLogin = () => {
        const findUsers = users.find(user => user.email === email && user.password === password )
        if(findUsers){
            setUserActive(findUsers.username)
            localStorage.setItem('login' , true)
            localStorage.setItem('logout' , true) 
            navigate(`${location.state.to}`)
        }else{
            setErrorMessage('Utent not find!')
        }
    }
    const handleRegister = () => {
        const newUsers = {
            username : userName ,
            email : email ,
            password : password
        }
        setUsers([...users , newUsers])
        setUserActive(newUsers.username)
        localStorage.setItem('login' , true)
        localStorage.setItem('logout' , true)  
        navigate(`${location.state.to}`)
    }
    useEffect(() => {
        // Salvataggio dei dati nel localStorage quando l'array degli utenti cambia
        localStorage.setItem('users', JSON.stringify(users));
      }, [users]);

    return(
        <div className='login-ctn'>
            <div className='title-ctn'> 
             <Link to='/'><h1 className='title-login'  >My Movies<span className='span-title'>rent</span></h1></Link>
            <div className='input-login-ctn'>
             <h2 style={{color:'#cf4d4d',zIndex:'4',textAlign:'center'}}>{location.state.message}</h2>
                <p>email: bob@gmail.com ,  pasw: 1234</p>
                <p>is active</p>
                <p style={{color:'#cf4d4d' , fontWeight:'600'}}>{erroeMessage}</p>
                <form className='form-login' >
                 <input type='email' name='email' placeholder='Email'  onChange={(e) => setEmail(e.target.value)}/>
                 <input type='password' name='password' placeholder='Password'  onChange={(e) => setPassword(e.target.value)}/>
                 {createAccount && <input type='text' name='name' placeholder='Name' onChange={(e) => setUserName(e.target.value)} />}
                 {createAccount ? <button onClick={handleRegister} >Register</button>
                  : <button onClick={handleLogin} >Log In</button>}
                </form>
                <p>{createAccount ? "You have a account..." : "Don't have a account..."}
                <span style={{color:'#cf4d4d',fontWeight:'600', cursor:'pointer'}} onClick={()=> setCreateAccount(!createAccount) } >{createAccount ? ' Log in' :' Create One'}</span>
            </p>     
            </div>
            </div>
            <img src='/images/loginMyRent.jpg' alt='Login Pages' />
        </div>
    )
}