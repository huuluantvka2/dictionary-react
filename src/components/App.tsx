import {
    DesktopOutlined,
    PieChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, Typography } from 'antd';
import React, { useState } from 'react';
import FreeDictionary from './FreeDictionary';
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Tra từ điển', '1', <PieChartOutlined />),
    getItem('Khác', '2', <DesktopOutlined />),
];

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: 'rgb(0 21 41 / 94%)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Title type="secondary" style={{ color: 'white', margin: 0 }} level={3}>English Dictionary</Title></Header>
                <Content style={{ margin: '0 16px' }}>
                    <FreeDictionary />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Dev ©2023 Created by Luan</Footer>
            </Layout>
        </Layout>
    );
};

export default App;