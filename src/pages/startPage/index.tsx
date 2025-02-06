import {Layout, Row, Col, Divider, Typography} from "antd";
import {NavLink} from "react-router";
import {ROUTE_ACTIVE_CAMPAIGN, ROUTE_CAMPAIGN_LIST} from "../../shared/router";
const { Content } = Layout;
const { Title } = Typography

import style from "./startPageStyle.ts";

function StartPage () {
    return(
        <Layout >
            <Content style={style.content}>
                <Row>
                    <Col span={14} offset={5}>
                        <Row>
                            <Col span={24}>
                                <Title>Добро пожаловать в DnD battle tracker</Title>

                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <NavLink to={ROUTE_CAMPAIGN_LIST}>Я мастер</NavLink>
                                <Divider/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <NavLink to={ROUTE_ACTIVE_CAMPAIGN}>Я игрок</NavLink>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default StartPage;