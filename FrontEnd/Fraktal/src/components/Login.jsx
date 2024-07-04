
import React, { useEffect } from 'react';
import '../css/login.css';

export const Login = () => {

    return (
    <div className="form-container">
        <div className="form-control">
            <input type="value" required />
            <label>
            <span style={{ transitionDelay: '100ms' }}>Username</span>
            </label>
        </div>
        <div className="form-control">
            <input type="value" required />
            <label>
            <span style={{ transitionDelay: '100ms' }}>Password</span>
            </label>
        </div>
    </div>
        
  );
};