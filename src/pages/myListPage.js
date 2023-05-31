import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context'
import TopRatePage from '../componentChild/toprate'
import Header from '../componentChild/header'
import '../style/myList.css'
export default function MyListPage(){
   
    const {wishMovie } = React.useContext(Context)
    
    const list = wishMovie.map((movie , index) => {
    
        return  (
             <TopRatePage
               movie={movie.movie}
               key={index}
               id={movie.id}
               url={`https://image.tmdb.org/t/p/original/${movie.img}`}
               isFavorite={movie.isFavorite}
               title={movie.title}
               vote={movie.vote}
               date={movie.date}
               overview={ movie.overview}
               state={{search : `myList` ,type:null ,name :null, title :`Whish List `}}
               itemCart={{id:movie.id , isFavorite : movie.isFavorite , img : movie.img,
                        title : movie.title , vote: movie.vote_average ,date : movie.release_date ,  overview : movie.overview , price:2.99 ,quantity : 1
                      ,movie : movie.movie }}
                         />               
          )    
      }
       )
     
       const [series ,setSeries] = useState(false)
       function setMovie(){setSeries(false)}
      function setTv(){setSeries(true)}
      return (<>
         <Header movies={setMovie} series={setTv} value={series} />
        {wishMovie.length === 0 && <h1 className='check-out'>Your wish list is empty...<Link to='/' style={{color :`#FF0000` , textDecoration :'none'}}>Continue with shopping</Link></h1>}        
        <div className='myList-ctn' >  
          {list}
        </div >
        </>
    )
}