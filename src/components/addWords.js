import React from "react";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useDispatch } from "react-redux";
import { addNewPost } from "../reducers/postsSlice";

const AddWords = () => {
  const dispatch = useDispatch();
  
  const [word, setWord] = useState({ id: "", word: "", def: "", ex: "" });

  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const canSave = [word.id, word.word, word.def].every(Boolean) && addRequestStatus === 'idle'

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if(canSave) {
      try {
        setAddRequestStatus('pending');
        await dispatch(addNewPost(word)).unwrap();
        setWord({ id: "", word: "", def: "", ex: "" })
      } catch (err) {
        console.error("Failed to save the post : ", err);
      } finally {
        setAddRequestStatus('idle')
      }
    }
  };

const updateForm = (value) => {
    return setWord((prev) => {
        return {...prev, ...value}
    })
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
            <Button variant="primary" type="submit" onClick={onFormSubmit} disabled={!canSave}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddWords;
