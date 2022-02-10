import React, { useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = () => {
        axios.post("http://localhost:4000/users",{
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        }).then(response => console.log(response)).catch(error => console.log(error))
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }
    return(
    <div class="signup-form">
    <form action="/examples/actions/confirmation.php" method="post">
		<h2>Sign Up</h2>
		<p>Please fill in this form to create an account!</p>
		<hr/>
        <div class="form-group">
			<div class="row">
				<div class="col"><input type="text" value={firstName} class="form-control" name="first_name" placeholder="First Name" required="required" onChange={(e) => setFirstName(e.target.value)}/></div>
				<div class="col"><input type="text" value={lastName} class="form-control" name="last_name" placeholder="Last Name" required="required" onChange={(e) => setLastName(e.target.value)}/></div>
			</div>        	
        </div>
        <div class="form-group">
        	<input type="email" value={email} class="form-control" name="email" placeholder="Email" required="required" onChange={(e) => setEmail(e.target.value)}/>
        </div>
		<div class="form-group">
            <input type="password" value={password} class="form-control" name="password" placeholder="Password" required="required" onChange={(e) => setPassword(e.target.value)}/>
        </div>
		<div class="form-group">
            <button  class="btn btn-primary btn-lg"  onClick={handleSubmit}>Sign Up</button>
        </div>
    </form>
	<div class="hint-text">Already have an account? <Link to='/login'>Login here</Link></div>
</div>
  )
}


export default SignUp