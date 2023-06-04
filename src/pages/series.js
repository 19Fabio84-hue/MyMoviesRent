import React, { useContext , useState } from 'react'
import { useSearchParams} from 'react-router-dom'
import { Context } from '../context'
import TopRatePage from '../componentChild/toprate'
import Header from '../componentChild/header'
import '../style/myList.css'
export default function Series(){
   const {finalArrayMoviesAndSeries , categoriesArray } = useContext(Context)
   const [ hover , setHover] = useState(false)
   const arraySeries = finalArrayMoviesAndSeries.filter(movie => movie.movie==='tv')
   let [searchParams , setSearchParams] = useSearchParams()
   const typeFilter = searchParams.get('type')
   const displayedMovies = typeFilter ? arraySeries.filter(movie => movie.type === typeFilter) : arraySeries
   const arrayFilteredType = displayedMovies.map((movie , index )=> {
    return (<>
           {movie.poster_path && <TopRatePage 
           key={index}
            id={movie.id}
            movie={movie.movie === 'Movie' ? 'movie' : movie.movie}
            url={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            isFavorite={movie.isFavorite}
            title={movie.title}
            date={movie.release_date}
            vote={movie.vote_average}
            overview={ movie.overview }
            state={{search : `series` ,type:`${typeFilter === null ? '?.=' :'?type=' }`,
                   name : `${typeFilter === null ? '' :`${typeFilter}`}` , title :`${typeFilter === null ? 'All' :`${typeFilter}`} series`}}
             itemCart={{id : movie.id , isFavorite : movie.isFavorite , img : `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                        title : movie.title ,overview : movie.overview , vote : movie.vote_average , date : movie.release_date,
                        price:2.99 ,quantity : 1 ,movie:movie.movie}}
           />}
   </> )
   })
   const categoriesMap = categoriesArray.map((movie,index) =>{
      const setParamsAndHover = ()=> {
         setSearchParams(`type=${movie.value}`)
         setHover(!hover)
      }
      return (
      <button  key={index} className={hover ?'button' : 'button-none'} onClick={setParamsAndHover}>{movie.name}</button>
      )
     })
     const [series ,setSeries] = useState(false)
     function setMovie(){setSeries(false)}
    function setTv(){setSeries(true)}
    return (<>
       <Header movies={setMovie} series={setTv} value={series} />
      <div className='film-section'>
      <div onClick={()=>setHover(!hover)} className={hover ? 'categories-movie':'categories-none' }>
          <button  onClick={()=>setSearchParams('.')} className={`${hover ? 'button' :'button-selected' } `}>
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
  </> )
}