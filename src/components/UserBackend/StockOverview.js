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
    const {symbols, setsymbols} = useContext(SymbolCloud);
    const [stockProfile2, setStockProfile2] = useState('')


    //User bought some stocks
    const onBuyhandler = (e) =>{
        handleShow();
    }

    const [showSell, setShowSell] = useState(false);
    const handleCloseSell = () => setShowSell(false);
    const handleShowSell = () => setShowSell(true);


    //User sell some stocks
    const onSellHandler = (e) =>{
        handleShowSell();
    }

        return (
            <Modal size={'xl'} show={props.show} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>{stockProfile2.name}</Modal.Title>
                    <FaTimes cursor={'pointer'} onClick={props.handleClose}/>
                </Modal.Header>
                <Modal.Body>
                    <div className="container" ref={props.containerRef}>
                        <div className={'row'}>
                            <div className={'col-7'}>
                                <p></p>
                                <h5>Datum: {Moment().format("DD.MM.yyyy")}</h5><br/>
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th scope="col">Stk./Nom.<br/><span className={'small'}>(gesperrt)</span></th>
                                        <th scope="col">Name<br/><span
                                            className={'small'}>ISIN/WKN/Lagerstelle</span></th>
                                        <th scope="col">Aktuelle Summe<br/><span className={'small'}> Gesamterfolg (abs. / rel.)</span>
                                        </th>
                                        <th scope="col">Aktueller Kurs<br/><span className={'small'}> Diff.Tag (abs. / rel.)</span>
                                        </th>
                                        <th scope="col">Zeit<br/><span className={'small'}>Kursquelle</span></th>
                                        <th scope="col">Aktion</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{}</td>
                                        <td>{}<br/><span className={'small'}>{}</span></td>
                                        <td>{} EUR<br/><span className={'small'}>{}</span></td>
                                        <td>{} EUR<br/><span className= {'small'}>{}</span></td>
                                        <td>{}</td>
                                        <td>
                                            <button type="button" className="btn btn-secondary"
                                                     style={{backgroundColor:'orange', width:'150%'}}
                                                     onClick={onSellHandler}> Verkaufen &nbsp; <i className="fa fa-coins"></i>
                                        </button>
                                           <StockOrderManager
                                               show={showSell}
                                               handleClose={handleCloseSell}
                                               stockName ={stockProfile2.name}
                                               stockSymbol = {symbols}
                                               title = 'Verkaufen'
                                               type={'CLOSE'} // WIRD VERKAUFT
                                           />
                                            </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={'col-4'} style={{marginLeft: '5%'}}>
                                <div>
                                    <img src={stockProfile2.logo}/>
                                </div>
                                <h4> {stockProfile2.name} </h4>

                                <ul className="list-group">
                                    <li className="list-group-item">Börse: {stockProfile2.exchange}</li>
                                    <li className="list-group-item">Markt: {stockProfile2.country} Markt</li>
                                    <li className="list-group-item">Marktplatzierung: {stockProfile2.marketCapitalization}</li>
                                    <li className="list-group-item">Austehende Aktien {stockProfile2.shareOutstanding} </li>
                                </ul>
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