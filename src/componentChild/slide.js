import React , {useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";
import "../style/videoList.css";

// const API_KEY = "efc42faadb8a20858df7818520bb9d80"
// const BASE_URL = "https://api.themoviedb.org/3/movie"

 function VideoList(props) { 
  const { addTowishMovie , removeTowishMovie , wishMovie ,CartMovie, addToCart , removeToCart} = React.useContext(Context)
  const [hoveredDetail , setHoveredDetail] = useState(false)
  const [hoveredList , setHoveredList] = useState(false)
   
  
  function hoverdTrueDetail(){
   setHoveredDetail(true)
  }
 function hoveredFalseDetail(){
   setHoveredDetail(false)
 }
 
 function addedToCart(){  
  const isAdded = CartMovie.find(movie => movie.id === props.id)
  if(isAdded){
    return (
           <div className="slide-rent" onClick={()=> removeToCart(props.itemCart.id)} >
            <i className="ri-shopping-bag-fill unrent-icon"></i><span className="unrent-span">Remove from cart</span>
          </div>)
         
  }else {
    return( <div className="slide-rent" onClick={()=>addToCart(props.itemCart)} >
             <i className="ri-shopping-bag-line unrent-icon"></i><span className="unrent-span">Rent Movie</span>
            </div>)
           
  }  
  
 }
 function heart(){  
  const isAdded = wishMovie.find(movie => movie.id === props.id)
  if(isAdded){
      return (<><div className='slide-list'>
              <i className="ri-heart-fill" 
               onClick={()=>removeTowishMovie(props.itemCart.id)} onMouseEnter={()=>setHoveredList(true)} onMouseLeave={()=>setHoveredList(false)}>
               </i>
              </div>
               {hoveredList && <p className='slide-list-p remove'>Remove</p>}
              </>
               )
                     }else {
                      return (<><div className='slide-list'>
                      <i className="ri-heart-line" 
                       onClick={()=>addTowishMovie(props.itemCart)} onMouseEnter={()=>setHoveredList(true)} onMouseLeave={()=>setHoveredList(false)}>
                       </i>
                      </div>
                       {hoveredList && <p className='slide-list-p'>My List</p>}
                      </>
                       )
                     }
                  }
  return (

    
    <div className="video-list" >
       <div  className="video-preview-slide">
            <div className="slide-title-ctn">                
               <h1 className="slide-title">{props.title}</h1>
               <div className={props.vote >= 7.5 ? 'vote-ctn':props.vote >=6.7 ? 'vote-ctn green' : props.vote >= 5.9 ? 'vote-ctn yellow' : props.vote >=4.5 ? 'vote-ctn red' : 'vote-ctn black'  }>
                <span className="vote">{props.vote}%</span>
              </div>
               {addedToCart()}
               <Link to={`/${props.movie}/${props.id}`} state={props.state} className="slide-link" onMouseEnter={hoverdTrueDetail} onMouseLeave={hoveredFalseDetail} >
                <i className="ri-spy-line" ></i>
               </Link>
                {hoveredDetail && <p className="slide-link-p">Details</p>}  
                 {heart()}
            </div>
            <div className="img-ctn" style={{backgroundColor:'black'}}>
              <img  className="img" src={props.url} alt="locandina-film" />             
            </div>            
        </div>      
    </div>
  )
}

export default VideoList;


