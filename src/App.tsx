import { Routes, Route, BrowserRouter } from "react-router-dom"
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import LoginPage from "./pages/public/login"
import AdminLayout from "./components/layouts/AdminLayout"
import { AuthProvider } from "./context/AuthContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

const checkAuth = async () => {
  const response = await axios.post('/api/admin/check-auth', {
    withCredentials: true 
  })
  return response.data
}

const AuthCheck = () => {
  const { data: authData, isLoading, error } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth,
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center">
      <div className="text-lg text-red-500">Error checking authentication</div>
    </div>
  }

  return (
    <>
      {authData?.authenticated ? (
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={
              <div className="rounded-lg border bg-card p-8">
                <h1 className="mb-4 text-2xl font-bold">Welcome to Dashboard</h1>
                <p className="text-gray-600">Select an option from the sidebar to get started.</p>
              </div>
            } />
            <Route path="/students" element={
              <div className="rounded-lg border bg-white p-8">
                <h1 className="mb-4 text-2xl font-bold">Users Management</h1>
              </div>
            } />
            <Route path="/teachers" element={
              <div className="rounded-lg border bg-white p-8">
                <h1 className="mb-4 text-2xl font-bold">Reports</h1>
              </div>
            } />
            <Route path="/analytics" element={
              <div className="rounded-lg border bg-white p-8">
                <h1 className="mb-4 text-2xl font-bold">Analytics</h1>
              </div>
            } />
            <Route path="/settings" element={
              <div className="rounded-lg border bg-white p-8">
                <h1 className="mb-4 text-2xl font-bold">Settings</h1>
              </div>
            } />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<div className="p-4">Public Home</div>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AuthCheck />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App