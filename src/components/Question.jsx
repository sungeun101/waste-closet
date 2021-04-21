import React from 'react';

const Question = ({ question }) => (

  <tr>
    <td>{question.title}</td>
    <td>{question.body}</td>
  </tr>
);

export default Question;
