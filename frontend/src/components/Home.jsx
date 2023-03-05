import { MathJax } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";

//------- Api call ------------------
const getQuestions = (QuestionID) => {
  return fetch(
    `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${QuestionID}`
  ).then((res) => res.json());
};

// -------- question id we add more --------
const questionID = {
  1: "AreaUnderTheCurve_901",
  2: "BinomialTheorem_901",
  3: "DifferentialCalculus2_901",
};

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //   -------- previous question --------
  const handle_previous = () => {
    if (count <= 1) {
      alert("You Can't go any back further!!");
    } else {
      setCount(count - 1);
    }
  };

  //   -------- next question --------
  const handle_next = () => {
    if (count >= Object.keys(questionID).length) {
      alert("No more questions to be proceed!!");
    } else {
      setCount(count + 1);
    }
  };

  //   -------- calling function --------
  useEffect(() => {
    showQuestions(questionID[count]);
  }, [count]);

  //   -------- api call --------
  const showQuestions = (questionID) => {
    setLoading(true);
    setError(false);
    getQuestions(questionID)
      .then((res) => {
        setQuestions(res[0]);
        setError(false);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        console.log(e);
      });
  };

  return (
    <div className={style.mainDiv}>
      <h1>
        Mathematics Questions.
        {error ? (
          <span style={{ color: "red", fontSize: "25px", marginLeft: "10px" }}>
            Server error please try again..
          </span>
        ) : (
          ""
        )}
      </h1>
      {/* -------- buttons ------ */}
      <div className={style.buttons}>
        <button onClick={handle_previous} title="previous question">
          Previous
        </button>
        <button onClick={handle_next} title="next question">
          Next
        </button>
      </div>

      {/* ------- question ------ */}
      <div className={style.questions}>
        <h2>Q{count}.</h2>
        {loading ? (
          <span>please wait...</span>
        ) : (
          <MathJax>{questions.Question}</MathJax>
        )}
      </div>
    </div>
  );
};

export default Home;
