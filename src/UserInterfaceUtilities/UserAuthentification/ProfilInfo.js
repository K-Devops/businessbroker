import React from 'react';

function ProfilInfo(props) {
    return (
        <div>
            <h1 style={{marginTop:'50px'}}>Mein Kundenkonto</h1>
            <div className="container">
                <div className={'row'}>
                    <div className="col-4">
                        <img src='images/user-1.png' alt="description "/>
                    </div>
                    <div className="border border-1 col-6">
                        <p><strong>Benutzerdaten</strong></p>
                        <label className={"form-label"} >Username: {props.users.username}</label><br/>
                        <label className={"form-label"} >E-Mail: {props.users.email}</label><br/>
                        <div>
                            <div className={'OrderOverview'}>
                                <p><strong>Order Management</strong></p>
                                <button  className={'btn btn-secondary'} onClick={() => props.setPurchasesShow(true)} style={{marginTop:'2%'}}>Meine Aktionen anzeigen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilInfo;

ProfilInfo.defaultProps={
    username: '',
    email:''
}