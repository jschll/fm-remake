/**
 * Text block component - Versatile text content with variants
 */

import type { BlockComponentProps } from '../../types/blocks';
import type { TextBlockData } from '../../types/block-data';

export default function TextBlock({
  id,
  data,
}: BlockComponentProps<TextBlockData>) {
  const { content, variant = 'paragraph', alignment = 'left' } = data;

  const getTextElement = () => {
    switch (variant) {
      case 'heading':
        return <h2 className="text-block__heading">{content}</h2>;
      case 'quote':
        return (
          <blockquote className="text-block__quote">
            <p>{content}</p>
          </blockquote>
        );
      case 'paragraph':
      default:
        return <p className="text-block__paragraph">{content}</p>;
    }
  };

  return (
    <div
      id={id}
      className={`text-block text-block--${variant} text-block--align-${alignment}`}
    >
      {getTextElement()}
    </div>
  );
}
