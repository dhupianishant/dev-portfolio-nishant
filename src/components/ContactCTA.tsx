import { motion } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react';

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  const res = await fetch("http://localhost:3001/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    alert("Message sent successfully!");
    e.target.reset();
  } else {
    alert("Failed to send message. Please try again.");
  } 
};

const ContactCTA = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Let's Build
            <br />
            <span className="gradient-text">Something Great</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Have a project in mind? Let's create something extraordinary together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="mailto:work@dhupianishant.in"
              className="group inline-flex items-center gap-2 px-10 py-5 rounded-full font-display text-base font-semibold transition-all duration-300 hover:scale-105 hover:gap-3 glow-primary"
              style={{ background: 'linear-gradient(135deg, hsl(239 84% 67%), hsl(270 75% 60%))' }}
            >
              Start a Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:work@dhupianishant.in"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-display text-base font-semibold glass-card hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              work@dhupianishant.in
            </a>
          </div>

          {/* <form action="https://formsubmit.co/nishantdhupia18@gmail.com" method="POST" className="max-w-xl mx-auto mb-10 grid gap-4 text-left"> */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-10 grid gap-4 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-muted-foreground">
                Your Name
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="John Doe"
                />
              </label>
              <label className="block text-sm font-medium text-muted-foreground">
                Your Email
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="john@example.com"
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-muted-foreground">
              Subject
              <input
                type="text"
                name="subject"
                required
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Project Inquiry"
              />
            </label>

            <label className="block text-sm font-medium text-muted-foreground">
              Message
              <textarea
                name="message"
                required
                rows={4}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tell me about your project, goals, and timeline."
              />
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-full font-display text-base font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 hover:scale-[1.01]"
            >
              Send Message
            </button>
            
            {/* <input type="hidden" name='_captcha' value='false'/> */}
          </form>

          <div className="flex justify-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/dhupianishant' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/dhupianishant/' },
              { icon: Mail, href: 'mailto:work@dhupianishant.in' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : '_self'}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.15, y: -2 }}
                className="p-4 rounded-full glass-card text-muted-foreground hover:text-foreground transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default ContactCTA;
