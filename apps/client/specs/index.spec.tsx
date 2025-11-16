import { render } from '@testing-library/react';
import { getData } from '../src/app/api/hello/route';

jest.mock('../src/app/api/hello/route');

describe('Page', () => {
  it('should render successfully', async () => {
    (getData as jest.Mock).mockResolvedValue({ message: 'Hello, from API!' });

    const Page = (await import('../src/app/page')).default;
    const page = await Page();
    const { container } = render(page);

    expect(container).toBeTruthy();
    expect(container.textContent).toContain('Hello, from API!');
  });
});
