import React, {useContext, useEffect, useMemo, useState} from 'react';
import Footer from "../Footer";
import DepotOverview from "./DepotOverview";
import Updates from "./Updates";
import {Context} from "../UserContext";
import Searchline from "./Searchline";


function Dashboard() {

        const news = useContext(Context);
        const [watchlist, setWatchlist] = useState([])
        const WatchlistMemo = useMemo(()=> ({watchlist, setWatchlist}),[watchlist, setWatchlist]);

    return (
        <>
            <Searchline WatchListItems={WatchlistMemo}  />
            <DepotOverview WatchListItems={WatchlistMemo}  />
            <Updates news={news} />
            <Footer />
        </>
    );
}

export default Dashboard;