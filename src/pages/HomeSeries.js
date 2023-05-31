import React , {useState} from 'react'
import Header from '../componentChild/header'
import PrimarySlideSeries from '../slide/primarySeries';
import SlideSecondarySeries from '../slide/secondarySlideSeries';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/TopRated.css'
import '../style/slideStyle.css'

import '../style/header.css'


function HomeSeries(){   
    const [series ,setSeries] = useState(true)  
    function setMovie(){ setSeries(false)  }
    function setTv(){   setSeries(true)  }  
    return(
        <div className='home-ctn'>
         <Header  movies={setMovie} series={setTv} value={series} />
         <PrimarySlideSeries /> 
         <SlideSecondarySeries/>
        </div>
    )
}
export default HomeSeries