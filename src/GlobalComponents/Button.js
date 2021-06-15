import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';



export const Button = ({
                           children,
                           type,
                           onClick,
                           buttonStyle,
                           buttonSize,
                           link
                       }) => {

    return (
        <Link to={link} className='btn-mobile'>
            <button
                className={`btn ${buttonStyle} ${buttonSize}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
    );
};

Button.defaultProps = {
   buttonStyle : 'btn btn-outline-secondary',
    buttonSize : 'btn-lg',
    link : "/"
}