import React from 'react';
import './Watchlist.css';

function Watchlist({Winteract}) {

    const {watchlist, setWatchlist} = Winteract;
    const onClickhandler = (key) =>{
        const temp =[...watchlist];
        temp.splice(key, 1);

       const deleteW = 'Hier Post entfernen Endpoint'

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                /*'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'*/
            },
            body: JSON.stringify({deleteW}) // hier die Daten in den Body mitversenden
        };

        fetch('https://reqres.in/api/posts', requestOptions)
            .then(response => console.log(response.json()))
        //.then(data => this.setState({ postId: data.id }));

        setWatchlist(temp);

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
                        {watchlist.map((list, i )=>
                                <a key={i} id={i}
                                   className="list-group-item list-group-item-action flex-column align-items-start ">
                                    <div className="d-flex w-100 justify-content-between">
                                        <p className="mb-1"><b>{list.ticker} / {list.name}</b></p>
                                        <small>{i}</small>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"> /</li>
                                        <li className="list-group-item">Tageshoch</li>
                                        <li className="list-group-item">Tief</li>
                                    </ul>
                                    <small>
                                        <button className={"btn btn-sm btn-light"} onClick={event => onClickhandler(i)}> entfernen</button>
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