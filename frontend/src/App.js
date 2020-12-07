import React,{ useState,useEffect } from 'react';
import { BrowserRouter , Route ,Switch} from 'react-router-dom';
import Axios from "axios";
import BuyPets from './components/Buy/Buy';
import Home from './components/Home/Homepage';
import LoginPage from './components/Login/Login';
import SignUpPage from './components/SignUp/SignUp';
import DonatePage from './components/Donate/Donatepage';
import UserContext from './context/UserContext';
import AdoptPage from "./components/Adopt/Adopt";
import DashboardPage from './components/Dashboard/Dashboard';

function App() {
  const [userData,setUserData] =useState({
    token: undefined,
    user:undefined
  });

  useEffect(() => {
      const checkLoggedIn = async () => {
        let token = localStorage.getItem("auth-token");
        if(token === null){
          localStorage.setItem("auth-token","");
          token = "";
        }
        const tokenRes  = await Axios.post(
          "http://localhost:5000/users/tokenisValid" , null,
          { headers: { "x-auth-token": token}}
        );
        if(tokenRes.data){
          const userRes = await Axios.get(
            "http://localhost:5000/users/",
            {headers: {"x-auth-token": token} }
          );
          setUserData({
            token,
            user: userRes.data
          });
        }
      }
      checkLoggedIn();
  }, []);
  if(userData.user){
    return(
      <BrowserRouter>
      <UserContext.Provider value={{userData , setUserData}}>
      <div className="App">
        <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/buy" component={BuyPets} />
      <Route exact path="/donate" component={DonatePage} />
      <Route exact path="/adopt" component={AdoptPage} />
      <Route exact path="/dashboard" component={DashboardPage}/>

      </Switch>
      </div>
      </UserContext.Provider>
      </BrowserRouter>
      );}
    else {
      return(
        <BrowserRouter>
        <UserContext.Provider value={{userData , setUserData}}>
        <div className="App">
          <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/buy" component={BuyPets} />
        <Route exact path="/donate" component={LoginPage} />
        <Route exact path="/adopt" component={LoginPage} />
        <Route exact path="/dashboard" component={LoginPage}/>
  
        </Switch>
        </div>
        </UserContext.Provider>
        </BrowserRouter>
      );}
}

export default App;