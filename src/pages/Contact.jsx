import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | error | sent
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      setError('All fields are required.')
      return
    }
    if (!form.email.includes('@')) {
      setStatus('error')
      setError('Enter a valid email address.')
      return
    }
    setStatus('sent')
    setError('')
  }

  return (
    <section className="page page-contact" data-testid="page-contact">
      <h1>Tell us about the project.</h1>
      <p className="lede">A short brief is fine — we'll follow up with questions.</p>

      {status === 'sent' ? (
        <p className="form-success" data-testid="form-success" role="status">
          Thanks, {form.name}. We'll reply within two working days.
        </p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            data-testid="input-name"
            value={form.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            data-testid="input-email"
            value={form.email}
            onChange={handleChange}
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            data-testid="input-message"
            value={form.message}
            onChange={handleChange}
          />

          {status === 'error' && (
            <p className="form-error" data-testid="form-error" role="alert">
              {error}
            </p>
          )}

          <button className="btn btn-primary" type="submit" data-testid="submit-btn">
            Send message
          </button>
        </form>
      )}
    </section>
  )
}
