import { screen, render, fireEvent } from '@testing-library/react';

import MainSearch from '../main-search';

describe('MainSearch component', () => {
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const props = {
    onTextChange: handleChange,
    onSubmit: handleSubmit,
  };
  const namespaces = { one: 'One', two: 'Two', three: 'Three' };

  test('should render', () => {
    const { asFragment } = render(<MainSearch {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render with namespaces selector', () => {
    const { asFragment } = render(
      <MainSearch
        {...props}
        namespaces={namespaces}
        selectedNamespace="one"
        onNamespaceChange={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should submit the search term', () => {
    render(<MainSearch {...props} />);
    fireEvent.submit(screen.getByRole('form'));
    expect(handleSubmit).toHaveBeenCalled();
  });

  test('should detect the search term', () => {
    render(<MainSearch {...props} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'foo' },
    });
    expect(handleChange).toHaveBeenCalledWith('foo');
  });

  test('should set searchTerm', () => {
    render(<MainSearch {...props} searchTerm="blah" />);
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(
      'blah'
    );
  });
});
