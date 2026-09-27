import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} BlogHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;