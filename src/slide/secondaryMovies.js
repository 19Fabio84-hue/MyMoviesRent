import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/TopRated.css'
import '../style/slideStyle.css'
import '../style/header.css'
import Movie from '../componentChild/slideMovies';
import { Context } from '../context';
import Categories from '../componentChild/categories';
import TopRatedSlide from '../componentChild/topRatedSlide';
export default function SlideSecondaryMovies(){

    const { categoriesArray} = React.useContext(Context)
    function CustomPrevArrowMovie(props) {
      const { onClick } = props;
      return (
        <button className="prev-top" onClick={onClick}>
          <i className="ri-arrow-left-s-line"></i>
        </button>
      );
    }    
    function CustomNextArrowMovie(props) {
      const { onClick } = props;
      return (
        <button className="next-top" style={{heigth:'100px'}} onClick={onClick}>
          <i className="ri-arrow-right-s-line"></i>
        </button>
      );
    }
    function CustomNextArrowTopRated(props) {
      const { onClick } = props;
      return (
        <button className="next-topRated" style={{heigth:'100px'}} onClick={onClick} >
          <i className="ri-arrow-right-s-line"></i>
        </button>
      );
    }
    function CustomPrevArrowTopRated(props) {
      const { onClick } = props;
      return (
        <button className="prev-topRated" onClick={onClick}>
          <i className="ri-arrow-left-s-line"></i>
        </button>
      );
    }  
    // funzione cambio SlideToShow  
    const [slidesToShow, setSlidesToShow] = useState(5);
    const [handleCenterMode , setHandleCenterMode] = useState(true)
    const [handlePadding , setHandlePadding] = useState('30px')
    useEffect(() => {
      const updateSlidesToShow = () => {
        if(window.innerWidth <= 600){
          setHandlePadding('55px')
          setHandleCenterMode(true)
          setSlidesToShow(1)
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
        //  else {
        //   setHandleCenterMode(true)
        //   setSlidesToShow(5);
        // }     
      
      }    
      // Aggiungi un listener per rilevare i cambiamenti nella larghezza dello schermo
      window.addEventListener('resize', updateSlidesToShow);
    
      // Richiama la funzione di aggiornamento iniziale
      updateSlidesToShow();
    
      // Rimuovi il listener quando il componente viene smontato
      return () => {
        window.removeEventListener('resize', updateSlidesToShow);
      };
      
    }, [slidesToShow]);
    const settingsTopRated = {      
      pauseOnHover: true,
       dots: false,
       infinite: true,
       speed: 500,
       centerMode:true,
       slidesToShow: 5,
       slidesToScroll: 3,
       autoplay: true,
       autoplaySpeed: 6500,
       prevArrow: <CustomPrevArrowTopRated  />,
       nextArrow: <CustomNextArrowTopRated  />
     }
  const settingSlide = {
      dots: false,
      infinite: true,   
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      centerPadding:handlePadding ,
      centerMode:handleCenterMode,
      autoplay: false,
      autoplaySpeed: 6000,
      heigth:400,
      prevArrow: <CustomPrevArrowMovie />,
      nextArrow: <CustomNextArrowMovie />
    }  

  
    const categoriesMap = categoriesArray.map((movie,index) =>{
    return (<Categories key={index} id={movie.id} value={movie.value} name={movie.name}/>)})
    
  
     const categoriesMovie = categoriesArray.map((movie,index) => {
      return (
        <div key={index} className={`slide-movie-ctn-${movie.value}`}>
        <div className='title-ctn-slide'>
        <h1 className='title-slide-red'>My Movies<span className='span-slide'>rent</span></h1>
        <h1 className='toprated-title'>{movie.name}</h1>
        <Link to={`/${movie.id}`} className='toprated-link' >See more </Link>
        <Link to={`/${movie.id}`} className='toprated-link' ><i className="ri-arrow-right-s-line link-icon" ></i></Link>        
        </div>
          <Slider {...settingSlide}   className='slider-class-movie' >
            {movie.film.map((movie,index)=>{
              return(
                <Movie className='proviamo'
                movie={'movie'}
                key={index}
                ids={movie.ids}
                id={movie.id}
                url={movie.poster_path === null ?`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`  : `https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                isFavorite={movie.isFavorite}
                title={movie.title}
                date={movie.release_date}
                vote={movie.vote_average}
                overview={ movie.overview }
                genres={movie.genre_ids}
                state={{search : null ,type:null ,name : null , title: 'Home'}}
                 itemCart={{id : movie.id , isFavorite : movie.isFavorite , img : `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                            title : movie.title ,overview : movie.overview , vote : movie.vote_average , date : movie.release_date,
                            price:2.99 ,quantity : 1 , movie:movie.movie }} />
              )
            })}
          </Slider>
        </div> 
      )
    })
    const topRatedSlideMovie = categoriesArray.map((movie,index) => {
      return (
        <div key={index} className={`slide-movie-ctn-${movie.value}-topRated`} >
        <div className='title-ctn-slide'>
        <h1 className='title-slide-red'>My Movies<span className='span-slide'>rent</span></h1>
        <h1 className='toprated-title'>{movie.name}</h1>
        <Link to={`/${movie.id}`} className='toprated-link' >See more </Link>
        <Link to={`/${movie.id}`} className='toprated-link' ><i className="ri-arrow-right-s-line link-icon" ></i></Link>        
        </div>
          <Slider {...settingsTopRated}  className='slider-class-movie-topRated-big' >
            {movie.film.map((movie,index)=>{
              return(
                <TopRatedSlide
                movie={'movie'}
                key={index}
                ids={movie.ids}
                id={movie.id}
                url={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  img={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                isFavorite={movie.isFavorite}
                title={movie.title}
                date={movie.release_date}
                vote={movie.vote_average}
                overview={ movie.overview }
                genres={movie.genre_ids}
                state={{search : null ,type:null ,name : null , title: 'Home'}}
                 itemCart={{id : movie.id , isFavorite : movie.isFavorite , img : `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                            title : movie.title ,overview : movie.overview , vote : movie.vote_average , date : movie.release_date,
                            price:2.99 ,quantity : 1 , movie:movie.movie }} />
              )
            })}
          </Slider>
        </div> 
      )
    })
    
    const topRatedSlideMovieFirst = topRatedSlideMovie[0] 
    
   const FirstSlideMovie = categoriesMovie.slice(1 ,3)
   const SecondSlideMovie = categoriesMovie.slice(3, 10 )

     return(
     <>
        {FirstSlideMovie }
        {topRatedSlideMovieFirst}
         <div className='slide-movie-ctn-categories'>
        <div className='title-ctn-slide'>
        <h1 className='title-slide-red'>My Movies<span className='span-slide'>rent</span></h1>
        <h1 className='toprated-title'>Categories</h1>                
        </div>
          <Slider {...settingSlide} slidesToShow={slidesToShow}  className='slider-class-movie' >
           {categoriesMap} 
          </Slider>
        </div> 
        {SecondSlideMovie }
        </>
        
     )
         
}