import { render } from '@testing-library/react';
import { DownloadLink } from './DownloadLink';
import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest';

if (!window.URL.createObjectURL) {
  window.URL.createObjectURL = vi.fn(() => 'blob:url');
}

if (!window.URL.revokeObjectURL) {
  window.URL.revokeObjectURL = vi.fn();
}

describe('DownloadLink Component', () => {
  beforeEach(() => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:url');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should renders the anchor element', () => {
    const { container } = render(
      <DownloadLink data="abc" filename="file.csv" />
    );
    expect(container.querySelector('a')).toBeInTheDocument();
  });
});
