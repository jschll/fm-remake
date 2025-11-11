/**
 * BlockLoader - Main component for rendering dynamic block configurations
 *
 * This component receives an array of blocks and renders the appropriate
 * React component for each block type. Supports nested blocks through
 * recursive rendering.
 */

import type { BlockLoaderProps } from '../types/blocks';
import { getBlockComponent } from '../utils/block-registry';
import { validateBlock } from '../services/block-loader-service';
import BlockErrorBoundary from './block-error-boundary';

export default function BlockLoader({ blocks, className }: BlockLoaderProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {blocks.map((block) => {
        // Validate block structure
        if (!validateBlock(block)) {
          console.warn('Invalid block structure:', block);
          return null;
        }

        // Get the component for this block type
        const Component = getBlockComponent(block.type);

        if (!Component) {
          console.warn(`Unknown block type: ${block.type}`);
          return (
            <div key={block.id} className="block-unknown">
              <p>Unknown block type: {block.type}</p>
            </div>
          );
        }

        // Render the component with error boundary
        return (
          <BlockErrorBoundary
            key={block.id}
            blockId={block.id}
            blockType={block.type}
          >
            <Component id={block.id} data={block.data} children={block.children} />
          </BlockErrorBoundary>
        );
      })}
    </div>
  );
}
