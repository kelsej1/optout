import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Unsubscribe from "./pages/Unsubscribe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/unsubscribe" element={<Unsubscribe />} />
      </Routes>
    </Router>
  );
}

export default App;
