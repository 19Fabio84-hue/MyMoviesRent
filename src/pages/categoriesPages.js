import React , {useContext , useState} from 'react'
import { useSearchParams , useParams } from 'react-router-dom'
import { Context } from '../context'
import TopRatePage from '../componentChild/toprate'
import Header from '../componentChild/header'
import '../style/myList.css'

export default function CategoriesPage(){
    const {finalArrayMoviesAndSeries ,categoriesArray} = useContext(Context)
    const params = useParams()
    const [Filter , setFilter] = useState('ALL')
    const [hover , setHover] = useState(false)
    const titlePage = categoriesArray.filter(movie => {return movie.ids === params.id})
    const topRatedCategory = finalArrayMoviesAndSeries.filter(movie => {return movie.ids === params.id})
    const [searchParams , setSearchParams] = useSearchParams()
    const movieFilter = searchParams.get('movie')
    const displayedTopRated = movieFilter ?topRatedCategory.filter(movie=> movie.movie === movieFilter) : topRatedCategory
    const topRated = displayedTopRated.map((movie,index) => {  
              return (<>
            {movie.poster_path &&<TopRatePage
            key={index}
            movie={movie.movie}
            id={movie.id}
            ids={movie.ids}
            url={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            isFavorite={movie.isFavorite}
            title={movie.title}
            date={movie.release_date}
            vote={movie.vote_average}
            overview={ movie.overview }

            state={{search :null ,type:`${movieFilter === null ? '?.=' :'?movie=' }`,
                    name : `${movieFilter === null ? '' :`${movieFilter}`}` , title :`${movieFilter === null ? 'All Movies' :`${movieFilter}`} ${movie.name}`}}

             itemCart={{id : movie.id , isFavorite : movie.isFavorite , img : `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                        title : movie.title ,overview : movie.overview , vote : movie.vote_average , date : movie.release_date,
                        price:2.99 ,quantity : 1 ,movie:movie.movie ,ids :movie.ids}} />}
        </>)
     })
     function AllArrayDisplayed(){
      setFilter('ALL')
      setSearchParams('.')
   }
     function MovieArrayDisplayed(){
      setFilter('MOVIES')
      setSearchParams('movie=Movie')
   }
     function TvArrayDisplayed(){
      setFilter('SERIES')
      setSearchParams('movie=tv')
   }
   function ClearFilter(){
      setFilter('ALL')
      setSearchParams('.')
   }
   const [series ,setSeries] = useState(false)
   function setMovie(){setSeries(false)}
  function setTv(){setSeries(true)}
  return (<>
     <Header movies={setMovie} series={setTv} value={series} />
    <div className='category-ctn' >
      <h1 className='category'>{titlePage[0].name} Movies</h1>
      {Filter !== 'ALL' ? <button className='clear-filter' onClick={ClearFilter}>Clear Filter</button> : ''}
      {hover ?<div className='movie-select'onClick={()=>setHover(!hover)}>
         <p className='menu-opened'>{Filter}<i class="ri-arrow-up-s-line"></i></p>
         <p  onClick={AllArrayDisplayed}>ALL</p>
         <p  onClick={MovieArrayDisplayed}>MOVIES</p>
         <p className='series' onClick={TvArrayDisplayed}>SERIES</p>
      </div> : 
      <div className='movie-select' onClick={()=>setHover(!hover)}>
         <p className='menu-filter'>{Filter}<i class="ri-arrow-down-s-line"></i></p>
      </div> }
      <div className='myList-ctn categories-marigin'>
       {topRated}
      </div>
    </div>
    </>)
}