import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Container from "react-bootstrap/Container";

import Home from "./pages/Home";
import Journey from "./pages/Journey";
import Station from "./pages/Station";
import Navigation from "./pages/components/Navigation";
import Stations from "./pages/Stations";
import Journeys from "./pages/Journeys";
import PageNotFound from "./pages/PageNotFound";

function App () {
	return (
		<BrowserRouter>
			<div className="content">
				<Navigation/>
				<Container className="mt-4 mb-5">
					
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/journey" element={<Journeys />} />
						<Route path="/journey/:id" element={<Journey />} />
						<Route path="/station" element={<Stations />} />
						<Route path="/station/:id" element={<Station />} />
						<Route path="*" element={<PageNotFound/>} />
					</Routes>
				</Container>
			</div>
			<footer className="bg-warning">
				<p>This is footer</p>
				<p className="mb-0">&copy; 2020</p>
			</footer>
		</BrowserRouter>
	);
}

/*
* <Route path="/" element={ <Home/> }/>
 <Route path="/journey" element={ <Journeys/> }>
 <Route path=":id" element={ <Journey/> }/>
 </Route>
 <Route path="station" element={ <Stations/> }>
 <Route path=":id" element={ <Station/> }/>
 </Route>
*
* */

export default App;
