import { render } from '@testing-library/react';
import { SelectedItems } from './SelectedItems';
import { describe, expect, it } from 'vitest';

describe('SelectedItems Component', () => {
  it('should not render if there are no selected items', () => {
    const { container } = render(<SelectedItems />);
    expect(container.firstChild).toBeNull();
  });
});
