import React from 'react';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-gradient-to-r from-primary to-blue-600 text-white sticky top-0 z-50 shadow-xl backdrop-blur-sm">
      <div className="container flex justify-between items-center py-5 px-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Prof. Peter Odera</h1>
        <div className="hidden md:flex gap-10 items-center">
          <a href="/" className="font-medium text-white/90 hover:text-secondary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-secondary after:transition-all hover:after:w-full">Home</a>
          <a href="/services" className="font-medium text-white/90 hover:text-secondary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-secondary after:transition-all hover:after:w-full">Services</a>
          <a href="/about" className="font-medium text-white/90 hover:text-secondary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-secondary after:transition-all hover:after:w-full">About</a>
          <a href="/testimonials" className="font-medium text-white/90 hover:text-secondary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-secondary after:transition-all hover:after:w-full">Testimonials</a>
          <a href="/academic-profile" className="font-medium text-white/90 hover:text-secondary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-secondary after:transition-all hover:after:w-full">Academic Profile</a>
          {user ? (
            <div className="flex gap-4 items-center ml-4 pl-4 border-l border-white/20">
              <a href="/dashboard" className="font-medium text-white/90 hover:text-secondary transition-all duration-300">Dashboard</a>
              <button onClick={onLogout} className="btn btn-outline text-sm px-4 py-2 border-white/50 text-white">Logout</button>
            </div>
          ) : (
            <div className="flex gap-3 items-center ml-4 pl-4 border-l border-white/20">
              <a href="/login" className="font-medium text-white/90 hover:text-secondary transition-all duration-300">Login</a>
              <button onClick={() => window.location.href='/register'} className="btn btn-secondary text-sm px-6 py-2">Register</button>
            </div>
          )}
        </div>
        <button
          className="md:hidden text-3xl text-white/80 hover:text-secondary transition-all duration-300 hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-700 to-blue-800 p-6 flex flex-col gap-4 animate-slide-up border-t border-white/10 shadow-xl">
          <a href="/" className="hover:text-secondary transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10">Home</a>
          <a href="/services" className="hover:text-secondary transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10">Services</a>
          <a href="/about" className="hover:text-secondary transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10">About</a>
          <a href="/testimonials" className="hover:text-secondary transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10">Testimonials</a>
          <a href="/academic-profile" className="hover:text-secondary transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10">Academic Profile</a>
          {user ? (
            <>
              <a href="/dashboard" className="hover:text-secondary transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10">Dashboard</a>
              <button onClick={onLogout} className="btn btn-outline text-sm mt-2 w-full">Logout</button>
            </>
          ) : (
            <>
              <a href="/login" className="hover:text-secondary transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10">Login</a>
              <button onClick={() => window.location.href='/register'} className="btn btn-secondary mt-2 w-full">Register</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
