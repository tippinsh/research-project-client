import InstructImage from "../assets/screenshot.png";
import { Link } from "react-router-dom";

export default function Instructions() {
  return (
    <div className="min-h-screen bg-black text-black">
      <div className="text-center bg-amber-400 text-sm md:text-base py-2">
        <h1>
          On the next page you will be presented with a interface that looks
          like this.
        </h1>
        <h1>Please take note of the instructions below and click next.</h1>
      </div>
      <div className="flex items-center justify-center">
        <div>
          <img
            src={InstructImage}
            alt="Screenshot of a annotated tweet showing instructions on how to complete the survey"
          />
          <div className="mt-4">
            <Link to="/survey">
              <button
                type="button"
                className="w-full hover:text-white text-white border border-gray-600 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
