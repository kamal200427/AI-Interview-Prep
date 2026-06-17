export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="copy">
          <strong style={{ color: "var(--text)" }}>LearnPro</strong> · © 2026 LearnPro
          Technical Education. All rights reserved.
        </div>
        <nav className="links">
          <a href="#about">About</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#help">Help</a>
        </nav>
      </div>
    </footer>
  );
}
