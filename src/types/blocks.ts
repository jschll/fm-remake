/**
 * Core block type definitions for the block loader system
 */

/**
 * Supported block types in the system
 */
export type BlockType =
  | 'hero'
  | 'text'
  | 'image'
  | 'cta'
  | 'form'
  | 'container'
  | 'grid'
  | 'navigation'
  | 'columns';

/**
 * Base block interface - all blocks extend this
 */
export interface BaseBlock {
  /** Unique identifier for the block */
  id: string;
  /** Block type for registry lookup */
  type: BlockType;
  /** Type-specific data */
  data: Record<string, unknown>;
  /** Support for nested blocks */
  children?: BaseBlock[];
}

/**
 * Generic block interface with typed data
 */
export interface Block<T = Record<string, unknown>> extends BaseBlock {
  data: T;
}

/**
 * Block loader component props
 */
export interface BlockLoaderProps {
  /** Array of blocks to render */
  blocks: BaseBlock[];
  /** Optional className for the wrapper */
  className?: string;
}

/**
 * Individual block component props with typed data
 */
export interface BlockComponentProps<T = Record<string, unknown>> {
  /** Unique block identifier */
  id: string;
  /** Block-specific data */
  data: T;
  /** Optional nested child blocks */
  children?: BaseBlock[];
}
