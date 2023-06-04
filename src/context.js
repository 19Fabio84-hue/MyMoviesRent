import React , {useEffect , useState} from 'react'
// const API_KEY = "efc42faadb8a20858df7818520bb9d80"
// const BASE_URL = "https://api.themoviedb.org/3/movie"
const Context = React.createContext()

function ContextProvider({children}){  
    const [wishMovie , setwishMovie] = useState([])
    const [CartMovie , setCartMovie] = useState([])
      //  API MOVIE ALL CATEGORIES
 const [popular , setPopular] = useState([])
 useEffect(()=>{
   fetch('https://api.themoviedb.org/3/movie/popular?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&include_adult=false&page=1')
    .then(response => response.json())
    .then(data=>  setPopular(data.results.map(movie => {
       return {...movie , movie:'Movie' ,type : 'toprated'}
    })))  
} ,[])
 const [popularTv , setPopularTv] = useState([])
 useEffect(()=>{
   fetch('https://api.themoviedb.org/3/tv/popular?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&include_adult=false&page=1')
    .then(response => response.json())
    .then(data=>  setPopularTv(data.results.map(movie => {
       return {...movie , movie:'tv' ,type : 'toprated',title :movie.name ,release_date :movie.first_air_date}
    })))  
} ,[])
const fullPopular = [...popular ,...popularTv]
                //  TopRated Movies & Series 2 API 
    const [topRatedMovie , setTopRatedMovie] = useState([])
    useEffect(()=>{
     fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&&include_adult=falsepage=1')
      .then(response => response.json())
      .then(data=> setTopRatedMovie(data.results.map(movie => {
         return {...movie ,movie:'Movie' ,type : 'TopRated',ids:'150' ,name:'Top Rated'}
      })))  
 } ,[])

  const [seriesTopRated ,setSeriesTopRated] = useState([])  
  useEffect(()=>{
   fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&include_adult=false&page=1')
    .then(response => response.json())
    .then(data=> setSeriesTopRated(data.results.map(movie => {
       return {...movie , movie:'tv' ,type : 'TopRated' ,ids:'150',name:'Top Rated' ,title :movie.name ,release_date :movie.first_air_date}
    })))  
} ,[])

               //   Action&Adventure MOVIE and SERIES 4 API
               // Action&Adventure Movie 2 API
   const [actionMovie , setActionMovie] = useState([])
   const [actionMovieTwo , setActionMovieTwo] = useState([])
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=28&include_adult=false&page=1')
       .then(response => response.json())
       .then(data=> setActionMovie(data.results.map(movie => {
          return {...movie ,ids:'28' , movie:'Movie', type : 'ActionAdventure', name:'Action & Adventure'}
       })))  
  } ,[])
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=12&include_adult=false&page=2')
       .then(response => response.json())
       .then(data=> setActionMovieTwo(data.results.map(movie => {
          return {...movie ,ids:'28' ,movie:'Movie',type : 'ActionAdventure', name:'Action & Adventure'}
       })))  
  } ,[])
                     // Action&Adventure SERIES 2 API
   const [actionSeries , setActionSeries] = useState([])
   const [actionSeriesTwo , setActionSeriesTwo] = useState([])
   
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10759&include_adult=false&include_adult=false&page=1')
       .then(response => response.json())
       .then(data=> setActionSeries(data.results.map(movie => {
         return {...movie ,ids:'28' ,name:'Action & Adventure' ,movie:'tv' ,type : 'ActionAdventure',title :movie.name,release_date :movie.first_air_date}
      })))  
   } ,[])
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10759&include_adult=false&include_adult=false&page=2')
       .then(response => response.json())
       .then(data=> setActionSeriesTwo(data.results.map(movie => {
         return {...movie ,movie:'tv' ,type : 'ActionAdventure',name:'Action & Adventure',title :movie.name ,release_date :movie.first_air_date ,ids:'28'}
      })))  
   } ,[])
  const ActionMovieFull = [...actionMovie ,...actionMovieTwo ]
  const ActionSeriesFull = [...actionSeries ,...actionSeriesTwo ]

          //   AnimationMovies MOVIE and SERIES 4 API
        //  AnimationMovies MOVIES 2 API
 const [AnimationMovies , setAnimation] = useState([])
 const [AnimationMoviesTwo , setAnimationTwo] = useState([])
 useEffect(()=>{
 fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=16&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setAnimation(data.results.map(movie => {
 return {...movie , movie:'Movie',type : 'Animation',ids:'16',name:'Animation'}
 })))  
 } ,[])  
 useEffect(()=>{
 fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=16&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setAnimationTwo(data.results.map(movie => {
 return {...movie , movie:'Movie',type : 'Animation',ids:'16',name:'Animation'}
 })))  
 } ,[])  
         // AnimationMovies Series 2 API
 const [AnimationSeries , setAnimationSeries] = useState([])
 const [AnimationSeriesTwo , setAnimationSeriesTwo] = useState([])
 useEffect(()=>{
 fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=16&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setAnimationSeries(data.results.map(movie => {
 return {...movie , movie:'tv',type : 'Animation',ids:'16',name:'Animation' ,title :movie.name ,release_date :movie.first_air_date}
 })))  
 } ,[])  
 useEffect(()=>{
 fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=16&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setAnimationSeriesTwo(data.results.map(movie => {
 return {...movie ,movie:'tv',type : 'Animation',ids:'16',name:'Animation' ,title :movie.name ,release_date :movie.first_air_date}
 })))  
 } ,[])  
 const AnimationMovieFull = [...AnimationMovies ,...AnimationMoviesTwo ]
 const AnimationSeriesFull = [...AnimationSeries ,...AnimationSeriesTwo]
             
            // COMEDY MOVIES AND SERIES 4 API
            // Comedy 4 Api
   const [ComedyMovies ,setComedyMovies] = useState([])              
   const [ComedyMovieTwo ,setComedyMoviesTwo] = useState([])              
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=35&include_adult=false&page=3')
      .then(response => response.json())
      .then(data=> setComedyMovies(data.results.map(movie => {
         return {...movie , movie:'Movie',type : 'Comedy',ids:'35',name:'Comedy'}
      })))  
   } ,[])               
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=35&include_adult=false&page=2')
      .then(response => response.json())
      .then(data=> setComedyMoviesTwo(data.results.map(movie => {
         return {...movie ,  movie:'Movie',type : 'Comedy',ids:'35',name:'Comedy'}
      })))  
   } ,[])               
   const [ComedySeries ,setComedySeries] = useState([])              
   const [ComedySeriesTwo ,setComedySeriesTwo] = useState([]) 
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=35&include_adult=false&page=1')
       .then(response => response.json())
       .then(data=> setComedySeries(data.results.map(movie => {
          return {...movie ,  movie:'tv',type : 'Comedy',ids:'35',name:'Comedy' ,title :movie.name ,release_date :movie.first_air_date}
       })))  
  } ,[])               
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=35&include_adult=false&page=2')
       .then(response => response.json())
       .then(data=> setComedySeriesTwo(data.results.map(movie => {
          return {...movie ,  movie:'tv',type : 'Comedy',ids:'35',name:'Comedy' ,title :movie.name ,release_date :movie.first_air_date}
       })))  
  } ,[])         
  const comedyMovieFull = [...ComedyMovies , ...ComedyMovieTwo]
