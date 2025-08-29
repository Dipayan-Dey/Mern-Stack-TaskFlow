import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 mt-auto bottom-0">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-black">
          &copy; {new Date().getFullYear()} TaskFlow. All rights reserved. Developed By <a className="underline" target='_blank' href="https://dipayan-dey.github.io/portfolio/">Mr. Dipayan Dey</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
