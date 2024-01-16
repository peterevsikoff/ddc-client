import { useContext } from "react";
import { DataContext } from "./context";
type ProProps = {
    message: string;
}
function Pro({message}: ProProps){
    const language = useContext(DataContext);
    
    return(
        <div className="mt-3">{language.pro}</div>
    );
}
export default Pro;