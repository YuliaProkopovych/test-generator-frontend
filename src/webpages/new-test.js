import React, { useState }  from 'react';
import useToken from '../hooks/useToken';
import config from '../config';

const CreateTest = () => {
  const [questions, setQuestions] = useState([]);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const token = useToken().token;

  // console.log(wtf);

  // const token = wtf.token;

  const handleSubmit = (e) => {

    console.log('submitting', token);
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: token },
      body: JSON.stringify({title: title, description: description, questions: questions})
    };
    fetch(config.apiURL + '/tests/new', requestOptions);
  }

  const changeDescription = (event) => {
    setDescription(event.target.value);
  }

  const changeTitle = (event) => {
    setTitle(event.target.value);
  }

  let handleQuestionChange = (i, e) => {
    let newQuestions = [...questions];
    newQuestions[i].text = e.target.value;
    setQuestions(newQuestions);
  }

let displayNextQuestionField = (e) => {
  e.preventDefault();
    setQuestions([...questions, { text: "", answers: [], correctAnswers: [] }])
  }

  let displayNextAnswerField = (e, questionIndex) => {
    e.preventDefault();
    let newQuestions = [...questions];
    newQuestions[questionIndex].answers.push('');
    console.log(newQuestions[questionIndex].answers);
      setQuestions(newQuestions);
    }

let removeFormFields = (i) => {
    let newQuestions = [...questions];
    newQuestions.splice(i, 1);
    setQuestions(newQuestions)
}
  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    let newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = e.target.value;
    console.log(questions);
    setQuestions(newQuestions);
  }

  const changeCorrectAnswers = (questionIndex, answerIndex, event) => {
    let newQuestions = [...questions];
    if (event.target.value) {
      newQuestions[questionIndex].correctAnswers.push(answerIndex);
    }
    else {
      newQuestions[questionIndex].correctAnswers.filter(ans => ans !== answerIndex);
    }
    setQuestions(newQuestions);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>
          Title:
          <input type="text" name="title" placeholder="Title" onChange={changeTitle} />
      </label>
      <label>
          Description:
          <input type="textarea" placeholder="Description..." name="description" onChange={changeDescription} />
      </label>
      <div>
      Questions:
        {questions.map((elem, index) => (
          <div>
            {index+1}.
            <input type="textarea" name="question" onChange={e => handleQuestionChange(index, e)} />
            {
              index ?
              <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
              : null
            }
            <div>
            Answers:
              {elem.answers.map((answer, i) => (
                <div>{i+1}.
                  <input type="text" onChange={e => handleAnswerChange(index, i, e)}></input>
                  <label class="switch">
                  <input type="checkbox" onChange={(e) => changeCorrectAnswers(index, i, e)}/>
                  <span class="slider round"></span>
                </label>
                </div>
              ))}
            <button onClick={(e) => displayNextAnswerField(e, index)}>+</button>
            </div>
          </div>
        )

        )}

        <button onClick={displayNextQuestionField}>Add question</button>
      </div>
      <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

// {formValues.map((element, index) => (
//   <div className="form-inline" key={index}>
//     <label>Name</label>
//     <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
//     <label>Email</label>
//     <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
//     {
//       index ?
//         <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
//       : null
//     }
//   </div>
// ))}

export default CreateTest;
