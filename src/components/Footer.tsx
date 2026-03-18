import '@fontsource/libre-barcode-39-text';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-24 pt-10 pb-10 border-t border-border max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <a href="#" className="text-[42px] [font-family:'Libre_Barcode_39_Text']">
          <span className="gradient-text">Nishant</span>
          <span className="text-foreground">Dhupia</span>
        </a>
        <p>© 2026 Nishant Dhupia. All rights reserved. 🇮🇳</p>
      </div>
    </footer>
  );
};

export default Footer;
