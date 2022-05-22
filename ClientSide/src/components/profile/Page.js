import React, {useState, useEffect } from 'react';
import { Grid,TextField,Paper,Button, Typography } from '@mui/material';
import './Page.css';
import axios from 'axios';
const Page = ({user}) => {

  const [userImage,setUserImage] = useState("");
  const [uploadedImage,setUploadedImage] = useState({})
  const [email,setEmail] = useState("")
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [username,setUserName] = useState("")
  const [password,setPassword] = useState("")

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

  useEffect(()=>{
    axios.post()
  },[])

  const handleImageUpload = (e) =>{
     let file = new FormData()
     file.append('file',e.target.files[0])
    // file.append(e.target.files[0].name,e.target.files[0])
    console.log(e.target.files[0])
    setUploadedImage(file)
  }

   async function postImage (file){
    await fetch(`http://localhost:4000/users/imageupload/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
      body:file,
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
    console.log(uploadedImage)
    postImage(uploadedImage)
    window.location.reload()
  }

  const handleChangeFLE = (e,item) =>{
    if(item === 'Update email'){
      console.log(email)
      setEmail(e.target.value)
    }if(item === 'Update Last Name'){
      console.log(lastName)
      setLastName(e.target.value)
    }if(item === 'Update username'){
      console.log(username)
      setUserName(e.target.value)
    }if(item === 'Update First Name'){
      console.log(firstName)
      setFirstName(e.target.value)
    }if (item === 'Update Password'){
      console.log(password)
      setPassword(e.target.value)
    }
  }

  const handleChangeSubmit = () =>{
    axios.patch("http://localhost:4000/users",
        {
          firstName:firstName,
          username:username,
          lastName:lastName,
          email:email,
          password:password,
      },{
        headers:{
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }
      }
    ).then((value)=>{
      window.location.reload()
    }).catch((error)=>{
      console.log(error)
    })

  }
    return(
        <Paper sx={{
          width:860,
          marginTop:2,
          marginBottom:2,
          boxShadow: "20px 20px 50px 15px grey",
          background:"linear-gradient(rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)"
        }} elevation={24} >
        <Typography variant="h3"  style={{marginTop:"2%",marginLeft:"5%",color:"#0e5687"}}> {user.firstName + " " + user.lastName}</Typography>
        <Typography variant="h6"  style={{marginTop:"2%",marginLeft:"5%",color:"#0e5687"}}> {"Your Email: " + user.email}</Typography>
        <div className="mb-1" style={{marginLeft:"5.5%",marginTop:"2%"}}>
             <span className="font-css top"><img width={200} src={userImage}/></span>
            <div className="">
                <input type="file" id="file-input" name="ImageStyle" onChange={handleImageUpload}/>
            </div>
            <div>
              <Button sx={{
                bgcolor:"#0e5687",
                color:"white",
                marginTop:"2%",
                "&:hover.MuiButton-root":{
                  bgcolor:"white",
                  color:"#0e5687",
                  marginTop:"2%",
                }
              }}
              onClick={updateImage}>Save your Image</Button>
            </div>
        </div>
        <div className='editpageContainer1'>

            {['Update First Name','Update Last Name','Update username'].map((item) =>(
            <div className='editpageItem1'>
                <TextField  
                  label={item} 
                  type="string" 
                  variant="standard"
                  onChange={(e)=> handleChangeFLE(e,item)}
                />
            </div>
          )) }
          </div>
        <div className='editpageContainer2'>
            {['Update email','Update Password'].map((item) =>(
              <div className='editpageItem2'>
                  <TextField 
                   variant="standard"
                   label={item} 
                   type={(item === 'Update email')? 'string': 'password'}
                   onChange={(e)=> handleChangeFLE(e,item)}
                    />
              </div>
            ))}
          <div>
        <Button 
          sx={{
            bgcolor:"#0e5687",
            color:"white",
            marginTop:"2%",
            "&:hover.MuiButton-root":{
              bgcolor:"white",
              color:"#0e5687",
              marginTop:"2%",
            }
          }}
          onClick={handleChangeSubmit}
          > Save Your changes </Button></div>
        </div>
        
      </Paper>
    )
}

export default Page