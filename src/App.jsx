import { useState, useEffect, useRef } from 'react'
import {
  ShieldAlert,
  Smartphone,
  BadgeDollarSign,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Star,
  ArrowRight,
  Scale,
  Clock,
  Lock,
} from 'lucide-react'

const WHATSAPP_URL =
  'https://wa.me/556481226160?text=Ol%C3%A1%2C+tive+o+celular+bloqueado+por+parcela+atrasada+e+quero+saber+meus+direitos.'

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const rights = [
  {
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/20',
    title: 'Prática Abusiva',
    desc: 'A cobrança de dívidas não pode expor o cliente ao ridículo, nem interferir no uso de um bem essencial para a vida, o trabalho e a comunicação.',
  },
  {
    icon: Smartphone,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    title: 'Desbloqueio Imediato',
    desc: 'Uma ação rápida na justiça pode obrigar a operadora ou loja a restabelecer o uso do seu aparelho de forma urgente, sem esperar o fim do processo.',
  },
  {
    icon: BadgeDollarSign,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    title: 'Danos Morais',
    desc: 'O transtorno causado pelo isolamento digital forçado gera direito a uma compensação financeira pelos danos morais sofridos.',
  },
]

const steps = [
  { icon: MessageCircle, label: 'Fale conosco pelo WhatsApp', sub: 'Atendimento rápido e digital' },
  { icon: Scale, label: 'Análise gratuita do seu caso', sub: 'Sem compromisso inicial' },
  { icon: Lock, label: 'Ingressamos com a ação', sub: 'Desbloqueio + indenização' },
  { icon: CheckCircle2, label: 'Você recebe seu direito', sub: 'Resolução ágil e garantida' },
]

