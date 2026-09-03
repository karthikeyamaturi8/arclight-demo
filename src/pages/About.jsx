export default function About() {
  return (
    <section className="page page-about" data-testid="page-about">
      <h1>Two people, one studio, no account managers.</h1>
      <p className="lede">
        Arclight was started in 2019 by a designer and an engineer who were tired of
        handing work between disciplines instead of doing it together.
      </p>

      <div className="about-grid">
        <article>
          <h2>What we do</h2>
          <p>
            Interface design, front-end builds, and the unglamorous middle part —
            component libraries, design tokens, and the tests that keep both from
            rotting.
          </p>
        </article>
        <article>
          <h2>How we work</h2>
          <p>
            One project at a time. We write the code we design and design the code
            we write, so nothing gets lost in translation between a mockup and a
            merged pull request.
          </p>
        </article>
        <article>
          <h2>Who it's for</h2>
          <p>
            Small teams shipping a product that needs to feel considered, not
            templated — and who want a studio that will still answer email in
            year three.
          </p>
        </article>
      </div>
    </section>
  )
}
