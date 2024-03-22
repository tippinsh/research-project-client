import { useEffect, useState } from "react";
import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function Tweet() {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(function () {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/images");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };
    getData();
  }, []);

  const handleNextButtonClick = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            dolor voluptates autem error officiis velit blanditiis non neque
            dolorem asperiores!
          </p>
        </div>
        <div>
          <img
            src="https://research-project-s3-bucket.s3.eu-west-2.amazonaws.com/image6.png"
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

    // <div>
    //   {images.length > 0 && (
    //     <div>
    //       <img src={images[index].url} />
    //       <p>{images[index].description}</p>
    //     </div>
    //   )}
    //   <button onClick={handleNextButtonClick}>Submit</button>
    // </div>
  );
}
