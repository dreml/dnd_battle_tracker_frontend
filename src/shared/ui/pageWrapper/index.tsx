import React, {ReactNode, useState} from "react";
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from "antd";

import style from './pageWrapperStyle.ts';

const { Content, Sider, Header } = Layout;

const items: MenuProps['items'] = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

type PageWrapperT = {
    header?: string;
    children?: ReactNode;
}

function PageWrapper(props: PageWrapperT) {
    const [collapsed, setCollapsed] = useState(false);

    return(
        <Layout hasSider>
            <Sider style={ style.sider }
                   collapsible
                   collapsed={collapsed}
                   onCollapse={(value) => setCollapsed(value)}
            >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout>
                { props.header &&
                    <Header style={ style.header }>
                        <h1>{props.header}</h1>
                    </Header>
                }
                <Content style={ style.content }>
                    <section style={ style.wrapper }>
                        {props.children}
                    </section>
                </Content>
            </Layout>

        </Layout>
    )

}

export default PageWrapper;