const comedySeriesAll = [...ComedySeries,...ComedySeriesTwo]            
                 
               //  Crime Movies And Series 4 API
                  // CRIME MOVIES  2 API 
                  const [crimeMovies ,setCrimeMovies] = useState([])
                  const [crimeMoviesTwo ,setCrimeMoviesTwo] = useState([])
 useEffect(()=>{
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=80&include_adult=false&page=1')
   .then(response => response.json())
   .then(data=> setCrimeMovies(data.results.map(movie => {
     return {...movie , movie:'Movie',type : 'Crime',ids:'80',name:'Crime'}
           })))  
      } ,[])               
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=80&include_adult=false&page=2')
        .then(response => response.json())
         .then(data=> setCrimeMoviesTwo(data.results.map(movie => {
     return {...movie ,  movie:'Movie',type : 'Crime',ids:'80',name:'Crime'}
         })))  
     } ,[])   
                  // CRIME SERIES 2 API
               const [crimeSeries ,setCrimeSeries] = useState([])
               const [crimeSeriesTwo ,setCrimeSeriesTwo] = useState([])
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=80&include_adult=false&page=1')
        .then(response => response.json())
         .then(data=> setCrimeSeries(data.results.map(movie => {
     return {...movie ,  movie:'tv',type : 'Crime',ids:'80',name:'Crime' ,title :movie.name ,release_date :movie.first_air_date}
         })))  
     } ,[])   
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=80&include_adult=false&page=2')
        .then(response => response.json())
         .then(data=> setCrimeSeriesTwo(data.results.map(movie => {
     return {...movie ,  movie:'tv',type : 'Crime',ids:'80',name:'Crime' ,title :movie.name ,release_date :movie.first_air_date}
         })))  
     } ,[])
     const crimeMoviesFull = [...crimeMovies , ...crimeMoviesTwo]
     const crimeSeriesFull = [...crimeSeries , ...crimeSeriesTwo]
       //  Documentary Movies And Series 4 API
                  // Documentary MOVIES  2 API
      const [DocumentaryMovies ,setDocumentaryMovies] = useState([])
      const [DocumentaryMoviesTwo ,setDocumentaryMoviesTwo] = useState([])
      useEffect(()=>{
         fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=99&include_adult=false&page=1')
        .then(response => response.json())
        .then(data=> setDocumentaryMovies(data.results.map(movie => {
          return {...movie , movie:'Movie',type : 'Documentary',ids:'99',name:'Documentary'}
                })))  
           } ,[])               
        useEffect(()=>{
           fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=99&include_adult=false&page=2')
             .then(response => response.json())
              .then(data=> setDocumentaryMoviesTwo(data.results.map(movie => {
          return {...movie ,  movie:'Movie',type : 'Documentary',ids:'99',name:'Documentary'}
              })))  
          } ,[]) 
         //  Documentary Series 2 Api
       const [documentarySeries ,setDocumentarySeries] = useState([])
       const [documentarySeriesTwo ,setDocumentarySeriesTwo] = useState([])
       useEffect(()=>{
         fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=99&include_adult=false&page=1')
        .then(response => response.json())
        .then(data=> setDocumentarySeries(data.results.map(movie => {
          return {...movie , movie:'tv',type : 'Documentary',ids:'99',name:'Documentary' ,title :movie.name ,release_date :movie.first_air_date}
                })))  
           } ,[])               
        useEffect(()=>{
           fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=99&include_adult=false&page=2')
             .then(response => response.json())
              .then(data=> setDocumentarySeriesTwo(data.results.map(movie => {
          return {...movie ,  movie:'tv',type : 'Documentary',ids:'99',name:'Documentary' ,title :movie.name ,release_date :movie.first_air_date}
              })))  
          } ,[])  
     const documentaryMoviesFull = [...DocumentaryMovies ,...DocumentaryMoviesTwo]
     const documentarySeriesFull = [...documentarySeries , ...documentarySeriesTwo]      
               //   Drama MOVIES And SERIES 4 Api
               //   Drama MOVIES 2 Api
   const [dramaMovies , setDramaMovies] = useState([]) 
   const [dramaMoviesTwo , setDramaMoviesTwo] = useState([])   
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=18&include_adult=false&page=1')
       .then(response => response.json())
       .then(data=> setDramaMovies(data.results.map(movie => {
          return {...movie , movie:'Movie',type : 'Drama',ids:'18',name:'Drama'}
       })))  
  } ,[])
  useEffect(()=>{
     fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=18&include_adult=false&page=2')
      .then(response => response.json())
      .then(data=> setDramaMoviesTwo(data.results.map(movie => {
         return {...movie , movie:'Movie',type : 'Drama',ids:'18',name:'Drama'}
      })))  
 } ,[])
                //   Drama Series 2 Api
 const [dramaSeries , setDramaSeries] = useState([]) 
 const [dramaSeriesTwo , setDramaSeriesTwo] = useState([]) 
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=18&include_adult=false&page=1')
       .then(response => response.json())
       .then(data=> setDramaSeries(data.results.map(movie => {
          return {...movie ,movie:'tv',type : 'Drama',ids:'18',name:'Drama' ,title :movie.name ,release_date :movie.first_air_date}
       })))  
  } ,[])
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=18&include_adult=false&page=2')
       .then(response => response.json())
       .then(data=> setDramaSeriesTwo(data.results.map(movie => {
          return {...movie , movie:'tv',type : 'Drama',ids:'18',name:'Drama' ,title :movie.name ,release_date :movie.first_air_date}
       })))  
  } ,[])  
  const dramaMovieFull = [...dramaMovies , ...dramaMoviesTwo]
  const dramaSeriesFull = [...dramaSeries , ...dramaSeriesTwo]
      
         // Family 4 API MOVIES And Series
         // Family 2 API MOVIES
   const [familyMovie , setfamilyMovie] = useState([]) 
   const [familyMovieTwo , setfamilyMovieTwo] = useState([])   
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10751&include_adult=false&page=1')
       .then(response => response.json())
       .then(data=> setfamilyMovie(data.results.map(movie => {
          return {...movie , movie:'Movie',type : 'Family',ids:'10751',name:'Fmily'}
       })))  
  } ,[])
  useEffect(()=>{
     fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10751&include_adult=false&page=2')
      .then(response => response.json())
      .then(data=> setfamilyMovieTwo(data.results.map(movie => {
         return {...movie , movie:'Movie',type : 'Family',ids:'10751',name:'Family'}
      })))  
 } ,[])
                //   Drama Series 2 Api
 const [familySeries , setfamilySeries] = useState([]) 
 const [familySeriesTwo , setfamilySeriesTwo] = useState([]) 
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10751&include_adult=false&page=1')
       .then(response => response.json())
       .then(data=> setfamilySeries(data.results.map(movie => {
          return {...movie ,movie:'tv',type : 'Family',ids:'10751',name:'Family' ,title :movie.name ,release_date :movie.first_air_date}
       })))  
  } ,[])
   useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10751&include_adult=false&page=2')
       .then(response => response.json())
       .then(data=> setfamilySeriesTwo(data.results.map(movie => {
          return {...movie , movie:'tv',type : 'Family',ids:'10751',name:'Family',title :movie.name ,release_date :movie.first_air_date}
       })))  
  } ,[])  
  const familyMovieFull = [...familyMovie , ...familyMovieTwo]
  const familySeriesFull = [...familySeries , ...familySeriesTwo]
                      
            // SCIFI E FANTASY $ API
                        // MOVIES
     const [fantasyMovie , setfantasyMovie] = useState([]) 
     const [fantasyMovieTwo , setfantasyMovieTwo] = useState([])   
     useEffect(()=>{
           fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=14&include_adult=false&page=3')
         .then(response => response.json())
         .then(data=> setfantasyMovie(data.results.map(movie => {
               return {...movie , movie:'Movie',type : 'Fantasy',ids:'14',name:'Fantasy'}
      })))  
 } ,[])
    useEffect(()=>{
          fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=878&include_adult=false&page=2')
        .then(response => response.json())
        .then(data=> setfantasyMovieTwo(data.results.map(movie => {
              return {...movie , movie:'Movie',type : 'Fantasy',ids:'14',name:'Fantasy'}
     })))  
} ,[])
    const [fatnasySeries , setFantasySeries] = useState([])
    const [fatnasySeriesTwo , setFantasySeriesTwo] = useState([])
    useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10765&include_adult=false&page=1')
    .then(response => response.json())
    .then(data=> setFantasySeries(data.results.map(movie => {
          return {...movie , movie:'tv',type : 'Fantasy',ids:'14',name:'Fantasy',title :movie.name ,release_date :movie.first_air_date}
 })))  
} ,[])
    useEffect(()=>{
      fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10765&include_adult=false&page=2')
    .then(response => response.json())
    .then(data=> setFantasySeriesTwo(data.results.map(movie => {
          return {...movie , movie:'tv',type : 'Fantasy',ids:'14',name:'Fantasy',title :movie.name ,release_date :movie.first_air_date}
 })))  
} ,[])
const fantasyMoviesFull = [...fantasyMovie,...fantasyMovieTwo]
const fatasySeriesFull = [...fatnasySeries,...fatnasySeriesTwo]
                           
                     //   HISTORY ANDA POLITICS & API
                           // HISTORY MOVIES 2 API
