import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { cn } from '../lib/utils';
import { TEMPLATES, USE_CASES, FEATURES, TESTIMONIALS } from '../data/homeData';

export const HomePage: React.FC = () => {
  const [activeTemplateType, setActiveTemplateType] = useState('all');

  const filteredTemplates = activeTemplateType === 'all' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.productType === activeTemplateType);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section - Updated */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0d2e1f] to-[#1a472a]">
        <div className="container px-4 md:px-6 mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Custom Apparel. <br />
              <span className="text-white/90">Simplified.</span>
            </h1>
            
            <div className="space-y-3 text-lg md:text-xl text-white/80">
                <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                    <span>Design smarter with AI</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                    <span>Validate instantly</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
                    <span>Ship faster, anywhere</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto h-14 text-base px-8 bg-white hover:bg-white/90 text-[#1a472a] border-none shadow-lg hover:scale-105 transition-all duration-300">
                  Explore Collection
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Visuals - Floating Elements */}
          <div className="relative h-[600px] hidden lg:block perspective-1000">
             <div className="absolute top-10 right-10 w-80 aspect-[3/4] bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out animate-float">
                <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="T-Shirt Mockup" className="w-full h-full object-cover" />
             </div>
             <div className="absolute bottom-20 left-10 w-72 aspect-[3/4] bg-white rounded-2xl shadow-2xl overflow-hidden transform -rotate-y-12 -rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out z-20 animate-float-delayed">
                <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hoodie Mockup" className="w-full h-full object-cover" />
             </div>
             {/* Floating UI Elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur shadow-lg border rounded-lg p-4 flex items-center gap-3 z-30 animate-in fade-in zoom-in duration-1000 delay-300">
                 <div className="h-3 w-3 rounded-full bg-[#1a472a] animate-pulse" />
                 <span className="text-sm font-medium text-[#1a472a]">Print File Validated</span>
             </div>
          </div>
        </div>
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-white/20 rounded-full blur-3xl opacity-40 -z-10 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      </section>

      {/* 2. Featured Collections / Templates */}
      <section className="py-24 bg-muted/10">
        <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Collections</h2>
                    <p className="text-muted-foreground mt-2 text-lg">Start with a professional template or build from scratch.</p>
                </div>
                
                {/* Filter Tabs */}
                <div className="flex gap-2 p-1 bg-muted rounded-lg">
                    {['all', 't-shirt', 'hoodie', 'sweatshirt'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveTemplateType(type)}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-md transition-all capitalize",
                                activeTemplateType === type 
                                    ? "bg-white shadow-sm text-foreground" 
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {type === 'all' ? 'All Items' : type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                    <div key={template.id} className="group relative bg-background rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                            <img 
                                src={template.image} 
                                alt={template.name} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
                                <Link to={`/customizer?template=${template.id}`} className="w-full">
                                    <Button className="w-full bg-white text-black hover:bg-white/90">Customize</Button>
                                </Link>
                            </div>
                            <div className="absolute top-3 left-3">
                                <Badge variant="secondary" className="bg-white/90 backdrop-blur shadow-sm text-xs">
                                    {template.style}
                                </Badge>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-semibold text-base line-clamp-1" title={template.name}>{template.name}</h3>
                                <span className="text-sm font-medium text-muted-foreground">From ${template.price}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{template.category}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 text-center">
                <Link to="/products">
                    <Button variant="outline" size="lg">View All Templates</Button>
                </Link>
            </div>
        </div>
      </section>

      {/* 3. Core Features */}
      <section className="py-24 border-y">
        <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Platform Capabilities</h2>
                <p className="text-muted-foreground text-lg">Built for scale, quality, and creative freedom.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {FEATURES.map((feature, idx) => (
                    <div key={idx} className="flex gap-4">
                        <div className="h-12 w-12 shrink-0 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center">
                            <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. Use Cases / Scenarios */}
      <section className="py-24 bg-muted/10">
        <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-12">Designed for every scenario</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {USE_CASES.map((useCase) => (
                    <div key={useCase.id} className="relative group overflow-hidden rounded-2xl aspect-[3/4] md:aspect-[4/5]">
                        <img 
                            src={useCase.image} 
                            alt={useCase.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <useCase.icon size={20} className="text-white/80" />
                                <h3 className="text-2xl font-bold">{useCase.title}</h3>
                            </div>
                            <p className="text-white/80 mb-6 max-w-xs">{useCase.description}</p>
                            <Link to="/customizer" className="inline-block">
                                <Button variant="secondary" className="bg-white text-black hover:bg-white/90">
                                    Start Designing
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-24">
        <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight">Trusted by creators</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t) => (
                    <Card key={t.id} className="p-8 border bg-background shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex gap-1 text-primary mb-4">
                            {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <Quote className="text-muted-foreground/20 mb-4" size={32} />
                        <p className="text-lg font-medium mb-6 leading-relaxed">"{t.text}"</p>
                        <div>
                            <div className="font-semibold">{t.name}</div>
                            <div className="text-sm text-muted-foreground">{t.role}, {t.company}</div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      </section>

    </div>
  );
};
