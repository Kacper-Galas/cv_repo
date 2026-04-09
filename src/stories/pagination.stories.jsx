import { useState } from 'react';
import { Pagination } from '../components/ui/pagination';

export default {
    title: 'UI/Pagination',
    component: Pagination,
};

const Template = (args) => {
    const [page, setPage] = useState(args.currentPage || 1);
    return (
        <div style={{ padding: 24 }}>
            <Pagination {...args} currentPage={page} onPageChange={setPage} />
            <p style={{ fontFamily: 'sans-serif', margin: '16px 0 0', fontSize: 13, color: '#888' }}>
                Strona: {page} / {args.totalPages}
            </p>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    totalPages: 5,
    currentPage: 1,
};

export const ManyPages = Template.bind({});
ManyPages.args = {
    totalPages: 12,
    currentPage: 6,
};
