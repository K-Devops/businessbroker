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
import {SymbolTransfer} from "./components/SymbolTransfer";
import {TickerCloud} from "./components/TickerCloud";
import {UserCloud} from "./components/UserCloud";

function App() {

    //API connection to finnhub as Listener
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.REACT_APP_WEATHER_API_KEY ;// Replace this
    const finnhubClient = new finnhub.DefaultApi()

    //States
    const [users, setUsers] = useState(  [{
        id: 1,
        name: 'Tim',
        email: 'email@hfu.de',
        password:'hallo',
    }])
    const [StockNews, setStocknews] = useState(  [])
    const [symbols, setsymbols] = useState(null)
    const [Tickers, setTickers] = useState([])

    //Memos
    const symbolvalue = useMemo(()=> ({symbols, setsymbols}),[symbols, setsymbols]);
    const Tickervalues = useMemo(()=>({Tickers, setTickers}),[Tickers, setTickers]);
    const UserManagement = useMemo(()=>({users, setUsers}),[users, setUsers])

    //Sockets
    const socket = new WebSocket('wss://ws.finnhub.io?token='+ process.env.REACT_APP_WEATHER_API_KEY);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API

        console.log(symbols, 'wird benutzt')

            // Connection opened -> Subscribe
            socket.addEventListener('open', function (event) {
                socket.send(JSON.stringify({'type':'subscribe', 'symbol': symbols}))
            });


    // Listen for messages
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
            setTickers([...Tickers,event.data])
        });

    // Unsubscribe
        var unsubscribe = function(symbol) {
            socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
        }

    },[symbols]);


    useEffect(()=>{

        var Today = Moment().format('YYYY-MM-DD')
        var Yesterday = Moment(new Date()).subtract(3, "months").format('YYYY-MM-DD')
        console.log(Yesterday)

        // General news
        finnhubClient.generalNews("general", {}, (error, data, response) => {
            console.log(data)
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
             <SymbolTransfer.Provider value={symbolvalue}>
             <Route path='/Dashboard' exact component={UserBackend} />
             </SymbolTransfer.Provider>
             <Route path='/AGB' exact component={AGB}/>
             <Route path='/Impressum' exact component={Impressum}/>
         </Switch>
        </Context.Provider>
        </UserCloud.Provider>
    </Router>
    </>
  );
}

export default App;
