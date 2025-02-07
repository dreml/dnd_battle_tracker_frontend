import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MonsterList from "./components/MonsterList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
	const queryClient = new QueryClient();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<MonsterList />
			</QueryClientProvider>
			{/*   <a href="https://vitejs.dev" target="_blank"> */}
			{/*     <img src={viteLogo} className="logo" alt="Vite logo" /> */}
			{/*   </a> */}
			{/*   <a href="https://react.dev" target="_blank"> */}
			{/*     <img src={reactLogo} className="logo react" alt="React logo" /> */}
			{/*   </a> */}
			{/* </div> */}
			{/* <h1>Vite + React</h1> */}
			{/* <div className="card"> */}
			{/*   <button onClick={() => setCount((count) => count + 1)}> */}
			{/*     count is {count} */}
			{/*   </button> */}
			{/*   <p> */}
			{/*     Edit <code>src/App.tsx</code> and save to test HMR */}
			{/*   </p> */}
			{/* </div> */}
			{/* <p className="read-the-docs"> */}
			{/*   Click on the Vite and React logos to learn more */}
			{/* </p> */}
		</>
	);
}

export default App;
