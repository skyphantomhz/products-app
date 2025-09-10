# React Developer Test - Frontend

## Welcome! 🚀

This test is designed for React web development. You'll be creating a React application from scratch to demonstrate your understanding of React concepts and your ability to implement common patterns used in modern web applications.

**Time Estimated:** 3-4 hours  
**Difficulty:** Beginner to Intermediate  
**Focus:** Understanding React concepts and applying them to new scenarios

---

## 📋 Table of Contents

1. [Environment Setup](#environment-setup)
2. [Section 1: React Fundamentals](#section-1-react-fundamentals)
3. [Section 2: Routing & Navigation](#section-2-routing--navigation)
4. [Section 3: Component Development](#section-3-component-development)
5. [Section 4: State Management](#section-4-state-management)
6. [Section 5: API Integration](#section-5-api-integration)
7. [Section 6: Practical Exercise](#section-6-practical-exercise)
8. [Bonus Challenges](#bonus-challenges)

---

## Environment Setup

For this test, you'll need:

- Node.js 18+ installed
- A code editor (VS Code recommended)
- Basic understanding of TypeScript
- Familiarity with npm/yarn

**Note:** You'll be creating a complete React application from scratch. The test will guide you through implementing common patterns and best practices used in modern React applications.

---

## Section 1: React Fundamentals

### 1.1 Understanding JSX and Components

**Question 1.1:** What is JSX and how does it differ from HTML?

> JSX allows write HTML directly inside JavaScript files, making it easier to read and visualize the interface

**Question 1.2:** Looking at this React component example:

```tsx
export const Dashboard: React.FC = () => {

  const getSatisfactionEmoji = (score: number) => {
    switch (Math.round(score)) {
      case 1: return '😫';
      case 2: return '😕';
      case 3: return '😐';
      case 4: return '🙂';
      case 5: return '🤩';
      default: return '🫥';
    }
  };
```

Explain:

- What does `React.FC` mean?

  > React.FC (React.FunctionComponent) is a TypeScript type that marks the component as a React functional component. It ensures the component return JSX

- What are the different ways to declare state in this component?

```tsx
export const Dashboard: React.FC = () => {
  const [score, setScore] = useState(0);

  const satisfactionEmoji = useMemo(() => {
    switch (Math.round(score)) {
      case 1: return '😫';
      case 2: return '😕';
      case 3: return '😐';
      case 4: return '🙂';
      case 5: return '🤩';
      default: return '🫥';
    }
  }, [score]);
```

- What is the purpose of the `getSatisfactionEmoji` function?
  > Converts numeric scores (1-5) into corresponding emoji representations

### 1.2 Hooks Understanding

**Question 1.3:** In the component below, identify all the hooks being used and explain their purpose:

```tsx
import React, { useState, useEffect, useMemo, useCallback, useContext, createContext } from "react"

const ThemeContext = createContext("light")

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth) // width tracks the current window width

  // Sets up and cleans up a window resize listener. Only runs once on the first render
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return width
}

export default function Dashboard() {
  const [count, setCount] = useState(0) // count tracks a counter value
  const theme = useContext(ThemeContext) // Accesses the current value of ThemeContext
  const width = useWindowWidth() //This hook creates a reactive window width tracker that automatically updates whenever the browser window is resized.

  // Memoizes the result of an expensive computation. Only recalculates when count changes
  const expensiveValue = useMemo(() => {
    console.log("Calculating...")
    return count * 2
  }, [count])

  // Memoizes the function reference. Prevents increment from being re-created on every render
  const increment = useCallback(() => setCount((c) => c + 1), [])

  // Logs whenever count changes. Running code in response to state changes
  useEffect(() => {
    console.log("Count changed:", count)
  }, [count])

  return (
    <div>
      <h2>Theme: {theme}</h2>
      <p>Window width: {width}px</p>
      <p>Count: {count}</p>
      <p>Expensive value: {expensiveValue}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

**Question 1.4:** Explain the difference between:

- `useState` vs `useContext`
  > useState → Manages local state inside a single component
  > useContext → Accesses shared/global state provided by a Context.Provider
- `useEffect` vs `useCallback`
  > useEffect → Runs side effects (fetching data, subscriptions, logging) when dependencies change
  > useCallback → Memoizes a function so it doesn’t get recreated on every render
- `useQuery` vs `useLazyQuery`
  > useQuery → Runs a query automatically when the component mounts
  > useLazyQuery → Returns a function to run the query manually

---

## Section 2: Routing & Navigation

### 2.1 Understanding React Router

**Question 2.1:** Looking at this React Router configuration example:

```tsx
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        element={
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        }
      >
        {/* Public routes */}
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/otp" element={<AuthOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/activate-account" element={<ActivateAccount />} />
```

Explain:

- What is the purpose of `<Outlet />`?
  > `<Outlet />` is a placeholder component that allows React Router to replace it with the matched child route component.
- Why is `AuthProvider` wrapping the routes?
  > AuthProvider is a custom React component that uses the Context API that gives all child routes access to authentication state (user, isLoggedIn, etc)
- What's the difference between public and protected routes?
  > Public routes → Accessible to anyone, even if not logged in (e.g. login, signup, reset password).
  > Protected routes → Require authentication; if user isn’t logged in, they’re usually redirected to /login or /unauthorized.

### 2.2 Route Protection

**Question 2.2:** Looking at this protected route pattern:

```tsx
<Route
  path="/tools-example"
  element={
    <ProtectedRoute>
      <PermissionGuard requiredPermission="TOOLS_EXAMPLE_VIEW,TOOLS_EXAMPLE_UPDATE">
        <TimeTrackList />
      </PermissionGuard>
    </ProtectedRoute>
  }
/>
```

Explain:

- What is the purpose of `ProtectedRoute`?
  > ProtectedRoute can be a custom wrapper component. ProtectedRoute typically handles authentication (logged in/out)
- What does `PermissionGuard` do?
  > PermissionGuard is a custom wrapper component that checks if the user has the required permissions (authorization) before rendering its children.
- How would you add a new protected route for a "Products" feature?

```tsx
<Route
  path="/products"
  element={
    <ProtectedRoute>
      <PermissionGuard requiredPermission="PRODUCTS_ACCESS">
        <ProductsLayout />
      </PermissionGuard>
    </ProtectedRoute>
  }
>
  <Route index element={<ProductsList />} />
  <Route path=":id" element={<ProductDetail />} />

  <Route
    path="create"
    element={
      <PermissionGuard requiredPermission="PRODUCTS_CREATE">
        <ProductCreate />
      </PermissionGuard>
    }
  />

  <Route
    path=":id/edit"
    element={
      <PermissionGuard requiredPermission="PRODUCTS_UPDATE">
        <ProductEdit />
      </PermissionGuard>
    }
  />
</Route>
```

### 2.3 Navigation Patterns

**Question 2.3:** In a React application, how would you:

- Navigate to a user detail page with ID "123"?
- Navigate back to the previous page?
- Navigate to a route with query parameters?

```tsx
// Navigate to a user detail page with ID "123"?
navigate(`/${product._id}`)

// Navigate back to the previous page?
navigate(-1)

// Navigate to a route with query parameters?
navigate({
  pathname: "/products",
  search: "?page=2&sort=asc",
})
```

---

## Section 3: Component Development

### 3.1 Component Structure

**Question 3.1:** Looking at this React component interface example:

```tsx
interface HeaderProps {
  open: boolean
  drawerWidth: number
  selectedNav: string
  isMobile: boolean
  handleDrawerOpen: () => void
  handleNavClick: (id: string, path: string, extra?: any) => void
}
```

Explain:

- What is the purpose of TypeScript interfaces in React?
  > What props a component expects
  > The types of each prop
  > Which props are required vs optional
  > Function signatures for callbacks
- How do you pass props to a component?

```tsx
// Define the component with interface
const Header: React.FC<HeaderProps> = (props) => {
  ...
}

// Pass props when using the component
<Header
  open={drawerOpen}
  drawerWidth={240}
  selectedNav={selectedNav}
  isMobile={isMobile}
  handleDrawerOpen={() => {
    console.log("Drawer open")
  }}
  handleNavClick={(id, path, extra) => {
    navigate(path)
  }}
/>
```

- What does the `?` in `extra?: any` mean?
  > the `?` in a property declaration means that the property is optional

### 3.2 Event Handling

**Question 3.2:** Looking at this event handler example:

```tsx
const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget)
}

const handleClose = () => {
  setAnchorEl(null)
}
```

Explain:

- What is `React.MouseEvent<HTMLElement>`?
  > That’s React’s type for a synthetic mouse event. The generic <HTMLElement> tells TS what element the event is coming from
- How do you handle different types of events in React?
  > React provides different typed event objects for different DOM events. Some common ones:
  >
  > - React.MouseEvent<T> -> For clicks, mouse enter/leave, etc
  > - React.ChangeEvent<T> -> For input, select, textarea changes
  > - React.KeyboardEvent<T> -> For key presses
  > - React.FormEvent<T> -> For form submissions
  > - React.FocusEvent<T> -> For focus/blur events
- What's the difference between `event.currentTarget` and `event.target`?
  > event.target → The actual element that triggered the event (could be a child element)
  > event.currentTarget → The element the event handler is attached to

### 3.3 Component Composition

**Question 3.3:** Looking at this JSX structure example:

```tsx
<ImpersonationBar impersonatedUser={impersonatedUser} stopImpersonate={stopImpersonate} user={user} />
```

Explain:

- How do you pass data to child components?
- How do you pass functions as props?
- What is component composition?

```tsx
const Layout: React.FC<Props> = ({user, impersonatedUser, stopImpersonate}) => {
  const [user, setUser] = React.useState()
  const impersonatedUser = (id) => {
    ...
  }
  const stopImpersonate = (id) => {
    ...
  }
  return <ImpersonationBar
          impersonatedUser={impersonatedUser}
          stopImpersonate={stopImpersonate}
          user={user}/>
}


interface Props {
  user: User
  impersonatedUser: (id: string) => void
  stopImpersonate: (id: string) => void
}

const ImpersonationBar: React.FC<Props> = ({user, impersonatedUser, stopImpersonate}) => {
  ...
}
```

---

## Section 4: State Management

### 4.1 Context API

**Question 4.1:** Looking at this Context API example:

```tsx
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = secureStorage.get();
    console.log('Initial user state:', { hasUser: !!storedUser?.user, hasToken: !!storedUser?.user?.token });
    if (DEBUG_CONSOLE) {
      console.log('Initial user state:', { hasUser: !!storedUser?.user, hasToken: !!storedUser?.user?.token });
    }
    return storedUser?.user;
  });
```

Explain:

- What is the purpose of Context API?
  > Context API is React’s built-in way to share state or values across multiple components without prop drilling
- How do you provide context to components?

```tsx
<AuthContext.Provider>{children}</AuthContext.Provider>
```

- What does `React.ReactNode` mean?
  > React.ReactNode is a TypeScript type that represents anything React can render

### 4.2 Custom Hooks

**Question 4.2:** Looking at this custom GraphQL hook example:

```tsx
export const useGraphQLQuery = <TData = any, TVariables extends OperationVariables = OperationVariables>(query: DocumentNode, options?: QueryHookOptions<TData, TVariables>) => {
  const { data, loading, error, refetch } = useQuery<TData, TVariables>(query, {
    ...options,
    onError: (error) => {
      console.error("GraphQL Query Error:", error)
      options?.onError?.(error)
    },
  })

  return {
    data,
    loading,
    error,
    refetch,
  }
}
```

Explain:

- What are custom hooks?
  > useGraphQLQuery is a custom hook that wraps Apollo’s useQuery to provide a consistent API for queries, add centralized error handling, enforce type safety with generics, and improve reusability and maintainability across app
- What are TypeScript generics (`<TData = any, TVariables>`)?
  > A way to make types flexible and reusable.
  > TData: the shape of the data returned by the query. Defaults to any if not specified.
  > TVariables: the shape of the query variables.
- How do you create reusable logic with hooks?
  > Create reusable logic with hooks by extracting common functionality into a custom hook and parameterizing it. In this case, by calling the hook with different queries and passing different TypeScript generics (TData and TVariables), can reuse the same hook while getting strongly typed outputs for each use case.

### 4.3 State Patterns

**Question 4.3:** In modern React applications, we use multiple state management patterns:

- Local state with `useState`
- Global state with Context API
- Server state with Apollo Client or React Query

When would you use each pattern? Provide examples of when each would be appropriate.

```tsx
// Local state with `useState`
const [isOpen, setIsOpen] = useState(false)

// Global state with Context API
const ThemeContext = React.createContext("light")

const App = () => (
  <ThemeContext.Provider value="dark">
    <Toolbar />
  </ThemeContext.Provider>
)

const Toolbar = () => {
  const theme = React.useContext(ThemeContext)
  return <div>Current theme: {theme}</div>
}

// Server state with Apollo Client or React Query
function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return <p>User: {data.user.name}</p>
}
```

---

## Section 5: API Integration

### 5.1 GraphQL with Apollo Client

**Question 5.1:** Looking at this GraphQL query usage example:

```tsx
const [fetchData, { data, loading, error }] = useLazyQuery(GET_DASHBOARD_DATA, {
  fetchPolicy: "cache-and-network",
  notifyOnNetworkStatusChange: false,
})
```

Explain:

- What is the difference between `useQuery` and `useLazyQuery`?
  > useQuery runs the query automatically when the component mounts
  > useLazyQuery does not run automatically; it returns a function to trigger the query manually
- What does `fetchPolicy: 'cache-and-network'` mean?
  > It tells Apollo Client to return cached data immediately (if available) and then send a network request in the background to update the data. This provides fast UI updates and ensures fresh data
- How do you handle loading and error states?
  > Use the loading and error values returned by the hook to show loading indicators or error messages in UI

### 5.2 REST API with Axios

**Question 5.2:** Looking at this service class example:

```tsx
public getAll({page, per_page, roles, search, role_id, pagination_enabled = 'yes'}:
{page: number, per_page: number, roles?: string, search?: string, role_id?: string, pagination_enabled?: string}) {
    let newApi = ApiService.getInstance();
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
    const roleParam = role_id ? `&role_id=${encodeURIComponent(role_id)}` : '';
    const rolesParam = roles ? `&roles=${encodeURIComponent(roles)}` : '';
    return newApi.get<any>(`/users/fetch?page=${page}&per_page=${per_page}${searchParam}${roleParam}${rolesParam}&pagination_enabled=${pagination_enabled || 'yes'}`);
}
```

Explain:

- What is the Singleton pattern used here?
  > The ApiService.getInstance() call ensures that only one instance of the ApiService class exists throughout the app
- How do you handle query parameters in API calls?
  > Query parameters are built as strings (searchParam, roleParam, rolesParam) and conditionally added to the URL only if their values are provided
- What is the purpose of `encodeURIComponent`?
  > encodeURIComponent safely encodes special characters in query parameter values (like spaces, &, ?, etc.)

### 5.3 Error Handling

**Question 5.3:** Looking at this API service error handling example:

```tsx
this.api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if ([4010005].includes(error.response?.data?.code)) {
      logoutGeneral()
    }

    if (error.response?.status === 403) {
      this.showNotification("Forbidden")
      return Promise.reject(error)
    }
    if (error.response?.status === 401) {
      this.showNotification("Unauthorized")
      return Promise.reject(error)
    }

    return Promise.resolve(error)
  }
)
```

Explain:

- What are Axios interceptors?
  > Axios interceptors are functions that run custom logic before a request is sent or after a response is received
- How do you handle different HTTP error codes?
  > Check the error response’s status code (e.g., error.response?.status === 403) and run specific logic for each code
- How do you show user-friendly error messages?
  > Call a notification function to display a clear, human-readable message

---

## Section 6: Practical Exercise

### Task: Create a "Products" Feature from Scratch

You need to create a complete products management feature following modern React patterns and best practices. Create a new React project and implement the following:

#### 6.1 Project Setup

Create a new React project with TypeScript:

```bash
npx create-react-app products-app --template typescript
cd products-app
npm install react-router-dom axios
```

#### 6.2 Create the Product Interface

Create `src/types/Product.ts`:

```tsx
export interface Product {
  _id: string
  image: string
  name: string
  description: string
  price: string
  materials: string
  created_at: string
}
```

Use these Backend Endpoints:

- List All -> [GET] `https://68bf2eab9c70953d96eefa4e.mockapi.io/api/v1/Products`
- Get One -> [GET] `https://68bf2eab9c70953d96eefa4e.mockapi.io/api/v1/Products/{_id}`
- Create -> [POST] `https://68bf2eab9c70953d96eefa4e.mockapi.io/api/v1/Products`
- Delete One -> [DELETE] `https://68bf2eab9c70953d96eefa4e.mockapi.io/api/v1/Products/{_id}`

#### 6.3 Create the Product Service

Create `src/services/ProductService.ts` following the singleton pattern:

#### 6.4 Create Context for State Management

Create `src/contexts/ProductContext.tsx` following the Context API pattern:

#### 6.5 Create Product Components

Create `src/components/ProductList.tsx`:

#### 6.6 Create Routing

Create `src/App.tsx` with routing:

#### 6.7 Questions to Answer

After implementing the above:

1. **State Management**: How did you manage the products state? Why?
   > Use useContext to manage the state of the ProductList screen. This approach centralizes state management, enables reuse, and allows child components to access the shared state easily.
2. **Error Handling**: How did you handle API errors in your components? Show your error handling implementation.
   > Use the onError option of useQuery to display error messages as toast notifications.
3. **Loading States**: How did you show loading indicators to users? Provide code examples.
   > On useQuery, the loading property indicates whether the query is currently in progress

```tsx
if (isLoading) {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <span className="ml-3 text-gray-600">Loading...</span>
    </div>
  )
}
```

4. **Navigation**: How did you implement navigation between the list and detail views? Show your routing setup.

```tsx
// Navigation between the list and detail views
navigate(`/${product._id}`)

// Routing setup
<Router>
  <div className='App min-h-screen bg-gray-100'>
    <div className='container mx-auto p-8'>
      <ProductProvider>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/:id' element={<ProductDetail />} />
        </Routes>
      </ProductProvider>
    </div>
    <ToastContainer position='top-right' />
  </div>
</Router>
```

5. **Service Pattern**: Why did you use the Singleton pattern for ProductService? What are the benefits and drawbacks?

6. **TypeScript**: How did you use TypeScript interfaces to ensure type safety? Show examples of your type definitions.
   > API Response Types - TanStack Query hooks are typed with Product
   > Function Parameters - onSubmit uses union types for create/update
   > Utility Types - Omit<Product, 'id' | 'created_at'> for new products

```tsx
interface ProductContextType {
  products: Product[]
  selectedProduct: Product | null
  openModal: (product?: Product) => void
  createProduct: (product: Omit<Product, "id" | "created_at">) => void
  updateProduct: (product: Product) => void
  ...
}

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Product | Omit<Product, 'id' | 'created_at'>) => void
}
```

---

## (Optional) Bonus Challenges

### Challenge 1: Advanced State Management

Implement a more sophisticated state management solution using Redux Toolkit or Zustand, following patterns you might find in larger applications.

### Challenge 2: Advanced Search & Filtering

Add advanced search functionality with filters for category, price range, and active status. Implement debounced search for better performance.

### Challenge 3: Form Validation & Error Handling

Add comprehensive form validation using a library like Yup or Zod, and implement proper error handling with user-friendly messages.

### Challenge 4: Testing

Write unit tests for your ProductService and ProductList component using Jest and React Testing Library.

### Challenge 5: Performance Optimization

Implement virtualization for large product lists, memoization for expensive operations, and lazy loading for components.

---

## Submission Guidelines

1. **Code Quality**: Follow modern React patterns and TypeScript conventions
2. **Documentation**: Add comments explaining complex logic and your decision-making process
3. **Error Handling**: Implement proper error handling and user feedback
4. **Responsive Design**: Ensure your components work on mobile and desktop
5. **Performance**: Consider loading states and optimization

### What to Submit:

- Complete React project with the Products feature implemented
- Answers to all questions in each section
- Brief explanation of your approach and any challenges faced
- Any additional features or improvements you made
- Push the codes to this GitHub repository

### Evaluation Criteria:

- **Functionality** (35%): Does it work as expected? Can you navigate between pages?
- **Code Quality** (30%): Follows modern patterns, clean code, proper TypeScript usage
- **Understanding** (25%): Shows understanding of React concepts and ability to apply them
- **Creativity** (10%): Goes beyond basic requirements, shows problem-solving skills

### Key Things We're Looking For:

- **Pattern Recognition**: Can you identify and implement common React patterns?
- **Problem Solving**: How do you approach new challenges?
- **Code Organization**: Is your code well-structured and maintainable?
- **Learning Ability**: Can you adapt concepts from examples to new scenarios?

---

## Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Material-UI Documentation](https://mui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

**Good luck! 🍀**

Remember: This test is about understanding React concepts and demonstrating your ability to implement modern React patterns. Don't worry if you don't complete everything - focus on showing your understanding of the fundamentals and your ability to learn and adapt to new patterns. We're looking for developers who can quickly understand and work with established React patterns and best practices.
