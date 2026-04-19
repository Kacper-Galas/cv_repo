import React from 'react';
import { Tag } from '../components/ui/tag';
import { Table } from '../components/ui/table';

export default {
    title: 'UI/Table',
    component: Table,
    parameters: {
        layout: 'fullscreen',
    },
};

const tableDataSource = [
    { key: 1, author: 'Kacper Gałas', topic: 'Architektura komponentów UI', status: 'Opublikowany', readTime: '8 min' },
    { key: 2, author: 'Anna Nowak', topic: 'Design systems bez nadmiaru', status: 'W review', readTime: '6 min' },
    { key: 3, author: 'Marek Zieliński', topic: 'Warstwa treści w aplikacjach', status: 'Draft', readTime: '11 min' },
];

const createColumns = () => ([
    { title: 'Autor', dataIndex: 'author', key: 'author' },
    { title: 'Temat', dataIndex: 'topic', key: 'topic' },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (value) => React.createElement(
            Tag,
            {
                variant: value === 'Opublikowany' ? 'filled' : 'outlined',
                color: value === 'Opublikowany' ? '#22c55e' : undefined,
            },
            value
        ),
    },
    { title: 'Czytanie', dataIndex: 'readTime', key: 'readTime', align: 'right' },
]);

const Template = (args) => (
    <div style={{ padding: 24 }}>
        <Table {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    columns: createColumns(),
    dataSource: tableDataSource,
};

export const Striped = Template.bind({});
Striped.args = {
    columns: createColumns(),
    dataSource: tableDataSource,
    striped: true,
};

export const Compact = Template.bind({});
Compact.args = {
    columns: createColumns(),
    dataSource: tableDataSource,
    size: 'sm',
};

export const Empty = Template.bind({});
Empty.args = {
    columns: createColumns(),
    dataSource: [],
};