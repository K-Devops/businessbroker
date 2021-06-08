import React, {useContext, useEffect, useState} from 'react';
import './DepotOverview.css';
import axios from "axios";
import {UserCloud} from "../UserCloud";
import {SymbolTransfer} from "../SymbolTransfer";


function DepotOverview({Winteract}) {

    const {watchlist, setWatchlist} = Winteract;
    const {users, setUsers}= useContext(UserCloud);
    const request = require('request');
    const [StockList, setStockList] = useState([])
    const [Stockvalues, setStockValues] = useState([])
    const {symbols, setsymbols} = useContext(SymbolTransfer)
    var i = 0 ;



    useEffect(()=>{

        console.log('Ich führe es nun aus')
        //Get complete watchlist
        axios.get('http://localhost:8080/investmentService/users/'+users.id+'/watchlist')
            .then(response => response.data)
            .then(data => setWatchlist(data))

        for (i; i < watchlist.length; i++);
    }, [])

    useEffect(()=>{
    console.log(watchlist)

            watchlist.map((listitem, i) => {
                    request('https://finnhub.io/api/v1/quote?symbol=' + listitem + '&token=' + process.env.REACT_APP_WEATHER_API_KEY, {json: true}, (err, res, body) => {
                        if (err) {
                            return console.log(err);
                        }
                        body[0] = listitem
                        setStockList([ body,...StockList])
                        });

                })
        console.log(StockList)

    }, [i])




    const onClickhandler = (key) =>{
        const temp =[...watchlist];
        temp.splice(key, 1);
        setWatchlist(temp);

        axios.delete('http://localhost:8080/investmentService/users/'+users.id+'/watchlist/'+key)
            .then(response => response.data)
            .then(data => console.log(data)
            )

    }

    return (

        <div className="container">
            <div className="row">
                <div className="col-8">
                    <label htmlFor={"depot"}><b>Depot ID:</b></label>
                <div className="depot">

                </div>
                </div>

                <div className="col-4" style={{height:'650px', overflowY:'scroll', padding:'2%'}}>
                    <label htmlFor={"watchlist"}><b>Watchlist</b></label>
                    <div className="list-group watch">
                        {StockList.map((value,i)=>
                            <a key={i} id={i}
                               className="list-group-item list-group-item-action flex-column align-items-start ">
                                <div className="d-flex w-100 justify-content-between">
                                    <p className="mb-1"><b>{value[0]} </b></p>
                                    <small>{i}</small>
                                </div><small>  <p>
                                Tageshoch: {value.h} $ Tagestief:{value.l} $ Aktueller Preis: {value.c} $ </p></small>
                                <small>
                                    <button className={"btn btn-sm btn-light"} onClick={event => onClickhandler(value[0])}> entfernen</button>
                                </small>

                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DepotOverview;