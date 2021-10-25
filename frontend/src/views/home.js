import Home from '../components/home';
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

function AppHome() {
    return (
        <div className="main block child-tab-bar">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Scorboard" key="1">
                    <Home />
                </TabPane>
                <TabPane tab="Live Matches" key="2">
                    <Home />
                </TabPane>
                <TabPane tab="Statistics" key="3">
                    <Home />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default AppHome;