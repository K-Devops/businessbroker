import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Modal} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";
import {Button} from "../Button";
import {SymbolCloud} from "../SymbolCloud";
import './StockDashboard.css'
import Moment from "moment";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock'
import axios from "axios";
import StockOrderManager from "./StockOrderManager";
import {UserCloud} from "../UserCloud";
import StockTable from "./StockTable";
import NewsBlock from "./NewsBlock";
import StockListTable from "./StockListTable";
import StockOverview from "./StockOverview";


function StockDashboard(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [stockProfile2, setStockProfile2] = useState('')
    const {watchlist, setWatchlist} = props.Winteract;
    const [CompanyNews, setCompanyNews] = useState([])
    const [StockData, setStockData] = useState([])


    //Elements to request API
    const request = require('request');
    const scdrequest = require('request');
    const thrdrequest = require('request');
    const fourrequest = require('request');

    //Clouds
    const {symbols, setsymbols} = useContext(SymbolCloud);
    const {users, setUsers}= useContext(UserCloud);

    //Timeelements
    var date = new Date();
    var unixTimeStamp = Math.floor(date.getTime() / 1000);
    var year = Moment(date).subtract(11, 'months');
    var a = ['',];
    var Today = Moment().format('YYYY-MM-DD')
    var Yesterday = Moment(new Date()).subtract(7, "days").format('YYYY-MM-DD')
    //Optionen für Highchartsstockdiagramm
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

    //User kauft Wertpapiere
    const onBuyhandler = (e) =>{
        handleShow();
    }

    // Item in die Watchlist hinzufügen
    const onClickhandler=(symbol)=>{
        if(watchlist.includes(symbol)){
            alert('Wurde bereits hinzugefügt')
            return
        }
        else {
            alert('Wertpapier wurde auf die Watchlist gesetzt!')
        }
        setWatchlist([...watchlist, symbol])

        //Item in die Watchlist hinzufügen
        axios.post('http://localhost:8080/investmentService/users/'+users.id+'/watchlist/'+symbol)
            .then(response => response.data)
            .then(data => console.log( data)
            )

    }

    useEffect(()=>{

        request('https://finnhub.io/api/v1/stock/profile2?symbol='+symbols+'&token=' + process.env.REACT_APP_API_KEY, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            setStockProfile2(body)
        });

        scdrequest('https://finnhub.io/api/v1/company-news?symbol='+symbols+'&from='+Yesterday+'&to='+Today+'&token=' + process.env.REACT_APP_API_KEY, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            setCompanyNews(body);

        });

        thrdrequest('https://finnhub.io/api/v1/quote?symbol='+symbols+'&token='+ process.env.REACT_APP_API_KEY, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            setStockData(body)

        });

        fourrequest('https://finnhub.io/api/v1/stock/candle?symbol='+symbols+'&resolution=1&from=1615298999&to='+unixTimeStamp+'&token='+ process.env.REACT_APP_API_KEY, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            if(body.s == 'ok'){
                unixtoDateConverter(body)
            }
            if(a!=0){
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
                                allowChartUpdate = { true}/>
                            <StockTable StockData={StockData} stockProfile2={stockProfile2}/>
                        </div>
                        <StockListTable stockProfile2={stockProfile2}
                                        onClickhandler={onClickhandler}
                                        onBuyhandler={onBuyhandler}
                                        detail={props.detail}
                                        stockPrice = {StockData.c}/>
                        <StockOrderManager
                            show={show} handleClose={handleClose}
                            stockName ={stockProfile2.name}
                            stockSymbol = {symbols}
                            title={'Wertpapierkauf'}
                            currency={stockProfile2.currency}
                            stockPrice = {StockData.c}/>
                        </div>
                    <NewsBlock  detail={props.detail}
                                stockProfile2={stockProfile2}
                                CompanyNews={CompanyNews}/>
                    <StockOverview  detail={props.detail}
                                    datap={props.datap}
                                    stockPrice = {StockData.c}
                                    currency={stockProfile2.currency}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button buttonStyle="btn btn-outline-secondary"
                        buttonSize="btn-sm"
                        onClick={props.handleClose }
                        link={'/Dashboard'}>
                    schließen
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
export default StockDashboard;