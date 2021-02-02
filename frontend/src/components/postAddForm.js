import React, { useState } from 'react'

const PostAddForm = ({headerText, formHandle, placeholder, postId, rows=4}) => {
    const [text, setText]=useState('')
    return (
        <div class="post-form">
            {headerText && (
                <div className="add-post-header">
                    <h3>{headerText}</h3>
                </div>
            )}
            <form class="form my-1" onSubmit={(e)=>{
                e.preventDefault();
                postId !== null ? formHandle({ text }, postId) : formHandle({ text });
                setText('')
            }}>
            <textarea
                name="text"
                value={text}
                onChange={(e)=>setText(e.target.value)}
                cols="30"
                rows={rows}
                placeholder={placeholder}
                required
                style={{marginLeft: '2rem', width: '92%'}}
            ></textarea>
            <input type="submit" style={{width: '20%' }} class="btn btn-dark my-1" value="Post" />
            </form>
      </div>
    )
}

export default PostAddForm
