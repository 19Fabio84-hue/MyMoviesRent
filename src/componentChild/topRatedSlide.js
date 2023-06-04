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
    const [ iconTrue , setIconTrue] = useDelayedState(false)
    const [ getVideo , setGetVideo] = useState('')
   
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/${props.movie}/${props.id}/videos?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&name&append_to_response=videos`)
        .then(response => response.json())
        .then(data=> setGetVideo(data.results[0]))
      },[props.id , props.movie])

    function hoverTrue(){
        setHover(true , 300 ) 
        setIconTrue(true , 1000)
        setHoverVideo(true,1000 ) 
      }
      function hoverFalse(){
         setHover(false , -300 )
         setIconTrue(false , -1000)
         setHoverVideo(false ,-1000 )
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

    return(
        <>
        <div className='topRated-slide-big' onMouseEnter={()=>hoverTrue()}  onMouseLeave={()=>hoverFalse()}>           
           {hover && mobileInfo === false ?
            <div className='topRated-list-ctn' onMouseLeave={()=>hoverFalse()}>        
                 <div className='list-overview-topRated' onMouseLeave={()=>hoverFalse()}> 
                   {hoverVideo ?<YouTube onMouseLeave={()=>hoverFalse()} className={hover ? 'youtube-trailer-topRated margin-videos' :"youtube-trailer-topRated"}  videoId={`${getVideo.key}`} autoPlay={true} /> 
                     : <img className='scale-img'  src={props.img} alt={props.title}  />}
                 <div className={iconTrue &&'list-padding-ctn-topRated'} >
                 {iconTrue && <div className='list-title-flex-topRated'>
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
                 </div> }                                
                 </div>
                 </div>
             </div> : 
                <div className='list-overview-topRated' >
                  {mobileInfo ? <Link to={`/${props.movie}/${props.id}`} state={props.state}>
                                 <img className='mobile-img' src={props.url} alt={props.title}   />
                              </Link>
                   : <img  src={props.url} alt={props.title}   />}
               </div>
               }
            
        </div>
        
        </>
    )
}