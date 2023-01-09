import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../reducers/postsSlice";
import { Spinner } from "./spinner";
import { selectAllPosts } from "../reducers/postsSlice";


const findMaxMinId = (wordArray) => {
    let max = 0;
    let min = 0;
    try{
        max = parseInt(wordArray[0].id);
        min = parseInt(wordArray[0].id);
    
        wordArray.map((word) => {
            let compNum = parseInt(word.id);
            if (compNum > max) max = compNum;
            if (compNum < min) min = compNum;
        });
    } catch {
        console.log('wordArray is empty or type error')
    } 

    return [min.toString(), max.toString()];
};

const rangeWords = (wordArray, first, end) => {
    first = parseInt(first);
    end = parseInt(end);
    var returnArray = wordArray.filter((word) => first <= parseInt(word.id) && parseInt(word.id) <= end);
    return returnArray;
}

const speakOutText = (text) => {
    const utterThis = new SpeechSynthesisUtterance();
    utterThis.text = text;
    utterThis.lang = 'fr-french';
    utterThis.rate = 0.8;
    synth.speak(utterThis);
}


var wordPointer = 0;
var testWords;
var viewCards;
const synth = window.speechSynthesis;

const Test = () => {

    console.log("Test")
    const dispatch = useDispatch();
    const selectedWords = useSelector(selectAllPosts); // need to add more code.
    const [first, end] = findMaxMinId(selectedWords);
    const [dataInput, setDataInput] = useState({word:"", firstNum:"", endNum:""});
    const [board, setBoard] = useState({testWord:"", middle:"Are you ready?", buttom:""});
    const postStatus = useSelector((state) => state.status);
    const error = useSelector((state) => state.error);
    
    useEffect(()=> {
        console.log("useEffect");
        if(postStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    if (postStatus === "loading") {
        viewCards = <Spinner text="Words data Loading..." ></Spinner>
    } else if(postStatus === "succeeded") {
        viewCards = <div>"Loading is succeeded"</div>
        if(!dataInput.firstNum) {
            console.log("^^")
            setDataInput((prev)=> {
                return {...prev, firstNum: first, endNum: end}
            }); 
        }
    } else if (postStatus === 'failed') {
        viewCards = <div>{error}</div>
    }

    const updateForm = (value) => {
        return setDataInput((prev)=> {
            return {...prev, ...value}
        });
    };

    const updateBoard = (value) => {
        return setBoard((prev) => {
            return {...prev, ...value}
        });
    }

    const onSubmitSelect = (e) => {
        console.log("button")
        e.preventDefault();
        viewCards = `Number ${dataInput.firstNum} ~ ${dataInput.endNum} Words are selected` // it won't be re-rendered ?? doesn't work? // overwright
        testWords = rangeWords(selectedWords, dataInput.firstNum, dataInput.endNum);
        testWords = testWords.sort(()=> Math.random() - 0.5); // scrables items in the array
        //testWord = testWords[wordPointer]; // pick up a single word which is pointed out
        // ready to go
        
        updateBoard({testWord:testWords[wordPointer], middle:`Question No.${testWords[wordPointer].id}`, buttom:"Play definition then can see hint"})
        console.log("end of submit")
    }

    const onClickPlayWord = (text) => {
        speakOutText(text);
    }

    const onClickPlayDef = (word) => {
        speakOutText(word.def);
        updateBoard({buttom:word.def});
    }

    const onClickNext = () => {
        wordPointer++;
        updateBoard({testWord:testWords[wordPointer], middle:`Question No.${testWords[wordPointer].id}`, buttom:"Play definition then can see hint"})
    }

    const onSubmitInput = (e) => {
        e.preventDefault();
        if(board.testWord.word === dataInput.word) {
            updateBoard({middle:"Correct!"});
        } else {
            updateBoard({middle:"Incorrect! Try Again!"});
            setTimeout(() => {
                updateBoard({middle:`Question No.${testWords[wordPointer].id}`});
            }, "2000");
        }
    }
    
    return (
        <section>
            <div>
                <form>
                    <span>Word Range : </span>
                    <input type="number" placeholder="startNum" max={end} min={first} onChange={(e)=>{updateForm({firstNum: e.target.value})}} value={dataInput.firstNum}></input>
                    <span> ~ </span>
                    <input type="number" placeholder="endNum" max={end} min={first} onChange={(e)=>{updateForm({endNum: e.target.value})}} value={dataInput.endNum}></input>
                    <button type="submit" onClick={onSubmitSelect} >select</button>
                </form>
                <div>
                    {viewCards}
                </div>
                <div>
                    <h4>{board.middle}</h4>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        {/* if I put test.word, when it's first time page is rendered, error occur. cause there's nothing. */}
                        <button onClick={()=> {onClickPlayWord(board.testWord.word)}}>Play word</button>
                    </div>
                    <div className="col-md-4">
                        <h4>Hint</h4>
                        <button onClick={()=> {onClickPlayDef(board.testWord)}}>Play definition</button>
                        {board.buttom}
                    </div>
                    <div className="col-md-4">
                        <button onClick={onClickNext}>Next word</button>
                    </div>
                </div>
                <form onSubmit={onSubmitInput}>
                    <input type="text" placeholder="Type what you listen" onChange={(e)=> updateForm({word:e.target.value})} value={dataInput.word}></input>
                </form>
            </div>
            
            

        </section>
    )
}

export default Test;