const [historyMovies,setHistoryMovies] = useState([])
const [historyMoviesTwo,setHistoryMoviesTwo] = useState([])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=36&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setHistoryMovies(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'History',ids:'36',name:'History & War'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10752&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setHistoryMoviesTwo(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'History',ids:'36',name:'History & War'}
})))  
} ,[])
const [historySeries,setHistorySeries] = useState([])
const [historySeriesTwo,setHistorySeriesTwo] = useState([])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10768&include_adult=false&page=3')
 .then(response => response.json())
 .then(data=> setHistorySeries(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'History',ids:'36',name:'History & War',title :movie.name ,release_date :movie.first_air_date}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10768&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setHistorySeriesTwo(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'History',ids:'36',name:'History & War',title :movie.name ,release_date :movie.first_air_date}
})))  
} ,[])
       const historyMoviesFull = [...historyMovies,...historyMoviesTwo]
       const historySeriesFull = [...historySeries,...historySeriesTwo]
        
       //  HORROR MOVIES 4API
const [horrorMovies ,setHorrorMovies] = useState([])
const [horrorMoviesTwo ,setHorrorMoviesTwo] = useState([])
const [horrorMoviesThree ,setHorrorMoviesThree] = useState([])
const [horrorMoviesFour ,setHorrorMoviesFour] = useState([])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=27&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setHorrorMovies(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'Horror',ids:'27',name:'Horror'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=27&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setHorrorMoviesTwo(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'Horror',ids:'27',name:'Horror'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=27&include_adult=false&page=3')
 .then(response => response.json())
 .then(data=> setHorrorMoviesThree(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'Horror',ids:'27',name:'Horror'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=27&include_adult=false&page=4')
 .then(response => response.json())
 .then(data=> setHorrorMoviesFour(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'Horror',ids:'27',name:'Horror'}
})))  
} ,[])
const horrorMoviesFull = [...horrorMovies,...horrorMoviesTwo]
const horrorSeriesFull = [...horrorMoviesThree , ...horrorMoviesFour]

               // MUSIC AND NEW & API
                  // Music MOVIES 
