import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Login } from './components/mainComponents/Login'
import { Register } from './components/mainComponents/Register'
import { PrivateRoutes } from './utils/privateRoutes'
import Home from './Home'
import { AuthProvider } from './utils/authContext'
import GeolocationComponent from './components/mainComponents/Map'


export default function App(){
  return(
    <>
      <Router>

      <AuthProvider>
        <Routes>
        
                  <Route path='/login' element={<Login/>} />
                  <Route path='/register' element={<Register/>} />
                  <Route path='/maps' element={<GeolocationComponent/>}/>
            <Route element={<PrivateRoutes/>}>
                    <Route path='/' element={<Home/>}></Route>
            </Route>
              
        </Routes>
      </AuthProvider>
        
      </Router>


    </>
  )
}
