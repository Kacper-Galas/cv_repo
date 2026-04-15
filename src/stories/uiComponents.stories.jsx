import React, { useState } from 'react';
import { FiBell, FiStar, FiCode, FiInfo, FiZap, FiHeart } from 'react-icons/fi';
import { IconNote } from '../components/ui/iconNote';
import { Badge } from '../components/ui/badge';
import { Tag } from '../components/ui/tag';
import { Card } from '../components/ui/card';
import { Divider } from '../components/ui/divider';
import { Alert } from '../components/ui/alert';
import { Collapse, CollapseItem } from '../components/ui/collapse';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarGroup } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { Tooltip } from '../components/ui/tooltip';

export default {
    title: 'UI/Components',
    parameters: {
        layout: 'padded',
    },
};

export const IconNoteDemo = () => (
    <div style={{ display: 'flex', gap: 32, padding: 48 }}>
        <IconNote icon={<FiBell size={20} />} note="You have new notifications" />
        <IconNote icon={<FiStar size={20} />} note="Mark as favourite" variant="ghost" />
        <IconNote icon={<FiCode size={20} />} note="View source code on GitHub" variant="circle" />
        <IconNote icon={<FiInfo size={20} />} note="This tooltip appears on the right side" placement="right" variant="ghost" />
    </div>
);
IconNoteDemo.storyName = 'IconNote (Tooltip)';

export const TooltipDemo = () => (
    <div style={{ display: 'flex', gap: 32, padding: 48 }}>
        <Tooltip content="Top tooltip" placement="top"><button>Hover me</button></Tooltip>
        <Tooltip content="Bottom tooltip" placement="bottom"><button>Hover me</button></Tooltip>
        <Tooltip content="Left tooltip" placement="left"><button>Hover me</button></Tooltip>
        <Tooltip content="Right tooltip" placement="right"><button>Hover me</button></Tooltip>
    </div>
);

export const BadgeDemo = () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', padding: 24 }}>
        <Badge count={5}><FiBell size={24} /></Badge>
        <Badge count={99}><FiBell size={24} /></Badge>
        <Badge count={200} max={99}><FiBell size={24} /></Badge>
        <Badge dot><FiBell size={24} /></Badge>
        <Badge count={3} color="#3b82f6"><FiBell size={24} /></Badge>
        <Badge count={12} />
    </div>
);

export const TagDemo = () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', padding: 24 }}>
        <Tag>Default</Tag>
        <Tag variant="primary">Primary</Tag>
        <Tag variant="filled">Filled</Tag>
        <Tag variant="outlined">Outlined</Tag>
        <Tag variant="ghost">Ghost</Tag>
        <Tag variant="filled" color="#3b82f6">Blue</Tag>
        <Tag variant="filled" color="#22c55e">Green</Tag>
        <Tag icon={<FiZap size={11} />} variant="primary">With Icon</Tag>
        <Tag closable onClose={() => alert('closed')}>Closable</Tag>
        <Tag size="lg" variant="primary">Large</Tag>
        <Tag size="sm" variant="primary">Small</Tag>
    </div>
);

export const CardDemo = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, padding: 24 }}>
        <Card title="Default Card" subtitle="Subtitle here" extra={<Tag variant="primary" size="sm">New</Tag>}>
            This is card content with some description text.
        </Card>
        <Card variant="outlined" title="Outlined Card" hoverable>Hoverable outlined card</Card>
        <Card variant="dark" title="Dark Card" subtitle="Dark variant" footer="Updated 2 hours ago">Content on dark card</Card>
        <Card variant="accent" title="Accent Card">Left border accent variant</Card>
        <Card variant="filled" title="Filled Card" footer={<><FiHeart size={13} /> Liked by 42</>}>Filled background card</Card>
    </div>
);

export const DividerDemo = () => (
    <div style={{ padding: 24 }}>
        <p>Content above</p>
        <Divider />
        <p>Content below plain divider</p>
        <Divider label="Section" />
        <p>Content with labeled divider</p>
        <Divider label="Left aligned" align="left" />
        <p>Left aligned label</p>
        <Divider dashed />
        <p>Below dashed divider</p>
    </div>
);

export const AlertDemo = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, maxWidth: 560 }}>
        <Alert type="info" title="Info" message="This is an informational message." />
        <Alert type="success" title="Success!" message="Your changes have been saved." closable />
        <Alert type="warning" message="Please review your inputs before proceeding." />
        <Alert type="error" title="Error" message="Something went wrong. Please try again." closable />
    </div>
);

export const CollapseDemo = () => (
    <Collapse style={{ maxWidth: 560, margin: 24 }}>
        <CollapseItem title="What is this?" icon={<FiInfo />}>
            This is the content of the first accordion item. It supports any rich content.
        </CollapseItem>
        <CollapseItem title="How does it work?" defaultOpen>
            The collapse component uses framer-motion for smooth height animation.
        </CollapseItem>
        <CollapseItem title="Disabled item" disabled>Hidden</CollapseItem>
    </Collapse>
);

export const SwitchDemo = () => {
    const [on, setOn] = useState(false);
    const [sm, setSm] = useState(true);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
            <Switch checked={on} onChange={setOn} label="Enable notifications" />
            <Switch checked={sm} onChange={setSm} size="sm" label="Small switch" />
            <Switch checked={true} size="lg" label="Large switch (disabled)" disabled />
        </div>
    );
};

export const TextareaDemo = () => {
    const [val, setVal] = useState('');
    return (
        <div style={{ maxWidth: 480, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Textarea
                label="Description"
                placeholder="Write something..."
                value={val}
                onChange={e => setVal(e.target.value)}
                maxLength={200}
            />
            <Textarea
                label="Auto resize"
                placeholder="Grows with content..."
                autoResize
            />
            <Textarea
                label="With error"
                error="This field is required"
                value=""
            />
        </div>
    );
};

export const AvatarDemo = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Avatar size="xs" name="Kacper Galas" />
            <Avatar size="sm" name="Kacper Galas" />
            <Avatar size="md" name="Kacper Galas" />
            <Avatar size="lg" name="Kacper Galas" color="#ff5246" />
            <Avatar size="xl" name="Kacper Galas" color="#3b82f6" />
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Avatar name="John Doe" shape="square" />
            <Avatar name="Jane Smith" shape="rounded" color="#22c55e" />
            <Avatar icon={<FiStar />} color="#f59e0b" />
        </div>
        <AvatarGroup max={3}>
            <Avatar name="Alice K" />
            <Avatar name="Bob M" color="#3b82f6" />
            <Avatar name="Carol L" color="#22c55e" />
            <Avatar name="Dave P" color="#f59e0b" />
            <Avatar name="Eve Q" color="#a855f7" />
        </AvatarGroup>
    </div>
);

export const ProgressDemo = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, maxWidth: 400 }}>
        <Progress value={70} label="React" />
        <Progress value={55} label="Node.js" size="sm" />
        <Progress value={90} label="HTML/CSS" size="lg" color="#22c55e" />
        <Progress value={40} label="TypeScript" striped />
        <div style={{ display: 'flex', gap: 32 }}>
            <Progress variant="circle" value={75} />
            <Progress variant="circle" value={50} color="#3b82f6" />
            <Progress variant="circle" value={30} color="#22c55e" />
        </div>
    </div>
);
