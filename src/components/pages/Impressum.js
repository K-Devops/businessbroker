import React from 'react';
import Footer from "../Footer";

function Impressum() {
    return (
        <>
            <div className={'container'} style={{marginTop:'10em'}}>
            <div className={'row'}>
                <div className={'col-6'}>
                    <p><strong>Impressum</strong></p>
                    <p>Anbieter:<br />Max Mustermann<br />Musterstraße 1<br />80999 München</p>
                    <p>Kontakt:<br />Telefon: 089/1234567-8<br />Telefax: 089/1234567-9<br />E-Mail: mail@mustermann.de<br />Website: www.mustermann.de</p>
                    <p> </p>
                    <p>Bei redaktionellen Inhalten:</p>
                    <p>Verantwortlich nach § 55 Abs.2 RStV<br />Max Mustermann<br />Musterstraße 2<br />80999 München</p>
                </div>
                <div className={'col-6'}>
                   <img src='/images/img-0.png' style={{height:'40%'}}/>
                </div>
            </div>
        </div>
            <Footer />
            </>
    );
}

export default Impressum;