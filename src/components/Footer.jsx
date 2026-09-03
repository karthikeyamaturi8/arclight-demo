export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <span>Arclight Studio &copy; {new Date().getFullYear()}</span>
      <span className="footer-note">Built for demo &amp; testing purposes</span>
    </footer>
  )
}
