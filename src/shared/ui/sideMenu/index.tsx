import { Menu, type MenuProps } from "antd";

import {
  HomeOutlined,
  BookOutlined,
  BugOutlined,
  UserOutlined,
  BuildOutlined,
  ThunderboltOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router";
import {
  ROUTE_ACTIVE_CAMPAIGN,
  ROUTE_BATTLE_LIST,
  ROUTE_CAMPAIGN_LIST,
  ROUTE_MONSTER_LIST,
  ROUTER_CHARACTER_LIST,
  ROUTER_LIBRARY,
} from "../../router";

const items: MenuProps["items"] = [
  {
    key: "/",
    label: <NavLink to="/">Home</NavLink>,
    icon: <HomeOutlined />,
  },
  {
    key: ROUTE_CAMPAIGN_LIST,
    label: <NavLink to={ROUTE_CAMPAIGN_LIST}>Campaigns</NavLink>,
    icon: <BuildOutlined />,
  },
  {
    key: ROUTE_BATTLE_LIST,
    label: <NavLink to={ROUTE_BATTLE_LIST}>Battles</NavLink>,
    icon: <ThunderboltOutlined />,
  },
  {
    key: ROUTER_LIBRARY,
    label: "Library",
    icon: <BookOutlined />,
    children: [
      {
        key: ROUTE_MONSTER_LIST,
        label: <NavLink to={ROUTE_MONSTER_LIST}>Monsters</NavLink>,
        icon: <BugOutlined />,
      },
      {
        key: ROUTER_CHARACTER_LIST,
        label: <NavLink to={ROUTER_CHARACTER_LIST}>Characters</NavLink>,
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: ROUTE_ACTIVE_CAMPAIGN,
    label: <NavLink to={ROUTE_ACTIVE_CAMPAIGN}>Active campaign</NavLink>,
    icon: <PlayCircleOutlined />,
  },
];

function SideMenu() {
  const location = useLocation();
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[location.pathname]}
      items={items}
    />
  );
}

export default SideMenu;
