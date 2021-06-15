import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import Navbar from './GlobalComponents/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./GlobalComponents/MainPages/Home";
import Dashboard from "./GlobalComponents/MainPages/Dashboard";
import AGB from "./GlobalComponents/MainPages/AGB"
import Impressum from "./GlobalComponents/MainPages/Impressum";
import {Context} from "./GlobalComponents/UserContext";
import Moment from 'moment';
import {SymbolCloud} from "./GlobalComponents/SymbolCloud";
import {UserCloud} from "./GlobalComponents/UserCloud";
import Profil from "./GlobalComponents/MainPages/Profil";

function App() {

    //API Connection zu Finnhub als Listener
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.REACT_APP_API_KEY ;// Replace this
    const finnhubClient = new finnhub.DefaultApi()


    //States
    const [users, setUsers] = useState(  [])
    const [StockNews, setStocknews] = useState(  [])
    const [symbols, setsymbols] = useState(null)
    const [Tickers, setTickers] = useState([])

    //Memos
    const symbolvalue = useMemo(()=> ({symbols, setsymbols}),[symbols, setsymbols]);
    const Tickervalues = useMemo(()=>({Tickers, setTickers}),[Tickers, setTickers]);
    const UserManagement = useMemo(()=>({users, setUsers}),[users, setUsers])

    useEffect(()=>{

        var Today = Moment().format('YYYY-MM-DD')
        var Yesterday = Moment(new Date()).subtract(3, "months").format('YYYY-MM-DD')

        // Allgemeine Nachrichten
        finnhubClient.generalNews("general", {}, (error, data, response) => {
            setStocknews(data)
        });

    }, [])

  return (
    <>
    <Router>
        <UserCloud.Provider value={UserManagement}>
        <Context.Provider value={StockNews}>
         <Navbar/>
         <Switch>
             <Route path='/' exact component={Home} />
             <SymbolCloud.Provider value={symbolvalue}>
                 <Route path='/Profil' exact component={Profil}/>
                 <Route path='/Dashboard' exact component={Dashboard} />
                 <Route path='/AGB' exact component={AGB}/>
                 <Route path='/Impressum' exact component={Impressum}/>
             </SymbolCloud.Provider>
         </Switch>
        </Context.Provider>
        </UserCloud.Provider>
    </Router>
    </>
  );
}

export default App;
