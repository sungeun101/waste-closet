// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: `https://limitless-sierra-67996.herokuapp.com/v1/questions`,
//     timeout: 1000
// })

// const QnA = ({ questionData }) => {
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState(null)
//     const [questions, setQuestions] = useState(null)

//     const [content, setContent] = useState('')
//     const [title, setTitle] = useState('')

//     const handleChange = ({ target: { value } }) => {
//         setTitle(value)
//     }
//     // const handleChange = ({ target: { value, name } }) => {
//     //     if (name === title) {
//     //         setTitle(value)
//     //     } else {
//     //         setContent(value)
//     //     }
//     // }

//     const addQuestion = title => {
//         const newQuestions = [...questions, {title}]
//         setQuestions(newQuestions)
//     }

//     const handleSubmit = async event => {
//         event.preventDefault()
//         if(!title) return
//         addQuestion(title)

//         const res = await axios.post(`https://limitless-sierra-67996.herokuapp.com/v1/questions`, {
//             "title": title,
//             "body": "내용"
//         })
//         // const res = await axios.post(`https://limitless-sierra-67996.herokuapp.com/v1/questions`, {
//         //     questiondata
//         // })
//         console.log(res.data)
//         // setQuestions(res.data)
//         // console.log(body)
//         // console.log({ questiondata })

//         setTitle('')
//     }

//     const inputRef = useRef(null)
//     useEffect(() => {
//         inputRef.current.focus()
//     }, [])

//     // const fetchQuestions = async () => {
//     //     try {
//     //         setQuestions(null)
//     //         setError(null)
//     //         setLoading(true)

//     //         const response = await axiosInstance.get();
//     //         setQuestions(response.data.results)
//     //         // setQuestions(res.data)
//     //         // console.log(response)
//     //         // console.log(response.data.results)
//     //     } catch (e) {
//     //         setError(e);
//     //     }
//     //     setLoading(false)
//     // }

//     // useEffect(() => {
//     //     fetchQuestions()
//     // }, [])

//     if (error) return <div>에러가 발생했습니다</div>;

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="title"
//                     value={title}
//                     placeholder="제목"
//                     onChange={handleChange}
//                     ref={inputRef}
//                 />
//                 {/* <input
//                     type="text"
//                     name="content"
//                     value={content}
//                     onChange={handleChange}
//                 /> */}
//                 <button type="submit">질문 남기기</button>
//             </form>


//             {loading || !questions ? (
//                 <div>Loading..</div>
//             ) : (
//                     questions.map(question => (
//                         <li key={question.id}>
//                             {question.title}
//                             - {question.body}
//                         </li>
//                     )))}

//         </div>

//     );
// };

// export default QnA;


import React, { useEffect, useState } from 'react';
import Question from '../components/Question';
import QuestionForm from '../components/QuestionForm';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `https://limitless-sierra-67996.herokuapp.com/v1/questions`,
    timeout: 1000
})

const QnA = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [questions, setQuestions] = useState([{ title: 'hello' }])

    useEffect(() => {

        const fetchQuestions = async () => {
            setError(null)
            setLoading(true)
            try {
                console.log('useEffect')
                const response = await axiosInstance.get();
                // response.data.results.map((arr, id) => addQuestion(arr.title))
                // addQuestion(response.data)
                setQuestions(response.data)
                console.log(response.data)
            } catch (e) {
                setError(e);
            }
            setLoading(false)
        }

        fetchQuestions()
    }, [])

    const addQuestion = async title => {
        const newQuestions = [...questions, { title }]
        setQuestions(newQuestions)
        // console.log(newQuestions)
    }

    return (
        <>
            {error && <div>Something went wrong!</div>}
            {loading ? (
                <div>
                    Loading...
                </div>
            ) :
                (<>
                    <QuestionForm addQuestion={addQuestion} />
                    {questions && (
                        questions.map(question => (
                            <Question
                                key={question.id}
                                question={question}
                            />)))
                    }
                </>)
            }
        </>
    )
}

export default QnA;