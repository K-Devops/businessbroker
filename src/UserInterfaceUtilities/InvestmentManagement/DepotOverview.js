import React, {useContext, useEffect, useState} from 'react';
import './DepotOverview.css';
import axios from "axios";
import {UserCloud} from "../UserCloud";
import Watchlist from "./Watchlist";
import Depot from "./Depot";


function DepotOverview({WatchListItems}) {

    //States
    const {watchlist, setWatchlist} = WatchListItems;

    //Contextelements
    const {users, setUsers}= useContext(UserCloud);

    useEffect(()=>{
        axios.get('http://localhost:8080/investmentService/users/'+users.id+'/watchlist')
            .then(response => response.data)
            .then(data => setWatchlist(data.watchlist))

    }, [])

    const onClickhandler = (key) =>{
        setWatchlist(watchlist.filter(item => item != key));
        axios.delete('http://localhost:8080/investmentService/users/'+users.id+'/watchlist/'+key)
            .then(response => response.data)
            .then(data => console.log(data)
            )
    }

    return (
        <div className="container">
            <div className="row">
                <Depot/>
                <Watchlist watchlist={watchlist} onClickhandler={onClickhandler}/>
            </div>
        </div>
    );
}

export default DepotOverview;