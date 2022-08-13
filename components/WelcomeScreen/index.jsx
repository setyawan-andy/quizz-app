import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const rules = [
  {
    title: "Pick one out of 3 categories that you mastering of",
  },
  {
    title: "You'll be given 10 questions to answer",
  },
  {
    title: "You'll have 15 seconds to answer each question",
  },
  {
    title: "You'll get 1 point for each correct answer",
  },
  {
    title: "You can't go back to previous question",
  },
];

const categories = [
  {
    title: "General Question",
    image: "/assets/images/brain.png",
    popular: true,
    slug: "9",
  },
  {
    title: "Computer Science",
    image: "/assets/images/laptop.png",
    popular: false,
    slug: "18",
  },
  {
    title: "Animals",
    image: "/assets/images/cat.png",
    popular: false,
    slug: "27",
  },
];

const WelcomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [slug, setSlug] = useState("9");

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 p-4 w-full max-w-xl rounded-lg border shadow-md sm:p-4 border-gray-700">
        <h5 className="mb-3 text-base font-semibold md:text-xl text-white">
          Let&lsquo;s train our brain!
        </h5>
        <p className="text-sm font-normal text-gray-400 mb-5">
          Before we begin, here are some rules to help you get the most out of
          correct answers.
        </p>
        <ul className="space-y-4 text-gray-500">
          {rules.map((rule, index) => (
            <li key={index} className="flex space-x-2 items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-xs font-normal text-gray-400">
                {rule.title}
              </span>
            </li>
          ))}
        </ul>
        <ul className="my-6 space-y-3">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => (
                setSelectedCategory(index), setSlug(category.slug)
              )}
            >
              <div
                className={`${
                  selectedCategory === index ? "bg-gray-500" : "bg-gray-600"
                } cursor-pointer flex items-center p-3 text-base font-bold rounded-lg group hover:shadow hover:bg-gray-500 text-white`}
              >
                <Image
                  src={category.image}
                  alt="general"
                  width={30}
                  height={30}
                />
                <span className="flex-1 ml-3 whitespace-nowrap text-xs">
                  {category.title}
                </span>
                {category.popular && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium rounded bg-gray-700 text-gray-400">
                    Popular
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
        <Link href={`/quiz/${slug}`}>
          <a className="w-full py-2 px-3 flex justify-center items-center text-white text-sm bg-blue-500 rounded-md hover:bg-blue-600">
            Start
          </a>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeScreen;
