import InputDemo from "./examples/InputDemo";
import TableDemo from "./examples/TableDemo";

function App() {
  return (
    <div className="min-h-screen bg-black text-gray-200 p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-neon-pink text-center drop-shadow-neon">
          ⚡ UI Components Demo ⚡
        </h1>

        <section className="p-6 rounded-lg border border-neon-blue shadow-neon bg-black">
          <h2 className="text-2xl font-semibold text-neon-green mb-4">
            Neon Input Fields
          </h2>
          <InputDemo />
        </section>

        <section className="p-6 rounded-lg border border-neon-pink shadow-neon bg-black">
          <h2 className="text-2xl font-semibold text-neon-blue mb-4">
            Neon Data Table
          </h2>
          <TableDemo />
        </section>
      </div>
    </div>
  );
}

export default App;
