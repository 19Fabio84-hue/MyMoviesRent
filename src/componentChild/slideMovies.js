import React , {useState , useEffect , useContext} from 'react'
import useDelayedState from 'use-delayed-state'
import {Context} from '../context'
import { Link } from 'react-router-dom'
import '../style/TopRated.css'

function Movie(props){
    const {CartMovie , addTowishMovie ,removeTowishMovie ,wishMovie, addToCart , removeToCart } = useContext(Context)    
    const [hover , setHover] = useDelayedState(false)
    const [hoveredHeart , sethoveredHeart] = useState(false)
    const [hoveredInfo , setHoveredInfo] = useState(false)
    const [hoveredCart , setHoveredCart] = useState(false)
    const [genresDetail , setGenresDetail] = useState([])
    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${props.id}?api_key=efc42faadb8a20858df7818520bb9d80&vote_average`)
        .then(response => response.json())
        .then(data=> setGenresDetail(data.genres.map(movie=> movie ).slice(0,3)))  
   } ,[props.id])  
   function hoverTrue(){
    setHover(true , 500)         
  }
  function hoverFalse(){
     setHover(false , -500)
  }
    function cart(){
        const isAdded = CartMovie.find(movie => movie.id === props.id)
        if(isAdded){
            return (<div className='top-shopping'>
                   <i className="ri-shopping-bag-fill top-plus"
                     onClick={()=>removeToCart(props.itemCart.id)} onMouseEnter={()=>setHoveredCart(true)} onMouseLeave={()=>setHoveredCart(false)}>
                    </i>
                   {hoveredCart && <p className='top-add-remove'>Remove</p>}
                   </div>)
        }else {
            return ( <div className='top-shopping'> 
                   <i className="ri-shopping-bag-line top-plus"
                    onClick={()=>addToCart(props.itemCart)} onMouseEnter={()=>setHoveredCart(true)} onMouseLeave={()=>setHoveredCart(false)}>
                    </i>
                    {hoveredCart && <p className='top-add'>Rent it</p>}
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
                     {hoveredHeart && <p className='top-remove-remove-list'>Remove</p>}
                    </div>
                     )
                           }else {
                            return (<div className='top-shopping'>
                            <i className="ri-heart-line top-heart" 
                             onClick={()=>addTowishMovie(props.itemCart)} onMouseEnter={()=>sethoveredHeart(true)} onMouseLeave={()=>sethoveredHeart(false)}>
                             </i>
                             {hoveredHeart && <p className='top-remove-list'>My List</p>}
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
                                                 movie.id === 10763 ? '10402'    :
                                                 movie.id === 10766 ? '10749'   :
                                                 movie.id === 10764 ? '10770' :
                                                 movie.id === 10767 ? '10770' :
                                                movie.id}`}> 
                                       {movie.name === 'Action & Adventure'? 'Action' :
                                        movie.name === 'Sci-Fi & Fantasy' ? 'Sci-Fi&Fantasy' :
                                        movie.name === 'War & Politics' ? 'War&Politics' :
                                         movie.name}</Link> )

    return (           
                <>                
               <div className={hover ? 'movie-top-ctn-hover' :'movie-top-ctn'} >
                        <div className={props.vote >= 7.5 ? 'vote-ctn-top':props.vote >=6.7 ? 'vote-ctn-top green' :
                            props.vote >= 5.9 ? 'vote-ctn-top yellow' : props.vote >=4.5 ? 'vote-ctn-top red' :
                            'vote-ctn-top black'  }><span className="vote-top">{props.vote}%</span>
                 </div> 
                 <div  className='top-img-ctn'  onMouseLeave={hoverFalse}>
                            <img onMouseEnter={hoverTrue} className={hover? 'top-img img-hover' :'top-img'} src={props.url} alt={props.title}  />
                  </div>
                 <div className={hover ? 'hover-true' : 'top-overview'} onMouseEnter={hoverTrue} onMouseLeave={hoverFalse}> 
                   <div className='top-padding-ctn'>
                   <div className='top-title-flex'>
                    <h3 className='top-title'>{props.title}</h3>
                    <div className='top-icon-ctn'>
                     {cart()}
                     {heart()}
                <div className='top-shopping'>
                  <Link to={`/${props.movie}/${props.id}`} state={props.state}><i className="ri-spy-line top-spy " onMouseEnter={()=> setHoveredInfo(true)} onMouseLeave={()=>setHoveredInfo(false)}></i></Link>
                   {hoveredInfo && <p className='top-info'>Info</p>}
                 </div>
                </div>
               </div>
                <><p className='top-date'>Released: <span className='top-date span-date-top'>{props.date}</span></p>
               <div className='slide-link-genres'>
                              {generis}
               </div>
               <p className='top-description'>{props.overview.slice(0 , 127)}...</p></>
              </div>
              </div>
                </div>               
                </>
            )
    
   
}
export default Movie