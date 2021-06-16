import React, {useContext, useEffect, useMemo, useState} from 'react';
import Footer from "../Footer";
import DepotOverview from "../DashboardComponents/DepotOverview";
import Updates from "../DashboardComponents/Updates";
import {Context} from "../UserContext";
import Searchline from "../DashboardComponents/Searchline";

function Dashboard() {

        const news = useContext(Context);
        const [watchlist, setWatchlist] = useState([])
        const WatchlistMemo = useMemo(()=> ({watchlist, setWatchlist}),[watchlist, setWatchlist]);

    return (
        <>
            <h1 className={'head'} >Willkommen!</h1>
            <div className={'Dashboard'}>
            <Searchline Winteract={WatchlistMemo}  />
            <DepotOverview Winteract={WatchlistMemo}  />
            <Updates news={news} />
            <Footer />
            </div>
        </>
    );
}

export default Dashboard;