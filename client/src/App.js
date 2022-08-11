import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Journey from "./pages/Journey";
import Station from "./pages/Station";
import Navigation from "./pages/components/Navigation";
import Container from "react-bootstrap/Container";

function App () {
	return (
		<BrowserRouter>
			<Navigation/>
			<Container className="mt-4 mb-4">
				<Routes>
					<Route path="/" element={ <Home/> }/>
					<Route path="/journey" element={ <Journey/> }>
						<Route path=":id" element={ <Journey/> }/>
					</Route>
					<Route path="station" element={ <Station/> }>
						<Route exact path=":id" element={ <Station/> }/>
					</Route>
				</Routes>
			</Container>
			<footer className="bg-light">
				<p>This is footer</p>
				<p className="mb-0">&copy; 2020</p>
			</footer>
		</BrowserRouter>
	);
}

export default App;
