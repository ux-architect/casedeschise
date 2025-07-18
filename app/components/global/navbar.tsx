
'use client'
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

// Inline styles for demonstration, replace with CSS/Tailwind as needed
const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    background: "transparent",
    padding: "1rem 2rem",
    color: "#000",
    position: "absolute" as const,
    width: "100%"
  },
  link: {
    color: "#000",
    textDecoration: "none",
    fontSize: "1.1rem",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  dropdownContainer: {
    position: "relative" as const,
    display: "inline-block",
  },
  dropdownMenu: {
    position: "absolute" as const,
    top: "100%",
    left: 0,
    minWidth: "150px",
    background: "#333",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    zIndex: 99,
    padding: "0.75rem 0",
    borderRadius: "0.25rem",
  },
  dropdownLink: {
    display: "block",
    color: "#fff",
    padding: "0.5rem 1rem",
    textDecoration: "none",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }


    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // cleanup code, runs before effect runs again or before unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav style={styles.nav}>
      <Link href="/" style={styles.link}>Home</Link>
      <Link href="/about" style={styles.link}>About</Link>
      <div style={styles.dropdownContainer} ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((open) => !open)}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          style={styles.link}
          type="button"
        >
          Services ▼
        </button>
        {dropdownOpen && (
          <div style={styles.dropdownMenu} role="menu">
            <Link href="/services/design" style={styles.dropdownLink}>Design</Link>
            <Link href="/services/development" style={styles.dropdownLink}>Development</Link>
            <Link href="/services/seo" style={styles.dropdownLink}>SEO</Link>
          </div>
        )}
      </div>
      <Link href="/contact" style={styles.link}>Contact</Link>
    </nav>
  );
};

export default Navbar;