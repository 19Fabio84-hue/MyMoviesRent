import React , {useState ,useContext , useEffect} from 'react'
import { Context } from '../context'
import { Link } from 'react-router-dom'
import useDelayedState from 'use-delayed-state'
import  YouTube from 'react-youtube'
import '../style/topRatedSlide.css'

export default function TopRatedSlide(props){
    const {wishMovie , addToCart , removeToCart , CartMovie , addTowishMovie , removeTowishMovie} = useContext(Context)
    const [hover , setHover] = useDelayedState(false)
    const [hoverVideo ,setHoverVideo] = useDelayedState(false)
    const [ getVideo , setGetVideo] = useState('')
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/${props.movie}/${props.id}/videos?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&name&append_to_response=videos`)
        .then(response => response.json())
        .then(data=> setGetVideo(data.results[0]))
      },[props.id])
    function hoverTrue(){
        setHover(true , 300 ) 
        setHoverVideo(true,1000 )  
        // props.hoverTrue()      
      }
      function hoverFalse(){
         setHover(false , -300 )
         setHoverVideo(false ,-1000 )
        //  props.hoverFalse()
        }
    function cart(){
        const isAdded = CartMovie.find(movie => movie.id === props.id)
        if(isAdded){
            return (<div className='list-shopping'>
                   <i className="ri-shopping-bag-fill topRated-unrent-icon"
                     onClick={()=>removeToCart(props.itemCart.id)} >
                    </i>
                   </div>)
        }else {
            return ( <div className='list-shopping'> 
                   <i className="ri-shopping-bag-line topRated-unrent-icon"
                    onClick={()=>addToCart(props.itemCart)}>
                    </i>
          </div>)
        }
    }
    function heart(){
        const isAdded = wishMovie.find(movie => movie.id === props.id)
        if(isAdded){
            return (<div className='top-shopping'>
                    <i className="ri-heart-fill heart-topRated" 
                     onClick={()=>removeTowishMovie(props.itemCart.id)}>
                     </i>
                     </div>
                     )
                           }else {
                            return (<div className='top-shopping'>
                            <i className="ri-heart-line heart-topRated" 
                             onClick={()=>addTowishMovie(props.itemCart)}>
                             </i>
                            </div>
                             )
                           }
                        }
                        // adult
                        // : 
                        // false
                        // backdrop_path
                        // : 
                        // "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg"
                        // genre_ids
                        // : 
                        // (2) [18, 80]
                        // id
                        // : 
                        // 238
                        // ids
                        // : 
                        // "150"
                        // movie
                        // : 
                        // "Movie"
                        // name
                        // : 
                        // "Top Rated"
                        // original_language
                        // : 
                        // "en"
                        // original_title
                        // : 
                        // "The Godfather"
                        // overview
                        // : 
                        // "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge."
                        // popularity
                        // : 
                        // 113.417
                        // poster_path
                        // : 
                        // "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
                        // release_date
                        // : 
                        // "1972-03-14"
                        // title
                        // : 
                        // "The Godfather"
                        // type
                        // : 
                        // "TopRated"
                        // video
                        // : 
                        // false
                        // vote_average
                        // : 
                        // 8.7
                        // vote_count
                        // : 
                        // 17826           
    return(
        <>
        <div className='topRated-slide-big' onMouseEnter={()=>hoverTrue()}  onMouseLeave={()=>hoverFalse()}>           
           {hover ? <div className='topRated-list-ctn'  onMouseLeave={()=>hoverFalse()}>        
                 <div className='list-overview-topRated' onMouseLeave={()=>hoverFalse()}> 
                   {hoverVideo ?<YouTube className={hover ? 'youtube-trailer-topRated margin-videos' :"youtube-trailer-topRated"}  videoId={`${getVideo.key}`} autoPlay={true} /> 
                     : <img src={props.img} alt={props.title}  />}
                 <div className='list-padding-ctn-topRated' >
                  <div className='list-title-flex-topRated'>
                   <h1 className='list-title-topRated'>{props.title}</h1>
                  <div className='list-icon-ctn-topRated'>
                     {cart()}
                     {heart()}
                   <div className='list-shopping'>
                    <Link to={`/${props.movie}/${props.id}`} state={props.state}>
                      <i className="ri-spy-line spy-topRated "></i>
                    </Link>
                   </div>
                  </div>
                 </div>                                 
                 </div>
                 </div>
             </div> : 
                <div className={hover? 'img-topRated-ctn margin-video' :'img-topRated-ctn'} onClick={() => props.prova(props.id)} >
                <img src={props.url} alt={props.title}   />
               </div>
               }
            
        </div>
        
        </>
    )
}