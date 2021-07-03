import React from 'react';
import Footer from "../Footer";

function Impressum() {
    return (
        <>
            <div className={'container'} style={{marginTop:'5em'}}>
                <div className={'row'}>
                    <div className={'col-6'}>
                        <h1>Impressum</h1><br/>
                        <p> </p>
                        <p>Online Broker<br />Robert-Gerwig-Platz 1<br />78120 Furtwangen <br /> Deutschland</p>
                        <p>Telefon: 07723 9230-0<br />E-Mail: info@onlinebroker.de</p>
                        <p> </p>
                        <p><strong>Vertragssprache:</strong></p>
                        <div align="justify"><p>Maßgebliche Sprache für dieses Vertragsverhältnis und die Kommunikation mit dem Kunden während der Laufzeit des Vertrages ist Deutsch.</p></div>
                        <p> </p>
                        <p><strong>Hinweis zum Bestehen einer Einlagensicherung:</strong></p>
                        <div align="justify"><p>Die Bank ist der Entschädigungseinrichtung deutscher Banken GmbH (EdB) zugeordnet. Die Entschädigungseinrichtung sichert alle Einlagen ab, die in der Bilanzposition „Verbindlichkeiten gegenüber Kunden“ auszuweisen sind. Hierzu zählen Sicht-, Termin- und Spareinlagen, einschließlich der auf den Namen lautenden Sparbriefe. Diese Einlagen sind bis zu einer Höhe von insgesamt 100.000 Euro je Einleger vollständig abgedeckt. <br/><br/>Einlagen sind auch Verbindlichkeiten aus Wertpapiergeschäften, sofern sich die Verpflichtung der Bank darauf bezieht, den Kunden Besitz oder Eigentum an Geldern zu verschaffen. Für den Anspruch auf Herausgabe von Wertpapieren ist der Entschädigungsanspruch auf 90% der Verbindlichkeiten und den Gegenwert von maximal 20.000 Euro begrenzt.<br/>
                            <br/>Wertpapiere (Aktien, Anleihen, Fonds oder Zertifikate) sind keine Einlagen. Sie stehen vielmehr im Eigentum des Kunden und werden für diesen von der flatex Bank nur verwahrt und sind damit auch im Falle einer Insolvenz nicht gefährdet. Tritt ein Insolvenzfall ein, muss die flatex Bank den Inhalt des Depots an den Kunden herausgeben, sofern die Wertpapiere nicht als Sicherheit für Forderungen (Kreditsicherheit) dienen.
                            <br/><br/>Weitere Informationen finden sich auf der Website der Entschädigungseinrichtung deutscher Banken GmbH (EdB) unter www.edb-banken.de.</p></div>
                        <p><strong>Hinweis:</strong></p>
                        <div align="justify"><p>Alle Informationen auf den Websites des Online Brokers wurden mit größter Sorgfalt zusammengestellt. Die Inhalte werden regelmäßig aktualisiert. Dessen ungeachtet kann eine Garantie für die Vollständigkeit, Richtigkeit und letzte Aktualität der Angaben nicht übernommen werden. Des Weiteren distanzieren wir uns ausdrücklich von allen Inhalten aller gelinkten Seiten auf den Websites des Online Brokers und machen uns diese Inhalte nicht zu eigen. Diese Erklärung gilt für alle auf unseren Seiten angebrachten Links auf die Seiten anderer Anbieter.
                            <br/>Die Gestaltung und der Inhalt aller von dem Online Broker bereitgestellten Seiten sind urheberrechtlich geschützt. Sie dürfen weder ganz noch teilweise ohne vorherige schriftliche Genehmigung des Online Broker in irgendeiner Weise vervielfältigt, bearbeitet oder sonst verändert werden.</p></div>
                        <p> </p>
                        <p> </p>
                    </div>

                    <div className={'col-6'}>
                        <img src='/images/img-0.png' style={{height:'30%'}}/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Impressum;