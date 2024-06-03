import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import styles from './Logout.module.css';

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className={styles.Logout}>
            <button onClick={handleClick}>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
        </div>
    );
}
