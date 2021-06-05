import React, {useContext, useState} from 'react';
import './StockOrderManager.css';
import {Modal} from "react-bootstrap";
import {FaTimes} from "react-icons/fa";
import {Button} from "../Button";
import Moment from "moment";
import {UserCloud} from "../UserCloud";

function StockOrderManager(props) {

    const [amount, setAmount] = useState('');
    const {users, setUsers}= useContext(UserCloud);
    const [userid, setUserid] =useState('');        // Hier ist deine Userid drin wenn du die benötigst


    const placeOrder= () =>{

        console.log('Anzahl',amount)
        console.log('UserID',users.id)
        console.log('Symbol',props.stockSymbol)


        const Order = [amount,users.id,props.stockSymbol];

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                /*'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'*/
            },
            body: JSON.stringify({Order}) //
        };

        fetch('https://reqres.in/api/posts', requestOptions)
            .then(response => console.log(response.json()))
        //.then(data => this.setState({ postId: data.id }));


        {props.handleClose() }
    }


    return (
        <Modal className={'modal fade'} dialogClassName={"modal-dialog modal-dialog-centered" } size={'medium'} tabIndex={"-1"} show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title>Wertpapierkauf von {props.stockName} / {props.stockSymbol}</Modal.Title>
                <FaTimes cursor={'pointer'} onClick={props.handleClose}/>
            </Modal.Header>
            <Modal.Body>
                <div className="base-container" ref={props.containerRef}>
                    <div className="content">
                        <div className="image">
                            <div>
                                <p><b>Datum: {Moment().format( "MMMM do, yyyy ")}</b></p>
                            </div>
                            <form>
                                <label htmlFor={'Amount'}>Anzahl
                                <input value={amount} name={'Amount'} className={"form-control"} onChange={event => setAmount(event.target.value)} style={{width:'40%', float:'right'}} type={'number'}/>
                                </label>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" />
                                    <label className="form-check-label" htmlFor="exampleCheck1"><small>Hiermit akzeptiere ich die AGB des Online Brokers*</small>   </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button buttonStyle="btn btn-outline-secondary"
                        buttonSize="btn-sm"
                        link={'/Dashboard'}
                        onClick={placeOrder}>
                    Kauforder aufgeben
                </Button>
                <Button buttonStyle="btn btn-outline-secondary"
                        buttonSize="btn-sm"
                        link={'/Dashboard'}
                        onClick={props.handleClose }>
                    Kauf abbrechen
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StockOrderManager;