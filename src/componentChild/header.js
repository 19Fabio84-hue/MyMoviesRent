import React,{useState , useContext , useEffect} from 'react'
import { Link , NavLink} from 'react-router-dom'
import { Context } from '../context'
import '../style/header.css' 
import '../style/headerSmall.css'
export default function Header(props){

  const {CartMovie ,categoriesArray , userActive ,setUserActive } = useContext(Context)
  const [hover , setHover] = useState(false)
  const [hoverHome , setHoverHome] = useState(false)
  const [search , setSearch] = useState(false)
  const [cartHover , setCartHover]  = useState(false)
  const [displayTitle , setDisplayTitle] = useState(false)
  const [profileHover , setProfileHover] = useState(false)
  const [query , setQuery] = useState('')
  const [getData , setGetData] = useState([])
  const [menuSmall , setMenuSmall] = useState(false)
  const [sticky, setSticky] = useState("")
  // on render, set listener
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 80 ? "sticky" : "";
    setSticky(stickyClass);
  };

  const classes = `header-ctn header-margin ${sticky}`
 
  const getFilmSearch = async (e) => {
      e.preventDefault()
    const url = `https://api.themoviedb.org/3/search/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&query=${query}&page=1&include_adult=false`
     try{
         const response = await fetch(url)
         const data = await response.json()
         setGetData(data.results)
     }catch(err){
      console.error(err)
     }
  }
  
  let logout = localStorage.getItem('logout' , false)
  function handleLog(){
    if(!logout){
      setUserActive('')
        return (
          <>
          <Link to='/login' state={{message :'',to:'/'}}><p className='log-out'>log In</p></Link>
          </>
        )
    }else{
        return (
          <p className='log-out' onClick={logOut}>log out</p>
        )
    }
  }
  function profileCloseMenu(){
    setMenuSmall(false)
    setProfileHover(!profileHover)
  }
  function logOut(){
    setProfileHover(false)
    localStorage.removeItem('login')
    localStorage.removeItem('logout')
  }
  const startQuery = (e)=> {  
    e.preventDefault()
    setSearch(!search)
    setMenuSmall(false)  
  }
  const cancelQuery = () =>{
    setSearch(false)
    setDisplayTitle(false)
    setQuery('')
  }
  const ChangeQuery = (event)=>{
     setQuery(event.target.value)
     setDisplayTitle(true)
  }

 const categoriesMap = categoriesArray.map(movie =>{
  return (<Link  to={`/${movie.id}`}  id={movie.id} value={movie.value} name={movie.name}>{movie.name}</Link>)
 })
 const [headerChange , setHeaderChange] = useState(true)
 useEffect(() => {
  const updateHeader = () => {
    if(window.innerWidth <= 800){
      setHeaderChange(false)      
    } 
    else{
      setHeaderChange(true)
    }
  }    
  // Aggiungi un listener per rilevare i cambiamenti nella larghezza dello schermo
  window.addEventListener('resize', updateHeader);

  // Richiama la funzione di aggiornamento iniziale
  updateHeader();

  // Rimuovi il listener quando il componente viene smontato
  return () => {
    window.removeEventListener('resize', updateHeader);
  }}, [headerChange])
    return(<>
                             {/* ////////////////
                             ////MENU LARGE//////
                             //////////////////*/}

        {headerChange ? <div className={classes}>
          <div className='header-option'>
            <div className='header-title-ctn'>
             <Link className='logo' to='/'><h1>My Movies<span>rent</span></h1></Link>
             <Link className='logo-small' to='/'><h1>My<span>rent</span></h1></Link>           
            </div>
             <div className='header-link'>
                         {/* HOME */}
            {hoverHome ?
            <div className='categorie-absolute-home' onMouseEnter={()=>setHoverHome(true)} onMouseLeave={()=>setHoverHome(false)}>
               <Link to='/'className='link-home' >Home<i className="ri-arrow-down-s-line arrow-down"></i></Link>
               <div className='ctn-button-home'>
                 <Link to='/' className='link-home' onClick={()=>props.movies()} ><Link to='/' className={props.value ?'movie' : 'tv'}></Link><Link to='/' className='button-link-home'>Movies</Link></Link>
                 <Link to='/tv' className='link-home' onClick={()=>props.series()}><Link to='/tv' className={props.value ?'tv' : 'movie'}></Link><Link to='/tv' className='button-link-home'>Series</Link></Link>
               </div>
            </div> 
                  :<div className='categorie-absolute-home' onMouseEnter={()=>setHoverHome(true)} onMouseLeave={()=>setHoverHome(false)}>
                   <Link to='/'className='link-home' onClick={()=>props.click()}>Home<i className="ri-arrow-down-s-line arrow-down"></i></Link>
                  </div>}
             { hover ?  <div className='categorie-absolute' onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
              <Link to='#' style={{color:'white'}} onClick={()=>setHover(false)}>Categories</Link><i class="ri-arrow-up-s-line arrow-up"></i>
              <div className='categories-description'>
               {categoriesMap}
              </div>                
              </div> : 
                <div className='categorie-absolute' onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
                <Link to='#'>Categories</Link><i className="ri-arrow-down-s-line arrow-down"></i></div>}
              <Link className='film-link' to='/film'>Film</Link>
              <Link className='series-link' to='/series'>Series</Link>
              <NavLink className='series' to='/myList'>My List</NavLink>
             </div>

                       {/* SEARCH  CART PROFILE */}             
             <div className='icon-header-profile'>
            {search ? <i className="ri-close-line white x"onClick={cancelQuery}></i> :
                <i className="ri-search-line white baseline" onClick={startQuery} ></i>}
                           
                            {/* INPUT SEARCH  */}
        {search &&<> <div className='form-search'>
              <form onChange={getFilmSearch}  >
                 <input className='input' value={query} type='text' placeholder='SEARCH'  onChange={ChangeQuery}></input>
                 <p className='search-clear' onClick={()=>setQuery('')}>Clear</p>
                 {displayTitle ? getData.length >= 1 &&<div className='link-saerch-ctn'>
                 <Link to='/search' state={{searchMovie : query , search:'search'}}>
                  <input type='text' onClick={cancelQuery} className='title-search-p' value={query} ></input>                  
                 </Link>                 
          {getData.map(movie=> {
              return (
                <Link to='/search' onClick={cancelQuery} state={{searchMovie : query , search:'search' }}><button type='submit' className='title-search-p' value={movie.title} onFocus={ChangeQuery} >{movie.title}</button></Link>
              )
            }).slice(0,15)}
       
          </div> : ''}
              </form>              
        </div>
          
          </> }
                         {/* CART  */}
              <NavLink to='/cart'  className='header-cart'>
               <i className={cartHover ? 'ri-shopping-cart-line ri-fw ri-2x white baseline white-hover'
                 :'ri-shopping-cart-line ri-fw ri-2x white baseline'} onMouseEnter={()=>setCartHover(true)} onMouseLeave={()=>setCartHover(false)} />
               {CartMovie.length === 0 ? '' :<span className='cart-length'>{CartMovie.length}</span> }
             {cartHover && CartMovie.length >= 1 && <div className={CartMovie.length === 1 ?'img-cartMovie-ctn' : 'img-cartMovie-ctn-hovered'} onMouseEnter={()=>setCartHover(true)} onMouseLeave={()=>setCartHover(false)}>
                  {CartMovie.map(movie=> {
                    return (
                      <img className='img-cartMovie' src={movie.img} alt={movie.title} />
                    )
                  })}
               </div>}
              </NavLink>
              <div className='profile-relative'>
                {userActive === '' ?  <img className={profileHover ? 'img-profile-hover' :'img-profile'} src='/images/user.png' alt='icon-profile'
                  onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)}/>
                 : <h2 className={profileHover ? 'user-active-hover' :'user-active'} 
                    onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)}>{userActive}</h2> 
                }
                 {profileHover && <div className='profile-hover'
                                   onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)}>
                                    {handleLog()}
                                  </div>}

              </div>
             </div>
          </div>
        </div> 
                          ////////////////////
                          /////MENU SMALL/////
                          ////////////////////
               :            
        <div className={classes}>
        <div className='header-option'>
          <div className='menu-small-section'>
            <div className={menuSmall ? 'menu-small-ctn small-hovered' :'menu-small-ctn'} onClick={()=>setMenuSmall(!menuSmall)}>
              <p className='menu-small-p'>Menu </p>
              {menuSmall ?<i className="ri-arrow-up-s-line arrow-small arrow-up"></i>
              : <i className="ri-arrow-down-s-line arrow-small arrow-down"></i>}
           </div>
            {menuSmall && <div className='menu-small-option'>
               <Link to='/' onClick={()=>setMenuSmall(false)}>Home</Link>
               <Link to='/film' onClick={()=>setMenuSmall(false)}>Film</Link>
               <Link to='/series' onClick={()=>setMenuSmall(false)} >Series</Link>
               <Link to='/myList' onClick={()=>setMenuSmall(false)}>My list</Link>
            </div>}
          </div>
           <div className='header-title-ctn-small'>
             <Link className='logo-small-small' to='/' onClick={()=>setMenuSmall(false)}><h1>MyMovies</h1></Link>           
           </div>
                     {/* SEARCH  CART PROFILE */}             
           <div className='icon-header-profile'>
          {search ? <i className="ri-close-line white x"onClick={cancelQuery}></i> :
              <i className="ri-search-line white baseline" onClick={startQuery} ></i>}
                         
                          {/* INPUT SEARCH  */}
      {search &&<> <div className='form-search'>
            <form onChange={getFilmSearch}  >
               <input className='input' value={query} type='text' placeholder='SEARCH'  onChange={ChangeQuery}></input>
               <p className='search-clear' onClick={()=>setQuery('')}>Clear</p>
               {displayTitle ? getData.length >= 1 &&<div className='link-saerch-ctn'>
               <Link to='/search' state={{searchMovie : query , search:'search'}}>
                <input type='text' onClick={cancelQuery} className='title-search-p' value={query} ></input>                  
               </Link>                 
        {getData.map(movie=> {
            return (
              <Link to='/search' onClick={cancelQuery} state={{searchMovie : query , search:'search' }}><button type='submit' className='title-search-p' value={movie.title} onFocus={ChangeQuery} >{movie.title}</button></Link>
            )
          }).slice(0,15)}
     
        </div> : ''}
            </form>              
      </div>
        
        </> }
                       {/* CART  */}
            <NavLink to='/cart' onClick={()=>setMenuSmall(false)}  className='header-cart'>
             <i className={cartHover ? 'ri-shopping-cart-line ri-fw ri-2x white baseline white-hover'
               :'ri-shopping-cart-line ri-fw ri-2x white baseline'} onMouseEnter={()=>setCartHover(true)} onMouseLeave={()=>setCartHover(false)} />
             {CartMovie.length === 0 ? '' :<span className='cart-length'>{CartMovie.length}</span> }
           {cartHover && CartMovie.length >= 1 && <div className={CartMovie.length === 1 ?'img-cartMovie-ctn' : 'img-cartMovie-ctn-hovered'} onMouseEnter={()=>setCartHover(true)} onMouseLeave={()=>setCartHover(false)}>
                {CartMovie.map(movie=> {
                  return (
                    <img className='img-cartMovie' src={movie.img} alt={movie.title} />
                  )
                })}
             </div>}
            </NavLink>
            <div className='profile-relative'>
              {userActive === '' ?  <img className={profileHover ? 'img-profile-hover' :'img-profile'} src='/images/user.png' alt='icon-profile'
                onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)} onClick={profileCloseMenu}/>
               : <h2 className={profileHover ? 'user-active-hover' :'user-active'} onClick={profileCloseMenu}
                  onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)}>{userActive}</h2> 
              }
               {profileHover && <div className='profile-hover'
                                 onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)}>
                                  {handleLog()}
                                </div>}

            </div>
           </div>
        </div>
      </div>}                   
        </> )
}