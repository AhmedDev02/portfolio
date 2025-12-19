import React from "react";

/**
 * Renders a copyright notice with the current year generated dynamically.
 * Note: Styling classes remain as provided (using 'class' instead of 'className').
 */
function Copyright({ classStyles }) {
  // Get the current year using JavaScript
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classStyles}>
      <div class="copyright-container">
        <p class="copyright-text">
          &copy; {currentYear} Ahmed Tharwat. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Copyright;