const [ musicMovies ,setMusicMovies] = useState([])
const [ musicMoviesTwo ,setMusicMoviesTwo] = useState([])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10402&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setMusicMovies(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'Music',ids:'10402',name:'Music & News'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10402&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setMusicMoviesTwo(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'Music',ids:'10402',name:'Music & News'}
})))  
} ,[])                 
                     // MUSIC SERIES 
const [musicSeries ,setMusicSeries] = useState([])
const [musicSeriesTwo ,setMusicSeriesTwo] = useState([])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10763&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setMusicSeries(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'Music',ids:'10402',name:'Music & News',title :movie.name ,release_date :movie.first_air_date}
})))  
} ,[])               
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10763&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setMusicSeriesTwo(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'Music',ids:'10402',name:'Music & News',title :movie.name ,release_date :movie.first_air_date}
})))  
} ,[])               
const musicMoviesFull = [...musicMovies ,...musicMoviesTwo]
const musicSeriesFull = [...musicSeries , ...musicSeriesTwo]
                       
                  // Mistery MOVIES AND SERIES 4 API
                     //  Mistery Movies 
const [ misteryMovies ,setMisteryMovies] = useState([])
const [ misteryMoviesTwo ,setMisteryMoviesTwo] = useState([])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=9648&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setMisteryMovies(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'Mistery',ids:'9648',name:'Mistery'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=9648&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setMisteryMoviesTwo(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'Mistery',ids:'9648',name:'Mistery'}
})))  
} ,[])
const [misterySeries ,setMisterySeries] = useState([])
const [misterySeriesTwo ,setMisterySeriesTwo] = useState([])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=9648&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setMisterySeries(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'Mistery',ids:'9648',name:'Mistery' ,title :movie.name ,release_date :movie.first_air_date}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=9648&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setMisterySeriesTwo(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'Mistery',ids:'9648',name:'Mistery' ,title :movie.name ,release_date :movie.first_air_date}
})))  
} ,[])
const misteryMoviesFull = [...misteryMovies,...misteryMoviesTwo]
const misterySeriesFull = [...misterySeries,...misterySeriesTwo]
                        
                  // ROMANCE $ API 
