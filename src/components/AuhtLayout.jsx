import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'


function Protected({children , authentication = true}) {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();
    const [loader , setLoader] = useState(true);

    useEffect(()=>{
        if(authentication && authStatus !== authentication) {
            navigate("/login")
        }
        else if( !authentication && authStatus != authentication ){
            navigate("/")
        }
        setLoader(false);
    } , [authStatus , authentication , navigate  ])


    // we can use any loading page , loading circle in place of null
    return loader ? null : <>{children}</>
}

export default Protected