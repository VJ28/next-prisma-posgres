import React from "react"
import Link from "next/link"

const Blog: React.FC = (props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="mb-6 text-3xl font-bold text-gray-800">Welcome to My App</h1>
    <div className="space-y-4">
      <Link href="/onboard">
        <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
          Sign Up
        </button>
      </Link>
      <Link href="/login">
        <button className="w-full rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300">
          Login
        </button>
      </Link>
    </div>
  </div>
  )
}

export default Blog
