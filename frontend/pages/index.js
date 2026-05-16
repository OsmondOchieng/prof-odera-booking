import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

const serviceItems = [
  {
    icon: '🧠',
    title: 'Counseling',
    description: 'Careful, confidential guidance for personal, family, and academic challenges.',
  },
  {
    icon: '🧠',
    title: 'Psychology Services',
    description: 'Evidence-based psychological support for wellbeing and performance.',
  },
  {
    icon: '🌱',
    title: 'Trauma Therapy',
    description: 'Healing-centered support for trauma, PTSD, and stress recovery.',
  },
  {
    icon: '🎯',
    title: 'Career Guidance',
    description: 'Structured planning for career direction, study choices, and success.',
  },
  {
    icon: '🎤',
    title: 'Workshops',
    description: 'Interactive training for teams, schools, and professional groups.',
  },
  {
    icon: '📚',
    title: 'Educational Psychology',
    description: 'Assessment and support to improve learning, focus, and academic growth.',
  },
];

const stats = [
  { value: '25+', label: 'Years of Experience' },
  { value: '45+', label: 'Peer-reviewed Publications' },
  { value: '12', label: 'Universities Served' },
  { value: '18', label: 'Counseling Specialties' },
];

const testimonials = [
  {
    quote: 'Prof. Odera helped me regain confidence and direction after a difficult chapter. His blend of psychology and practical guidance is unmatched.',
    name: 'Esther M.',
    role: 'Graduate Student',
  },
  {
    quote: 'The career guidance session transformed how I approached my future. Clear, compassionate, and deeply professional.',
    name: 'Samuel N.',
    role: 'Young Professional',
  },
  {
    quote: 'A truly academic yet warm approach that made trauma recovery feel manageable and hopeful.',
    name: 'Grace A.',
    role: 'Educator',
  },
];

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 py-24 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="animate-fade-in space-y-8">
              <span className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary border border-primary/20 hover:border-primary/40 transition-colors">
                ✨ Academic mental health care
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gradient">
                Counseling, trauma therapy, career guidance and educational psychology with professional clarity.
              </h1>
              <p className="mt-6 max-w-3xl text-xl text-slate-600 leading-relaxed font-light">
                Prof. Odera brings a modern academic approach to counseling and psychology services, helping learners, leaders, families and professionals move forward with confidence.
              </p>

              <div className="mt-12 flex flex-col sm:flex-row gap-5">
                <button onClick={() => router.push('/book')} className="btn btn-secondary text-lg shadow-xl hover:shadow-2xl px-8 py-4">
                  📅 Book an Appointment
                </button>
                <button onClick={() => router.push('/academic-profile')} className="btn bg-white text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 text-lg border-2 border-primary shadow-lg hover:shadow-xl px-8 py-4 font-semibold">
                  View Academic Profile
                </button>
              </div>

              <div className="mt-14 grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                  <p className="text-xs uppercase tracking-widest font-bold text-primary">⚡ Appointment System</p>
                  <h2 className="mt-4 text-2xl font-bold text-slate-900">Fast, secure booking</h2>
                  <p className="mt-3 text-slate-600 font-light">Schedule sessions online with clear availability and confirmation for every consultation.</p>
                </div>
                <div className="rounded-2xl border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent p-8 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg">
                  <p className="text-xs uppercase tracking-widest font-bold text-secondary">✨ Professional design</p>
                  <h2 className="mt-4 text-2xl font-bold text-slate-900">Clean, modern presentation</h2>
                  <p className="mt-3 text-slate-600 font-light">A polished academic layout using blue and green tones, white space, and clear cards.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 animate-float">
              <div className="card border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-white hover:border-primary/50 shadow-xl">
                <p className="text-xs uppercase tracking-widest font-bold text-primary">🎓 Trusted expertise</p>
                <h2 className="mt-5 text-3xl font-bold text-slate-900">Publications, institutions, specialties</h2>
                <p className="mt-4 text-slate-600 font-light leading-relaxed">A strong academic foundation with a focus on research, training and practical client outcomes.</p>
              </div>
              <div className="card border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-white hover:border-secondary/50 shadow-xl">
                <p className="text-xs uppercase tracking-widest font-bold text-secondary">❤️ Client-first care</p>
                <h2 className="mt-5 text-3xl font-bold text-slate-900">Compassionate and evidence-based</h2>
                <p className="mt-4 text-slate-600 font-light leading-relaxed">Every session is designed to deliver professional support that is clear, warm, and actionable.</p>
              </div>
              <div className="card border-2 border-slate-100 p-8 bg-white/80 backdrop-blur-sm text-center">
                <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-500">Photo</div>
                <p className="font-semibold text-slate-900">Prof. Peter Odera</p>
                <p className="text-sm text-slate-600">Profile photo (coming soon)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in">
            <p className="text-sm uppercase tracking-widest font-bold text-primary">🎯 Core Services</p>
            <h2 className="mt-6 text-5xl lg:text-6xl font-bold text-slate-900">Services focused on your growth</h2>
            <p className="mt-6 text-xl text-slate-600 leading-relaxed font-light">
              Counseling, psychology, trauma therapy, career guidance, workshops and educational psychology—designed to support individuals, students and organizations.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((service, index) => (
              <div 
                key={service.title} 
                className="card border-2 border-slate-100 hover:border-primary/50 group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 inline-block">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-primary to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <div className="text-center mb-14 animate-fade-in">
            <p className="text-sm uppercase tracking-widest font-bold text-blue-100">📊 Impact & Credentials</p>
            <h2 className="mt-6 text-5xl font-bold">Academic credibility and real-world outcomes</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-12">
            {stats.map((item, index) => (
              <div 
                key={item.label} 
                className="card bg-white/10 backdrop-blur-md border border-white/20 text-center py-12 hover:bg-white/20 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-6xl font-bold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">{item.value}</h3>
                <p className="mt-4 text-blue-50 font-semibold">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-2xl font-bold">45+ Publications</h3>
              <p className="mt-4 text-blue-100 leading-relaxed">Peer-reviewed research and academic work that inform each service and intervention.</p>
            </div>
            <div className="card bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-2xl font-bold">12 Universities</h3>
              <p className="mt-4 text-blue-100 leading-relaxed">Experienced consulting and training with higher education, schools, and professional institutes.</p>
            </div>
            <div className="card bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-2xl font-bold">18 Specialties</h3>
              <p className="mt-4 text-blue-100 leading-relaxed">Trauma recovery, career transition, academic coaching, family therapy and leadership development.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in">
            <p className="text-sm uppercase tracking-widest font-bold text-secondary">💬 Client Feedback</p>
            <h2 className="mt-6 text-5xl lg:text-6xl font-bold text-slate-900">What clients say</h2>
          </div>

          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <p className="text-center text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Real feedback from individuals and professionals who have worked with Prof. Odera. Read full stories or share your own experience.
            </p>
            <button
              onClick={() => router.push('/testimonials')}
              className="btn btn-secondary text-base px-6 py-3 mx-auto sm:mx-0"
            >
              Read real feedback
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <div 
                key={item.name} 
                className="card border-2 border-slate-100 hover:border-secondary/50 hover:shadow-2xl bg-white/80 backdrop-blur-sm group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl text-amber-400 group-hover:scale-110 transition-transform">⭐</span>
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed text-lg italic font-light">"{item.quote}"</p>
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{item.name}</p>
                  <p className="text-sm text-secondary font-semibold">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary via-blue-600 to-secondary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">Ready to build a healthier future?</h2>
          <p className="text-xl text-blue-50 mb-12 leading-relaxed font-light">
            Book a session, download the academic profile, or explore the full range of psychology services available today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => router.push('/book')} className="btn bg-white text-primary hover:bg-blue-50 text-lg font-bold shadow-xl px-8 py-4">
              📅 Book an Appointment
            </button>
            <button onClick={() => router.push('/academic-profile')} className="btn border-2 border-white text-white hover:bg-white/20 text-lg font-bold shadow-xl px-8 py-4">
              📄 View Academic Profile
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
