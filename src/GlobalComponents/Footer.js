import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer-container'>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div  className='footer-link-items'>
                        <h2>Über Uns</h2>
                        <Link to='/sign-up'>How it works</Link>
                        <Link to='/#'>Investors</Link>
                        <Link to='/#'>Terms of Service</Link>
                    </div>
                    <div  className='footer-link-items'>
                        <h2>Kontakt</h2>
                        <Link to='/#'>Kontakt</Link>
                        <Link to='/#'>Support</Link>
                        <Link to='/#'>Destinations</Link>
                        <Link to='/#'>Sponsoren</Link>
                    </div>
                </div>
                <div className='footer-link-wrapper'>

                    <div  className='footer-link-items'>
                        <h2>Gruppe</h2>
                        <Link to='/#'>Luisa Buderer</Link>
                        <Link to='/#'>Jan Timmer</Link>
                        <Link to='/#'>Büsra Alili</Link>
                        <Link to='/#'>Fabiana Kariegus</Link>
                    </div>
                </div>
            </div>
            <section  className='social-media'>
                <div  className='social-media-wrap'>
                    <div  className='footer-logo'>
                        <Link to='/#' className='social-logo'>
                            ONLINE BROKER

                        </Link>
                    </div>
                    <small  className='website-rights'>ONLINE BROKER HFU © 2021</small>
                    <div  className='social-icons'>
                        <Link
                            className='social-icon-link facebook'
                            to='/#'
                            target='_blank'
                            aria-label='Facebook'
                        >
                            <i  className='fab fa-facebook-f' />
                        </Link>
                        <Link
                            className='social-icon-link instagram'
                            to='/#'
                            target='_blank'
                            aria-label='Instagram'
                        >
                            <i  className='fab fa-instagram' />
                        </Link>
                        <Link
                            className='social-icon-link youtube'
                            to='/#'
                            target='_blank'
                            aria-label='Youtube'
                        >
                            <i  className='fab fa-youtube' />
                        </Link>
                        <Link
                            className='social-icon-link twitter'
                            to='/#'
                            target='_blank'
                            aria-label='Twitter'
                        >
                            <i  className='fab fa-twitter' />
                        </Link>
                        <Link
                            className='social-icon-link twitter'
                            to='/#'
                            target='_blank'
                            aria-label='LinkedIn'
                        >
                            <i  className='fab fa-linkedin' />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;