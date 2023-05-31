import React  from 'react'
import Slider from "react-slick";
import { Context } from '../context';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/TopRated.css'
import '../style/slideStyle.css'
import VideoList from '../componentChild/slide';
import '../style/header.css'

export default function PrimarySlideSeries(){
    const { fullPopular} = React.useContext(Context)
    function CustomPrevArrow(props) {
        const { onClick } = props;
        return (
          <button className="prev" onClick={onClick}>
            <i className="ri-arrow-left-s-line"></i>
          </button>
        );
      }    
      function CustomNextArrow(props) {
        const { onClick } = props;
        return (
          <button className="next" style={{heigth:'100px'}} onClick={onClick} >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        );
      }
    const settings = {
      centerMode: true,
      pauseOnHover: true,
        dots: true,
        appendDots: dots => (
          <div
            style={{
              position:'relative' ,
                marginTop:'-5em',
                marginBottom:'10em'
            }}
          >
            <ul style={{ margin: "0px" }}> {dots} </ul>
          </div>
        ),
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <CustomPrevArrow  />,
        nextArrow: <CustomNextArrow  />
      }
      const popularMovie = fullPopular.filter(movie => movie.movie === 'tv')
     const slideMovie = popularMovie.map((movie , index )=> {
        return (
          <>
          {movie.poster_path && <VideoList
            key={index}
            movie={movie.movie}
            id={movie.id}
            url={movie.backdrop_path===null ?`https://image.tmdb.org/t/p/original/${movie.poster_path}` :`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            isFavorite={movie.isFavorite}
            title={movie.title}
            date={movie.date}
            vote={movie.vote_average}
            overview={ movie.overview}
            state={{search : 'tv' ,type:'/' ,name : null , title: 'Home'}}
             itemCart={{id:movie.id , isFavorite : movie.isFavorite , img : `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                       vote : movie.vote_average ,  title : movie.title ,date : movie.release_date ,overview : movie.overview, price:2.99 ,quantity : 1 , movie:movie.movie }} />}
       </> )
     })  
     return(      
        <Slider {...settings} >
            {slideMovie}
        </Slider>    
     ) 
}