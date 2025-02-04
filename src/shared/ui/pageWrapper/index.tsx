import {ReactNode, useState} from "react";
import { Layout } from "antd";

import SideMenu from "../sideMenu";

import style from './pageWrapperStyle.ts';

const { Content, Sider, Header } = Layout;

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
                <SideMenu />
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