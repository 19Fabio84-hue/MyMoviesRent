import React from 'react'
import { Link } from 'react-router-dom'
// import { useSearchParams } from 'react-router-dom'
import '../style/categories.css'
export default function Categories(props){    
  return(
 
     <div className='categories-flex'>
     <Link key={props.id} to={`/${props.id}`}>
                     <div  className={`categories-ctn ${props.value}`}>
                       <h1 className='title-categories'>{props.name}</h1>
                      </div>                
                   </Link>    
     </div>

     
    
    )
}