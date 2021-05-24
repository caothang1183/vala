import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom'

export default function AddUser() {

    let history = useHistory();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("User"))
        if(user.role_id !== 1){
            history.push('/dashboard')
        }
    }, [])
    
    return (
        <div>
      
        </div>
    )
}
