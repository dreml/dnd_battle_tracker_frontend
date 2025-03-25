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
	ROUTE_CAMPAIGN_LIST,
	ROUTE_MONSTER_LIST,
	ROUTE_CHARACTER_LIST,
	ROUTE_LIBRARY,
	ROUTE_BATTLE_TEMPLATE_LIST,
} from "../../router";

const items: MenuProps["items"] = [
	{
		key: "/",
		label: <NavLink to="/">Домой</NavLink>,
		icon: <HomeOutlined />,
	},
	{
		key: ROUTE_CAMPAIGN_LIST,
		label: <NavLink to={ROUTE_CAMPAIGN_LIST}>Кампании</NavLink>,
		icon: <BuildOutlined />,
	},

	{
		key: ROUTE_LIBRARY,
		label: "Библиотека",
		icon: <BookOutlined />,
		children: [
			{
				key: ROUTE_MONSTER_LIST,
				label: <NavLink to={ROUTE_MONSTER_LIST}>Монстры</NavLink>,
				icon: <BugOutlined />,
			},
			{
				key: ROUTE_CHARACTER_LIST,
				label: <NavLink to={ROUTE_CHARACTER_LIST}>Персонажи</NavLink>,
				icon: <UserOutlined />,
			},
			{
				key: ROUTE_BATTLE_TEMPLATE_LIST,
				label: <NavLink to={ROUTE_BATTLE_TEMPLATE_LIST}>Шаблоны</NavLink>,
				icon: <ThunderboltOutlined />,
			},
		],
	},
	{
		key: ROUTE_ACTIVE_CAMPAIGN,
		label: <NavLink to={ROUTE_ACTIVE_CAMPAIGN}>К активной кампании</NavLink>,
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
