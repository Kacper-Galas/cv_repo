import { MemoryRouter } from 'react-router-dom';
import { BlogHeader } from '../components/blog_header';

export default {
    title: 'Blog/BlogHeader',
    component: BlogHeader,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <div style={{ minHeight: 120 }}>
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
};

const Template = (args) => <BlogHeader {...args} />;

export const Default = Template.bind({});
Default.args = {};
