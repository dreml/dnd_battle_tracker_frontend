import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleProvider } from "@ant-design/cssinjs";

import StartPage from "../pages/startPage";
import CampaignList from "../pages/campaignList";
import MonsterList from "../pages/monsterList";

import "./app.css";

import { ROUTE_CAMPAIGN_LIST, ROUTE_MONSTER_LIST } from "../shared/router";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <StyleProvider layer>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route index element={<StartPage />} />
            <Route path={ROUTE_CAMPAIGN_LIST} element={<CampaignList />} />
            <Route path={ROUTE_MONSTER_LIST} element={<MonsterList />}></Route>
          </Routes>
        </QueryClientProvider>
      </StyleProvider>
    </BrowserRouter>
  );
}

export default App;
