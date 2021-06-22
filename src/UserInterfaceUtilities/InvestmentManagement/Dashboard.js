import React, {useContext, useEffect, useMemo, useState} from 'react';
import Footer from "../Footer";
import DepotOverview from "./DepotOverview";
import Updates from "./Updates";
import {Context} from "../UserContext";
import Searchline from "./Searchline";

// Prüfe ob eine Session gestartet wurde, wenn nicht -> Bitte einloggen

function Dashboard() {

        const news = useContext(Context);
        const [watchlist, setWatchlist] = useState([])
        const WatchlistMemo = useMemo(()=> ({watchlist, setWatchlist}),[watchlist, setWatchlist]);

    return (
        <>
            <h1>Willkommen!</h1>
            <Searchline Winteract={WatchlistMemo}  />
            <DepotOverview Winteract={WatchlistMemo}  />
            <Updates news={news} />
            <Footer />
        </>
    );
}

export default Dashboard;