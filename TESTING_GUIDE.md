# React Testing Guide - What to Test vs What Not to Test

This guide provides comprehensive testing strategies for your Vite + React + TypeScript application using Vitest and React Testing Library.

## 📋 Table of Contents

- [What TO Test](#what-to-test)
- [What NOT to Test](#what-not-to-test)
- [Component Testing Strategies](#component-testing-strategies)
- [Testing React Hooks](#testing-react-hooks)
- [Testing Styles](#testing-styles)
- [Testing Patterns](#testing-patterns)
- [Best Practices](#best-practices)

## ✅ What TO Test

### 1. **User Behavior & Interactions**

```typescript
// ✅ Test user clicking on elements
it('should navigate to student details when tile is clicked', () => {
  const mockOnClick = vi.fn();
  render(<StudentTile {...studentProps} onClick={mockOnClick} />);

  fireEvent.click(screen.getByTestId('student-name'));
  expect(mockOnClick).toHaveBeenCalledWith(studentProps.id);
});
```

### 2. **Component Rendering & Props**

```typescript
// ✅ Test that components render with correct data
it('should render student information correctly', () => {
  const student = { id: 1, name: 'John Doe', email: 'john@test.com' };
  render(<StudentTile {...student} />);

  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@test.com')).toBeInTheDocument();
});
```

### 3. **Conditional Rendering & Logic**

```typescript
// ✅ Test different UI states based on conditions
it('should show "No address provided" when address is not given', () => {
  render(<StudentTile id={1} name="John" email="john@test.com" />);
  expect(screen.getByText('No address provided')).toBeInTheDocument();
});

it('should show loading state initially', () => {
  render(<Home />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
```

### 4. **State Changes**

```typescript
// ✅ Test state updates and side effects
it('should fetch and display students on mount', async () => {
  render(<Home />);

  // Wait for loading to complete
  await waitForElementToBeRemoved(screen.getByText('Loading...'));

  // Check that students are displayed
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('Bob')).toBeInTheDocument();
});

// ✅ Test error states
it('should show error message when API fails', async () => {
  vi.spyOn(studentsService, 'getAllStudents')
    .mockRejectedValue(new Error('API Error'));

  render(<Home />);

  await waitFor(() => {
    expect(screen.getByText('Error loading students.')).toBeInTheDocument();
  });
});
```

### 5. **Form Handling & Input Validation**

```typescript
// ✅ Test form submissions and input handling
it('should call onSubmit with form data', () => {
  const mockSubmit = vi.fn();
  render(<StudentForm onSubmit={mockSubmit} />);

  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'John Doe' }
  });
  fireEvent.click(screen.getByText('Submit'));

  expect(mockSubmit).toHaveBeenCalledWith({ name: 'John Doe' });
});
```

### 6. **Custom Hooks Logic**

```typescript
// ✅ Test custom hook behavior
import { renderHook, act } from "@testing-library/react";

it("should handle download state correctly", () => {
  const { result } = renderHook(() => useDownload());

  act(() => {
    result.current.startDownload("file.pdf");
  });

  expect(result.current.isDownloading).toBe(true);
});
```

### 7. **Accessibility & ARIA Attributes**

```typescript
// ✅ Test accessibility features
it('should have proper accessibility attributes', () => {
  render(<StudentTile {...studentProps} />);

  const tile = screen.getByRole('button'); // If clickable
  expect(tile).toHaveAttribute('aria-label', 'View John Doe details');
});
```

### 8. **Data Transformation & Business Logic**

```typescript
// ✅ Test utility functions and business logic
import { formatStudentData } from "../utils/students";

it("should format student data correctly", () => {
  const input = { firstName: "John", lastName: "Doe" };
  const result = formatStudentData(input);

  expect(result).toEqual({ fullName: "John Doe" });
});
```

## ❌ What NOT to Test

### 1. **Implementation Details**

```typescript
// ❌ Don't test how component implements something
it('should call useState with initial value', () => {
  // This tests implementation, not behavior
});

// ✅ Instead, test the behavior
it('should show initial loading state', () => {
  render(<Home />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
```

### 2. **Third-Party Library Internals**

```typescript
// ❌ Don't test React Router's navigation logic
it("should call history.push", () => {
  // React Router is already tested
});

// ✅ Instead, test your app's behavior
it("should navigate when clicking student tile", () => {
  // Test the user action and expected outcome
});
```

### 3. **Inline Styles (Usually)**

```typescript
// ❌ Don't test exact CSS values unless critical to functionality
it('should have border: 1px solid', () => {
  const tile = screen.getByTestId('student-tile');
  expect(tile).toHaveStyle('border: 1px solid');
});

// ✅ Test visual behavior that affects UX
it('should hide element when collapsed', () => {
  render(<CollapsiblePanel isCollapsed={true} />);
  expect(screen.getByTestId('panel-content')).not.toBeVisible();
});
```

### 4. **Browser APIs & Built-ins**

```typescript
// ❌ Don't test that console.log works
it("should call console.log", () => {
  // This tests the browser, not your code
});
```

### 5. **External API Responses**

```typescript
// ❌ Don't test actual API endpoints
it("should return students from real API", async () => {
  // This is an integration test, not a unit test
});

// ✅ Mock external dependencies
it("should handle API response correctly", async () => {
  vi.spyOn(studentsService, "getAllStudents").mockResolvedValue(mockStudents);
  // Test your component's behavior with the mocked response
});
```

## 🎯 Component Testing Strategies

### Testing `useEffect` Hooks

#### ✅ What to Test:

```typescript
// Test side effects and state changes
it('should fetch data on component mount', async () => {
  const mockStudents = [{ id: 1, name: 'John', email: 'john@test.com' }];
  vi.spyOn(studentsService, 'getAllStudents')
    .mockResolvedValue(mockStudents);

  render(<Home />);

  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});

// Test cleanup functions
it('should cleanup on unmount', () => {
  const mockCleanup = vi.fn();
  const { unmount } = render(<ComponentWithCleanup onCleanup={mockCleanup} />);

  unmount();
  expect(mockCleanup).toHaveBeenCalled();
});
```

#### ❌ What NOT to Test:

```typescript
// Don't test useEffect implementation details
it("should call useEffect with empty dependency array", () => {
  // This tests React's internal behavior
});
```

### Testing Component State

#### ✅ What to Test:

```typescript
// Test state changes through user interactions
it('should update state when user interacts', () => {
  render(<Counter />);

  fireEvent.click(screen.getByText('Increment'));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

// Test derived state
it('should show error state when validation fails', () => {
  render(<Form />);

  fireEvent.click(screen.getByText('Submit'));
  expect(screen.getByText('Name is required')).toBeInTheDocument();
});
```

#### ❌ What NOT to Test:

```typescript
// Don't test setState calls directly
it("should call setState with new value", () => {
  // This tests implementation, not behavior
});
```

## 🎨 Testing Styles

### ✅ When to Test Styles:

1. **Dynamic Styles Based on Props/State**

```typescript
it('should apply error styles when hasError is true', () => {
  render(<Input hasError={true} />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveClass('error');
  // or
  expect(input).toHaveStyle('border-color: red');
});
```

2. **Responsive Behavior**

```typescript
it('should hide on mobile', () => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: query === '(max-width: 768px)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });

  render(<ResponsiveComponent />);
  expect(screen.getByTestId('mobile-hidden')).toHaveClass('hidden-mobile');
});
```

3. **Animation States**

```typescript
it('should show loading animation', () => {
  render(<Button isLoading={true}>Click me</Button>);
  expect(screen.getByTestId('spinner')).toBeInTheDocument();
});
```

### ❌ When NOT to Test Styles:

1. **Static CSS Properties**

```typescript
// ❌ Don't test unchanging styles
it("should have padding of 10px", () => {
  // This doesn't test behavior
});
```

2. **Framework/Library Styles**

```typescript
// ❌ Don't test third-party component styles
it("should apply Material-UI button styles", () => {
  // Trust the library
});
```

## 🔧 Testing Patterns for Your Codebase

### 1. Testing `StudentTile` Component

```typescript
describe('StudentTile', () => {
  const defaultProps = {
    id: 1,
    name: 'John Doe',
    email: 'john@test.com'
  };

  it('should render all required information', () => {
    render(<StudentTile {...defaultProps} />);

    expect(screen.getByTestId('student-name')).toHaveTextContent('John Doe');
    expect(screen.getByTestId('student-id')).toHaveTextContent('1');
    expect(screen.getByTestId('student-email')).toHaveTextContent('john@test.com');
  });

  it('should call onClick with correct id when clicked', () => {
    const mockOnClick = vi.fn();
    render(<StudentTile {...defaultProps} onClick={mockOnClick} />);

    fireEvent.click(screen.getByTestId('student-name'));
    expect(mockOnClick).toHaveBeenCalledWith(1);
  });

  it('should show default message when address is not provided', () => {
    render(<StudentTile {...defaultProps} />);
    expect(screen.getByText('No address provided')).toBeInTheDocument();
  });

  it('should display address when provided', () => {
    render(<StudentTile {...defaultProps} address="123 Main St" />);
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
  });
});
```

### 2. Testing `Home` Component with useEffect

```typescript
describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading state initially', () => {
    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display students after successful fetch', async () => {
    const mockStudents = [
      { id: 1, name: 'Alice', email: 'alice@test.com' },
      { id: 2, name: 'Bob', email: 'bob@test.com' }
    ];

    vi.spyOn(studentsService, 'getAllStudents')
      .mockResolvedValue(mockStudents);

    render(<Home />);

    await waitForElementToBeRemoved(screen.getByText('Loading...'));

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('should show error state when fetch fails', async () => {
    vi.spyOn(studentsService, 'getAllStudents')
      .mockRejectedValue(new Error('Network error'));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Error loading students.')).toBeInTheDocument();
    });
  });
});
```

### 3. Testing Navigation in `StudentGrid`

```typescript
// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('StudentGrid', () => {
  const mockStudents = [
    { id: 1, name: 'Alice', email: 'alice@test.com' },
    { id: 2, name: 'Bob', email: 'bob@test.com' }
  ];

  it('should navigate to student details when student is clicked', () => {
    render(<StudentGrid students={mockStudents} />);

    fireEvent.click(screen.getByText('Alice'));

    expect(mockNavigate).toHaveBeenCalledWith('/student/1', {
      state: {
        from: '/home',
        student: mockStudents[0]
      }
    });
  });
});
```

## 📝 Best Practices

### 1. **Test Organization**

```typescript
describe("ComponentName", () => {
  // Group related tests
  describe("when user is authenticated", () => {
    // Tests for authenticated state
  });

  describe("when user is not authenticated", () => {
    // Tests for unauthenticated state
  });
});
```

### 2. **Setup and Cleanup**

```typescript
describe("Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset any global state
  });

  afterEach(() => {
    cleanup(); // React Testing Library cleanup
  });
});
```

### 3. **Custom Render Helpers**

```typescript
// Create custom render for components that need providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        {ui}
      </ThemeProvider>
    </MemoryRouter>
  );
};
```

### 4. **Meaningful Test Names**

```typescript
// ✅ Descriptive test names
it("should show loading spinner when submitting form", () => {});
it("should display error message when email is invalid", () => {});

// ❌ Vague test names
it("should work correctly", () => {});
it("should render", () => {});
```

### 5. **Assert on User-Visible Behavior**

```typescript
// ✅ Test what users see/do
expect(screen.getByText("Submit")).toBeDisabled();
expect(screen.getByRole("alert")).toHaveTextContent("Error occurred");

// ❌ Test implementation details
expect(component.state.isLoading).toBe(true);
```

## 🔍 Testing Checklist

For each component, consider testing:

- [ ] **Rendering**: Does it render without crashing?
- [ ] **Props**: Does it handle all prop variations correctly?
- [ ] **User Interactions**: Click, input, form submission, etc.
- [ ] **State Changes**: Loading, error, success states
- [ ] **Conditional Logic**: Different UI paths based on conditions
- [ ] **Side Effects**: API calls, timers, subscriptions
- [ ] **Edge Cases**: Empty data, null values, error conditions
- [ ] **Accessibility**: Proper ARIA attributes, keyboard navigation

## 📚 Additional Resources

- [Testing Library Best Practices](https://testing-library.com/docs/guiding-principles)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Patterns](https://react-testing-examples.com/)

Remember: **Test behavior, not implementation. Focus on what users do and see, not how your code works internally.**
