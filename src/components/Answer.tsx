import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "./context";
import '../sass/components/_answer.scss';
import { testObject, answerObject} from "./types";

type AnswerProps = {
    test: testObject;
    itemAnswer: answerObject;
    show: boolean;
    showDetailProps: Function;
    answerChanged: Function;
    arrayAnswerChanged: answerObject[];
}

function Answer({test, itemAnswer, show, showDetailProps, answerChanged, arrayAnswerChanged}: AnswerProps){
    const language = useContext(DataContext);  
    const [showDetail, setShowDetail] = useState(false);

    const changedAnswer = arrayAnswerChanged.find(x => x.numberQuestion === itemAnswer.numberQuestion);
    
    const resultBtn = test?.questions[itemAnswer.numberQuestion - 1].options.map((item, index) =>
        <button key={index} className={item === (changedAnswer ? changedAnswer.answer : itemAnswer.answer) ? "btn btn-secondary" : "btn btn-outline-secondary"} 
        onClick={()=>{answerChanged(itemAnswer.numberQuestion, item); setShowDetail(false); showDetailProps(false);}}>{item}</button>
    );
    const ref = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        ref.current?.scrollIntoView({behavior: "smooth"});
    }, []);

    return(
        <div className="div-scroll-answer-card">
            {
                !showDetail &&
                <div ref={show ? ref : null} className="answer-card" onClick={()=>{setShowDetail(true); showDetailProps(true);}} >
                    <div>{itemAnswer.numberQuestion + ". " + test?.questions[itemAnswer.numberQuestion - 1].text}</div>
                    <div>
                        <img alt=""/>
                        {changedAnswer ? changedAnswer.answer : itemAnswer.answer}
                    </div>
                </div>
            }
            {
                showDetail &&
                <div className="answer-card-detail">
                    <div className="answer-detail-title">{language.change_answer}</div>
                    <img alt="" onClick={()=>{setShowDetail(false); showDetailProps(false);}}/>
                    <div>{itemAnswer.numberQuestion + ". " + test?.questions[itemAnswer.numberQuestion - 1].text}</div>
                    <div className="answer-btn-group">
                        {resultBtn}
                    </div>
                </div>
            }
        </div>
    );
}
export default Answer;