import React from 'react';
import {Route,Redirect} from 'react-router-dom' 

const ProtectedRoute = ({component: Component,...rest}) =>{ 
    return (
        <Route {...rest} render={
            (props) =>{
                if(sessionStorage.getItem('token')){
                    return <Component {...props}/>
                }else{
                    return <Redirect to={{pathname:"/", }}/>
                }
            }
        } />
    )
}

export default ProtectedRoute