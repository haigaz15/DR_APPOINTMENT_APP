import React, { useState } from 'react';
import NewCard from '../card/NewCard';
import { Link,useHistory } from 'react-router-dom';

const Hospital = ({data,hosptialRouteHandler}) => {
     const history = useHistory()

     const handleOpenHospital = (ob) => {
          history.push(ob)
     }
     return( 
      <div style={{width:"450px",marginLeft:"2%",marginTop:"2%"}}>
       <NewCard data= {data} handleOpenHospital={handleOpenHospital} hosptialRouteHandler={hosptialRouteHandler}/>
       </div>
     )
}

export default Hospital;