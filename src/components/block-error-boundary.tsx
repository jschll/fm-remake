/**
 * Error boundary for individual blocks
 * Prevents a single block error from breaking the entire page
 */

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  blockId: string;
  blockType?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class BlockErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      `Error in block ${this.props.blockId} (type: ${this.props.blockType}):`,
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="block-error" data-block-id={this.props.blockId}>
          <div className="block-error__content">
            <p className="block-error__message">
              Failed to render block: {this.props.blockType || 'unknown'}
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="block-error__details">
                <summary>Error details</summary>
                <pre>{this.state.error.message}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default BlockErrorBoundary;
