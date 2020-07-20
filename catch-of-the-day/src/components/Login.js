import React from 'react';
import { SDK_VERSION } from 'firebase';

const Login  = (props) => (
    <nav classname="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's Inventory</p>
        <button className="github" onClick={() => props.authenticate("Github")}>
            Login with Github
        </button>
    </nav>
);


export default Login