const faqs = [
  {
    q: 'Minha operadora pode bloquear o celular por falta de pagamento?',
    a: 'Não para compras a prazo/financiamento. O bloqueio do aparelho como ferramenta de cobrança é considerado prática abusiva pelo CDC. Operadoras podem suspender a linha, mas não o aparelho que é de sua propriedade.',
  },
  {
    q: 'Quanto tempo leva para conseguir o desbloqueio?',
    a: 'Em casos urgentes, uma liminar judicial pode ser obtida em 24 a 72 horas, obrigando a empresa a desbloquear o aparelho imediatamente.',
  },
  {
    q: 'Quanto posso receber de indenização por danos morais?',
    a: 'Os valores variam conforme o caso, mas decisões recentes no Brasil têm fixado indenizações entre R$ 2.000 e R$ 10.000 por essa prática abusiva.',
  },
  {
    q: 'Preciso pagar adiantado pelos serviços do advogado?',
    a: 'A análise do caso é totalmente gratuita. Nossa equipe irá avaliar sua situação e apresentar as opções disponíveis sem qualquer custo inicial.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card-glass overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-sm sm:text-base text-white/90 leading-snug">{q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-blue-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-5 pb-5 text-sm text-white/60 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white overflow-x-hidden">

      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0a0c10]/95 backdrop-blur-md border-b border-[#1e2128]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Sousa Campos Advogados" className="h-9 w-9 rounded-lg object-cover" />
            <span className="font-serif font-bold text-sm sm:text-base tracking-wide">
              Sousa Campos <span className="text-blue-400">Advogados</span>
            </span>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 glow-orange"
          >
            <MessageCircle size={15} />
            Falar Agora
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex flex-col justify-center px-5 pt-24 pb-16 overflow-hidden">
        {/* background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px]" />
          <div className="absolute bottom-[-5%] right-[-15%] w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.04)_0%,_transparent_60%)]" />
        </div>

        <div className="relative max-w-2xl mx-auto text-center">
          {/* badge */}
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <ShieldAlert size={12} />
              Alerta: Seus Direitos Estão Sendo Violados
            </span>
          </AnimatedSection>

          {/* headline */}
          <AnimatedSection delay={80}>
            <h1 className="font-serif font-bold text-[2rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.15] mb-5">
              Teve o celular{' '}
              <span className="relative inline-block">
                <span className="text-gradient">bloqueado</span>
              </span>{' '}
              por parcela atrasada?{' '}
              <span className="text-orange-400">Isso é ilegal!</span>
            </h1>
          </AnimatedSection>

          {/* subheadline */}
          <AnimatedSection delay={160}>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Usar o bloqueio do aparelho como mecanismo de cobrança é uma{' '}
              <strong className="text-white/80">prática abusiva</strong> pelo Código de Defesa do Consumidor.
              A Justiça já decidiu: você tem direito ao{' '}
              <strong className="text-blue-400">desbloqueio imediato</strong> e pode receber{' '}
              <strong className="text-emerald-400">indenização por danos morais</strong>.
            </p>
          </AnimatedSection>

          {/* CTA buttons */}
          <AnimatedSection delay={240}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-base px-7 py-4 rounded-2xl transition-all duration-200 glow-orange"
              >
                <MessageCircle size={18} />
                SOLICITAR DESBLOQUEIO E INDENIZAÇÃO
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <p className="mt-4 text-white/35 text-xs">
              Análise gratuita · Sem compromisso · Atendimento 100% digital
            </p>
          </AnimatedSection>

          {/* social proof pills */}
          <AnimatedSection delay={320}>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {['Desbloqueio em 24h', 'Sem pagar adiantado', 'Casos resolvidos online'].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                >
                  <CheckCircle2 size={11} className="text-emerald-400" />
                  {t}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center">
          <ChevronDown size={20} className="text-white/20 animate-bounce" />
        </div>
      </section>

      {/* ── URGENCY BANNER ── */}
      <div className="bg-gradient-to-r from-red-900/40 via-red-800/30 to-red-900/40 border-y border-red-500/20 py-4 px-5">
        <p className="text-center text-sm text-red-300 font-medium max-w-lg mx-auto">
          ⚠️ Cada dia com o celular bloqueado é mais prejuízo. Quanto antes agir, melhor para seu caso.
        </p>
      </div>

      {/* ── DIREITOS (3 cards) ── */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">
                Código de Defesa do Consumidor
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl mt-2">
                Conheça os seus direitos
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-5">
            {rights.map((r, i) => (
              <AnimatedSection key={r.title} delay={i * 100}>
                <div className={`card-glass p-6 h-full flex flex-col gap-4 border ${r.border} hover:border-opacity-60 transition-all duration-300 group`}>
                  <div className={`w-12 h-12 rounded-xl ${r.bg} flex items-center justify-center`}>
                    <r.icon size={24} className={r.color} />
                  </div>
                  <h3 className="font-bold text-lg">{r.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed flex-1">{r.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="py-20 px-5 bg-[#0d0f14]">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest">
                Processo simples
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl mt-2">
                Como resolver em 4 passos
              </h2>
            </div>
          </AnimatedSection>

          <div className="flex flex-col gap-4">
            {steps.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 80}>
                <div className="card-glass p-5 flex items-center gap-5 group hover:border-blue-400/30 transition-all duration-300">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center">
                    <s.icon size={20} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm sm:text-base">{s.label}</p>
                    <p className="text-white/45 text-xs mt-0.5">{s.sub}</p>
                  </div>
                  <span className="shrink-0 text-2xl font-bold text-white/10 font-serif">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA CENTRAL ── */}
      <section className="py-20 px-5">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center card-glass border-blue-400/20 border p-8 sm:p-12 glow-blue rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-orange-500/5 pointer-events-none" />
            <div className="relative">
              <Clock size={32} className="text-orange-400 mx-auto mb-4" />
              <h2 className="font-serif font-bold text-2xl sm:text-3xl mb-4 leading-snug">
                Não perca mais tempo com o celular bloqueado
              </h2>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-8">
                Nossa equipe está pronta para analisar o seu caso de forma gratuita e digital.
                Você pode ter direito ao desbloqueio imediato e a uma indenização.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 glow-orange"
              >
                <MessageCircle size={18} />
                FALAR COM ADVOGADO AGORA
              </a>
              <p className="mt-4 text-white/30 text-xs">Atendimento via WhatsApp · Gratuito · Sem burocracia</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── SOBRE O ESCRITÓRIO ── */}
      <section className="py-20 px-5 bg-[#0d0f14]">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="shrink-0">
                <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-blue-400/25 ring-offset-4 ring-offset-[#0d0f14]">
                  <img src="/logo.jpg" alt="Sousa Campos Advogados" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">
                  Sobre o escritório
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl mt-2 mb-4">
                  Sousa Campos Advogados
                </h2>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5">
                  Atuamos na <strong className="text-white/85">defesa dos direitos do consumidor</strong> de
                  forma ágil e digital. Se você foi vítima dessa cobrança abusiva e ilegal, nossa equipe
                  está pronta para analisar o seu caso e buscar a reparação que você merece.
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {['Direito do Consumidor', 'Danos Morais', 'Direito Digital'].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-10">
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">
                Dúvidas frequentes
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl mt-2">
                Perguntas e respostas
              </h2>
            </div>
          </AnimatedSection>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <FaqItem q={f.q} a={f.a} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#080a0e] border-t border-[#1e2128] py-10 px-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Sousa Campos Advogados" className="h-8 w-8 rounded-lg object-cover" />
            <div>
              <p className="font-serif font-bold text-sm">Sousa Campos Advogados</p>
              <p className="text-white/35 text-xs">© 2026. Todos os direitos reservados.</p>
            </div>
          </div>
          <p className="text-white/30 text-xs max-w-xs leading-relaxed">
            Atendimento Especializado em Direito do Consumidor.
            Este site tem caráter informativo e não constitui consulta jurídica.
          </p>
        </div>
      </footer>

      {/* ── FLOATING CTA (mobile) ── */}
      <div className="fixed bottom-5 inset-x-5 z-40 sm:hidden">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm px-5 py-4 rounded-2xl transition-all duration-200 shadow-2xl glow-orange w-full"
        >
          <MessageCircle size={17} />
          SOLICITAR DESBLOQUEIO AGORA
        </a>
      </div>

    </div>
  )
}
