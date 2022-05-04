import React, {useState, useEffect } from 'react';
import { Grid,TextField,Paper,Button, Typography } from '@mui/material';
import './Page.css';
import axios from 'axios';
const Page = () => {

  const [userImage,setUserImage] = useState("");
  const [uploadedImage,setUploadedImage] = useState({})

  async function displayProtectedImage(
    imageUrl, authToken
      ) {
        const response = await fetch(imageUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`, 
          },
      })
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setUserImage(objectUrl);
  }

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      displayProtectedImage(`http://localhost:4000/users/image/`,sessionStorage.getItem('token'))
    }
  },[])

  const handleImageUpload = (e) =>{
    console.log(e.target.files[0])
    setUploadedImage(e.target.files[0])
  }

   async function postImage (file){
    await fetch(`http://localhost:4000/users/imageupload/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
      body:file
      }).then(
        response => response.json() // if the response is a JSON object
      ).then(
        success => console.log(success) // Handle the success response object
      ).catch(
        error => console.log(error) // Handle the error response object
      );
  }
   const  updateImage = (e) =>{
     e.preventDefault();
    //const file = new FormData()
    console.log(uploadedImage)
    // //file.append('image',uploadedImage,uploadedImage.name)
    // axios.post(`http://localhost:4000/users/imageupload/`,uploadedImage,{
    //   headers: {
    //     'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    //    }
    // }).then((res) => {console.log(res)}).catch((error)=>{console.log(error)})
    postImage(uploadedImage)

  }
    return(
        <Paper sx={{width:860,marginTop:2}} elevation={24}>
        <Typography variant="h3"  style={{marginLeft:"5%"}}> Update your Profile</Typography>
        <div className="mb-1" style={{marginLeft:"5.5%",marginTop:"2%"}}>
             <span className="font-css top"><img width={200} src={userImage}/></span>
            <div className="">
                <input type="file" id="file-input" name="ImageStyle" onChange={handleImageUpload}/>
            </div>
            <div>
              <Button onClick={updateImage}>Save your Image</Button>
            </div>
        </div>
        <div className='editpageContainer1'>

            {['Update First Name','Update Last Name',' Update username'].map((item) =>(
            <div className='editpageItem1'>
                <TextField  label={item} type="string" />
            </div>
          )) }
          </div>
        <div className='editpageContainer2'>
            {['Update email','Update Passsword'].map((item) =>(
              <div className='editpageItem2'>
                  <TextField  label={item} type="string" />
              </div>
            ))}
          <div><Button> Save Your changes </Button></div>
        </div>
        
      </Paper>
    )
}

export default Page