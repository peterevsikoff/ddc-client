import { useContext, useState } from "react";
import { DataContext } from "./context";
import '../sass/components/_search.scss';
import searchImg from "../icons/search.svg";
import closeImg from "../icons/close-black.svg";

type SearchProps = {
    search: Function;
}

function Search({search}: SearchProps){
    const language = useContext(DataContext);
    const [searchText, setSearchText] = useState("");
    
    return(
        <div className="div-search">
            <img className="img-search" alt="" src={searchImg}/>
            <input className="div-search-field" placeholder={language.search} value={searchText} onChange={(event)=>{setSearchText(event?.target.value); search(event?.target.value);}}/>
            <img className="img-close" alt="" src={closeImg}  onClick={()=>{setSearchText(""); search("");}}/>
        </div>
    );
}
export default Search;
