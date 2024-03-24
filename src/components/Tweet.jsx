import { useEffect, useState } from "react";
import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function Tweet(props) {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);

  return (
    <div className="flex gap-4 max-w-lg">
      <img
        src="src/assets/dummy-profile.jpeg"
        alt=""
        className="h-11 w-11 rounded-full"
      />
      <div className="">
        <div className="flex">
          <p className="font-bold pr-1">User1234</p>
          <img
            src="src/assets/twitter-verified.png"
            alt=""
            className="w-6 h-6 mr-2"
          />
          <p className="pr-3 text-gray-400">@User1234</p>
          <p className="text-gray-400">· 17h</p>
        </div>
        <div className="pt-2 pb-2">
          <p>{props.context}</p>
        </div>
        <div>
          <img
            src={props.url}
            className="w-full h-full rounded-xl object-cover"
          ></img>
          <div className="flex text-gray-500 mt-3 justify-between">
            <div className="flex items-center justify-center">
              <ChatBubbleOvalLeftIcon className="h-6 w-6 mr-1" />
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
              <ChartBarIcon className="h-6 w-6 mr-1" />
              <p className="text-sm">1.7M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
