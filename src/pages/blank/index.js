import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Blank = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        navigate('/login')
    },[]);

    return <div>Inicie sesión</div>
};

export default Blank