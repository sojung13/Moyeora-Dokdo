import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import { quitPopup } from "../main/PopupButton.js";

import { getQuiz } from "../../api/quizApi.js";
import "../css/OXQuizPopup.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// 문제 개수 선택 화면
function OXQuizPopup() {
  const quitPopup = () => {
    const QuizPop = document.getElementById("QuizPopup");
    // const EcoPop = document.getElementById("EcoPopup");
    // const HistoryPop = document.getElementById("HistoryPopup");
    QuizPop.style.display = "none";
    // EcoPop.style.display = "none";
    // HistoryPop.style.display = "none";
    setQuizNum(0);
    setQuizProgress(0);
    setAnswerCorrect(0);
    setSelected(false);
    setQuizNum(0);
  };
  const [quizNum, setQuizNum] = useState(0);
  const [selected, setSelected] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [quizProgress, setQuizProgress] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(0);
  const MySwal = withReactContent(Swal);
  const [badges, setBadges] = useState([]);
  useEffect(() => {
    const getBadges = async () => {
      await axios
        .get(`https://k7d204.p.ssafy.io/api/badge`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setBadges(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBadges();
  }, [quizNum]);
  useEffect(() => {
    if (quizNum !== 0) {
      getQuiz(quizNum)
        .then((res) => {
          setQuiz(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {};
  }, [quizNum]);

  const quizFive = async () => {
    if (badges.quizFive === false) {
      await axios.post(
        `https://k7d204.p.ssafy.io/api/badge`,
        {
          badge: "quizFive",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      MySwal.fire({
        title: <h3>뱃지 획득!</h3>,
        icon: "info",
        html: <p>퀴즈5 만점 뱃지 획득!</p>,
      });
    }
  };
  const quizTen = async () => {
    if (badges.quizTen === false) {
      await axios.post(
        `https://k7d204.p.ssafy.io/api/badge`,
        {
          badge: "quizTen",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      MySwal.fire({
        title: <h3>뱃지 획득!</h3>,
        icon: "info",
        html: <p>퀴즈10 만점 뱃지 획득!</p>,
      });
    }
  };
  const quizFifteen = async () => {
    if (badges.quizFifteen === false) {
      await axios.post(
        `https://k7d204.p.ssafy.io/api/badge`,
        {
          badge: "quizFifteen",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      MySwal.fire({
        title: <h3>뱃지 획득!</h3>,
        icon: "info",
        html: <p>퀴즈15 만점 뱃지 획득!</p>,
      });
    }
  };
  const accessToken = sessionStorage.getItem("accessToken");
  const setQuizResult = async (result) => {
    await axios
      .put(
        "https://k7d204.p.ssafy.io/api/quiz",
        {
          quiz: result + "",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        setSelected(false);
      })
      .catch((err) => {
        console.log(err);
      });
    if (quizNum === 5) {
      quizFive();
    }
    if (quizNum === 10) {
      quizTen();
    }
    if (quizNum === 15) {
      quizFifteen();
    }
    setQuizNum(0);
    setQuizProgress(0);
    setAnswerCorrect(0);
  };

  const SelectQuizNum = () => {
    return (
      <div className='OXQuizInWrapper'>
        <div>
          <button
            className='selectQuizButton'
            onClick={() => {
              setQuizNum(5);
              setSelected(true);
            }}
          >
            5 문제
          </button>
        </div>
        <div>
          <button
            className='selectQuizButton'
            onClick={() => {
              setQuizNum(10);
              setSelected(true);
            }}
          >
            10 문제
          </button>
        </div>
        <div>
          <button
            className='selectQuizButton'
            onClick={() => {
              setQuizNum(15);
              setSelected(true);
            }}
          >
            15 문제
          </button>
        </div>
      </div>
    );
  };

  // Quiz 끝나면 점수와 함께 보여줄 화면
  const EndQuiz = () => {
    return (
      <div>
        <div
          className='QuizTitle'
          style={{ marginTop: "-10px 0 10px", fontSize: "70px" }}
        >
          점수
          {answerCorrect}
        </div>
        {quizNum === answerCorrect ? (
          <div
            className='QuizTitle'
            style={{ marginTop: "-10px 0 10px", fontSize: "70px" }}
          >
            축하합니다! 모든 문제를 맞추셨습니다
          </div>
        ) : null}
        <div>
          {/* 처음으로 돌아가기 버튼 */}
          <button
            className='endQuizButton'
            onClick={() => {
              setSelected(false);
              setQuizNum(0);
              setQuizProgress(0);
              setAnswerCorrect(0);
            }}
          >
            다시 풀기
          </button>
          {/* 점수 등록 할 것 */}
          {quizNum === answerCorrect ? (
            <button
              className='endQuizButton2'
              onClick={() => {
                setQuizResult(quizNum);
                quitPopup();
              }}
            >
              종료하기
            </button>
          ) : null}
        </div>
      </div>
    );
  };
  const correct = () => {
    setAnswerCorrect((answerCorrect) => answerCorrect + 1);
  };
  const notCorrect = () => {
    Swal.fire({
      icon: "error",
      title: "오답!",
      text: "땡! 틀렸습니다!",
    });
  };

  // Custom Progress Bar
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#FFF562" : "#308fe8",
    },
  }));

  // Progress Bar
  const LinearProgressWithLabel = (props) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <BorderLinearProgress variant='determinate' {...props} />
        </Box>
      </Box>
    );
  };
  LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };
  return (
    <div style={{ position: "relative" }}>
      <div className='OXQuizContainer'>
        <div className='QuizTitle'>Quiz</div>
        <img
          src='/assets/icons/cancel.png'
          id='quitButton'
          onClick={quitPopup}
          className='quitPopup'
          alt='NOIMAGE'
        ></img>
        {selected ? (
          <div className='OXQuizInWrapper'>
            <div className={quizProgress < quizNum ? "notHidden" : "hidden"}>
              <div className='QuizProgressBar'>
                <LinearProgressWithLabel
                  value={(quizProgress / quizNum) * 100}
                />
              </div>
              <div className='QuizText'>{quiz[quizProgress]?.quizText}</div>

              <div className='QuizOX'>
                <button
                  className='OX_O'
                  onClick={() => {
                    if (quiz[quizProgress]?.answer.slice(0, 1) === "O") {
                      correct();
                    } else {
                      notCorrect();
                    }
                    setQuizProgress((quizProgress) => quizProgress + 1);
                  }}
                >
                  O
                </button>
                <button
                  className='OX_X'
                  onClick={() => {
                    if (quiz[quizProgress]?.answer.slice(0, 1) === "X") {
                      correct();
                    } else {
                      notCorrect();
                    }
                    setQuizProgress((quizProgress) => quizProgress + 1);
                  }}
                >
                  X
                </button>
              </div>
            </div>
            <div className={quizProgress < quizNum ? "hidden" : "notHidden"}>
              <EndQuiz />
            </div>
          </div>
        ) : (
          <SelectQuizNum />
        )}
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          position: "absolute",
          opacity: "30%",
          zIndex: "9",
        }}
      ></div>
    </div>
  );
}
export default OXQuizPopup;
