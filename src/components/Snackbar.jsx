// components/Snackbar.js
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Snackbar({ message, duration = 4000, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return createPortal(
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="bg-red-600 text-white px-5 py-3 rounded-lg shadow-lg max-w-xs text-center">
        {message}
      </div>
    </div>,
    document.body
  );
}

export default Snackbar;