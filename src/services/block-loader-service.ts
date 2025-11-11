/**
 * Service for validating and processing block data
 */

import type { BaseBlock, BlockType } from '../types/blocks';

/**
 * List of valid block types for validation
 */
const VALID_BLOCK_TYPES: BlockType[] = [
  'hero',
  'text',
  'image',
  'cta',
  'form',
  'container',
  'grid',
  'columns',
];

/**
 * Validate that a value is a valid block structure
 *
 * @param block - Value to validate
 * @returns Type predicate indicating if value is a BaseBlock
 */
export function validateBlock(block: unknown): block is BaseBlock {
  if (!block || typeof block !== 'object') {
    return false;
  }

  const b = block as Partial<BaseBlock>;

  return (
    typeof b.id === 'string' &&
    typeof b.type === 'string' &&
    typeof b.data === 'object' &&
    b.data !== null
  );
}

/**
 * Validate an array of blocks, filtering out invalid entries
 *
 * @param blocks - Array of potential blocks
 * @returns Filtered array of valid blocks
 */
export function validateBlocks(blocks: unknown[]): BaseBlock[] {
  return blocks.filter(validateBlock);
}

/**
 * Recursively validate nested blocks
 *
 * @param block - Block to validate
 * @returns Validated block with validated children
 */
export function validateNestedBlocks(block: BaseBlock): BaseBlock {
  const validated = { ...block };

  if (validated.children && Array.isArray(validated.children)) {
    validated.children = validated.children
      .filter(validateBlock)
      .map(validateNestedBlocks);
  }

  return validated;
}

/**
 * Check if a string is a valid block type
 *
 * @param type - Type string to check
 * @returns Type predicate indicating if type is valid
 */
export function isValidBlockType(type: string): type is BlockType {
  return VALID_BLOCK_TYPES.includes(type as BlockType);
}

/**
 * Calculate the depth of nested blocks (for preventing infinite recursion)
 *
 * @param block - Block to calculate depth for
 * @returns Maximum depth of nested blocks
 */
export function calculateBlockDepth(block: BaseBlock): number {
  if (!block.children || block.children.length === 0) {
    return 1;
  }

  const childDepths = block.children.map(calculateBlockDepth);
  return 1 + Math.max(...childDepths);
}

/**
 * Maximum allowed nesting depth to prevent infinite recursion
 */
export const MAX_BLOCK_DEPTH = 10;

/**
 * Validate that block depth doesn't exceed maximum
 *
 * @param block - Block to check
 * @returns True if depth is valid, false otherwise
 */
export function validateBlockDepth(block: BaseBlock): boolean {
  return calculateBlockDepth(block) <= MAX_BLOCK_DEPTH;
}
