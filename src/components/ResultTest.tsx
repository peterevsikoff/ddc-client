import { useContext, useRef } from "react";
import { DataContext } from "./context";
import { answerObject, resultObject, testObject } from "./types";
import close from "../icons/close.svg";
import HideList from "./HideList";
import Chart from "./Chart";
import * as docx from "docx";
import { saveAs } from "file-saver";

type ResulTestProps = {
    arrayAnswer: answerObject[],
    item: testObject,
    closeResult: Function;
}
function ResulTest({arrayAnswer, item, closeResult}: ResulTestProps){
    const language = useContext(DataContext);
    const arrayResult = useRef<resultObject[]>([]);

    item?.scales?.forEach(d => {
        let score = 0;
        d.key.forEach(k => {
            const answer = arrayAnswer.find(a => a.numberQuestion === k.number);
            if(answer?.answer === k.answer){
                score = score + 1;
            }
        });
        
        let level = "";
        let descriptionScale = "";
        d.levels.forEach(l => {
            if(score >= l.condition[0] && score < l.condition[1]){
                level = l.level;
                descriptionScale = l.description;
            }
        });

        arrayResult.current.push({nameScale: d.name, score: score, level: level, descriptionScale: descriptionScale});
    })

    const resultScales = arrayResult.current.map((item, index) =>
        <div key={index}>
            <div className="title-scale">{item.nameScale}</div>
            <div className="div-description">{language.count_score + ": " + item.score + "."}</div>
            <div className="div-description">{language.level_scale + ": \"" + item.level + "\"."}</div>
            <div className="div-description div-description-scale">{item.descriptionScale}</div>
        </div>
    );

    const resultAnswers = arrayAnswer.map((itemAnswer, indexAnswer) =>
        <tr key={indexAnswer}>
            <td>{itemAnswer.numberQuestion}</td>
            <td>{item?.questions[itemAnswer.numberQuestion-1].text}</td>
            <td>{itemAnswer.answer}</td>
        </tr>  
    );
    const answers = function(){
        return(
            <table>
                <thead>
                    <tr>
                        <th>{language.number}</th>
                        <th>{language.question}</th>
                        <th>{language.answer}</th>
                    </tr>
                </thead>
                <tbody>
                {resultAnswers}
                </tbody>
            </table>
        );
    }

    const resultScalesTable = arrayResult.current.map((itemAnswer, indexAnswer) =>
        <tr key={indexAnswer}>
            <td>{itemAnswer.nameScale}</td>
            <td>{itemAnswer.score}</td>
            <td>{itemAnswer.level}</td>
        </tr>  
    );

    const scales = function(){
        return(
            <table>
                <thead>
                    <tr>
                        <th>{language.scale}</th>
                        <th>{language.score}</th>
                        <th>{language.level}</th>
                    </tr>
                </thead>
                <tbody>
                {resultScalesTable}
                </tbody>
            </table>
        );
    }

    function download(){
        const doc = new docx.Document({
            sections: [
              {
                properties: {},
                children: [
                  new docx.Paragraph({
                    text: "Результаты тестирования",
                    heading: docx.HeadingLevel.HEADING_1
                  }),
                  new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            text: ""
                        })
                    ]
                  })
                ]
              }
            ]
          });

          docx.Packer.toBlob(doc).then((blob) => {
            //console.log(blob);
            saveAs(blob, "example.docx");
            //console.log("Document created successfully");
          });
    }
    
    return (
        <div className="container">
            <div className="div-title-result">{language.result}</div>
            <div className="div-title-test">{item?.fullName}</div>
            <Chart arrayResult={arrayResult.current}/>
            <HideList title={language.scales_results}>
                {scales()}
            </HideList>
            <HideList title={language.characteristic}>
                {resultScales}
            </HideList>
            <HideList title={language.answers_questions}>
                {answers()}
            </HideList>
            <div className="close-btn" onClick={()=>{closeResult()}}>
                <img alt="" src={close}/>
            </div>
            <div className="download-btn" onClick={()=>{download()}}>
                <img alt=""/>
            </div>
        </div>
    );
}
export default ResulTest;