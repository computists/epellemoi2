import {useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { selectPostById } from '../reducers/postsSlice';
import { deletePost } from '../reducers/postsSlice';

const ShowSingleWord = () => {

    const param = useParams();
    const id = param.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userWord = useSelector((state) => selectPostById(state, id))

    const onButtonBackClick = () => {
        navigate('/words');
    }
    const onButtonDeleteClick = () => {
        dispatch(deletePost(userWord._id));
        alert("Selected word card is deleted.")
        navigate('/words');
    }

    const onButtonEditClick = () => {
        navigate(`/edit/${userWord._id}`)
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
                        </Card.Title>
                        <Card.Text> {userWord.def} </Card.Text>
                        <Card.Text> {userWord.ex} </Card.Text>
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