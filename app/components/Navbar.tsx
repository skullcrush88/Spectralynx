import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logos/logo-primary.png"
                alt="Spectralynx Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary">About</Link>
            <Link href="/services" className="text-gray-700 hover:text-primary">Services</Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 