const [romance ,setRomance] = useState([])
const [romanceTwo ,setRomanceTwo] = useState([])
const [romanceThree ,setRomanceThree] = useState([])
const [romanceFour ,setRomanceFour] = useState([])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10749&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setRomance(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'Romance',ids:'10749',name:'Romance'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10749&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setRomanceTwo(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'Romance',ids:'10749',name:'Romance'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10766&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setRomanceThree(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'Romance',ids:'10749',name:'Romance' ,title :movie.name ,release_date :movie.first_air_date}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10766&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setRomanceFour(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'Romance',ids:'10749',name:'Romance' ,title :movie.name ,release_date :movie.first_air_date}
})))  
} ,[])
const romanceMoviesFull = [...romance,...romanceTwo]
const romanceSeriesFull = [...romanceThree,romanceFour]

            //  TVMOVIES 4 API
const [tvMovies , setTvMovie] = useState([]) 
const [tvMoviesTwo , setTvMovieTwo] = useState([]) 
const [tvMoviesThree , setTvMovieThree] = useState([]) 
const [tvMoviesFour , setTvMovieFour] = useState([]) 
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10770&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setTvMovie(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'TvMovie',ids:'10770',name:'TvMovie'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10770&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setTvMovieTwo(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'TvMovie',ids:'10770',name:'TvMovie'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10764&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setTvMovieThree(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'TvMovie',ids:'10770',name:'TvMovie',title :movie.name ,release_date :movie.first_air_date}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=10767&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setTvMovieFour(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'TvMovie',ids:'10770',name:'TvMovie',title :movie.name ,release_date :movie.first_air_date}
})))  
} ,[])
const  tvMovieFull = [...tvMovies,...tvMoviesTwo]
const tvSeriesFull = [...tvMoviesThree,tvMoviesFour]
                        
                     //   THRILLER MOVIES 4 API 
