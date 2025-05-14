import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import SelectPlotPage from "@/pages/SelectPlotPage.tsx";
import RecordPage from "@/pages/RecordPage.tsx";

function App() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
            <nav className="space-x-4">
                <Link to="/" className="text-blue-500 underline">Home</Link>
                <Link to="/next" className="text-blue-500 underline">Next</Link>
            </nav>

            <Routes>
                <Route path="/" element={<SelectPlotPage />} />
                <Route path="/next" element={<RecordPage />} />
            </Routes>
        </div>
    );
}

export default App;
