import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowDown, MapPin, Phone, WhatsappLogo, Star, Quotes,
  CaretLeft, CaretRight, CheckCircle, Lightning, Heart, Users, Trophy, Timer, Fire, Lightbulb,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import siteData from '../data/siteData';

const iconMap = { Heart, Star, Lightning, Trophy, Users, Timer, Fire, CheckCircle, Lightbulb };

function AnimatedCounter({ target, suffix = '', duration = 2.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10) || 0;
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = numericTarget / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) { setCount(numericTarget); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, numericTarget, duration]);
  return <span ref={ref}>{inView ? count.toLocaleString() : '0'}{suffix}</span>;
}

function NoiseTexture({ opacity = 0.035 }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10" style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat', backgroundSize: '128px 128px',
    }} />
  );
}


/* 1. HERO — Split Layout (Text Left, Image Right) */
function HeroSection() {
  const { business, hero } = siteData;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      <NoiseTexture opacity={0.04} />
      <div className="relative z-20 grid lg:grid-cols-2 min-h-screen">
        {/* Left — Text */}
        <motion.div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-32 lg:py-20" style={{ y: textY, opacity }}>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }} className="w-16 h-[3px] bg-[#EF4444] mb-6 origin-left" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#EF4444] text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] mb-6"
            style={{ fontFamily: 'var(--font-sans)' }}>
            {hero.badge || "Athletic Excellence"}
          </motion.p>
          <div className="overflow-hidden">
            {(hero.titleLines || ['BECOME', 'UNSTOPPABLE']).map((line, i) => (
              <motion.div key={line} initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}>
                <h1 className={`font-heading leading-[0.90] tracking-tight ${i === 1 ? 'text-[#EF4444] italic' : 'text-white'}`}
                  style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', fontWeight: i === 1 ? 800 : 300 }}>
                  {line}
                </h1>
              </motion.div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="text-white/40 text-sm sm:text-base leading-relaxed mt-8 max-w-md" style={{ fontFamily: 'var(--font-sans)' }}>
            {hero.subtitle || "Where determination meets world-class coaching. Every rep counts, every session transforms."}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }} className="flex flex-wrap gap-4 mt-10">
            <Link to="/contact"
              className="group inline-flex items-center gap-3 bg-[#EF4444] text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:shadow-xl hover:shadow-[#EF4444]/30"
              style={{ fontFamily: 'var(--font-sans)' }}>
              {hero.ctaPrimary || 'Join Now'} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/services"
              className="group inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold hover:border-[#EF4444]/50 hover:text-[#EF4444] transition-all duration-500"
              style={{ fontFamily: 'var(--font-sans)' }}>
              {hero.ctaSecondary || 'Explore Programs'}
            </Link>
          </motion.div>
          {/* Member count ticker */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            className="flex items-center gap-4 mt-12 border-t border-white/5 pt-8">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-black flex items-center justify-center">
                  <Users size={12} className="text-[#EF4444]/60" />
                </div>
              ))}
            </div>
            <div>
              <span className="text-white font-heading text-lg font-bold"><AnimatedCounter target="500" suffix="+" /></span>
              <span className="text-white/30 text-xs ml-2 uppercase tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>Active Members</span>
            </div>
          </motion.div>
        </motion.div>
        {/* Right — Image */}
        <div className="relative hidden lg:block">
          <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80" alt="Yo Fitness Westgate" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40" />
          <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2">
              <Star size={14} weight="fill" className="text-[#EF4444]" />
              <span className="text-white text-sm font-bold" style={{ fontFamily: 'var(--font-sans)' }}>{business.rating || 4.5} / 5</span>
              <span className="text-white/30 text-xs ml-1">Google</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. MARQUEE */
