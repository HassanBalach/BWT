

import { Route, Routes } from 'react-router-dom'
import './globles.css'
import {  Home,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers, } from './_Root/pages'
import RootLayout from './_Root/RootLayout'
import SignInForm from './_Auth/Form/SignInForm'
import SignUpForm from './_Auth/Form/SignUpForm'
import AuthLayout from './_Auth/AuthLayout'

import { Toaster } from "@/components/ui/toaster"




const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>

        {/* Public routes */}

        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
        </Route>

        {/* Private routes */}

        <Route element={<RootLayout />}>
        <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>

      </Routes>


      <Toaster />
    </main>
  )
}

export default App
