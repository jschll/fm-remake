/**
 * Columns block component - Flexible column layout with distribution controls
 * Supports nested child blocks arranged in columns
 */

import type { BlockComponentProps } from '../../types/blocks';
import type { ColumnsBlockData } from '../../types/block-data';
import BlockLoader from '../block-loader';

export default function ColumnsBlock({
  id,
  data,
  children,
}: BlockComponentProps<ColumnsBlockData>) {
  const { distribution = 'equal', gap = 'md' } = data;

  const getColumnsClassName = () => {
    let className = `columns-block columns-block--gap-${gap}`;

    if (distribution === 'equal' || distribution === 'auto') {
      className += ` columns-block--${distribution}`;
    } else if (Array.isArray(distribution)) {
      className += ` columns-block--custom`;
    }

    return className;
  };

  const getColumnStyle = (index: number) => {
    if (Array.isArray(distribution)) {
      const total = distribution.reduce((sum, val) => sum + val, 0);
      const fraction = distribution[index] / total;
      return { flex: `${fraction * 100}%` };
    }
    return undefined;
  };

  if (!children || children.length === 0) {
    return null;
  }

  return (
    <div id={id} className={getColumnsClassName()}>
      {children.map((child, index) => (
        <div
          key={child.id}
          className="columns-block__column"
          style={getColumnStyle(index)}
        >
          <BlockLoader blocks={[child]} />
        </div>
      ))}
    </div>
  );
}
