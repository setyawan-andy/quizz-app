import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const TOTAL_QUESTIONS = 10;

const usersResult = [
  {
    name: "Neil Sims",
    username: "@neil_sims",
    avatar: "/assets/images/avatar-1.jpg",
    percentage: 20,
  },
  {
    name: "Bonnie Green",
    username: "@bonnie_green",
    avatar: "/assets/images/avatar-2.jpg",
    percentage: 40,
  },
  {
    name: "Liam Smith",
    username: "@liam_smith",
    avatar: "/assets/images/avatar-3.jpg",
    percentage: 60,
  },
  {
    name: "Sara Jones",
    username: "@sara_jones",
    avatar: "/assets/images/avatar-4.jpg",
    percentage: 80,
  },
  {
    name: "Thomaz Lean",
    username: "@thomaz_lean",
    avatar: "/assets/images/avatar-5.jpg",
    percentage: 90,
  },
];

const QuizScreen = ({ questions }) => {
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const intervalRef = useRef();
  const [timer, setTimer] = useState("00:00:00");

  const checkAnswer = (e) => {
    const answer = e.currentTarget.value;
    const correct = questions[number].answer === answer;
    if (correct) {
      setScore((prev) => prev + 1);
    }
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].answer,
    };
    setUserAnswers((prev) => [...prev, answerObject]);
  };

  const getRemainingTime = (endtime) => {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (deadline) => {
    let { total, days, hours, minutes, seconds } = getRemainingTime(deadline);
    if (total > 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      clearInterval(intervalRef.current);
    }
  };

  const clearTimer = (endtime) => {
    setTimer("00:00:15");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const id = setInterval(() => {
      startTimer(endtime);
    }, 1000);
    intervalRef.current = id;
  };

  const getDeadlineTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 15);
    return deadline;
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (intervalRef.current) clearInterval(intervalRef.current);
    clearTimer(getDeadlineTime());
    if (nextQuestion === TOTAL_QUESTIONS) {
      setShowResult(true);
    } else {
      setNumber(nextQuestion);
      setSelectedIndex(undefined);
    }
  };

  useEffect(() => {
    clearTimer(getDeadlineTime());
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextQuestion();
    }, 15000);

    return () => clearInterval(interval);
  }, [number]);

  const percentageResult = (score / TOTAL_QUESTIONS) * 100;
  const allUserResult = [
    ...usersResult,
    {
      name: "You",
      username: "@you",
      avatar: "/assets/images/profile.png",
      percentage: percentageResult,
    },
  ].sort((a, b) => b.percentage - a.percentage);

  console.log(allUserResult);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 p-4 w-full max-w-sm rounded-lg border shadow-md sm:p-4 border-gray-700">
        {showResult ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-bold leading-none text-white">
                Your Rank
              </h5>
              <span className="text-sm font-medium text-blue-500">
                Result percentage
              </span>
            </div>
            {allUserResult.map((user, index) => (
              <div
                key={index}
                className="mb-4 border-b border-gray-700 flex justify-between items-center py-3"
              >
                <div className="flex space-x-3 items-center flex-1">
                  <div className="w-8 h-8">
                    <Image
                      className="rounded-full"
                      src={user.avatar}
                      width={100}
                      height={100}
                      alt="avatar"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-400">{user.username}</p>
                  </div>
                </div>
                <div
                  className={`${
                    user.username === "@you" ? "text-blue-500" : "text-white"
                  } inline-flex items-center text-base font-semibold`}
                >
                  {user.percentage}%
                </div>
              </div>
            ))}
            <Link href="/">
              <a className="py-2 px-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-xs">
                Pick another category
              </a>
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex justify-between">
              <h5 className="mb-3 text-base font-semibold md:text-xl text-white">
                {`${number + 1} / ${TOTAL_QUESTIONS}`}
              </h5>
              <h5 className="mb-3 text-base md:text-xl text-blue-500">
                {timer}
              </h5>
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: questions[number].question }}
              className="text-sm font-normal text-gray-400 mb-5"
            />
            <ul className="space-y-4 text-gray-500">
              {questions[number].options.map((option, index) => (
                <div key={index} onClick={() => setSelectedIndex(index)}>
                  <button
                    value={option}
                    onClick={checkAnswer}
                    className={`${
                      selectedIndex === index ? "bg-gray-500" : "bg-gray-700"
                    } w-full flex items-center p-3 text-xs rounded-lg group hover:shadow hover:bg-gray-500 text-white`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: option }} />
                  </button>
                </div>
              ))}
            </ul>
            <div className="my-6 space-y-3">
              <button
                disabled={selectedIndex === undefined}
                className={`${
                  selectedIndex === undefined
                    ? "bg-blue-200 hover:bg-blue-200"
                    : "bg-blue-500 hover:bg-blue-600"
                } w-full py-2 px-3 flex justify-center items-center text-white text-sm rounded-md`}
                onClick={nextQuestion}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;
