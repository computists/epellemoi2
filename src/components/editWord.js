import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectPostBy_Id } from "../reducers/postsSlice";
import { editPost } from "../reducers/postsSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EditWord = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();
    const word_Id = param.id;
    const [word, setWord] = useState({_id: "", id:"", word:"", def:"", ex:""});
    const canSave = [word.id, word.word, word.def].every(Boolean)

    const userWord = useSelector((state) => selectPostBy_Id(state, word_Id))
    
    useEffect(() => {
        console.log(userWord)
        setWord(userWord);
        
    }, [userWord]);
    
    const updateForm = (value) => {
        return setWord((prev) => {
            return {...prev, ...value};
        });
    };

    const onBackButtonClick = () => {
        navigate(`/words/${word.id}`);
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(editPost(word)).unwrap();
        } catch (err) {
            console.error("Failed to edit the post : ", err);
          } finally {
            navigate('/words')
          }
    }

    
    return (
        <div>
            <Card style={{ width: "50%" }}>
                <Card.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Word ID
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                        className="mb-3"
                        type="text"
                        placeholder="Number for new word"
                        value={word.id}
                        onChange={(e) => {updateForm({id: e.target.value})}}
                        />
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Word
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                        className="mb-3"
                        type="text"
                        placeholder="Put your new word"
                        value={word.word}
                        onChange={(e) => {updateForm({word: e.target.value})}}
                        />
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Definition
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                        type="text"
                        placeholder="Definition of your new word"
                        value={word.def}
                        onChange={(e) => {updateForm({def: e.target.value})}}
                        />
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        example
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                        type="text"
                        placeholder="Example"
                        value={word.ex}
                        onChange={(e) => {updateForm({ex: e.target.value})}}
                        />
                    </Col>
                    </Form.Group>
                    <Button variant="primary" onClick={onBackButtonClick}>
                    Back
                    </Button>
                    <Button variant="primary" type="submit" onClick={onFormSubmit} disabled={!canSave}>
                    Submit
                    </Button>
                </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default EditWord;