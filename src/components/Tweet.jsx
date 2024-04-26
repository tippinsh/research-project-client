import "./styles.css";
import SlotCounter from "react-slot-counter";
import dummyProfile from "../assets/dummy-profile.jpeg";
import twitterVerified from "../assets/twitter-verified.png";

import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export default function Tweet(props) {
  Tweet.propTypes = {
    url: PropTypes.string.isRequired,
    context: PropTypes.string,
    questionIndex: PropTypes.number.isRequired,
    isWithContext: PropTypes.bool.isRequired,
    comments: PropTypes.string.isRequired,
    retweets: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
    bookmarked: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired,
    twitterName: PropTypes.string.isRequired,
  };

  return (
    <div>
      <div className="flex-row gap-4 max-w-xl">
        <div className="flex items-center">
          <img
            src={dummyProfile}
            alt=""
            className="h-12 w-12 rounded-full mr-4"
          />
          <div>
            <div className="flex">
              <p className="font-bold pr-1 text-offwhite text-sm md:text-lg">
                {props.twitterName}
              </p>
              <img src={twitterVerified} alt="" className="w-6 h-6 mr-2" />
            </div>
            <div>
              <p className="pr-3 text-grayedout text-sm md:text-lg">
                @{props.twitterName}
              </p>
            </div>
          </div>
          <div className="ml-auto">
            <button className="bg-buttonwhite px-5 py-2 rounded-full text-black font-bold text-sm md:text-md hover:opacity-90">
              Follow
            </button>
          </div>
        </div>
        <div>
          <div className="pt-2 pb-2 ">
            {props.isWithContext && (
              <p className="text-offwhite text-sm md:text-lg">
                {props.context}
              </p>
            )}
          </div>
        </div>
        <div>
          <img
            src={props.url}
            className="w-full h-full rounded-xl object-cover"
            alt="Tweet Image"
          />
        </div>
      </div>
      <p className="mt-3 text-grayedout text-sm md:text-lg">
        3.17 PM · Mar 24, 2024 ·{" "}
        <span className="text-white">
          <SlotCounter value={props.views} />
        </span>{" "}
        Views
      </p>
      <div className="w-full border-t border-grayedout mt-3 border-opacity-50"></div>
      <div className="w-full">
        <div className="flex text-grayedout mt-3 justify-between">
          <div className="flex items-center justify-center">
            <ChatBubbleOvalLeftIcon className="h-6 w-6 mr-1 transition ease-in-out delay-150 hover:scale-110 duration-300 cursor-pointer" />
            <p className="text-sm">
              <SlotCounter value={props.comments} />
            </p>
          </div>
          <div className="flex items-center justify-center">
            <ArrowPathRoundedSquareIcon className="h-6 w-6 mr-1" />
            <p className="text-sm">
              <SlotCounter value={props.retweets} />
            </p>
          </div>
          <div className="flex items-center justify-center">
            <HeartIcon className="h-6 w-6 mr-1" />
            <p className="text-sm">
              <SlotCounter value={props.likes} />
            </p>
          </div>
          <div className="flex items-center justify-center">
            <BookmarkIcon className="h-6 w-6 mr-1" />
            <p className="text-sm">
              <SlotCounter value={props.bookmarked} />
            </p>
          </div>
        </div>
        <div className="w-full border-t border-grayedout border-opacity-50 mt-4 "></div>
      </div>
    </div>
  );
}
