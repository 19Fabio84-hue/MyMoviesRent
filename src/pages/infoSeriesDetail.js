import React, {useState , useEffect} from 'react'
import { useParams , useLocation} from 'react-router-dom'
import { NavLink ,  Link } from 'react-router-dom'
import { Context } from '../context'
import  YouTube from 'react-youtube'
import Slider from "react-slick";
import TopRated from '../componentChild/slideMovies';
import Header from '../componentChild/header'
import '../style/infoPages.css'

 function InfoSeriesPage(){
  const {addTowishMovie , removeTowishMovie , wishMovie ,CartMovie, addToCart , removeToCart} = React.useContext(Context)
  const params = useParams()
  const location = useLocation()
  const [hoveredList , setHoveredList] = useState(false)
  const [hoverCart , setHoverCart] = useState(false)
   const [movieDetail ,setMovieDetail] = useState([])
   const [genresDetail , setGenresDetail] = useState([])
   const [trailer ,setTrailer] = useState(false)
   const [ getVideo , setGetVideo] = useState([])
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&name&append_to_response=videos`)
        .then(response => response.json())
        .then(data=> setGetVideo(data.results[0]))
      },[params.id])
    useEffect(()=>{
     fetch(`https://api.themoviedb.org/3/tv/${params.id}?api_key=efc42faadb8a20858df7818520bb9d80&vote_average`)
       .then(response => response.json())
       .then(data=> setMovieDetail({...data , movie : 'tv' , title: data.name}))  
  } ,[params.id])  
    useEffect(()=>{
     fetch(`https://api.themoviedb.org/3/tv/${params.id}?api_key=efc42faadb8a20858df7818520bb9d80&vote_average`)
       .then(response => response.json())
       .then(data=> setGenresDetail(data.genres.map(movie=> movie )))  
  } ,[params.id])
                
  const addCartAndWish = {
    itemCart : {id:movieDetail.id , isFavorite : movieDetail.isFavorite , img : `https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`,
                vote : movieDetail.vote_average ,  title : movieDetail.title ,date : movieDetail.release_date ,overview : movieDetail.overview, price:2.99 ,quantity : 1,
                movie : movieDetail.movie }
  }
  function addedToCart(){
   const isAdded = CartMovie.find(movie => movie.id === movieDetail.id)
   if(isAdded){
     return (
            <div className="info-rent"  onClick={()=> removeToCart(addCartAndWish.itemCart.id)} >
             <i className="ri-shopping-bag-fill unrent-icon-info"onMouseEnter={()=>setHoverCart(true)} onMouseLeave={()=>setHoverCart(false)} ></i>
             {hoverCart && <p className="info-unrent-span">Remove</p>}
           </div>)
   }else {
     return( <div className="info-rent"   onClick={()=>addToCart(addCartAndWish.itemCart)} >
              <i className="ri-shopping-bag-line unrent-icon-info" onMouseEnter={()=>setHoverCart(true)} onMouseLeave={()=>setHoverCart(false)}></i>
              {hoverCart && <span className="info-unrent-span">Rent Movie</span>}
             </div>)
   }  
  }
  function heart(){
   const isAdded = wishMovie.find(movie => movie.id === movieDetail.id)
   if(isAdded){
       return (<><div className='info-rent heart'>
               <i className="ri-heart-fill unrent-icon-info" 
                onClick={()=>removeTowishMovie(addCartAndWish.itemCart.id)} onMouseEnter={()=>setHoveredList(true)} onMouseLeave={()=>setHoveredList(false)}>
                </i>
                {hoveredList && <span className='info-unrent-span'>Remove</span>}
               </div>
               </>
                )}else {return (<><div className='info-rent heart'>
                       <i className="ri-heart-line unrent-icon-info " 
                        onClick={()=>addTowishMovie(addCartAndWish.itemCart)} onMouseEnter={()=>setHoveredList(true)} onMouseLeave={()=>setHoveredList(false)}>
                        </i>{hoveredList && <span className='info-unrent-span'>My List</span>}
                       </div>
                       </>
                        )
                      }
                   }

                   const [handleDetail , setHandleDetail] = useState('detail')  
                             
                   // DETAIL
                    const [seriesDetail ,setSeriesDetail] = useState([])
   
                    useEffect(()=>{
                     fetch(`https://api.themoviedb.org/3/tv/${params.id}/credits?api_key=efc42faadb8a20858df7818520bb9d80&vote_average`)
                       .then(response => response.json())
                       .then(data=> setSeriesDetail(data.cast.map(movie=> movie.character).slice(0 ,15)))  
                  } ,[params.id])
                    const Directors = seriesDetail[4]
                    const Producers = seriesDetail[2]
                    const Starring = randomName().join(' - ')
                    function randomName() {
                        const starring = []
                        for(let i = 0; i < 4 ; i++) {
                          starring.push(seriesDetail[i])
                        }                      
                        return  starring
                      }   
                    // TRAILER 
                    
                    const [ getVideoSeries , setGetVideoSeries] = useState([])
                    useEffect(()=>{
                        fetch(`https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&name&append_to_response=videos`)
                        .then(response => response.json())
                        .then(data=> setGetVideoSeries(data.results).slice(0,5))
                      },[params.id])
          
                      //  RELATED
                      const [relatedseries , setRelatedSeries ] = useState([])

                      useEffect(()=>{
                          fetch(`https://api.themoviedb.org/3/tv/${params.id}/recommendations?api_key=efc42faadb8a20858df7818520bb9d80&vote_average`)
                            .then(response => response.json())
                            .then(data=> setRelatedSeries(data.results.map(movie=>{
                              return {...movie , title : movie.name  ,movie : 'tv' ,release_date :movie.first_air_date }
                            })))  
                          } ,[params.id])
                  
                      function CustomPrevArrow(props) {
                          const { onClick } = props;
                          return (
                            <button className="prev-top" onClick={onClick}>
                              <i className="ri-arrow-left-s-line"></i>
                            </button>
                          );
                        }    
                        function CustomNextArrow(props) {
                          const { onClick } = props;
                          return (
                            <button className="next-top" style={{heigth:'100px'}} onClick={onClick}>
                              <i className="ri-arrow-right-s-line"></i>
                            </button>
                          );
                        }
                        const [slidesToShow, setSlidesToShow] = useState(5);                 
                        const [handleCenterMode , setHandleCenterMode] = useState(true)
                   
                       useEffect(() => {
                         const updateSlidesToShow = () => {
                           if(window.innerWidth <= 500){
                             
                             setHandleCenterMode(true)
                             setSlidesToShow(1.05)
                            
                           } else if(window.innerWidth <= 600){
                          
                             setHandleCenterMode(true)
                             setSlidesToShow(2)
                       
                           } else if (window.innerWidth <= 800) {
                             setHandleCenterMode(false)
                             setSlidesToShow(2);
                         
                           } else if (window.innerWidth <= 1130) {
                             setHandleCenterMode(false)
                             setSlidesToShow(3)
                        
                           } else if(window.innerWidth <= 1500){
                             setHandleCenterMode(false)
                             setSlidesToShow(3.8)
                           }
                           else{
                             setSlidesToShow(5)
                             setHandleCenterMode(true)
                           }  
                         
                         }    
                         window.addEventListener('resize', updateSlidesToShow);

                         updateSlidesToShow();
                         return () => {
                           window.removeEventListener('resize', updateSlidesToShow);
                         };
                         
                       }, [slidesToShow]);
                     const settings = {
                         dots: false,
                         infinite: true,
                         speed: 2000,
                         centerMode : handleCenterMode ,
                         slidesToShow: slidesToShow,
                         slidesToScroll: 4,
                         autoplay: false,
                         autoplaySpeed: 4000,
                         heigth:400,
                         prevArrow: <CustomPrevArrow />,
                         nextArrow: <CustomNextArrow />
                       }
                        const relatedMap = relatedseries.map(movie => { 
                          const votes = Number(movie.vote_average).toFixed(2)
                          return (
                          <>
                              {movie.poster_path && <TopRated
                              movie={movie.movie}
                              key={movie.id}
                              id={movie.id}
                              url={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                              isFavorite={movie.isFavorite}
                              title={movie.title}
                              date={movie.release_date}
                              vote={votes}
                              overview={ movie.overview }
                              state={{search :`${location.state.search === null ? '' : `${location.state.search}`}` ,type:`${location.state.type === null ? '' :`${location.state.type}`}`,
                                      name : `${location.state.name === null ? '' :`${location.state.name}`}` , title :`${location.state.title}`}}      
                               itemCart={{id : movie.id , isFavorite : movie.isFavorite , img : `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                                          title : movie.title ,overview : movie.overview , vote : movie.vote_average , date : movie.release_date,
                                          price:2.99 ,quantity : 1 ,movie : movie.movie }} />  } 
                          </>
                          )
                       })            
         const generis = genresDetail.map((movie,index)=> 
                                                      <Link key={index} to={`/${movie.id === 12 ? '28' :  
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
                     movie.name}</Link> )
         
         const styles = {textDecoration: 'underline' , textUnderlineOffset : '15px'}
         const [series ,setSeries] = useState(false)
         function setMovie(){setSeries(false)}
        function setTv(){setSeries(true)}
        console.log(location)
        return (<>
           <Header movies={setMovie} series={setTv} value={series} />
       <div className="video-list-info" key={movieDetail.id} >
        
       <NavLink    state={ {searchMovie : `${location.state.searchMovie}`}}
         to={`/${location.state.search===null ? '' :location.state.search}${location.state.type === null ? '' : `${location.state.type}`}${location.state.name === null ? '' : `${location.state.name}`}`} className='link-come-back' >
                ← Come back to {location.state.title} </NavLink>        
        
      {movieDetail ?
          <div key={movieDetail.id} className="video-preview info-ctn">
            {trailer ? <div className="slide-title-ctn info" > <div className='info-icon-flex'>
              {/* <button className='trailer-info trailer-info-leave' onClick={()=> setTrailer(!trailer)}>{trailer ? 'Leave' : 'Trailer'}</button> */}
            </div></div> : 
             <div className="slide-title-ctn info" >
              <div className='info-title-description'>
               <h1 className="info-title">{movieDetail.title}</h1>
               <h1 className='slide-tagline'>{movieDetail.tagline}</h1>
            </div>
               <div className='info-overview'><h3>{movieDetail.overview}</h3></div>
            <div className='info-generes'>{generis}</div>
            <div className='info-icon-flex'>
              <button className='trailer-info' onClick={()=> setTrailer(!trailer)}>{trailer ? 'Leave' : 'Trailer'}</button>
               {addedToCart()}
               {heart()}
            </div>
            </div>}
            {trailer ? <div className="img-ctn img-ctn-info" >
            <button className='trailer-info trailer-info-leave' onClick={()=> setTrailer(!trailer)}>{trailer ? 'Leave' : 'Trailer'}</button>
              {getVideo ===undefined ? <h1 style={{color:'#FFF'}}>Sorry we no have trailer for this Movie</h1>
              : <YouTube className="youtube-trailer"  videoId={`${getVideo.key}`} autoPlay={true} ></YouTube> }             
            </div> : <div className="img-ctn img-ctn-info" >            
             <img className="img img-info" src={movieDetail.backdrop_path === null ?`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`  :`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}` } alt={movieDetail.title} />
            </div>}            
          </div> : <h1 style={{color:'red' , textAlign:'center' , marginTop:'3em'}}>Loading...</h1>  }
        </div>
            <div className='link-info-detail'>
            <button onClick={()=>setHandleDetail('detail')}  style={handleDetail === 'detail' ? styles : null} >Detail</button>
             <button  onClick={()=>setHandleDetail('trailer')} style={handleDetail === 'trailer' ? styles : null}>Trailer</button>
             <button  onClick={()=>setHandleDetail('related')} style={handleDetail === 'related' ? styles : null} >Related</button>
            </div>
                   {/* DETAIL */}
            {handleDetail === 'detail' ? 
            <div key={params.id} className='detail-ctn'>
            <div className='audio-deatil'>
                <h2>Audio languages</h2>
                <h3>English</h3>
                <h2>Subtitles</h2>
                <h3>not usable</h3>
                <h2>Directors</h2>
                <h3>{Directors}</h3>
                <h2>Producers</h2>
                <h3>{Producers}</h3>
                <h2>Starring</h2>
                <h3>{Starring}</h3>
            </div>   
        </div>
                  // TRAILER
            : handleDetail === 'trailer' ?
            <div className='trailer-ctn'>
            {getVideoSeries ?            
               
                 getVideoSeries.map(movie => {return (
                                                   <div className='title-trailer-flex'>
                                                        <h1 className='no-shadow'> {movie.name}</h1>
                                                        <YouTube className="youtube-trailer"  videoId={`${movie.key}`} autoPlay={true} ></YouTube>
                                                    </div> )}).slice(0,5) :  <h1 className='no-trailer'>Trailers are coming soon</h1>
                 }
    </div>              
                    // RELATED
          :           <div className='slide-related-ctn'>
          {relatedMap.length === 0 ? <h1 style={{color:'#FFF'}}>Sorry the releted array is === 0</h1> :
            <div className='slide-movie-ctn-top'>
            <div className='title-ctn-slide related-slide'>
            <h1 className='title-slide-red'>My Movies<span className='span-slide'>rent</span></h1>
            <h1 className='toprated-title'>Related Movies</h1>            
            </div>         
              <Slider {...settings} className='slider-class-movie' >
                   {relatedMap}            
              </Slider>            
            </div>    }             
            </div>   
            }
         </>     
    )
   
}
export default InfoSeriesPage