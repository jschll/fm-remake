/**
 * Block registry - Central mapping of block types to React components
 */

import type { BlockRegistry } from '../types/block-registry';
import type { BlockType } from '../types/blocks';

// Import all block components
import HeroBlock from '../components/blocks/hero-block';
import TextBlock from '../components/blocks/text-block';
import ImageBlock from '../components/blocks/image-block';
import CtaBlock from '../components/blocks/cta-block';
import FormBlock from '../components/blocks/form-block';
import ContainerBlock from '../components/blocks/container-block';
import GridBlock from '../components/blocks/grid-block';
import ColumnsBlock from '../components/blocks/columns-block';
import NavigationBlock from '../components/blocks/navigation-block';

/**
 * Registry mapping block type strings to their corresponding React components
 */
export const blockRegistry: BlockRegistry = {
  hero: HeroBlock,
  text: TextBlock,
  image: ImageBlock,
  cta: CtaBlock,
  form: FormBlock,
  container: ContainerBlock,
  grid: GridBlock,
  columns: ColumnsBlock,
  navigation: NavigationBlock,
};

/**
 * Get a block component by its type
 *
 * @param type - The block type to look up
 * @returns The component for the given type, or undefined if not found
 */
export function getBlockComponent(type: string) {
  return blockRegistry[type as BlockType];
}
