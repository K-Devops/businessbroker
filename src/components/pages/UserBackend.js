import React, {useContext, useEffect, useMemo, useState} from 'react';
import Footer from "../Footer";
import DepotOverview from "../UserBackend/DepotOverview";
import Updates from "../UserBackend/Updates";
import {Context} from "../UserContext";
import Searchline from "../UserBackend/Searchline";
import {SymbolCloud} from "../SymbolCloud";
import {TickerCloud} from "../TickerCloud";



/*Check if session was startet, else -> PLEASE LOGIN!!*/
function UserBackend() {
        const {Tickers, setTickers} = useState(TickerCloud)
        const {symbols, setsymbols} = useContext(SymbolCloud)
        const news = useContext(Context);
        const [watchlist, setWatchlist] = useState([])
        const WatchlistMemo = useMemo(()=> ({watchlist, setWatchlist}),[watchlist, setWatchlist]);




    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        //Sockets
        const socket = new WebSocket('wss://ws.finnhub.io?token='+ process.env.REACT_APP_API_KEY);

        // Connection opened -> Subscribe
        socket.addEventListener('open', function (event) {
           /* watchlist.map((listitem,i)=>
                socket.send(JSON.stringify({'type':'subscribe', 'symbol': listitem})))*/
        });

        // Listen for messages
        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });

        // Unsubscribe
        var unsubscribe = function(symbol) {
            socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
        }

    },[]);



    return (
        < >
            <Searchline Winteract={WatchlistMemo}  />
            <DepotOverview Winteract={WatchlistMemo}  />
            <Updates news={news} />
            <Footer />
        </>
    );
}

export default UserBackend;