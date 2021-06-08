import React, {useContext, useEffect, useState} from 'react';
import {Modal, Tooltip} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";
import {Button} from "../Button";
import {SymbolTransfer} from "../SymbolTransfer";
import './StockDashboard.css'
import Moment from "moment";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock'
import axios from "axios";
import StockOrderManager from "./StockOrderManager";
import {UserCloud} from "../UserCloud";


function StockDashboard(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {symbols, setsymbols} = useContext(SymbolTransfer);
    const [stockProfile2, setStockProfile2] = useState('')
    const {watchlist, setWatchlist} = props.Winteract;
    const [CompanyNews, setCompanyNews] = useState([])
    const [StockData, setStockData] = useState([])
    const [times, settimes] = useState([null])
    const request = require('request');
    const scdrequest = require('request');
    const thrdrequest = require('request');
    const fourrequest = require('request');
    var a = ['',];
    var Today = Moment().format('YYYY-MM-DD')
    var Yesterday = Moment(new Date()).subtract(7, "days").format('YYYY-MM-DD')
    const {users, setUsers}= useContext(UserCloud);

    //Options for Highchartsstockdiagramm (default)
    const [options,setoptions] = useState( {
        title: {
            text: 'My chart'
        },
        rangeSelector: {
            inputDateFormat: '%b %e, %Y',
            pointStart: Date.UTC(2020, 0, 30),
            enabled: false
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [''],

        },
        series: [{
            name:'',
            data: [1, 2, 3],
            tooltip: {
                valueDecimals: 1,
                valueSuffix: 'USD'
            }

        },{
            name: '',
            data: [2, 3, 1],
            tooltip: {
                valueDecimals: 1,
                valueSuffix: 'USD'
            }
        }]
    })

    //User bought some stocks
    const onBuyhanlder = (e) =>{
        handleShow();
    }

    // Add item to Watchlist
    const onClickhandler=(symbol)=>{
        if(watchlist.includes(symbol)){
            alert('Wurde bereits hinzugefügt')
            return
        }
        setWatchlist([...watchlist, symbol])

        //Add item to watchlist
        axios.post('http://localhost:8080/investmentService/users/'+users.id+'/watchlist/'+symbol)
            .then(response => response.data)
            .then(data => console.log( data)
            )

    }

    useEffect(()=>{


        request('https://finnhub.io/api/v1/stock/profile2?symbol='+symbols+'&token=' + process.env.REACT_APP_WEATHER_API_KEY, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            setStockProfile2(body)
        });

        scdrequest('https://finnhub.io/api/v1/company-news?symbol='+symbols+'&from='+Yesterday+'&to='+Today+'&token=' + process.env.REACT_APP_WEATHER_API_KEY, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            setCompanyNews(body);

        });

        thrdrequest('https://finnhub.io/api/v1/quote?symbol='+symbols+'&token='+ process.env.REACT_APP_WEATHER_API_KEY, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            setStockData(body)

        });

        var date = new Date();
        var unixTimeStamp = Math.floor(date.getTime() / 1000);
        var year = Moment(date).subtract(11, 'months');

            fourrequest('https://finnhub.io/api/v1/stock/candle?symbol='+symbols+'&resolution=1&from=1615298999&to='+unixTimeStamp+'&token='+ process.env.REACT_APP_WEATHER_API_KEY, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            settimes(body.t)
                if(body.s == 'ok'){
                    unixtoDateConverter(body)
                }
            if(a!=0){
                console.log(a)
                setoptions({series:[
                        {name:'Tief',data:body.l,tooltip: {
                                valueDecimals: 1,
                                valueSuffix: `${stockProfile2.currency}`
                            }},
                        {name:'Hoch',data:body.h,tooltip: {
                                valueDecimals: 1,
                                valueSuffix: `${stockProfile2.currency}`
                            }}],
                    xAxis: {categories: (a) },
                } )
            }
        });
        }, [symbols])

    const unixtoDateConverter = (m) =>{
       a =  m.t.map(function(time){return new Date(time*1000).toLocaleDateString('de')})

    }

    useEffect(()=>{
        setoptions({
            rangeSelector: {
                inputDateFormat: '%b %e, %Y',
                pointStart: Date.UTC(2020, 0, 30),
                enabled: false
            },
            title:{text:`${stockProfile2.name}`},
            subtitle:{text:'Quelle: '+ `${stockProfile2.weburl}`}} )
    },[ stockProfile2.name])

    return (
        <Modal size={'xl'}  show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title>{stockProfile2.name}</Modal.Title>
                <FaTimes cursor={'pointer'} onClick={props.handleClose}/>
            </Modal.Header>
            <Modal.Body>
                <div className="container"  ref={props.containerRef}>
                    <div className={'row'}>
                        <div className={'col-7'}>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                                constructorType={'stockChart'}
                                allowChartUpdate = { true}

                            />
                            <p></p>
                            <h5>{Moment().format( "MMMM do, yyyy ")}</h5>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">Öffnungspreis</th>
                                    <th scope="col">Tageshoch</th>
                                    <th scope="col">Tagestief</th>
                                    <th scope="col">Aktueller Preis</th>
                                    <th scope="col">Letzter Schlusspreis</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{StockData.o} {stockProfile2.currency}</td>
                                    <td>{StockData.h}{stockProfile2.currency}</td>
                                    <td>{StockData.l}{stockProfile2.currency}</td>
                                    <td>{StockData.c}{stockProfile2.currency}</td>
                                    <td>{StockData.pc}{stockProfile2.currency}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'col-4'} style={{marginLeft:'5%'}}>
                            <div>
                                <img src={stockProfile2.logo}  />
                            </div>
                            <h4> {stockProfile2.name} </h4>

                            <ul className="list-group">
                                <li className="list-group-item">Börse: {stockProfile2.exchange}</li>
                                <li className="list-group-item">Markt: {stockProfile2.country} Markt</li>
                                <li className="list-group-item">Marktplatzierung: {stockProfile2.marketCapitalization}</li>
                                <li className="list-group-item">Austehende Aktien {stockProfile2.shareOutstanding} </li>
                            </ul>
                            <div className={'watchlistref'} >
                            <button onClick={event => onClickhandler(stockProfile2.ticker)} className={'btn btn-outline-secondary'} >Zur Watchlist hinzufügen</button>
                        </div>
                            <div>
                                <button className={'btn btn-secondary'} style={{margin:'10%'}} onClick={onBuyhanlder}>Wertpapier ordern</button>
                                <StockOrderManager
                                    show={show}
                                    handleClose={handleClose}
                                    stockName ={stockProfile2.name}
                                    stockSymbol = {symbols}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop:'5%'}}>
                    <div>
                        <h5>Aktuelle News zu {stockProfile2.name} </h5>
                    </div>
                    <div className={'card-group'}>
                        {CompanyNews.slice(0,4).map((CompanyNew, i )=>
                            <div className={'card'} key={i} >
                                <img src={CompanyNew.image} className={'card-img-top'} style={{width:'93%'}} />
                                <div className={'card-body'}>
                                    <h6 className={'card-title'}><b>{CompanyNew.headline}</b></h6>
                                    <p className={'card-text'}><small>{CompanyNew.summary}</small></p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Source: {CompanyNew.source}</small>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                </div>
            </Modal.Body>
            <Modal.Footer>

                <Button buttonStyle="btn btn-outline-secondary"
                        buttonSize="btn-sm"
                        onClick={props.handleClose }
                        link={'/Dashboard'}
                >
                    schließen
                </Button>
            </Modal.Footer>
        </Modal>

    );
}



export default StockDashboard;