import React from "react";
import {Link} from 'react-router-dom';
import "./style.css"

const NavBar = (props) => {
  return (
    <div className='NavBar'>
      <Link to="/" >Home</Link>
      {props.profile.isLoggedIn?<Link to="/profile" >My Page</Link>:
      <Link to="/signup" >Sign Up</Link>}
      {props.profile.isLoggedIn?<p>welcome, {props.profile.name}</p>:(<form onSubmit={props.formSubmit}>
        <input
          onChange={props.inputChange}
          value={props.loginFormState.email}
          type="text"
          name="email"
          placeholder="email"
        ></input>
        <input
          onChange={props.inputChange}
          value={props.loginFormState.password}
          type="password"
          name="password"
        ></input>
        <input type="submit" value="login"></input>
      </form>)}
    </div>
  );
};

export default NavBar;
