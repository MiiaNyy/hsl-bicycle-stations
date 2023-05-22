import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Home from "./pages/Home";
import Journey from "./pages/Journey";
import Station from "./pages/Station";
import Navigation from "./pages/components/Navigation";
import Stations from "./pages/Stations";
import Journeys from "./pages/Journeys";
import PageNotFound from "./pages/PageNotFound";
import Logo from "./assets/Logo";

function App() {
  return (
    <BrowserRouter>
      <div className="content">
        <Navigation />
        <Container className="mt-4 mb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journey" element={<Journeys />} />
            <Route path="/journey/:id" element={<Journey />} />
            <Route path="/station" element={<Stations />} />
            <Route path="/station/:id" element={<Station />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Container>
      </div>
      <footer>
        <Container>
          <div className="footer-container">
            <Logo />
            <div className="footer-links">
              <a className="footer-link" href="https://github.com/miiakivi">
                @miiakivi
              </a>
              <a
                className="footer-link"
                href="https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902"
              >
                info and licencing
              </a>
            </div>
          </div>
        </Container>

        <div className="footer-accent"></div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
