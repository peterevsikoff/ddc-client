import { useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "./context";
import '../sass/components/_timer.scss';

function Timer(){
    const timeStart = useRef<Date>(new Date());// new Date();//чтобы значение сохранилось при повторном рендеринге
    const language = useContext(DataContext);  
    const [time, setTime] = useState(new Date(0,0,0,0,0,0).getTime());

    useEffect(() => {
        const interval = setInterval(() => {setTime(Date.now() - timeStart.current.getTime())}, 1000,);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="div-timer-questions">
            <span>{language.time_start}</span>
            <span>{new Date(time).toLocaleTimeString([], {minute: '2-digit', second:'2-digit'})}</span>
        </div>
    );
};

export default Timer;