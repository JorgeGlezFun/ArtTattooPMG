
import React from 'react';


const FlashMessage = ({ message }) => {

    return (

        message && (

            <div className="alert alert-success">

                {message}

            </div>

        )

    );

};


export default FlashMessage;
