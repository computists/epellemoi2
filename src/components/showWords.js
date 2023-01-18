import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Spinner } from "./spinner";
import { selectAllPosts, fetchPosts } from '../reducers/postsSlice';
import { UserContext } from "../contexts/user.context";

const WordExcerpt = ({userWord}) => {
    return (
        <Col>
            <Card style={{ width: '25rem' }}  key={userWord._id}>
                <Card.Header>
                    <Link to={`/words/${userWord.id}`}>
                        {userWord.word}
                    </Link> 
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted"> {userWord.id} </Card.Subtitle>
                    <Card.Title> {userWord.def} </Card.Title>
                    <Card.Text> {userWord.ex} </Card.Text>
                    
                </Card.Body>
                {/* <Card.Footer>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Footer> */}
            </Card>
        </Col>
    )
}

const ShowWords = () => {
    const dispatch = useDispatch();
    const wordCards = useSelector(selectAllPosts);

    const postStatus = useSelector((state) => state.status);
    const error = useSelector((state) => state.error);
    const { user } = useContext(UserContext);
    let viewCards;
    

    useEffect(() => {
        if(postStatus === 'idle') {
            dispatch(fetchPosts(user));
        }
    }, [postStatus, dispatch]);

    if(postStatus === 'loading') {
        viewCards = <Spinner text="Loading..." />
    } else if (postStatus === 'succeeded') {
        console.log(wordCards)
        viewCards = wordCards.map(
            (userWord) => (
                <WordExcerpt userWord={userWord} />
            )
        )
        
    } else if (postStatus === 'failed') {
        viewCards = <div>{error}</div>
    }

    return (
        <div>
            <Row xs={1} md={2} lg={3}>
                {viewCards}
            </Row>
        </div>
    )
}

export default ShowWords;