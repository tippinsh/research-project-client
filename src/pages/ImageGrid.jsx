export default function ImageGrid() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative group">
          <img
            src="https://research-project-s3-bucket.s3.eu-west-2.amazonaws.com/image3.png"
            alt=""
            className="w-72"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 px-4 text-white duration-500 bg-black opacity-0 group-hover:opacity-100 bg-opacity-40">
            <div className="flex justify-between w-full">
              <div className="font-normal">
                <p className="text-sm">Image</p>
                <p className="text-xs">Fake</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://research-project-s3-bucket.s3.eu-west-2.amazonaws.com/image3.png"
            alt=""
            className="w-72"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 px-4 text-white duration-500 bg-black opacity-0 group-hover:opacity-100 bg-opacity-40">
            <div className="flex justify-between w-full">
              <div className="font-normal">
                <p className="text-sm">Image</p>
                <p className="text-xs">Fake</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://research-project-s3-bucket.s3.eu-west-2.amazonaws.com/image3.png"
            alt=""
            className="w-72"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 px-4 text-white duration-500 bg-black opacity-0 group-hover:opacity-100 bg-opacity-40">
            <div className="flex justify-between w-full">
              <div className="font-normal">
                <p className="text-sm">Image</p>
                <p className="text-xs">Fake</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://research-project-s3-bucket.s3.eu-west-2.amazonaws.com/image3.png"
            alt=""
            className="w-72"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 px-4 text-white duration-500 bg-black opacity-0 group-hover:opacity-100 bg-opacity-40">
            <div className="flex justify-between w-full">
              <div className="font-normal">
                <p className="text-sm">Image</p>
                <p className="text-xs">Fake</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
