/**
 * API service for fetching block data from CMS/API endpoints
 */

import type { BaseBlock } from '../types/blocks';

/**
 * API response structure for block data
 */
export interface BlocksApiResponse {
  /** Array of blocks */
  blocks: BaseBlock[];
  /** Optional metadata */
  meta?: {
    page?: string;
    version?: string;
  };
}

/**
 * API error structure
 */
export interface BlocksApiError {
  /** Error message */
  message: string;
  /** Optional error code */
  code?: string;
}

/**
 * Fetch blocks for a specific page from the API/CMS
 *
 * @param pageId - The page identifier to fetch blocks for
 * @returns Promise resolving to array of blocks
 * @throws Error if the fetch fails
 */
export async function fetchBlocks(pageId: string): Promise<BaseBlock[]> {
  try {
    const response = await fetch(`/api/blocks/${pageId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch blocks: ${response.statusText}`);
    }

    const data: BlocksApiResponse = await response.json();
    return data.blocks;
  } catch (error) {
    console.error('Error fetching blocks:', error);
    throw error;
  }
}

/**
 * Fetch a single block by its unique identifier
 *
 * @param blockId - The block identifier
 * @returns Promise resolving to a single block
 * @throws Error if the fetch fails
 */
export async function fetchBlock(blockId: string): Promise<BaseBlock> {
  try {
    const response = await fetch(`/api/block/${blockId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch block: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching block:', error);
    throw error;
  }
}
