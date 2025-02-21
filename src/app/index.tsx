import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleProvider } from "@ant-design/cssinjs";

import StartPage from "../pages/startPage";
import CampaignList from "../pages/campaignList";
import MonsterList from "../pages/monsterList";

import "./app.css";

import { CAMPAIGNS, ID, LIBRARY, MONSTERS, NEW } from "../shared/router";
import MonsterNew from "../pages/monsterNew";
import { ConfigProvider } from "antd";
import { validateMessages } from "../shared/config/form.ts";
import MonsterEdit from "../pages/monsterEdit";

const queryClient = new QueryClient();

function App() {
	return (
		<BrowserRouter>
			<StyleProvider layer>
				<QueryClientProvider client={queryClient}>
					<ConfigProvider form={{ validateMessages }}>
						<Routes>
							<Route index element={<StartPage />} />
							<Route path={CAMPAIGNS} element={<CampaignList />} />
							<Route path={LIBRARY}>
								<Route path={MONSTERS}>
									<Route index element={<MonsterList />} />
									<Route path={ID} element={<MonsterEdit />} />
									<Route path={NEW} element={<MonsterNew />} />
								</Route>
							</Route>
						</Routes>
					</ConfigProvider>
				</QueryClientProvider>
			</StyleProvider>
		</BrowserRouter>
	);
}

export default App;
