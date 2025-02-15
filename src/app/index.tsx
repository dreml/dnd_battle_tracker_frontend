import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleProvider } from "@ant-design/cssinjs";

import StartPage from "../pages/startPage";
import CampaignList from "../pages/campaignList";
import MonsterList from "../pages/monsterList";

import "./app.css";

import { CAMPAIGNS, ID, LIBRARY, MONSTERS, NEW } from "../shared/router";
import MonsterNew from "../pages/monsterNew";

const queryClient = new QueryClient();

function App() {
	return (
		<BrowserRouter>
			<StyleProvider layer>
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route index element={<StartPage />} />
						<Route path={CAMPAIGNS} element={<CampaignList />} />
						<Route path={LIBRARY}>
							<Route path={MONSTERS}>
								<Route index element={<MonsterList />} />
								<Route path={ID} element={<MonsterNew />} />
								<Route path={NEW} element={<MonsterNew />} />
							</Route>
						</Route>
					</Routes>
				</QueryClientProvider>
			</StyleProvider>
		</BrowserRouter>
	);
}

export default App;
