import { useContext, useRef, useState } from "react";
import { DataContext } from "./context";
import '../sass/components/_testcontainer.scss';
import { answerObject, testObject } from "./types";
import ResultTest from "./ResultTest";
import Answer from "./Answer";
import Timer from "./Timer";
import Progress from "./Progress";
import * as helpers from "../helpers";

type TestContainerProps = {
    item: testObject,
    closeResult: Function;
}

function TestContainer({item, closeResult}: TestContainerProps){
    const language = useContext(DataContext);
    
    const [numberQuestion, setNumberQuestion] = useState(1);
    const [showInstruction, setShowinstruction] = useState(true);
    const [showQuestions, setShowQuestions] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [showResult, setShowresult] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);

    const arrayAnswer = useRef<answerObject[]>([]);
    const arrayAnswerChanged = useRef<answerObject[]>([]);

    function nextQuestion(answer: string){
        arrayAnswer.current.push({numberQuestion: numberQuestion, answer: answer});
        if(numberQuestion === item?.questions.length){
            setShowEnd(true);
            setShowQuestions(false);
        }else{
            setNumberQuestion(numberQuestion + 1);
        }
    }

    const resultBtn = item?.questions[numberQuestion - 1].options.map((item, index) =>
        <button key={index} className="btn btn-outline-secondary" onClick={()=>{nextQuestion(item);}} disabled={disabledButton}>{item}</button>
    );

    function showDetailProps(show: boolean){
        setDisabledButton(show);
    }

    function answerChanged(numberQuestionChanged: number, answer: string){
        const answerChangedIndex = arrayAnswerChanged.current.findIndex(x => {return x.numberQuestion === numberQuestionChanged});
        if(answerChangedIndex !== -1){
            arrayAnswerChanged.current = [...arrayAnswerChanged.current.slice(0, answerChangedIndex), {answer: answer, numberQuestion: numberQuestionChanged}, ...arrayAnswerChanged.current.slice(answerChangedIndex + 1)];
        }else {
            arrayAnswerChanged.current.push({numberQuestion: numberQuestionChanged, answer: answer});
        }
    }

    const resultAnswers =  arrayAnswer.current.map((itemAnswer, indexAnswer) =>
        <Answer key={indexAnswer} itemAnswer={itemAnswer} test={item} show={arrayAnswer.current.length - 1 === indexAnswer} showDetailProps={showDetailProps} answerChanged={answerChanged} 
        arrayAnswerChanged={arrayAnswerChanged.current}/>
    );

    const containerAnswerRef = useRef<HTMLDivElement>(null);

    function scroll(element: HTMLDivElement){
        const last = element.querySelector(".div-scroll-answer-card:last-of-type");
        const el = element.querySelector(".div-scroll-answer-card");
        if(helpers.getOffsetRect(el as HTMLDivElement).left < 0)
            containerAnswerRef.current?.classList.add("scroll-left-box");
        else
            containerAnswerRef.current?.classList.remove("scroll-left-box");
        
        if(last && (helpers.getOffsetRect(last as HTMLDivElement).left + last?.clientWidth - element.clientWidth - 30 > 0))
            containerAnswerRef.current?.classList.add("scroll-right-box");
        else
            containerAnswerRef.current?.classList.remove("scroll-right-box");
    }
        
    return(
        <div className="test-container-show">
            {
                showInstruction &&
                <div>
                    <div className="div-instruction">{item?.instruction}</div>
                    <button className="btn btn-outline-secondary btn-next" onClick={()=>{setShowinstruction(false); setShowQuestions(true); }}>{language.next}</button>
                </div>
            }
            {
                showQuestions &&
                <div>
                    <div className="d-flex">
                        <Timer/>
                        <Progress count={item?.questions.length} currentCount={arrayAnswer.current.length}/>
                    </div>
                    {
                        arrayAnswer.current.length > 0 &&
                        <div style={{position:"relative"}}>
                            <div ref={containerAnswerRef} className="div-answer" onScroll={(event)=>{scroll(event.target as HTMLDivElement)}}>
                                {resultAnswers}
                            </div>
                        </div>
                        
                    }
                    <div className="div-number-question">{language.question + " " + numberQuestion + " " + language.from + " " + item?.questions.length}</div>
                    <div className="div-text-questions">{item?.questions[numberQuestion - 1].text}</div>
                    <div className={item?.questions[numberQuestion - 1].column ? "btn-group-options-column" : "btn-group-options"}>
                        {resultBtn}
                    </div>
                </div>
            }
            {
                showEnd &&
                <div style={{height: "100%"}}>
                    <div className="div-instruction-complete">{language.end}</div>
                    <div className="div-img-complete">
                        <img alt=""/>
                    </div>
                    <button className="btn btn-outline-secondary btn-next" onClick={()=>{setShowresult(true); setShowEnd(false);}}>{language.show_result}</button>
                </div>
            }
            {
                showResult &&
                <ResultTest arrayAnswer={arrayAnswer.current} item={item} closeResult={closeResult}/>
            }
        </div>
    );
}
export default TestContainer;