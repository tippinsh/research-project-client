import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

function HomePage() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 34000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white text-lg md:text-xl px-10">
      <div className="flex flex-col">
        <div className="p2">
          <TypeAnimation
            style={{ whiteSpace: "pre-line" }}
            sequence={[
              `Hello, and thank you for your interest in this research.
              This study is being conducted as part of a dissertation project.
              It forms part of the requirements to be awarded a MSc in Computer Science at Northumbria University.
            Participation in the study is voluntary and can be withdrawn at any time.
            Before deciding whether to take part, it is important for you to understand what the study involves.
    
            Please take the time to read the information on the next page carefully.`,
              1000,
            ]}
            repeat={1}
          />
        </div>
        <div className="pt-5 ml-auto">
          <Transition
            show={showButton}
            enter="transition-opacity duration-1000 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-600 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Link to="/participant-information">
              <button
                type="button"
                class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Next
              </button>
            </Link>
          </Transition>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
