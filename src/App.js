import React, {useState, useEffect} from 'react';
import API from './utils/API'

function App() {
  const [loginFormState, setloginFormState] = useState({
    email:'',
    password:''
  })

  const [profileState,setProfileState]=useState({
    name:'',
    email:"",
    tanks:[],
    isLoggedIn:false
  })

  useEffect(()=>{
    const token = localStorage.getItem("token");
    API.getProfile(token).then(profileData=>{
      if(profileData){
        setProfileState({
          name:profileData.name,
          email:profileData.email,
          tanks:profileData.Tanks,
          isLoggedIn:true
        })
      }
    })
  },[])

  const inputChange = event =>{
    const {name,value}=event.target;
    setloginFormState({
      ...loginFormState,
      [name]:value
    })
  }

  const formSubmit = event=>{
    event.preventDefault();
    API.login(loginFormState).then(newToken=>{
      localStorage.setItem("token",newToken.token)
      API.getProfile(newToken.token).then(profileData=>{
        setProfileState({
          name:profileData.name,
          email:profileData.email,
          tanks:profileData.Tanks,
          isLoggedIn:true
        })
      })
    })
  }

  return (
    <div className="App">
      <form onSubmit={formSubmit}>
        <input onChange = {inputChange} value={loginFormState.email} type='text' name='email' placeholder='email'></input>
        <input onChange = {inputChange} value={loginFormState.password} type='password' name='password'></input>
        <input type='submit' value='login'></input>
      </form>
      {profileState.isLoggedIn?profileState.tanks.map(tankObj=><p>{tankObj.name}</p>):<h1>Log in to see your tanks</h1>}
    </div>
  );
}

export default App;