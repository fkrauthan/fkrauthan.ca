import Cafe from "react-ionicons/lib/Cafe";

export default function BuyACoffee() {
  return (
    <a href="https://www.buymeacoffee.com/fkrauthan" target="_blank" rel="noopener noreferrer">
      <div className="absolute z-20 bg-yellow-400 top-28 left-0 p-2 text-gray-800 shadow-lg rounded-r hover:bg-yellow-200">
        <div>Buy me</div>
        <div className="text-center pt-2">
          <Cafe className="inline-block" width="30px" height="30px" />
        </div>
      </div>
    </a>
  );
}
