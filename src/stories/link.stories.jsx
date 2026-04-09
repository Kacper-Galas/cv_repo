import { Link } from '../components/link';
import { FiGithub, FiLinkedin, FiMail, FiGlobe } from 'react-icons/fi';

export default {
    title: 'UI/Link',
    component: Link,
};

const Template = (args) => <div style={{ padding: 24 }}><Link {...args} /></div>;

export const Default = Template.bind({});
Default.args = {
    label: 'Strona internetowa',
    href: '#',
};

export const LinkedIn = Template.bind({});
LinkedIn.args = {
    label: 'LinkedIn',
    href: '#',
    icon: <FiLinkedin />,
};

export const GitHub = Template.bind({});
GitHub.args = {
    label: 'GitHub',
    href: '#',
    icon: <FiGithub />,
};

export const Email = Template.bind({});
Email.args = {
    label: 'E-mail',
    href: 'mailto:test@test.com',
    icon: <FiMail />,
};

export const Website = Template.bind({});
Website.args = {
    label: 'Portfolio',
    href: '#',
    icon: <FiGlobe />,
};
