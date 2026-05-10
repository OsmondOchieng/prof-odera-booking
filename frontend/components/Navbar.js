import React from 'react';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Prof. Peter Odera</h1>
        <div className="hidden md:flex gap-6">
          <a href="/" className="hover:text-gray-200">Home</a>
          <a href="/services" className="hover:text-gray-200">Services</a>
          <a href="/about" className="hover:text-gray-200">About</a>
          <a href="/testimonials" className="hover:text-gray-200">Testimonials</a>
          {user ? (
            <div className="flex gap-4">
              <a href="/dashboard" className="hover:text-gray-200">Dashboard</a>
              <button onClick={onLogout} className="hover:text-gray-200">Logout</button>
            </div>
          ) : (
            <div className="flex gap-4">
              <a href="/login" className="hover:text-gray-200">Login</a>
              <a href="/register" className="btn bg-secondary hover:bg-blue-700">Register</a>
            </div>
          )}
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-secondary p-4 flex flex-col gap-3">
          <a href="/" className="hover:text-gray-200">Home</a>
          <a href="/services" className="hover:text-gray-200">Services</a>
          <a href="/about" className="hover:text-gray-200">About</a>
          <a href="/testimonials" className="hover:text-gray-200">Testimonials</a>
          {user ? (
            <>
              <a href="/dashboard" className="hover:text-gray-200">Dashboard</a>
              <button onClick={onLogout} className="hover:text-gray-200">Logout</button>
            </>
          ) : (
            <>
              <a href="/login" className="hover:text-gray-200">Login</a>
              <a href="/register" className="btn bg-blue-700">Register</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
