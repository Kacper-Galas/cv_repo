import { FiInfo } from 'react-icons/fi';
import { Collapse, CollapseItem } from '../components/ui/collapse';

export default {
    title: 'UI/Collapse',
    component: Collapse,
};

export const Default = () => (
    <div style={{ maxWidth: 560, margin: '24px auto' }}>
        <Collapse>
            <CollapseItem title="What is this?" icon={<FiInfo />}>
                This is the content of the first accordion item. It supports any rich content.
            </CollapseItem>
            <CollapseItem title="How does it work?" defaultOpen>
                This version uses only bottom separators and unfolds the content under the active row.
            </CollapseItem>
            <CollapseItem title="Disabled item" disabled>
                Hidden
            </CollapseItem>
        </Collapse>
    </div>
);