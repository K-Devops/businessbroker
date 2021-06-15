import React, {useContext, useEffect, useState} from 'react';
import Footer from "../Footer";
import Modal from 'react-bootstrap/Modal';
import './Profil.css';
import {FaTimes} from "react-icons/fa";
import {UserCloud} from "../UserCloud";
import axios from "axios";

function Profil() {

    const {users}= useContext(UserCloud);
    const [purchasesShow, setPurchasesShow] = useState(false);
    const handlePurchasesClose = () => setPurchasesShow(false);
    const [currentOrders, setOrders] = useState([{}]);

    useEffect(()=>{

        //Alle Orders vom OrderService nehmen
        axios.get('http://localhost:8081/orderService/users/'+users.id+'/orders')
            .then(response => response.data)
            .then(data => setOrders(data))
            .then(data => console.log(data))

    },[])

    console.log(currentOrders);

    return (
        <>
            <div className={'container'} style={{marginTop:'5em'}}>
                <h1 style={{marginTop:'50px'}}><strong>Mein Kundenkonto</strong></h1>
                <div className="container">
                    <div className={'row'}>
                <div className="col-4">
                    <img src='images/user-1.png' alt="description "/>
                </div>
                <div className="border border-1 col-6">
                    <p><strong>Benutzerdaten</strong></p>
                    <label className={"form-label"} >Username: {users.username}</label><br/>
                    <label className={"form-label"} >E-Mail: {users.email}</label><br/>
                    <div>
                        <div className={'OrderOverview'}>
                            <p><strong>Order Management</strong></p>
                            <button  className={'btn btn-secondary'} onClick={() => setPurchasesShow(true)} style={{marginTop:'2%'}}>Meine Aktionen anzeigen</button>
                        </div>

                    </div>
                </div>
                </div>
                </div>
                <Modal show={purchasesShow} onHide={handlePurchasesClose} animation={false} size={'xl'}>
                    <Modal.Header>
                        <Modal.Title>Meine Aktionen</Modal.Title>
                        <FaTimes cursor={'pointer'} onClick={handlePurchasesClose}/>
                    </Modal.Header>
                    <Modal.Body>
                        <table className={"purchaseTable"}>
                            <thead>
                            <th>Nr.</th>
                            <th>Status</th>
                            <th>Symbol/ Wertpapier</th>
                            <th>Anzahl</th>
                            <th>Kaufdatum</th>
                            <th>Kaufpreis pro Stk</th>
                            </thead>
                            <tbody>
                            {currentOrders && currentOrders.map(((value, index) =>
                                    <tr>
                                        <td>{index}</td>
                                        <td>{value.type}</td>
                                        <td>{value.stockSymbol}</td>
                                        <td>{value.units}</td>
                                        <td>{value.date}</td>
                                        <td>{value.price}</td>
                                    </tr>
                            ))}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <button  className={'btn btn-secondary'} onClick={handlePurchasesClose} style={{marginTop:'2%'}}>Schließen</button>
                    </Modal.Footer>
                </Modal>
            </div>
            <br/>
            <br/>
            <Footer />
        </>
    );
}
export default Profil;