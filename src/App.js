import React from 'react'
import { Routes , Route  } from 'react-router-dom'
import Search from './pages/search'
import Home from '../src/pages/home'
import HomeSeries from './pages/HomeSeries'
import Film from './pages/film'
import Series from './pages/series'
import MyListPage from './pages/myListPage'
import CartPages from './pages/cartPages'
import CategoriesPage from './pages/categoriesPages'
import InfoMoviesPage from './pages/infoPages'
import InfoSeriesPage from './pages/infoSeriesDetail'
import Login from './pages/login'
import AuthRequired from './componentChild/authRequired'


export default function App(){  
  return(
          
        <div className='root-ctn'>
           <Routes >
             <Route path='/login' element={<Login />} />
             <Route path='/search' element={ <Search />} />
             <Route path='/' element={ <Home />} />
             <Route path='/tv' element={ <HomeSeries />} />
             <Route path='/film' element={<Film />} />           
             <Route path='/series' element={<Series />} />
             
             <Route element={<AuthRequired />}>
              <Route path='/myList' element={<MyListPage />} />
              <Route path='/cart' element={<CartPages />} />
             </Route>
             
             <Route path='/:id' element={<CategoriesPage />} />
             <Route path='/Movie/:id' element={<InfoMoviesPage />} />
             <Route path='/tv/:id' element={<InfoSeriesPage />}/>
           </Routes>             
        </div>
           
    )
}