const [thriller ,setThriller] = useState([])
const [thrillerTwo ,setThrillerTwo] = useState([])
const [thrillerThree ,setThrillerThree] = useState([])
const [thrillerFour ,setThrillerFour] = useState([])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=53&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setThriller(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'Thriller',ids:'53',name:'Thriller'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=53&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setThrillerTwo(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'Thriller',ids:'53',name:'Thriller'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=53&include_adult=false&page=3')
 .then(response => response.json())
 .then(data=> setThrillerThree(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'Thriller',ids:'53',name:'Thriller'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=53&include_adult=false&page=4')
 .then(response => response.json())
 .then(data=> setThrillerFour(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'Thriller',ids:'53',name:'Thriller'}
})))  
} ,[])
const thrillerMoviesFull = [...thriller ,...thrillerTwo]
const thrillerSeriesFull = [...thrillerThree , ...thrillerFour]
                         
                        //  WESTERN  4 API 
const [western , setWestern] = useState([])
const [westernTwo , setWesternTwo] = useState([])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=37&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setWestern(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'Western',ids:'37',name:'Western'}
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/movie?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=37&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setWesternTwo(data.results.map(movie => {
       return {...movie , movie:'Movie',type : 'Western',ids:'37',name:'Western'}
})))  
} ,[])
const [westernSeries ,setWesternSeries] = useState([])
const [westernSeriesTwo ,setWesternSeriesTwo] = useState([])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=37&include_adult=false&page=1')
 .then(response => response.json())
 .then(data=> setWesternSeries(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'Western',ids:'37',name:'Western',title :movie.name ,release_date :movie.first_air_date }
})))  
} ,[])
useEffect(()=>{
   fetch('https://api.themoviedb.org/3/discover/tv?api_key=efc42faadb8a20858df7818520bb9d80&language=en-US&with_genres=37&include_adult=false&page=2')
 .then(response => response.json())
 .then(data=> setWesternSeriesTwo(data.results.map(movie => {
       return {...movie , movie:'tv',type : 'Western',ids:'37',name:'Western',title :movie.name ,release_date :movie.first_air_date }
})))  
} ,[])
const westerMoviesFull = [...western ,...westernTwo]
const westernSeriesFull = [...westernSeries,...westernSeriesTwo]

               //   Function cart and wishMovie list
    function addTowishMovie(itemCart){
      setwishMovie(movie=> [...movie, itemCart])
    }
    function removeTowishMovie(id){
      setwishMovie(movie => movie.filter(mov=> mov.id !== id))
    }
    
    function addToCart(itemCart){
       setCartMovie(movie => [...movie , itemCart])
    }
    function removeToCart(id){
        setCartMovie(movie => movie.filter(leave => leave.id !== id))
    }
    function emptyCart(){
      setCartMovie([])
    }
   
   
    const categoriesArray = [
      {value:'TopRated' ,name : 'Top Rated'  ,ids:'150' ,id:150, film : topRatedMovie ,series:seriesTopRated },
      {value:'ActionAdventure',name:'Action & Adventure',ids:'28',id:28 , film : ActionMovieFull , series: ActionSeriesFull},
      {value : 'Animation' ,name : 'Animation' ,ids:'16', id:16 , film : AnimationMovieFull , series : AnimationSeriesFull},
      {value:'Comedy' , name: 'Comedy' , id:35 ,ids:'35', film : comedyMovieFull , series : comedySeriesAll},
      {value:'Crime' , name:'Crime' ,  ids:'80',  id:80 , film : crimeMoviesFull ,series : crimeSeriesFull},
      {value:'Documentary' , name:'Documentary',ids:'99', id:99 ,film : documentaryMoviesFull , series : documentarySeriesFull},
      {value : 'Drama' , name:'Drama' , ids:'18',id:18 , film: dramaMovieFull ,          series : dramaSeriesFull},
      {value:'Family' , name :'Family' , ids:'10751' ,id:10751 , film:familyMovieFull,series : familySeriesFull},
      {value: 'Fantasy', name:'SciFi & Fantasy', ids:'14',id:14,film:fantasyMoviesFull , series:fatasySeriesFull},
      {value:'History' , name:'History & War' ,ids:'36' , id:36 , film:historyMoviesFull , series:historySeriesFull},
      {value:'Horror' , name:'Horror' ,ids:'27' , id:27,film:horrorMoviesFull,series:horrorSeriesFull},
      {value : 'Music' , name:'Music & News' , ids:'10402' ,id:10402,film:musicMoviesFull ,series:musicSeriesFull},
      {value : 'Mistery' ,name:'Mistery' , ids:'9648',id:9648,film :misteryMoviesFull ,series:misterySeriesFull },
      {value:'Romance' , name:'Romance' ,ids:'10749' , id:10749 , film : romanceMoviesFull, series:romanceSeriesFull},
      {value:'TvMovie' , name:'TvMovie' , ids:'10770' , id:10770 , film : tvMovieFull, series :tvSeriesFull},
      {value : 'Thriller' , name : 'Thriller' , ids:'53',id:53, film :thrillerMoviesFull , series :thrillerSeriesFull},
      {value:'Western' , name:'Western' , ids:'37' , id:37,film:westerMoviesFull,series:westernSeriesFull}
      
  ]  
 
  
  
    const totalArray = [...topRatedMovie,...ActionMovieFull , ...AnimationMovieFull ,...comedyMovieFull , ...crimeMoviesFull,
                        ...documentaryMoviesFull,...dramaMovieFull ,...familyMovieFull,...fantasyMoviesFull,...historyMoviesFull ,
                         ...horrorMoviesFull ,...musicMoviesFull,...misteryMoviesFull,...romanceMoviesFull,...tvMovieFull,...thrillerMoviesFull,...westerMoviesFull]

    const seriesArray = [...seriesTopRated , ...ActionSeriesFull,...AnimationSeriesFull ,...comedySeriesAll , ...crimeSeriesFull,
                         ...documentarySeriesFull , ...dramaSeriesFull,...familySeriesFull,...fatasySeriesFull,...historySeriesFull ,
                        ...horrorSeriesFull ,...musicSeriesFull,...misterySeriesFull,...romanceSeriesFull,...tvSeriesFull,...thrillerSeriesFull,...westernSeriesFull]

    const finalArrayMoviesAndSeries =  [...totalArray , ...seriesArray ]
                                                     
                                       //   USERS LOGIN 
                                       const [users , setUsers] = useState([{
                                          username : 'Bob' ,
                                          email : 'bob@gmail.com',
                                          password : 'a234'
                                      }])
                                      const [userActive , setUserActive] = useState('')                              
                               

    return (                                      
                                              //  API Movies
       <Context.Provider value={{ categoriesArray,popular,fullPopular,finalArrayMoviesAndSeries, seriesArray,topRatedMovie,
                                                  //  FUNCTION E ARRAY CART WISH
                                 wishMovie ,CartMovie  ,totalArray ,
                                 addToCart , removeToCart  , emptyCart , addTowishMovie , removeTowishMovie,
                                                //  USERS LOGIN 
                                 users,setUsers,userActive , setUserActive } }>
         {children}
       </Context.Provider>
   )
}

export { ContextProvider , Context}