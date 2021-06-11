import React, {useContext, useState} from 'react';
import Footer from "../Footer";
import Modal from 'react-bootstrap/Modal';
import './Profil.css';
import {FaTimes} from "react-icons/fa";
import {UserCloud} from "../UserCloud";


function Profil() {

    const {users, setUsers}= useContext(UserCloud);
    const [purchasesShow, setPurchasesShow] = useState(false);
    const [salesShow, setSalesShow] = useState(false);
    const handlePurchasesClose = () => setPurchasesShow(false);
    const handleSalesClose = () => setSalesShow(false);

    return (
        <>
            <div className={'container'} style={{marginTop:'5em'}}>
                <h1 style={{marginTop:'50px'}}><strong>Mein Kundenkonto</strong></h1>
                <div className="container">
                    <div className={'row'}>
                <div className="border border-1 col-4"></div>
                <div className="border border-1 col-6">
                    <p><strong>Benutzerdaten</strong></p>
                    <label className={"form-label"} >Username: {users.username}</label><br/>
                    <label className={"form-label"} >E-Mail: {users.email}</label><br/>
                    <div>
                        <div className={'OrderOverview'}>
                            <p><strong>Order Management</strong></p>
                            <button  className={'btn btn-secondary'} onClick={() => setPurchasesShow(true)} style={{marginTop:'2%'}}>Meine Käufe anzeigen</button>
                            <button  className={'btn btn-secondary'}  onClick={() => setSalesShow(true)} style={{marginTop:'2%'}}>Meine Verkäufe anzeigen</button>
                        </div>

                    </div>
                </div>
                </div>
                </div>


                <Modal show={purchasesShow} onHide={handlePurchasesClose} animation={false} size={'xl'}>
                    <Modal.Header>
                        <Modal.Title>Meine Käufe</Modal.Title>
                        <FaTimes cursor={'pointer'} onClick={handlePurchasesClose}/>
                    </Modal.Header>
                    <Modal.Body>
                        <table className={"purchaseTable"}>
                            <thead>
                            <th>Nr.</th>
                            <th>Wertpapier</th>
                            <th>Anzahl</th>
                            <th>Preis pro Wertpapier</th>
                            <th>Summe</th>
                            </thead>
                            <tbody>
                            <tr>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <button  className={'btn btn-secondary'} onClick={handlePurchasesClose} style={{marginTop:'2%'}}>Schließen</button>
                    </Modal.Footer>
                </Modal>

                <Modal show={salesShow} onHide={handleSalesClose} animation={false}  size={'xl'}>

                    <Modal.Header>
                        <Modal.Title>Meine Verkäufe</Modal.Title>
                        <FaTimes cursor={'pointer'} onClick={handleSalesClose}/>
                    </Modal.Header>
                    <Modal.Body>
                        <table className={"salesTable"}>
                            <thead>
                            <th>Nr.</th>
                            <th>Wertpapier</th>
                            <th>Anzahl</th>
                            <th>Preis pro Wertpapier</th>
                            <th>Summe</th>
                            </thead>
                            <tbody>
                            <tr>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                                <td>X</td>
                            </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <button  className={'btn btn-secondary'} onClick={handleSalesClose} style={{marginTop:'2%'}}>Schließen</button>
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