function MarqueeTicker() {
  const items = siteData.marqueeItems || ['DEADLIFTS', 'SQUATS', 'BENCH PRESS', 'PULL-UPS', 'KETTLEBELLS', 'BATTLE ROPES'];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className="bg-[#EF4444] py-4 sm:py-5 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-6 sm:gap-8 mx-6 sm:mx-8">
            <span className="text-white font-heading text-base sm:text-xl font-bold tracking-wider uppercase">{item}</span>
            <span className="text-white/30 text-sm">&diams;</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* 3. SERVICES BENTO */
function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { servicesPreview, services } = siteData;
  const fi = ['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80','https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80','https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80','https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80','https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80','https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80'];
  return (
    <section ref={ref} className="bg-neutral-950 py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-14 sm:mb-20">
          <div className="w-12 h-[3px] bg-[#EF4444] mb-6" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-[#EF4444]/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>What We Offer</p>
              <h2 className="font-heading text-white leading-[0.92] font-bold" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Our <span className="text-[#EF4444]">Programs</span>
              </h2>
            </div>
            <Link to="/services" className="group text-white/30 text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:text-[#EF4444] transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
              View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {(servicesPreview || []).slice(0, 6).map((service, i) => {
            const IconComp = iconMap[service.icon] || iconMap[service.iconName] || Star;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08 * i }}
                className={i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}>
                <Link to={`/services#${services?.items?.[i]?.slug || ''}`}
                  className={`group relative block overflow-hidden ${i === 0 ? 'aspect-[16/9] sm:aspect-[2/1]' : 'aspect-[3/4]'}`}>
                  <img src={service.image || fi[i] || fi[0]} alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 opacity-90" />
                  <div className="absolute top-4 right-5 z-10">
                    <span className="text-[#EF4444]/10 font-heading text-6xl sm:text-7xl font-bold leading-none italic">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="absolute top-5 left-5 z-10 w-10 h-10 bg-[#EF4444] flex items-center justify-center">
                    <IconComp size={18} weight="fill" className="text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                    <h3 className="font-heading text-white text-xl sm:text-2xl font-bold italic tracking-wide mb-2">{service.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{service.desc}</p>
                    <div className="flex items-center gap-2 mt-3 text-[#EF4444] group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>Details</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EF4444] to-[#EF4444]/60 z-10" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 4. YOUR FITNESS JOURNEY — Process Section */
function JourneySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const steps = [
    { num: '01', title: 'Goal Setting', desc: 'Define what success looks like for you — strength, aesthetics, or endurance.' },
    { num: '02', title: 'Blueprint', desc: 'Your coach builds a progressive overload program just for you.' },
    { num: '03', title: 'Grind', desc: 'Daily sessions with accountability, form checks, and real-time adjustments.' },
    { num: '04', title: 'Evolution', desc: 'Review, adapt, and push to new personal records every month.' },
  ];
  return (
    <section ref={ref} className="bg-black py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center mb-16 sm:mb-24">
          <div className="w-12 h-[3px] bg-[#EF4444] mx-auto mb-6" />
          <p className="text-[#EF4444]/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>How It Works</p>
          <h2 className="font-heading text-white leading-[0.95] font-bold" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            Your Fitness <span className="text-[#EF4444] italic">Journey</span>
          </h2>
        </motion.div>
        <div className="relative">
          <div className="hidden lg:block absolute top-20 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-[#EF4444]/10 via-[#EF4444]/30 to-[#EF4444]/10 z-0" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 * i }}
                className="relative text-center z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-neutral-950 border-2 border-[#EF4444] flex items-center justify-center relative">
                  <span className="text-[#EF4444] font-heading text-xl font-bold">{step.num}</span>
                </div>
                <h3 className="font-heading text-white text-lg font-bold italic mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-[260px] mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 5. ABOUT */
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { business, about } = siteData;
  return (
    <section ref={ref} className="bg-neutral-950 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }} className="relative">
            <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80" alt="Yo Fitness Westgate" className="w-full aspect-[4/5] object-cover object-center" loading="eager" />
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-[3px] border-l-[3px] border-[#EF4444]/40" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-[3px] border-r-[3px] border-[#EF4444]/40" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}>
            <div className="w-12 h-[3px] bg-[#EF4444] mb-6" />
            <p className="text-[#EF4444]/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Our Story</p>
            <h2 className="font-heading text-white leading-[0.95] font-bold mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Built For <span className="text-[#EF4444] italic">Athletes</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 max-w-lg" style={{ fontFamily: 'var(--font-sans)' }}>
              {about?.description || "Yo Fitness Westgate was founded on a simple belief: that everyone deserves access to world-class fitness. Located in Harare, we combine cutting-edge equipment with passionate coaching to help you become the strongest version of yourself."}
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10 border-t border-white/5 pt-8">
              <div><div className="text-[#EF4444] font-heading text-3xl font-bold italic"><AnimatedCounter target="{String(business.reviewCount || 18)}" suffix="+" /></div>
                <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-1" style={{ fontFamily: 'var(--font-sans)' }}>Reviews</div></div>
              <div><div className="text-[#EF4444] font-heading text-3xl font-bold italic">{business.rating || 3.5}</div>
                <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-1" style={{ fontFamily: 'var(--font-sans)' }}>Rating</div></div>
              <div><div className="text-[#EF4444] font-heading text-3xl font-bold italic">500+</div>
                <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-1" style={{ fontFamily: 'var(--font-sans)' }}>Members</div></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* 6. TESTIMONIALS */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const { homeTestimonials } = siteData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const defaults = [
    { text: 'The best decision I ever made for my health. The coaches here truly care.', name: 'Kudzi M.', role: 'Member', rating: 5 },
    { text: 'World-class facility right here in Harare. I would not train anywhere else.', name: 'Tino R.', role: 'Athlete', rating: 5 },
    { text: 'From day one, I felt welcome. The community keeps me coming back.', name: 'Sarah N.', role: 'Fitness Enthusiast', rating: 5 },
  ];
  const testimonials = homeTestimonials?.length ? homeTestimonials : defaults;
  const next = useCallback(() => setActive(p => (p + 1) % testimonials.length), [testimonials.length]);
  const prev = useCallback(() => setActive(p => (p - 1 + testimonials.length) % testimonials.length), [testimonials.length]);
  useEffect(() => { const t = setInterval(next, 7000); return () => clearInterval(t); }, [next]);
  const t = testimonials[active];
  return (
    <section ref={ref} className="relative bg-black py-24 sm:py-32 lg:py-40 overflow-hidden">
      <NoiseTexture opacity={0.02} />
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center">
          <Quotes size={48} weight="fill" className="text-[#EF4444]/15 mx-auto mb-8" />
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
              <blockquote className="text-white text-lg sm:text-xl lg:text-2xl leading-relaxed font-heading font-bold italic mb-10">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center gap-3">
                {t.avatar && <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#EF4444]/30" loading="eager" />}
                <div className="w-8 h-[2px] bg-[#EF4444]" />
                <div className="text-white text-sm uppercase tracking-[0.15em] font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>{t.name}</div>
                <div className="text-white/40 text-xs uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-sans)' }}>{t.role}</div>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(t.rating || 5)].map((_, j) => <Star key={j} size={12} weight="fill" className="text-[#EF4444]" />)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-6 mt-12">
            <button onClick={prev} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-[#EF4444] transition-colors" aria-label="Previous"><CaretLeft size={16} /></button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => <button key={i} onClick={() => setActive(i)} className={`h-[2px] transition-all duration-500 ${i === active ? 'w-10 bg-[#EF4444]' : 'w-3 bg-white/10'}`} aria-label={`T${i+1}`} />)}
            </div>
            <button onClick={next} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-[#EF4444] transition-colors" aria-label="Next"><CaretRight size={16} /></button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* 7. CTA */
function CTASection() {
  const { business, homeCta } = siteData;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  return (
    <section ref={ref} className="relative py-28 sm:py-36 lg:py-48 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src="https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200&q=80" alt="Yo Fitness Westgate" className="w-full h-[130%] object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>
      <NoiseTexture opacity={0.03} />
      <div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1 }}>
          <div className="w-16 h-[3px] bg-[#EF4444] mx-auto mb-8" />
          <h2 className="font-heading text-white leading-[0.92] font-bold mb-8" style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)' }}>
            NO MORE EXCUSES<br /><span className="text-[#EF4444] italic">JUST RESULTS</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto mb-12 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            {homeCta?.subtitle || 'Your transformation starts with a single step. Walk through our doors and let us show you what is possible.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="group inline-flex items-center gap-3 bg-[#EF4444] text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold hover:shadow-xl hover:shadow-[#EF4444]/25 transition-all duration-500" style={{ fontFamily: 'var(--font-sans)' }}>
              {homeCta?.ctaPrimary || 'Get Started Today'} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={`https://wa.me/${business.whatsappNumber || '263771961596'}?text=${encodeURIComponent(homeCta?.whatsappText || "Hi! I'd like to join Yo Fitness Westgate.")}`}
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-green-500/40 text-green-400 px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold hover:bg-green-500/10 transition-all duration-500" style={{ fontFamily: 'var(--font-sans)' }}>
              <WhatsappLogo size={20} weight="fill" /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* 8. LOCATION */
function LocationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { business } = siteData;
  return (
    <section ref={ref} className="bg-black py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="w-12 h-[3px] bg-[#EF4444] mb-6" />
            <h2 className="font-heading text-white leading-[0.95] font-bold mb-8" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
              Find <span className="text-[#EF4444] italic">Us</span>
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#EF4444] flex items-center justify-center shrink-0"><MapPin size={18} weight="fill" className="text-white" /></div>
                <div><p className="text-white text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>{business.address || '6XRM+43W, Harare, Zimbabwe'}</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#EF4444] flex items-center justify-center shrink-0"><Phone size={18} weight="fill" className="text-white" /></div>
                <div><a href={`tel:${business.phone || '+263 77 196 1596'}`} className="text-white/60 text-sm hover:text-[#EF4444] transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>{business.phone || '+263 77 196 1596'}</a></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#EF4444] flex items-center justify-center shrink-0"><WhatsappLogo size={18} weight="fill" className="text-white" /></div>
                <div><a href={`https://wa.me/${business.whatsappNumber || '263771961596'}`} target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm hover:text-[#EF4444] transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>Message on WhatsApp</a></div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }} className="relative aspect-[4/3] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80" alt="Yo Fitness Westgate" className="w-full h-full object-cover object-center" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <MarqueeTicker />
      <ServicesGrid />
      <JourneySection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <LocationSection />
    </PageTransition>
  );
}
