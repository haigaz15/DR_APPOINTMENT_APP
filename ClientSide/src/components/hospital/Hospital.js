import React, { useState,useEffect } from 'react';
import NewCard from '../card/NewCard';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
const Hospital = ({data}) => {
     const history = useHistory()
     const [image,setImage] = useState(null)
     const handleOpenHospital = (ob) => {
          history.push(ob)
     }

     const fetchImage = async () => {
          const res = await fetch(`http://localhost:4000/hospital/image/${data.name}`);
          const imageBlob = await res.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          console.log(imageObjectURL)
          setImage(imageObjectURL);
        };

     useEffect(()=>{
          fetchImage();
     },[])
     return( 
      <div style={{width:"450px",marginLeft:"2%",marginTop:"2%",marginBottom:"2%"}}>
       <NewCard data= {data} handleOpenHospital={handleOpenHospital}  image={image}/>
       </div>
     )
}

export default Hospital;