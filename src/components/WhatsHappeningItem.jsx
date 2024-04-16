import { IoIosMore } from "react-icons/io";
import city from "../assets/city.png";

function WhatsHappeningItem() {
  return (
    <div className="flex flex-col bg-twitteritem rounded-xl p-2 gap-5">
      <div className="text-lg font-bold pl-1">What's Happening</div>
      <div className="flex gap-2 pl-1 hover:bg-[#1F2125] cursor-pointer w-full p-2 rounded-xl">
        <div>
          <img src={city} alt="Man City players hugging" className="w-24" />
        </div>
        <div>
          <p className="font-bold">Manchester City</p>
          <p className="text-grayedout text-sm">Premier League · Last night </p>
        </div>
      </div>
      <div className="hover:bg-[#1F2125] cursor-pointer w-full p-2 rounded-xl">
        <div className="flex justify-between items-center">
          <p className="text-grayedout">Only on Twitter · Trending</p>
          <IoIosMore size={20} color="gray" />
        </div>
        <p className="font-bold">#StormKathleen</p>
        <p className="text-grayedout">8,698 posts</p>
      </div>
      <div className="hover:bg-[#1F2125] cursor-pointer w-full p-2 rounded-xl">
        <div className="pl-1">
          <div className="flex justify-between items-center">
            <p className="text-grayedout">Sports · Trending</p>
            <div>
              <IoIosMore size={20} color="gray" />
            </div>
          </div>
          <p className="font-bold">Lakers</p>
          <p className="text-grayedout">41.6K posts</p>
        </div>
      </div>
      <div className="hover:bg-[#1F2125] cursor-pointer w-full p-2 rounded-xl">
        <div className="pl-1">
          <div className="flex justify-between items-center">
            <p className="text-grayedout">Politics · Trending</p>
            <div>
              <IoIosMore size={20} color="gray" />
            </div>
          </div>
          <p className="font-bold">Joe Biden</p>
          <p className="text-grayedout">27.6K posts</p>
        </div>
      </div>
    </div>
  );
}

export default WhatsHappeningItem;
