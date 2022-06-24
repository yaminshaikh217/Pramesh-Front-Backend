import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory } from "react-router";

const clientId = "3076278999-d3dc119t0ircn8573inrgl6inivo6mrg.apps.googleusercontent.com";

function Logindata() {
    let history = useHistory();
    var answer = window.location.href;
    const answer_array = answer.split('/');
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
 
    

    const onSignoutSuccess = () => 
    {
        console.clear();
        Swal.fire(
            'Good job!',
            'You have been logged out successfully',
            'success'
        )
        localStorage.removeItem("iUserId");
        localStorage.removeItem("vFirstName");
        localStorage.removeItem("vLastName");
        localStorage.removeItem("Name");

        setTimeout(function () {
            history.push("/login");
            window.location.reload(1);
        }, 100);

        setShowloginButton(true);
        setShowlogoutButton(false);
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Sign Out"
                onLogoutSuccess={onSignoutSuccess}
            >
            </GoogleLogout>

        </div>
    );
}
export default Logindata;