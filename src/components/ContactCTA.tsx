import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin } from "lucide-react";

const ContactCTA = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null); 

    try {
      const data = {
        name: e.target.name.value,
        email: e.target.email.value,
        subject: e.target.subject.value,
        message: e.target.message.value,
      };

      const res = await fetch("/api/contactMe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Network or server error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
              style={{
                background:
                  "linear-gradient(135deg, hsl(239 84% 67%), hsl(270 75% 60%))",
              }}
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

          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto mb-10 grid gap-4 text-left"
          >
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
              disabled={loading}
              className={`w-full py-3 rounded-full font-display text-base font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.01]"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-500 text-center font-medium">
                Thanks for reaching out. I'll get back to you soon!
              </p>
            )}

            {status === "error" && (
              <p className="text-red-500 text-center font-medium">
                Something broke on my side — try again or email me at
                work@dhupianishant.in
              </p>
            )}
          </form>

          <div className="flex justify-center gap-4">
            {[
              { icon: Github, href: "https://github.com/dhupianishant" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/dhupianishant/" },
              { icon: Mail, href: "mailto:work@dhupianishant.in" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : "_self"}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
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