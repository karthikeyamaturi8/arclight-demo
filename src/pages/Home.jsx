import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="page page-home" data-testid="page-home">
      <p className="eyebrow-free-label">Small studio, precise work</p>
      <h1>We build interfaces that hold up under scrutiny.</h1>
      <p className="lede">
        Arclight is a two-person studio designing and building product interfaces —
        from the first sketch to the component that ships. This page exists as a
        working demo: real routes, real components, nothing decorative.
      </p>
      <div className="cta-row">
        <Link className="btn btn-primary" to="/contact">
          Start a project
        </Link>
        <Link className="btn btn-ghost" to="/about">
          How we work
        </Link>
      </div>

      <ul className="stat-row">
        <li>
          <strong>14</strong>
          <span>products shipped</span>
        </li>
        <li>
          <strong>6 yrs</strong>
          <span>average client relationship</span>
        </li>
        <li>
          <strong>2</strong>
          <span>people, on purpose</span>
        </li>
      </ul>
    </section>
  )
}
