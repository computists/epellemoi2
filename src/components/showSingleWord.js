import {useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { selectPostById } from '../reducers/postsSlice';
import { deletePost } from '../reducers/postsSlice';
import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';
import { setStatus } from '../reducers/postsSlice';

const ShowSingleWord = () => {
    const { user } = useContext(UserContext);

    const param = useParams();
    const id = param.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userWord = useSelector((state) => selectPostById(state, id))

    const onButtonBackClick = () => {
        navigate('/words');
    }
    const onButtonDeleteClick = () => {
        dispatch(deletePost({id:userWord._id, user:user}));
        alert("Selected word card is deleted.");
        dispatch(setStatus("idle"));
        navigate('/words');
    }

    const onButtonEditClick = () => {
        navigate(`/edit/${userWord._id}`)
    }

    // ref : https://codepen.io/sgestrella/pen/QodzgY
    // ref : https://wicg.github.io/speech-api/#examples-synthesis
    const synth = window.speechSynthesis;
    const onButtonPlayClick = (props) => {
        const utterThis = new SpeechSynthesisUtterance();
        utterThis.text = props;
        utterThis.lang = 'fr-french';
        utterThis.rate = 0.7;
        synth.speak(utterThis);
    }

    return (
        <div>
            <section>
                <Card style={{ width: '50%', textAlign:"center" }}>
                    <Card.Header>
                            <span>Word ID : </span>
                            {userWord.id}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title> 
                            {userWord.word}
                            <Button variant="primary" onClick={() => {onButtonPlayClick(userWord.word)}}>listen</Button> 
                        </Card.Title>
                        <Card.Text> 
                            {userWord.def}
                            <Button variant="primary" onClick={() => {onButtonPlayClick(userWord.def)}}>listen</Button>  
                        </Card.Text>
                        <Card.Text> 
                            {userWord.ex}
                            <Button variant="primary" onClick={() => {onButtonPlayClick(userWord.ex)}}>listen</Button>  
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={onButtonBackClick}>Back</Button>
                        <Button variant="primary" onClick={onButtonDeleteClick}>Delete</Button>
                        <Button variant="primary" onClick={onButtonEditClick}>Edit</Button>
                    </Card.Footer>
                </Card>
            </section>
        </div>
      );
}

export default ShowSingleWord;