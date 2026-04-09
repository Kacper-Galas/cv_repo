import { Tabs } from '../components/ui/tabs';
import { FiCode, FiServer, FiLayout } from 'react-icons/fi';

export default {
    title: 'UI/Tabs',
    component: Tabs,
};

const Template = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
    tabs: [
        { label: 'React', content: <p style={{ fontFamily: 'sans-serif' }}>Treść zakładki React</p> },
        { label: 'Node.js', content: <p style={{ fontFamily: 'sans-serif' }}>Treść zakładki Node.js</p> },
        { label: 'CSS', content: <p style={{ fontFamily: 'sans-serif' }}>Treść zakładki CSS</p> },
        { label: 'TypeScript', content: <p style={{ fontFamily: 'sans-serif' }}>Treść zakładki TypeScript</p> },
    ],
    defaultTab: 0,
};

export const WithIcons = Template.bind({});
WithIcons.args = {
    tabs: [
        { label: 'Frontend', icon: <FiLayout />, content: <p style={{ fontFamily: 'sans-serif' }}>Frontend content</p> },
        { label: 'Backend', icon: <FiServer />, content: <p style={{ fontFamily: 'sans-serif' }}>Backend content</p> },
        { label: 'Kod', icon: <FiCode />, content: <p style={{ fontFamily: 'sans-serif' }}>Kod content</p> },
    ],
    defaultTab: 1,
};
