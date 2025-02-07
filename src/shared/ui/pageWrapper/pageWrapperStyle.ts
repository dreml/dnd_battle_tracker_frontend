import React from "react";

const sider: React.CSSProperties = {
	overflow: "auto",
	height: "100vh",
	position: "sticky",
	insetInlineStart: 0,
	top: 0,
	bottom: 0,
	scrollbarWidth: "thin",
	scrollbarGutter: "stable",
};

const content: React.CSSProperties = {
	margin: "24px 16px 0",
	overflow: "initial",
};

const wrapper: React.CSSProperties = {
	padding: 24,
	background: "#FFF",
	borderRadius: 4,
};

const header: React.CSSProperties = {
	background: "#FFF",
};

export default {
	sider,
	content,
	wrapper,
	header,
};
