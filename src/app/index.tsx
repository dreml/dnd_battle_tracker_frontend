import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleProvider } from "@ant-design/cssinjs";

import StartPage from "../pages/startPage";
import CampaignList from "../pages/campaignList";
import MonsterList from "../pages/monsterList";
import Locale from "antd/locale/ru_RU";
import "./app.css";

import {
	CAMPAIGNS,
	CHARACTERS,
	ID,
	LIBRARY,
	MONSTERS,
	NEW,
} from "../shared/router";
import MonsterNew from "../pages/monsterNew";
import { ConfigProvider } from "antd";
import MonsterEdit from "../pages/monsterEdit";
import CharacterList from "../pages/characterList";
import CharacterNew from "../pages/characterNew";

const queryClient = new QueryClient();

function App() {
	return (
		<BrowserRouter>
			<StyleProvider layer>
				<QueryClientProvider client={queryClient}>
					<ConfigProvider locale={Locale}>
						<Routes>
							<Route index element={<StartPage />} />
							<Route path={CAMPAIGNS} element={<CampaignList />} />
							<Route path={LIBRARY}>
								<Route path={MONSTERS}>
									<Route index element={<MonsterList />} />
									<Route path={ID} element={<MonsterEdit />} />
									<Route path={NEW} element={<MonsterNew />} />
								</Route>
								<Route path={CHARACTERS}>
									<Route index element={<CharacterList />} />
									<Route path={ID} element={<CharacterNew />} />
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
