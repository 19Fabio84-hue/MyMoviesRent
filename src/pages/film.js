import React, { useContext , useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { Context } from '../context'
import TopRatePage from '../componentChild/toprate'
import Header from '../componentChild/header'
import useHover from './refHook'
import '../style/myList.css'
export default function Film(){
   const {finalArrayMoviesAndSeries , categoriesArray } = useContext(Context)   
   const [hover , ref] = useHover()
   const arrayMovies = finalArrayMoviesAndSeries.filter(movie => movie.movie === 'Movie')
   let [searchParams , setSearchParams] = useSearchParams()
   const typeFilter = searchParams.get('type')
   const displayedMovies = typeFilter ? arrayMovies.filter(movie => movie.type === typeFilter) : arrayMovies
   const arrayFilteredType = displayedMovies.map((movie , index )=> {
    return (
     <>
          {movie.poster_path && <TopRatePage 
           key={index}
            id={movie.id}
            movie={movie.movie}
            url={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            isFavorite={movie.isFavorite}
            title={movie.title}
            date={movie.release_date}
            vote={movie.vote_average}
            overview={ movie.overview }
            
            state={{search : `film` , type:`${typeFilter === null ? '?.=' :'?type=' }` ,
                    name : `${typeFilter === null ? '' :`${typeFilter}`}` , title :`${typeFilter === null ? 'All' :`${typeFilter}`} Movies`}}  

             itemCart={{id : movie.id , isFavorite : movie.isFavorite , img : `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                        title : movie.title ,overview : movie.overview , vote : movie.vote_average , date : movie.release_date,
                        price:2.99 ,quantity : 1 ,movie:movie.movie}}
           />}
      </> )
   })
  
   const categoriesMap = categoriesArray.map((movie) =>{
      return (

      <button ref={ref} className={hover ?'button' : 'button-none'} onClick={()=>setSearchParams(`type=${movie.value}`)}>{movie.name}</button>
      )
     })
     const [series ,setSeries] = useState(false)
     function setMovie(){setSeries(false)}
    function setTv(){setSeries(true)}
    return (<>
       <Header movies={setMovie} series={setTv} value={series} />
     <div className='film-section'>
         <div ref={ref} className={hover ? 'categories-movie':'categories-none' }>
             <button ref={ref} onClick={()=>setSearchParams('.')} className={`${hover ? 'button' :'button-selected' } `}>
               {hover === false ? `${typeFilter === null ? 'All' : typeFilter === 'ActionAdventure' ?  'Action & Adventure' :
                                      typeFilter === 'Fantasy'? 'Sci-Fi & Fantasy' :
                                       typeFilter === 'History' ? 'History & War' :
                                       typeFilter === 'Music' ? 'Music & News':
                                        typeFilter}` :'All' }</button>
            {hover && categoriesMap}
         </div>
         <div className='myList-ctn film' >
         {arrayFilteredType}
         </div>
     </div>
    </>
   )
}