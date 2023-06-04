import React , {useContext , useState , useEffect} from 'react'
import useDelayedState from 'use-delayed-state'
import { Context } from '../context'
import '../style/myList.css'
import { Link } from 'react-router-dom'

export default function TopRatePage(props){
    const {wishMovie , addToCart , removeToCart , CartMovie , addTowishMovie , removeTowishMovie} = useContext(Context)
    const [hover , setHover] = useDelayedState(false)
    const [hoveredHeart , sethoveredHeart] = useState(false)
    const [hoveredInfo , setHoveredInfo] = useState(false)
    const [hoveredCart , setHoveredCart] = useState(false) 
    const [genresDetail , setGenresDetail] = useState([])
    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/${props.movie}/${props.id}?api_key=efc42faadb8a20858df7818520bb9d80&vote_average`)
        .then(response => response.json())
        .then(data=> setGenresDetail(data.genres.map(movie=> movie).slice(0,3)))  
   } ,[props.movie , props.id])  
    function hoverTrue(){
      setHover(true ,700)         
    }
    function hoverFalse(){
       setHover(false , -1000)
    }
    function cart(){
        const isAdded = CartMovie.find(movie => movie.id === props.id)
        if(isAdded){
            return (<div className='list-shopping'>
                   <i className="ri-shopping-bag-fill list-plus"
                     onClick={()=>removeToCart(props.itemCart.id)} onMouseEnter={()=>setHoveredCart(true)} onMouseLeave={()=>setHoveredCart(false)}>
                    </i>
                   {hoveredCart && <p className='list-add'>Remove</p>}
                   </div>)
        }else {
            return ( <div className='list-shopping'> 
                   <i className="ri-shopping-bag-line list-plus"
                    onClick={()=>addToCart(props.itemCart)} onMouseEnter={()=>setHoveredCart(true)} onMouseLeave={()=>setHoveredCart(false)}>
                    </i>
                    {hoveredCart && <p className='list-add'>Rent it</p>}
          </div>)
        }
    }
function heart(){
  const isAdded = wishMovie.find(movie => movie.id === props.id)
  if(isAdded){
      return (<div className='top-shopping'>
              <i className="ri-heart-fill top-heart" 
                onClick={()=>removeTowishMovie(props.itemCart.id)} onMouseEnter={()=>sethoveredHeart(true)} onMouseLeave={()=>sethoveredHeart(false)}>
                </i>
                {hoveredHeart && <p className='top-remove top-remove-remove'>Remove</p>}
                </div>
                )
                      }else {
                      return (<div className='top-shopping'>
                      <i className="ri-heart-line top-heart" 
                        onClick={()=>addTowishMovie(props.itemCart)} onMouseEnter={()=>sethoveredHeart(true)} onMouseLeave={()=>sethoveredHeart(false)}>
                        </i>
                        {hoveredHeart && <p className='top-remove'>My List</p>}
                      </div>
                        )
                      }
                  }
  const generis = genresDetail.map((movie,index)=> 
  <Link className='link-page' key={index} to={`/${movie.id === 12 ? '28' :  
                          movie.id === 10759 ? '28' : 
                          movie.id === 878 ? '14' :
                          movie.id === 10765 ? '14':  
                          movie.id === 10752 ? '36' :  
                            movie.id === 10768 ? '36' : 
                            movie.id === 10762 ? '16' :  
                            movie.id === 10763 ? '10402':
                            movie.id === 10766 ? '10749'   :  
                            movie.id === 10764 ? '10770' :
                            movie.id === 10767 ? '10770' :                                                                           
                          movie.id}`}> 
{movie.name === 'Action & Adventure'? 'Action' :  
  movie.name === 'Sci-Fi & Fantasy' ? 'Sci-Fi&Fantasy':
  movie.name === 'War & Politics' ? 'War&Politics' :
  movie.name === 'Science Fiction' ? 'Sci-Fi' :
  movie.name}</Link> )


const [mobileInfo ,setMobileInfo] = useState(false)
useEffect(()=>{
const resizeInfo = ()=>{
  if(window.innerWidth <= 700){
    setMobileInfo(true)
  } else {
    setMobileInfo(false)
  }
  }
  window.addEventListener('resize' , resizeInfo)
  resizeInfo()
  return () => {
    window.removeEventListener('resize' , resizeInfo)
  }
},[mobileInfo])
   
        return (
            
            <div className='prova' >
              
            {hover ? <div className='list-ctn' >
                 <div className={props.vote >= 7.5 ? 'vote-ctn-list':props.vote >=6.7 ? 'vote-ctn-list green' :
                                 props.vote >= 5.9 ? 'vote-ctn-list yellow' : props.vote >=4.5 ? 'vote-ctn-list red' :
                                 'vote-ctn-list black'  }><span className="vote-list">{props.vote}%</span>
                 </div>            
                 <div className='list-overview'  onMouseEnter={()=>hoverTrue()} onMouseLeave={()=>hoverFalse()}>
                     <img className='list-img list-img-hover' src={props.url} alt={props.title}  />
                 <div className='list-padding-ctn' onMouseEnter={()=>hoverTrue()} onMouseLeave={()=>hoverFalse()}>
                  <div className='list-title-flex'>
                  <h3 className='list-title'>{props.title}</h3>
                  <div className='list-icon-ctn'>
                     {cart()}
                     {heart()}
                   <div className='list-shopping'>
                    <Link to={`/${props.movie}/${props.id}`} state={props.state}>
                      <i className="ri-spy-line spy " onMouseEnter={()=> setHoveredInfo(true)} onMouseLeave={()=>setHoveredInfo(false)}></i>
                    </Link>
                    {hoveredInfo && <p className='list-info'>Info</p>}
                   </div>
                  </div>
                 </div>                 
                  <p className='list-date'>Released:  <span className='list-date span-date'>{props.date === null ? '18/07/2022' : props.date}</span></p>
                  <div className='slide-link-genres'>
                            {generis}
                 </div>
                  <p className='list-description'>{props.overview.slice(0 , 120)}...</p> 
                 </div>
                 </div>
             </div> : 
                  <div className= {mobileInfo ?'list-ctn-mobile':'list-ctn'}  >
                      {mobileInfo ? <Link to={`/${props.movie}/${props.id}`} state={props.state}>
                                <img className='list-img'src={props.url} alt={props.title} />
                            </Link>
                     : <img className='list-img'  onMouseEnter={()=>hoverTrue()} onMouseLeave={()=>hoverFalse()} src={props.url} alt={props.title} />}
                 </div>
      }
          </div>
        )
    
}