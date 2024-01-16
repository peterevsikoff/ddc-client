import { useState } from "react";
import '../sass/components/_hidelist.scss';

type HideListProps = {
    children: JSX.Element|JSX.Element[];
    title: string;
}

function HideList({children, title}: HideListProps){
    const [show, setShow] = useState(false);
    
    return (
        <div>
            <div className="hide-list">
                <div onClick={()=>{setShow(!show)}}>{show ? "-" : "+"}</div>
                <div>{title}</div>
            </div>
            {
                show &&
                <div className="hide-list-content">
                    {children}
                </div>
            }
        </div>
    );
}
export default HideList;