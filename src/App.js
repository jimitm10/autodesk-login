import React, {useState} from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const [state, setState] = useState({
    showToast: false
  })

  function handleChange({ target }) {
    setUser({
      ...user,
      [target.name]: target.value
    });
  }
  function showToast(createdUsername) {
    setUser({
      ...user,
      username: createdUsername,
      password: ""
    });
    setState({
      ...state,
      showToast: true
    })
    setTimeout(() => {
      setState({
        ...state,
        showToast: false
      })
    }, 5000)
  }
  return (
    <div className="app">
      <div className="main">
        {state.showToast && (
        <div className="alert alert-primary" role="alert">
            Account created successfully
        </div>)}
        <Switch>
          <Route path="/login" render={(props) => <Login {...props} user={user} handleChange={handleChange}/>} />
          <Route path="/register" render={(props) => <Register {...props} showToast={showToast}/>}/>
          <Redirect from="/" exact to="login" />
          <Route path="/Home" render={(props) => <Home {...props} user={user}/>}/>
        </Switch>
      </div>
      <div className="footer">
        <div className="footer-inner-div">
        Your account for everything Autodesk
        <a className="nav-link active" href="/">Learn more</a>
        </div>
      </div>
    </div>
  );
}

export default App;
