import {Menu, type MenuProps} from "antd";
import {
    HomeOutlined,
    BookOutlined,
    BugOutlined,
    UserOutlined,
    BuildOutlined
} from "@ant-design/icons";
import {NavLink} from "react-router";
import {ROUTE_CAMPAIGN_LIST, ROUTE_MONSTER_LIST, ROUTER_LIBRARY} from "../../router";

const items: MenuProps['items'] = [
    {
        key: '/home',
        label: <NavLink to='/'>Home</NavLink>,
        icon: <HomeOutlined />,
    },
    {
        key: ROUTE_CAMPAIGN_LIST,
        label: <NavLink to={ROUTE_CAMPAIGN_LIST}>Campaigns</NavLink>,
        icon: <BuildOutlined />
    },
    {
        key: ROUTER_LIBRARY,
        label: 'Library',
        icon: <BookOutlined />,
        children: [
            {
                key: ROUTE_MONSTER_LIST,
                label: <NavLink to={ROUTE_MONSTER_LIST}>Monsters</NavLink>,
                icon: <BugOutlined />
            },
            {
                key: 'character',
                label: <NavLink to='/'>Characters</NavLink>,
                icon: <UserOutlined />
            }
        ]
    }
];


function SideMenu() {
    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
    )
}

export default SideMenu;