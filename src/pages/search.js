import React,{useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import TopRatePage from '../componentChild/toprate'
import Header from '../componentChild/header'
import '../style/header.css' 

export default function Search(){
 
  const location = useLocation()
  const [getData , setGetData] = useState([])

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&query=${location.state === 'null' ? 'anche' : location.state.searchMovie}&page=1&include_adult=false`)
  .then(response=>response.json())
  .then(data=>setGetData(data.results))
},[location])
 
  const DatadisplayTitle =() =>{
     
     if(getData.length === 0){
      return ( <h1 style={{color:'#FFF'}}>Sorry no match found</h1> )
     }else{
        return (<>
             <h1 className='title-search'>Results for your search  "{location.state.searchMovie}"</h1>
          <div className='categories-marigin-search-ctn'>
               { getData.map((movie,index) => { 
          
          return (<>
          {movie.poster_path && 
           <TopRatePage
           key={index}
           movie={'Movie'}
           id={movie.id}
           ids={movie.ids}
           url={movie.poster_path === null ?`https://image.tmdb.org/t/p/original/${movie.backdrop_path}` :`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
           isFavorite={movie.isFavorite}
           title={movie.title}
           date={movie.release_date}
           vote={movie.vote_average}
           overview={ movie.overview }
    
           state={{search :'search' ,type:null ,
                   name : null , title :'Search' , searchMovie : `${location.state.searchMovie}`}}
    
            itemCart={{id : movie.id , isFavorite : movie.isFavorite , img : `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                       title : movie.title ,overview : movie.overview , vote : movie.vote_average , date : movie.release_date,
                       price:2.99 ,quantity : 1 ,movie:movie.movie ,ids :movie.ids}} />}</>
          )
    })}
          </div></>
        )
     }
     
    
    
  }
  const [series ,setSeries] = useState(false)  
  function setMovie(){ setSeries(false)  }
  function setTv(){ setSeries(true)  }
  return (<>
     <Header movies={setMovie} series={setTv} value={series} />
    <div className='searchMovie-ctn'>
    {DatadisplayTitle()}
           </div>
           </> )
}