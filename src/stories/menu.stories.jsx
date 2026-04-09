import { Menu } from '../components/ui/menu';
import { FiHome, FiUser, FiCode, FiMail } from 'react-icons/fi';

export default {
    title: 'UI/Menu',
    component: Menu,
};

const items = [
    { label: 'Strona główna', href: '/', icon: <FiHome />, key: 'home' },
    { label: 'O mnie', href: '#o-mnie', icon: <FiUser />, key: 'about' },
    { label: 'Projekty', href: '#projekty', icon: <FiCode />, key: 'projects' },
    { label: 'Kontakt', href: '#kontakt', icon: <FiMail />, key: 'contact' },
];

const Template = (args) => <div style={{ padding: 24, background: '#fff' }}><Menu {...args} /></div>;

export const Horizontal = Template.bind({});
Horizontal.args = {
    items,
    orientation: 'horizontal',
    activeItem: 'home',
};

export const Vertical = Template.bind({});
Vertical.args = {
    items,
    orientation: 'vertical',
    activeItem: 'about',
};

export const NoIcons = Template.bind({});
NoIcons.args = {
    items: items.map(({ icon, ...rest }) => rest),
    orientation: 'horizontal',
};
