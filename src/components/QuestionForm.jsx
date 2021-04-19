import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@material-ui/core'

const QuestionForm = ({ addQuestion }) => {
    const [value, setValue] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if (!value) return
        addQuestion(value)
        setValue('')
        inputRef.current.focus()
    }

    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (

        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                ref={inputRef}
            />
            <Button variant="contained" color="primary">질문하기</Button>
        </form>
    );
};

export default QuestionForm;