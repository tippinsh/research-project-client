import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./styles.css";

import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

export default function Tweet(props) {
  return (
    <div>
      <div className="flex-row gap-4 max-w-lg">
        <div className="flex items-center">
          <img
            src="src/assets/dummy-profile.jpeg"
            alt=""
            className="h-12 w-12 rounded-full mr-4"
          />
          <div>
            <div className="flex">
              <p className="font-bold pr-1 text-offwhite">
                {props.twitterName}
              </p>
              <img
                src="src/assets/twitter-verified.png"
                alt=""
                className="w-6 h-6 mr-2"
              />
            </div>
            <div>
              <p className="pr-3 text-grayedout">@{props.twitterName}</p>
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
            <p className="text-lg text-offwhite">{props.context}</p>
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
      <p className="mt-3 text-grayedout">
        3.17 PM · Mar 24, 2024 · <span className="text-white">563.5K</span>{" "}
        Views
      </p>
      <div className="w-full border-t border-grayedout mt-3 border-opacity-50"></div>
      <div className="w-full">
        <div className="flex text-grayedout mt-3 justify-between">
          <div className="flex items-center justify-center">
            <ChatBubbleOvalLeftIcon className="h-6 w-6 mr-1 transition ease-in-out delay-150 hover:scale-110 duration-300 cursor-pointer" />
            <p className="text-sm">500</p>
          </div>
          <div className="flex items-center justify-center">
            <ArrowPathRoundedSquareIcon className="h-6 w-6 mr-1" />
            <p className="text-sm">1.1K</p>
          </div>
          <div className="flex items-center justify-center">
            <HeartIcon className="h-6 w-6 mr-1" />
            <p className="text-sm">7K</p>
          </div>
          <div className="flex items-center justify-center">
            <BookmarkIcon className="h-6 w-6 mr-1" />
            <p className="text-sm">314</p>
          </div>
        </div>
        <div className="w-full border-t border-grayedout mt-4 "></div>
      </div>
    </div>
  );
}
