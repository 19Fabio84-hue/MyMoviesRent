import React , { useState } from 'react'
import Header from '../componentChild/header'
import PrimarySlideMovies from '../slide/primaryMovies';
import PrimarySlideSeries from '../slide/primarySeries';
import SlideSecondaryMovies from '../slide/secondaryMovies';
import SlideSecondarySeries from '../slide/secondarySlideSeries';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/TopRated.css'
import '../style/slideStyle.css'

import '../style/header.css'


function Home(){   
    const [series ,setSeries] = useState(false)  
    function setMovie(){ setSeries(false)  }
    function setTv(){   setSeries(true)  }    
    return(
        <div className='home-ctn'>
        <Header movies={setMovie} series={setTv} value={series} />
        {series ? <PrimarySlideSeries /> : <PrimarySlideMovies />}
        {series ? <SlideSecondarySeries/>:  <SlideSecondaryMovies />}
        </div>
    )
}
export default Home