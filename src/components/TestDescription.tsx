import { useContext, Fragment } from "react";
import { DataContext } from "./context";
import '../sass/components/_testdescription.scss';
import { testObject, keyScaleObject } from "./types";

type ListTestsProps = {
    message: string;
    test: testObject;
}

function TestDescription({message, test}: ListTestsProps){
    const language = useContext(DataContext);

    const testDescriptionArray = test?.descriptionArray?.map((item, index)=>
        <p key={index} className="text-block">{item}</p>
    );

    const questions = test?.questions.map((item, index) => 
        <div key={index}>{(index + 1) + ". " + item.text + "."}</div>
    );

    function groupAnswerScale(arr: keyScaleObject[]){
        let groups = [];
        for (let element of arr) {
          let existingGroups = groups.filter(group => group.answer === element.answer);
          if (existingGroups.length > 0) {
            existingGroups[0].numbers.push(element.number);
          }
          else {
            let newGroup = {
              answer: element.answer,
              numbers: [element.number]
            };
            groups.push(newGroup);
          }
        }
        return groups;
    }

    const trScales = test?.scales.map((item, index) =>
        {
            const groupScale = groupAnswerScale(item.key);
            //console.log(groupScale);
            // const numbersQuestions = groupScale[0].numbers.map((itemNumber, indexNumber) =>
            //     <span key={indexNumber}>{itemNumber} </span>
            // );
            const numbersQuestions = groupScale[0].numbers.join("; ");
            
            const additionalTr = groupScale.map((itemAdditional, indexAdditional) =>
                {
                    if(indexAdditional !== 0){
                    // const numbersQuestionsAdditional = itemAdditional.numbers.map((itemNumberAdd, indexNumberAdd) =>
                    // <span key={indexNumberAdd}>{itemNumberAdd} </span>
                    // );
                    const numbersQuestionsAdditional = itemAdditional.numbers.join("; ");
                    
                    return(
                        <tr key={indexAdditional} className="tr-additional">
                            <td>{itemAdditional.answer}</td>
                            <td>{numbersQuestionsAdditional}</td>
                        </tr>
                    );
                    } else return null;
                }
            );

            return(
                <Fragment key={index}>
                    <tr key={index}>
                        <td rowSpan={groupScale.length}>{item.name}</td>
                        <td>{groupScale[0].answer}</td>
                        <td>{numbersQuestions}</td>
                    </tr>
                    {
                        additionalTr
                    }
                </Fragment>
            );
        } 
    );

    const scalesDescription = test?.scales.map((item, index) =>
        <div key={index} className="div-description-instruction">
            <span>{item.name}:</span>
            <span> </span>
            <span>{item.description}</span>
        </div>
    );

    function onScroll(event: WheelEvent){
        
        //console.log(event.deltaY);
        if(event.deltaY > 0){
            window.scrollBy({top: 100, left: 0, behavior: "smooth"});
        }
        //console.log(event.target instanceof Element ? event.target. : "");
    }
    
    return(
        <div className="div-test-description">
            {
                !test ?
                <div className="div-zero">{language.not_change_test}</div>
                :
                <div className="overflow-div" onWheel={(event)=>{onScroll(event.nativeEvent)}}>
                    <h1 className="title">{test.fullName}</h1>
                    <div className="div-description-instruction">
                            <span>{language.key_words}</span>
                            <span> </span>
                            <span>{test.keyWords}.</span>
                        </div>
                    <section className="text-block">
                        {test.description}
                    </section>
                    <section>
                        {testDescriptionArray}
                    </section>
                    <section className="questionnaire">
                        <h3>{language.questionnaire}</h3>
                        <div className="div-description-instruction">
                            <span>{language.instruction}</span>
                            <span> </span>
                            <span>{test.instruction}</span>
                        </div>
                        <h4>{language.questions}</h4>
                        <div className="questions">
                            {questions}
                        </div>
                        <div className="div-description-instruction">
                            <span>{language.result_processing}</span>
                            <span> </span>
                            <span>{test.resultProcessing}</span>
                        </div>
                        <table className="table-description">
                            <thead>
                                <tr className="tr-thead">
                                    <th>
                                        {language.scales}
                                    </th>
                                    <th>
                                        {language.possible_answer}
                                    </th>
                                    <th>
                                        {language.numbers_questions}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {trScales}
                            </tbody>
                        </table>
                        <h4>{language.scales}</h4>
                        <div>
                            {scalesDescription}
                        </div>
                    </section>
                </div>
                
            }
        </div>
    );
}
export default TestDescription;