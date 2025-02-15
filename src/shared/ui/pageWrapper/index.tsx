import { ReactNode, useState } from "react";
import { Layout, notification } from "antd";

import SideMenu from "../sideMenu";

import style from "./pageWrapperStyle.ts";
import {
	NOTIFICATION_TYPES,
	NotificationT,
} from "../../../entities/notification/model";

const { Content, Sider, Header } = Layout;

type PageWrapperT = {
	header?: string;
	children?: ReactNode;
	hasMenu?: boolean;
	isError?: boolean;
	errorMessage?: string;
};

function PageWrapper({
	header,
	children,
	hasMenu = true,
	isError = false,
	errorMessage = "",
}: PageWrapperT) {
	const [collapsed, setCollapsed] = useState(false);
	const [api, contextHolder] = notification.useNotification();

	const openNotificationWithIcon = (
		type: NotificationT,
		message: string = "",
		description: string = "",
	) => {
		api[type]({
			message: message,
			description: description,
		});
	};

	if (isError) {
		openNotificationWithIcon(NOTIFICATION_TYPES.SUCCESS, "Error", errorMessage);
	}

	return (
		<Layout hasSider>
			{contextHolder}
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
