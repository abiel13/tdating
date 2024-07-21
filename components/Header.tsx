import Link from 'next/link'
import React from 'react'

const HeaderComp = () => {
  return (
    <div className="flex items-center justify-between">
    <h1 className="text-white font-bold text-2xl font-sans italics">
      Flirt <span className="text-primary ">Gram</span>
    </h1>
    <Link
      className="bg-air_force_blue-400 px-4 py-2 text-white font-bold font-sans rounded-lg"
      href="/login"
    >
      Get Started
    </Link>
  </div>
  )
}

export default HeaderComp
