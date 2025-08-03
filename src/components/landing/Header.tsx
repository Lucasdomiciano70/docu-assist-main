import { Button } from "@/components/ui/button";
import { FileSignature, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <FileSignature className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AssinaFácil
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Recursos
            </a>
            <a href="#templates" className="text-foreground hover:text-primary transition-colors">
              Templates
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Preços
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              Sobre
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost">
              Entrar
            </Button>
            <Button variant="default">
              Criar Conta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <a href="#features" className="text-foreground hover:text-primary transition-colors py-2">
                Recursos
              </a>
              <a href="#templates" className="text-foreground hover:text-primary transition-colors py-2">
                Templates
              </a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors py-2">
                Preços
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors py-2">
                Sobre
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" className="justify-start">
                  Entrar
                </Button>
                <Button variant="default" className="justify-start">
                  Criar Conta
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;