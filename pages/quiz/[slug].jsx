import QuizScreen from "../../components/QuizScreen";

const Quiz = ({ questions }) => {
  return (
    <div>
      <QuizScreen questions={questions} />
    </div>
  );
};

export default Quiz;

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const res = await fetch(
    `${process.env.BASE_URL}amount=10&category=${slug}&difficulty=easy&type=multiple`
  );
  const data = await res.json();
  const questions = data.results.map((question) => {
    const correct_answer = question.correct_answer;
    const options = [...question.incorrect_answers, correct_answer];
    return {
      question: question.question,
      options: options.sort(() => Math.random() - 0.5),
      answer: correct_answer,
    };
  });
  return {
    props: {
      questions,
    },
  };
};
