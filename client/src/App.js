import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Home from "./pages/Home";
import { Journey } from "./pages/Journey";
import Station from "./pages/Station";

function App () {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={ <Home/> }/>
				<Route path="/journey" element={ <Journey/> }/>
				
				<Route path="station" element={ <Station/> }>
					<Route path=":id" element={ <Station/> }/>
				</Route>
			
			</Routes>
		</BrowserRouter>
	);
}

export default App;
