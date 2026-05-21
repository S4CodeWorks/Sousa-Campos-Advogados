import { useState, useEffect, useRef } from 'react'
import { ChevronDown, MessageCircle, ArrowUpRight } from 'lucide-react'

const WHATSAPP_URL =
  'https://wa.me/556481226160?text=Ol%C3%A1%2C+tive+o+celular+bloqueado+por+parcela+atrasada+e+quero+saber+meus+direitos.'

function useInView(threshold = 0.1) {
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

function Appear({ children, className = '', delay = 0 }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const faqs = [
  {
    q: 'Minha operadora pode bloquear o celular por falta de pagamento?',
    a: 'Não. O bloqueio do aparelho como ferramenta de cobrança é prática abusiva pelo CDC (Art. 42). A operadora pode suspender a linha, mas não bloquear o aparelho que é de sua propriedade.',
  },
  {
    q: 'Quanto tempo leva para conseguir o desbloqueio?',
    a: 'Em casos urgentes, uma liminar judicial pode ser obtida em 24 a 72 horas, obrigando a empresa a restabelecer o aparelho imediatamente, sem esperar o fim do processo.',
  },
  {
    q: 'Quanto posso receber de indenização por danos morais?',
    a: 'Os valores variam conforme o caso. Decisões recentes no Brasil têm fixado indenizações entre R$ 2.000 e R$ 10.000 por essa prática abusiva.',
  },
  {
    q: 'Preciso pagar adiantado pelos serviços do advogado?',
    a: 'A análise do caso é totalmente gratuita. Nossa equipe avalia sua situação e apresenta as opções sem qualquer custo inicial.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/[0.07]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-5 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-[15px] leading-snug text-white/80 pr-2">{q}</span>
        <ChevronDown
          size={17}
          className={`shrink-0 mt-0.5 transition-all duration-300 ${
            open ? 'rotate-180 text-orange-400' : 'text-white/25'
          }`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-5' : 'max-h-0'}`}>
        <p className="text-[14px] text-white/45 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0c10]/95 backdrop-blur-md border-b border-white/[0.06]' : 'bg-transparent'
      }`}>
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.jpg" alt="Sousa Campos Advogados" className="h-8 w-8 rounded-md object-cover" />
            <span className="font-serif font-bold text-[13px] tracking-wide">
              Sousa Campos <span className="text-white/40">Advogados</span>
            </span>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.09] text-white/80 px-4 py-2 rounded-lg transition-all"
          >
            <MessageCircle size={13} />
            Falar agora
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative flex flex-col justify-center min-h-[100svh] px-5 pt-20 pb-28 sm:pb-20">
        <div className="max-w-2xl mx-auto w-full">

          <Appear>
            <p className="text-orange-400/80 text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              Código de Defesa do Consumidor · Art. 42
            </p>
          </Appear>

          <Appear delay={60}>
            <h1
              className="font-serif font-bold leading-[1.1] mb-7"
              style={{ fontSize: 'clamp(2.3rem, 9vw, 3.75rem)' }}
            >
              Bloquearam seu celular por parcela atrasada?{' '}
              <span className="text-orange-400">Isso é ilegal.</span>
            </h1>
          </Appear>

          <Appear delay={130}>
            <p className="text-white/50 text-[15px] sm:text-[16px] leading-[1.8] mb-10 max-w-lg">
              Usar o bloqueio do aparelho como forma de cobrar dívida fere diretamente o CDC.
              A Justiça obriga a empresa a desbloquear — e você ainda pode ser indenizado.
            </p>
          </Appear>

          <Appear delay={210}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-[0.97] text-white font-bold text-[15px] px-7 py-[14px] rounded-xl transition-all duration-150 shadow-[0_6px_30px_rgba(249,115,22,0.3)]"
            >
              <MessageCircle size={16} />
              Quero resolver meu caso
            </a>
            <p className="mt-3 text-white/20 text-[12px]">Análise gratuita · Sem compromisso · WhatsApp</p>
          </Appear>
        </div>

        {/* stats strip — desktop */}
        <div className="absolute bottom-0 inset-x-0 border-t border-white/[0.06] hidden sm:block">
          <div className="max-w-4xl mx-auto px-5 py-5 grid grid-cols-3 divide-x divide-white/[0.06]">
            {[
              { n: '24–72h', label: 'para conseguir o desbloqueio judicial' },
              { n: 'até R$10k', label: 'de indenização em casos recentes' },
              { n: '100%', label: 'digital, sem sair de casa' },
            ].map((s) => (
              <div key={s.n} className="px-6 first:pl-0 last:pr-0">
                <p className="font-serif font-bold text-[22px] text-white">{s.n}</p>
                <p className="text-white/30 text-[12px] mt-0.5 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* stats strip — mobile (inline) */}
        <div className="sm:hidden max-w-2xl mx-auto w-full mt-12 grid grid-cols-3 gap-3">
          {[
            { n: '24–72h', label: 'desbloqueio' },
            { n: 'R$10k', label: 'indenização' },
            { n: '100%', label: 'digital' },
          ].map((s) => (
            <div key={s.n} className="flex flex-col gap-0.5">
              <p className="font-serif font-bold text-[18px]">{s.n}</p>
              <p className="text-white/30 text-[11px]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DIREITOS — editorial list ── */}
      <section className="py-20 px-5 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto">

          <Appear>
            <p className="text-white/25 text-[11px] uppercase tracking-[0.2em] mb-3">O que a lei garante</p>
            <h2 className="font-serif font-bold text-[1.6rem] sm:text-[2rem] mb-14 leading-snug">
              Três direitos que a empresa<br className="hidden sm:block" /> não pode ignorar
            </h2>
          </Appear>

          {[
            {
              n: '01',
              accent: 'text-red-400',
              line: 'bg-red-400/20',
              title: 'Prática abusiva',
              desc: 'A cobrança de dívidas não pode interferir no uso de um bem essencial para sua vida e trabalho. O CDC proíbe qualquer coação que exponha o consumidor a constrangimento.',
            },
            {
              n: '02',
              accent: 'text-blue-400',
              line: 'bg-blue-400/20',
              title: 'Desbloqueio imediato',
              desc: 'Uma liminar de urgência pode forçar a operadora ou loja a restabelecer seu aparelho em horas. Não é preciso esperar meses pelo julgamento final.',
            },
            {
              n: '03',
              accent: 'text-emerald-400',
              line: 'bg-emerald-400/20',
              title: 'Indenização por danos morais',
              desc: 'O isolamento digital forçado gera prejuízo real — trabalho perdido, compromissos quebrados, humilhação. Esses danos se convertem em compensação financeira.',
            },
          ].map((item, i) => (
            <Appear key={item.n} delay={i * 90}>
              <div className="flex gap-6 sm:gap-10 py-9 border-b border-white/[0.06] last:border-0">
                <div className="shrink-0 flex flex-col items-center gap-3 pt-1">
                  <span className={`font-serif font-bold text-[13px] ${item.accent} opacity-70 tabular-nums`}>
                    {item.n}
                  </span>
                  <div className={`w-px flex-1 ${item.line}`} />
                </div>
                <div className="pb-1">
                  <h3 className="font-bold text-[16px] sm:text-[17px] mb-2.5">{item.title}</h3>
                  <p className="text-white/45 text-[14px] sm:text-[15px] leading-[1.75]">{item.desc}</p>
                </div>
              </div>
            </Appear>
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA — timeline ── */}
      <section className="py-20 px-5 bg-[#0d0f14] border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">

          <Appear>
            <p className="text-white/25 text-[11px] uppercase tracking-[0.2em] mb-3">Do início ao fim</p>
            <h2 className="font-serif font-bold text-[1.6rem] sm:text-[2rem] mb-14">Como funciona</h2>
          </Appear>

          <div className="relative">
            <div className="absolute left-[15px] top-5 bottom-5 w-px bg-white/[0.06]" aria-hidden="true" />
            <div className="flex flex-col gap-0">
              {[
                {
                  title: 'Fale com a gente pelo WhatsApp',
                  desc: 'Sem formulário, sem triagem. Você explica a situação e recebe resposta do time em minutos.',
                },
                {
                  title: 'Análise gratuita do seu caso',
                  desc: 'Verificamos documentação, circunstâncias e viabilidade do desbloqueio e da indenização.',
                },
                {
                  title: 'Entramos com a ação judicial',
                  desc: 'Pedimos liminar de urgência para desbloqueio imediato e reparação pelos danos morais causados.',
                },
                {
                  title: 'Você recebe o que é seu por direito',
                  desc: 'Aparelho desbloqueado e indenização depositada. Resolvido de forma ágil e 100% digital.',
                },
              ].map((step, i) => (
                <Appear key={step.title} delay={i * 70}>
                  <div className="flex gap-6 pb-10 last:pb-0 relative">
                    <div className="shrink-0 w-[30px] h-[30px] rounded-full bg-[#0a0c10] border border-white/[0.1] flex items-center justify-center relative z-10 mt-0.5">
                      <span className="text-[12px] font-bold text-white/40">{i + 1}</span>
                    </div>
                    <div className="pt-0.5">
                      <p className="font-semibold text-[15px] mb-1.5">{step.title}</p>
                      <p className="text-white/35 text-[13px] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Appear>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA — statement ── */}
      <section className="py-24 sm:py-32 px-5">
        <div className="max-w-3xl mx-auto">
          <Appear>
            <p className="text-white/20 text-[11px] uppercase tracking-[0.2em] mb-5">Cada dia importa</p>
            <h2
              className="font-serif font-bold leading-[1.12] mb-9 text-white"
              style={{ fontSize: 'clamp(1.9rem, 5.5vw, 3rem)' }}
            >
              Quanto mais você espera,<br />
              mais a empresa ganha.
            </h2>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-[0.97] text-white font-bold text-[15px] px-7 py-[14px] rounded-xl transition-all duration-150 shadow-[0_6px_30px_rgba(249,115,22,0.3)]"
            >
              <MessageCircle size={16} />
              Falar com advogado agora
              <ArrowUpRight size={15} className="opacity-60" />
            </a>
            <p className="mt-3 text-white/20 text-[12px]">Via WhatsApp · Gratuito · Sem burocracia</p>
          </Appear>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section className="py-20 px-5 border-t border-white/[0.06] bg-[#0d0f14]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-8 sm:gap-14 items-start">
          <Appear className="shrink-0">
            <img
              src="/logo.jpg"
              alt="Sousa Campos Advogados"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover opacity-80"
            />
          </Appear>
          <Appear delay={80}>
            <p className="text-white/25 text-[11px] uppercase tracking-[0.2em] mb-3">O escritório</p>
            <h2 className="font-serif font-bold text-xl sm:text-2xl mb-4">Sousa Campos Advogados</h2>
            <p className="text-white/45 text-[14px] sm:text-[15px] leading-[1.8]">
              Atuamos na defesa dos direitos do consumidor de forma ágil e 100% digital.
              Se você foi vítima de cobrança abusiva, nossa equipe analisa o seu caso,
              orienta sobre os próximos passos e busca a reparação que você merece —
              sem burocracia e sem sair de casa.
            </p>
          </Appear>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-5 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto">
          <Appear>
            <p className="text-white/25 text-[11px] uppercase tracking-[0.2em] mb-3">Dúvidas</p>
            <h2 className="font-serif font-bold text-[1.6rem] sm:text-[2rem] mb-10">Perguntas frequentes</h2>
          </Appear>
          <div className="border-t border-white/[0.07]">
            {faqs.map((f, i) => (
              <Appear key={i} delay={i * 50}>
                <FaqItem q={f.q} a={f.a} />
              </Appear>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] py-8 px-5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <img src="/logo.jpg" alt="Sousa Campos Advogados" className="h-7 w-7 rounded-md object-cover opacity-70" />
            <span className="font-serif font-bold text-[13px] text-white/60">Sousa Campos Advogados</span>
            <span className="text-white/20 text-[12px]">© 2026</span>
          </div>
          <p className="text-white/20 text-[11px] max-w-xs leading-relaxed">
            Especialistas em Direito do Consumidor.
            Este site é informativo e não constitui consulta jurídica.
          </p>
        </div>
      </footer>

      {/* ── FLOATING CTA — mobile ── */}
      <div className="fixed bottom-4 inset-x-4 z-40 sm:hidden">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-orange-500 active:bg-orange-600 active:scale-[0.97] text-white font-bold text-[15px] py-[15px] rounded-xl transition-all duration-100 shadow-[0_8px_40px_rgba(249,115,22,0.45)] w-full"
        >
          <MessageCircle size={16} />
          Falar com advogado
        </a>
      </div>

    </div>
  )
}
