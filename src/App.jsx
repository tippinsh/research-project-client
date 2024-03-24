import Answer from "./components/Answer";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-100">
      <div className="p-6 m-3 space-y-10 shadow-2xl rounded-3xl md:p-10 bg-white">
        <Answer />
      </div>
    </div>
  );
}

export default App;
