import React, {useContext, useEffect, useMemo, useState} from 'react';
import Footer from "../Footer";
import DepotOverview from "../UserBackend/DepotOverview";
import Updates from "../UserBackend/Updates";
import {Context} from "../UserContext";
import Searchline from "../UserBackend/Searchline";
import {SymbolCloud} from "../SymbolCloud";
import {TickerCloud} from "../TickerCloud";
import './UserBackend.css';


/*Check if session was startet, else -> PLEASE LOGIN!!*/
function UserBackend() {

        const news = useContext(Context);
        const [watchlist, setWatchlist] = useState([])
        const WatchlistMemo = useMemo(()=> ({watchlist, setWatchlist}),[watchlist, setWatchlist]);

    return (
        < >
            <div className={'UserBackend'}>
            <Searchline Winteract={WatchlistMemo}  />
            <DepotOverview Winteract={WatchlistMemo}  />
            <Updates news={news} />
            <Footer />
            </div>
        </>
    );
}

export default UserBackend;