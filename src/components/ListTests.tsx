import { useContext } from "react";
import { DataContext } from "./context";
import '../sass/components/_listtests.scss';
import { testObject } from "./types";
import Search from "./Search";


type ListTestsProps = {
    message: string,
    tests: testObject[],
    setViewedTest: Function,
    viewedTest: testObject,
    showTest: Function,
    search: Function;
}

function ListTests({message, tests, setViewedTest, viewedTest, showTest, search}: ListTestsProps){
    const language = useContext(DataContext);
    
    const result = tests.map((item, index) => 
        <li key={index} className={item?.id === viewedTest?.id ? "active" : ""} onClick={()=>{setViewedTest(item)}}>
            {item?.shortName}
            <img alt="" onClick={(event)=>{event.stopPropagation(); showTest(item)}}/>
        </li>
    );

    return(
        <div className="mt-3">
            <Search search={search}/>
            <div className="list-tests">
                {
                    tests.length > 0 ?
                    <ul>
                        {result}
                    </ul> :
                    <div className="div-zero">{language.tests_zero}</div>
                }
                
            </div>
        </div>
        
    );
}
export default ListTests;