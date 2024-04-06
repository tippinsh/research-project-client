import SearchBar from "./SearchBar";
import WhatsHappeningItem from "./WhatsHappeningItem";

function RecommendationBar() {
  return (
    <div className="pr-4 md:pr-6 mt-4 ml-3">
      <div className="flex flex-col gap-4">
        <SearchBar />
        <WhatsHappeningItem />
      </div>
    </div>
  );
}

export default RecommendationBar;
