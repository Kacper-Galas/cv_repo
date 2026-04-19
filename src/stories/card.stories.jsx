import { FiHeart } from 'react-icons/fi';
import { Card } from '../components/ui/card';
import { Tag } from '../components/ui/tag';

export default {
    title: 'UI/Card',
    component: Card,
};

const Template = (args) => (
    <div style={{ padding: 24, maxWidth: 360 }}>
        <Card {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    variant: 'editorial',
    eyebrow: 'React',
    title: 'Architektura komponentów bez nadmiaru abstrakcji',
    subtitle: 'Krótsza forma, bardziej zbliżona do kart używanych na homepage.',
    cover: <div style={{ height: 180, background: 'linear-gradient(135deg, #101820 0%, #32465a 100%)' }} />,
    coverLabel: 'Case Study',
    extra: <Tag variant="primary" size="sm">New</Tag>,
    children: 'To jest karta w stylu editorial, bliższa siatce artykułów na stronie głównej.',
    meta: <><span>19 kwietnia 2026</span><span>8 min czytania</span></>,
};

export const OutlinedHoverable = Template.bind({});
OutlinedHoverable.args = {
    variant: 'outlined',
    title: 'Outlined Card',
    hoverable: true,
    children: 'Hoverable outlined card',
};

export const Dark = Template.bind({});
Dark.args = {
    variant: 'dark',
    title: 'Dark Card',
    subtitle: 'Dark variant',
    footer: 'Updated 2 hours ago',
    children: 'Content on dark card',
};

export const Filled = Template.bind({});
Filled.args = {
    variant: 'filled',
    title: 'Filled Card',
    footer: <><FiHeart size={13} /> Liked by 42</>,
    children: 'Filled background card',
};