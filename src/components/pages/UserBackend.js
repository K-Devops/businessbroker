import React, {useContext, useEffect, useMemo, useState} from 'react';
import Footer from "../Footer";
import Watchlist from "../UserBackend/Watchlist";
import Updates from "../UserBackend/Updates";
import {Context} from "../UserContext";
import Searchline from "../UserBackend/Searchline";


/*Check if session was startet, else -> PLEASE LOGIN!!*/
function UserBackend() {
        const news = useContext(Context);
        const [watchlist, setWatchlist] = useState([])
        const WatchlistMemo = useMemo(()=> ({watchlist, setWatchlist}),[watchlist, setWatchlist]);

    return (
        <>
            <Searchline Winteract={WatchlistMemo} />
            <Watchlist Winteract={WatchlistMemo} />
            <Updates news={news} />
            <Footer />
        </>
    );
}

export default UserBackend;