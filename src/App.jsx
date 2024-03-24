import Answer from "./components/Answer";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-50">
      <div className="bg-white p-6 m-3 space-y-10 shadow-2xl rounded-3xl md:p-10">
        <Answer />
      </div>
    </div>
  );
}

export default App;
