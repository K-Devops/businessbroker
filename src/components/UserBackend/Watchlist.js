import React, {useContext, useEffect, useState} from 'react';
import './Watchlist.css';
import axios from "axios";
import {UserCloud} from "../UserCloud";
import {SymbolTransfer} from "../SymbolTransfer";
import {array} from "prop-types";

function Watchlist({Winteract}) {

    const {watchlist, setWatchlist} = Winteract;
    const {users, setUsers}= useContext(UserCloud);
    const request = require('request');
    const [StockList, setStockList] = useState([])
    const [Stockvalues, setStockValues] = useState([])
    const {symbols, setsymbols} = useContext(SymbolTransfer)




    useEffect(()=>{

        console.log('Ich führe es nun aus')
        //Get complete watchlist
        axios.get('http://localhost:8080/investmentService/users/'+963+'/watchlist')
            .then(response => response.data)
            .then(data => setWatchlist(data))



    }, [])


    useEffect(()=>{

        { watchlist.map((listitem, i)=>{
            request('https://finnhub.io/api/v1/quote?symbol='+listitem+'&token='+ process.env.REACT_APP_WEATHER_API_KEY, { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
                body[0]=(listitem)
                setStockList([...StockList,body])
            });

        })}

    }, [watchlist.length])




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
                        { console.log(StockList)}
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

                        {watchlist.map((list, i )=>
                                <a key={i} id={i}
                                   className="list-group-item list-group-item-action flex-column align-items-start ">
                                    <div className="d-flex w-100 justify-content-between">
                                        <p className="mb-1"><b>{list} </b></p>
                                        <small>{i}</small>
                                    </div><small>  <p>
                                    Hoch: Tief: </p></small>
                                    <small>
                                        <button className={"btn btn-sm btn-light"} onClick={event => onClickhandler(list.ticker)}> entfernen</button>
                                    </small>
                                </a>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watchlist;