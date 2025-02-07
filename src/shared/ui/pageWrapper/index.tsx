import { ReactNode, useState } from "react";
import { Layout } from "antd";

import SideMenu from "../sideMenu";

import style from "./pageWrapperStyle.ts";

const { Content, Sider, Header } = Layout;

type PageWrapperT = {
	header?: string;
	children?: ReactNode;
	hasMenu?: boolean;
};

function PageWrapper({ header, children, hasMenu = true }: PageWrapperT) {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout hasSider>
			{hasMenu && (
				<Sider
					style={style.sider}
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
				>
					<SideMenu />
				</Sider>
			)}
			<Layout>
				{header && (
					<Header style={style.header}>
						<h1>{header}</h1>
					</Header>
				)}
				<Content style={style.content}>
					<section style={style.wrapper}>{children}</section>
				</Content>
			</Layout>
		</Layout>
	);
}

export default PageWrapper;
