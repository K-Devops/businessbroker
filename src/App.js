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
import {SymbolCloud} from "./components/SymbolCloud";
import {TickerCloud} from "./components/TickerCloud";
import {UserCloud} from "./components/UserCloud";

function App() {

    //API connection to finnhub as Listener
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.REACT_APP_WEATHER_API_KEY ;// Replace this
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

        // General news
        finnhubClient.generalNews("general", {}, (error, data, response) => {
            setStocknews(data)
        });

    }, []) // <-- empty dependency array

  return (
    <>
    <Router>
        <UserCloud.Provider value={UserManagement}>
        <Context.Provider value={StockNews}>
            <TickerCloud.Provider value={Tickervalues}>
         <Navbar/>
            </TickerCloud.Provider>
         <Switch>
             <Route path='/' exact component={Home} />
             <SymbolCloud.Provider value={symbolvalue}>
             <Route path='/Dashboard' exact component={UserBackend} />
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
