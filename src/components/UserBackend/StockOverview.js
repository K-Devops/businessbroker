import React, {useContext, useEffect, useState} from 'react';
import './StockOrderManager.css';
import {Modal} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";
import {Button} from "../Button";
import Moment from "moment";
import {UserCloud} from "../UserCloud";
import {SymbolCloud} from "../SymbolCloud";
import StockOrderManager from "./Dashboardelements/StockOrderManager";

function StockOverview(props) {

    // Hier ist deine Userid drin wenn du die benötigst
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const thrdrequest = require('request');
    const [currentcondition, setCurrentcondition]= useState([])

    //User bought some stocks
    const onBuyhandler = (e) =>{
        handleShow();
    }

    const [showSell, setShowSell] = useState(false);
    const handleCloseSell = () => setShowSell(false);
    const handleShowSell = () => setShowSell(true);

        useEffect(()=>{
    thrdrequest('https://finnhub.io/api/v1/quote?symbol='+props.symbol+'&token='+ process.env.REACT_APP_API_KEY, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        setCurrentcondition(body)
    });
            },[props.symbol])

    //User sell some stocks
    const onSellHandler = (e) =>{
        handleShowSell();
    }

        return (
            <Modal size={'xl'} show={props.show} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Meine Aktionen zu {props.symbol} </Modal.Title>
                    <FaTimes cursor={'pointer'} onClick={props.handleClose}/>
                </Modal.Header>
                <Modal.Body>
                    <div className="container" ref={props.containerRef}>
                        <div className={'row'}>
                        </div>
                        <div className={'row'}>
                            <div className={'col-11'}>
                                <h5>Datum: {Moment().format("DD.MM.yyyy")}</h5><br/>
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th scope="col">Nr.</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Kaufpreis </th>
                                        <th scope="col">Aktueller Kurs
                                        </th>
                                        <th scope="col">Kaufdatum
                                        </th>
                                        <th scope="col">Aktion</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.entries(props.data).map(item=>
                                        <tr>
                                            <td>{item[0]}</td>
                                            <td>{item[1].status}</td>
                                            <td>{item[1].openPrice} USD</td>
                                            <td>{currentcondition.c} USD</td>
                                            <td>{item[1].dateOpened} EUR<br/><span className= {'small'}>{}</span></td>
                                            <td>
                                                <button type="button" className="btn btn-secondary"
                                                        style={{backgroundColor:'orange', width:'125%'}}
                                                        onClick={onSellHandler}> Verkaufen &nbsp; <i className="fa fa-coins"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                    <StockOrderManager
                                        show={showSell}
                                        handleClose={handleCloseSell}
                                        stockSymbol = {props.symbol}
                                        stockPrice={currentcondition.c}
                                        title = 'Verkaufen'
                                        type={'CLOSE'} // WIRD VERKAUFT
                                    />
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button buttonStyle="btn btn-outline-secondary"
                            buttonSize="btn-sm"
                            onClick={props.handleClose}
                            link={'/dashboard'}
                             >
                        schließen
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
export default StockOverview;

StockOverview.defaultProps= {
    data:''

}