import { useContext } from "react";
import { DataContext } from "./context";
import '../sass/components/_progress.scss';

type ProgressProps = {
    count: number | undefined;
    currentCount: number;
}

function Progress({count, currentCount}: ProgressProps){
    const language = useContext(DataContext);
    
    let percent = 0;
    if(count) percent = Math.floor(currentCount * 100 / count);
    
    return(
        <div className="div-progress-component">
            <span>{language.progress}</span>
            <div className="div-progress">
                <div className="progress-value" style={{width: percent + "%"}}></div>
            </div>
        </div>
    );
}
export default Progress;