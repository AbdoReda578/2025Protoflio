import { useRef, useState } from 'react'
import { MagneticButton } from '@/components/MagneticButton'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle2, Copy } from 'lucide-react'
import { useIntersectionObserver } from '@/lib/hooks'

export function Contact() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const formRef = useRef<HTMLFormElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(sectionRef)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const validateForm = () => {
    const form = formRef.current
    if (!form) return false
    if (!form.checkValidity()) {
      form.reportValidity()
      return false
    }
    return true
  }

  const buildMessage = () => {
    const { name, email, subject, message } = formData
    return `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`
  }

  const handleWhatsApp = () => {
    if (!validateForm()) return
    const whatsappNumber = '201507064713'
    const text = encodeURIComponent(
      `Hello Abdulrahman! \n\n${buildMessage()}`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank')
    setAlertMessage('Opening WhatsApp chat…')
    setTimeout(() => setAlertMessage(null), 4000)
  }

  const handleEmailSend = () => {
    if (!validateForm()) return
    const subject = encodeURIComponent(`${formData.subject || 'Portfolio Contact'}`)
    const body = encodeURIComponent(buildMessage())

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=abdoredagtr@gmail.com&su=${subject}&body=${body}`
    const newWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer')

    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = `mailto:abdoredagtr@gmail.com?subject=${subject}&body=${body}`
    }

    setAlertMessage('Opening Gmail compose (fallback to your email app if blocked)…')
    setTimeout(() => setAlertMessage(null), 4000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'abdoredagtr@gmail.com',
      link: 'mailto:abdoredagtr@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+201507064713',
      link: 'tel:+201507064713'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: '6th of October City, Giza, Egypt',
      link: null
    }
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      link: 'https://linkedin.com/in/abdulrahman-reda-ba'
    },
    {
      icon: Github,
      label: 'GitHub',
      link: 'https://abdoreda.github.io/testprotofolio/'
    }
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-bg-primary via-bg-secondary to-bg-primary opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl top-0 right-0" />
        <div className="absolute w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl bottom-0 left-0" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className={`heading-lg text-center mb-16 gradient-text transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="card-hover">
              <CardContent className="p-8">
                {alertMessage && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 animate-[fade-in-up_0.5s_ease-out]">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <p className="text-green-500 font-medium">{alertMessage}</p>
                  </div>
                )}
                <form ref={formRef} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block body-sm text-text-secondary mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block body-sm text-text-secondary mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block body-sm text-text-secondary mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block body-sm text-text-secondary mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <MagneticButton
                      type="button"
                      size="lg"
                      className="w-full"
                      strength={0.5}
                      onClick={handleWhatsApp}
                    >
                      <Send size={20} className="mr-2" />
                      WhatsApp Me
                    </MagneticButton>
                    <MagneticButton
                      type="button"
                      size="lg"
                      variant="secondary"
                      className="w-full"
                      strength={0.5}
                      onClick={handleEmailSend}
                    >
                      <Mail size={20} className="mr-2" />
                      Send Email
                    </MagneticButton>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div>
              <h3 className="heading-sm mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  const content = (
                    <Card className="group card-hover relative">
                      <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-accent-cyan/10 group-hover:bg-accent-cyan/20 transition-all group-hover:scale-110 duration-300">
                            <Icon className="w-6 h-6 text-accent-cyan" />
                          </div>
                          <div>
                            <div className="body-sm text-text-muted">{info.label}</div>
                            <div className="font-medium text-text-primary group-hover:text-accent-cyan transition-colors">{info.value}</div>
                          </div>
                        </div>
                        {(info.label === 'Email' || info.label === 'Phone') && (
                          <button
                            onClick={() => copyToClipboard(info.value, info.label)}
                            className="p-2 rounded-lg hover:bg-accent-cyan/10 transition-all"
                            title="Copy to clipboard"
                          >
                            {copiedField === info.label ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <Copy className="w-5 h-5 text-text-muted hover:text-accent-cyan" />
                            )}
                          </button>
                        )}
                      </CardContent>
                    </Card>
                  )

                  return info.link ? (
                    <a key={index} href={info.link} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="heading-sm mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 rounded-xl bg-transparent border border-transparent hover:scale-125 transition-all group relative"
                    >
                      <Icon className="w-8 h-8 text-text-secondary group-hover:text-accent-cyan transition-colors" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Map */}
            <Card className="overflow-hidden card-hover">
              <CardContent className="p-0">
                <div className="relative">
                  <iframe
                    src="https://maps.google.com/maps?width=100%25&height=300&hl=en&q=6th%20of%20October%20City,%20Giza,%20Egypt&t=&z=12&ie=UTF8&iwloc=B&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-bg-primary/20 to-transparent" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}