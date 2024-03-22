export default function Answer() {
  return (
    <div>
      <div className="text-center">I believe this image is...</div>
      <div className="flex justify-center gap-4 mt-3">
        <button className="py-3 px-16 text-md font-normal text-white bg-black border border-black rounded-md shadow-2xl duration-200 hover:bg-white hover:text-black">
          Real
        </button>
        <button className="py-3 px-16 text-md font-normal text-white bg-black border border-black rounded-md shadow-2xl duration-200 hover:bg-white hover:text-black">
          Fake
        </button>
      </div>
    </div>
  );
}
