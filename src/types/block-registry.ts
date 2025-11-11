/**
 * Type definitions for the block registry system
 */

import type { ComponentType } from 'react';
import type { BlockType, BlockComponentProps } from './blocks';

/**
 * A block component is a React component that accepts BlockComponentProps
 */
export type BlockComponent = ComponentType<BlockComponentProps<unknown>>;

/**
 * Registry mapping block types to their React components
 */
export type BlockRegistry = Record<BlockType, BlockComponent>;
