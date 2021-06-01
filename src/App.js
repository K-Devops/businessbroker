import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./components/pages/Home";
import UserBackend from "./components/pages/UserBackend";
import AGB from "./components/pages/AGB"
import Impressum from "./components/pages/Impressum";
import {Context} from "./components/UserContext";
import Moment from 'moment';

function App() {

    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.REACT_APP_WEATHER_API_KEY ;// Replace this
    const finnhubClient = new finnhub.DefaultApi()
    const [StockNews, setStocknews] = useState(  [])
    const [users, setUsers] = useState(  null)
    //const value = useMemo(()=> ({users, setUsers}),[users,setUsers]);



    useEffect(()=>{

        var Today = Moment().format('YYYY-MM-DD')

        // General news
        finnhubClient.generalNews("general", {}, (error, data, response) => {
            console.log(data)
        });

        //Company News
        finnhubClient.companyNews("AAPL", "2021-05-20", Today, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log(data)
                setStocknews(data)

            }
        });
    }, []) // <-- empty dependency array

  return (
    <>
    <Router>
        <Context.Provider value={StockNews}>
         <Navbar/>
         <Switch>
             <Route path='/' exact component={Home} />
             <Route path='/Dashboard' exact component={UserBackend} />
             <Route path='/AGB' exact component={AGB}/>
             <Route path='/Impressum' exact component={Impressum}/>
         </Switch>
        </Context.Provider>
    </Router>
    </>
  );
}

export default App;
