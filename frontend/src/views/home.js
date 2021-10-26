import { Tabs } from 'antd';
import Team from '../components/home/teams';
import Player from '../components/home/players';

const { TabPane } = Tabs;

function AppHome() {
    return (
        <div className="main block child-tab-bar">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Teams" key="1">
                    <Team />
                </TabPane>
                <TabPane tab="Players" key="2">
                    <Player />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default AppHome;