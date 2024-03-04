import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from  "./store/store"
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Protected from "./components/AuhtLayout"
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "/login",
        element : (
          <Protected authentication = {false}>
            <LoginPage />
          </Protected>
        )
      },
      {
        path : "/signup",
        element : (
          <Protected authentication = {false}>
            <Signup/>
          </Protected>
        )
      },
      {
        path : "/all-posts",
        element : (
          <Protected authentication>
            <AllPosts></AllPosts>
          </Protected>
        )
      },
      {
        path : "/add-posts",
        element : (
          <Protected authentication>
            <AddPost/>
          </Protected>
        )
      },
      {
        path : "/edit-post/:slug",
        element : (
          <Protected authentication>
            <EditPost/>
          </Protected>
        )
      },
      {
        path : "/post/:slug",
        element : (
          <Protected authentication>
            <Post/>
          </Protected>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
)
