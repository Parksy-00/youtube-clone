import Axios from 'axios'
import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment'

function Comment(props) {

    const postId = props.postId
    const user = useSelector(state => state.user)
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const variable = {
            content: commentValue,
            writer: user.userData._id,
            postId: postId
        }

        Axios.post('/api/comment/saveComment', variable)
            .then(res => {
                if(res.data.success) {
                    console.log(res.data.result)
                    setcommentValue("")
                    props.refreshFunction(res.data.result)
                }
                else {
                    alert('코멘트를 저장하지 못했습니다.')
                }
            })
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* Comment Lists */}

            {props.commentLists.map((comment, index) => (
                !comment.responseTo &&
                <SingleComment refreshFunction={props.refreshFunction} comment={comment} key={index} postId={postId} />)
            )}

            
            {/* Root Comment Lists */}

            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해주세요"
                />
                <br />
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
