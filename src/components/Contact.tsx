import { useState } from 'react'
import { Mail, MapPin, Phone, Send, X } from 'lucide-react'
import { LinkedinIcon } from './icons'
import { personalInfo } from '../data/resume'

export function Contact() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Contact from Portfolio')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`
    window.location.href = mailtoLink
    setShowForm(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="py-24 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-light)] mb-2">
            Contact
          </h2>
          <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            Let's Connect
          </h3>
          <p className="text-[var(--text-secondary)] mb-10">
            Interested in discussing finance, technology, or potential collaboration? I'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {/* Email — opens contact form */}
            <button
              onClick={() => setShowForm(true)}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-light)]/30 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)]/10 flex items-center justify-center group-hover:bg-[var(--accent-light)]/20 transition-colors">
                <Mail size={20} className="text-[var(--accent-light)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-0.5">Email</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">{personalInfo.email}</p>
              </div>
            </button>

            {/* Phone */}
            <a
              href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-light)]/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)]/10 flex items-center justify-center group-hover:bg-[var(--accent-light)]/20 transition-colors">
                <Phone size={20} className="text-[var(--accent-light)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-0.5">Phone</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">{personalInfo.phone}</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-light)]/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)]/10 flex items-center justify-center group-hover:bg-[var(--accent-light)]/20 transition-colors">
                <LinkedinIcon size={20} className="text-[var(--accent-light)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-0.5">LinkedIn</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">Profile</p>
              </div>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
            <MapPin size={14} />
            {personalInfo.location}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false) }}
        >
          <div className="w-full max-w-lg rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
              <h4 className="text-lg font-semibold text-[var(--text-primary)]">Send a Message</h4>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-light)]"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-light)]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-light)]"
                  placeholder="Opportunity / Collaboration / Question"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-light)] resize-none"
                  placeholder="Hi Sebastián, I'd like to discuss..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <Send size={16} />
                Send via Email Client
              </button>
              <p className="text-xs text-[var(--text-muted)] text-center">
                This will open your default email client with the message pre-filled.
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
