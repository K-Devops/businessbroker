import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import Navbar from './UserInterfaceUtilities/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./UserInterfaceUtilities/MainPages/Home";
import Dashboard from "./UserInterfaceUtilities/InvestmentManagement/Dashboard";
import AGB from "./UserInterfaceUtilities/MainPages/AGB"
import Impressum from "./UserInterfaceUtilities/MainPages/Impressum";
import {Context} from "./UserInterfaceUtilities/UserContext";
import {SymbolCloud} from "./UserInterfaceUtilities/SymbolCloud";
import {UserCloud} from "./UserInterfaceUtilities/UserCloud";
import Profil from "./UserInterfaceUtilities/UserAuthentification/Profil";

function App() {

    //API Connection zu Finnhub als Listener
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.REACT_APP_API_KEY ;
    const finnhubClient = new finnhub.DefaultApi()

    //States
    const [users, setUsers] = useState(  [])
    const [StockNews, setStocknews] = useState(  [])
    const [symbols, setsymbols] = useState(null)

    //Memos
    const symbolvalue = useMemo(()=> ({symbols, setsymbols}),[symbols, setsymbols]);
    const UserManagement = useMemo(()=>({users, setUsers}),[users, setUsers])

    useEffect(()=>{
        // General news
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
