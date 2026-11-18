'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Reveal, SectionHeading } from './reveal'

function SpringSwitch() {
  const [on, setOn] = useState(false)
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Spring switch demo"
        onClick={() => setOn((v) => !v)}
        className={cn(
          'relative h-14 w-28 rounded-full p-1.5 transition-colors duration-300',
          on ? 'bg-brand' : 'bg-border',
        )}
      >
        <span
          className={cn(
            'block size-11 rounded-full bg-white shadow-md transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.8,0.5,1)]',
            on ? 'translate-x-14' : 'translate-x-0',
          )}
        />
      </button>
      <span className="font-mono text-xs text-muted-foreground">{on ? 'AI assist: on' : 'AI assist: off'}</span>
    </div>
  )
}

function PhysicsCard() {
  const [pos, setPos] = useState({ x: 0, y: 0, r: 0 })
  const [dragging, setDragging] = useState(false)
  const start = useRef({ x: 0, y: 0, lastX: 0 })

  return (
    <div
      role="presentation"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        start.current = { x: e.clientX, y: e.clientY, lastX: e.clientX }
        setDragging(true)
      }}
      onPointerMove={(e) => {
        if (!dragging) return
        const vx = e.clientX - start.current.lastX
        start.current.lastX = e.clientX
        setPos({
          x: e.clientX - start.current.x,
          y: e.clientY - start.current.y,
          r: Math.max(-18, Math.min(18, vx * 1.5)),
        })
      }}
      onPointerUp={() => {
        setDragging(false)
        setPos({ x: 0, y: 0, r: 0 })
      }}
      className={cn(
        'flex w-44 cursor-grab touch-none select-none flex-col gap-2 rounded-2xl border bg-card p-4 shadow-lg active:cursor-grabbing',
        !dragging && 'transition-transform duration-700 [transition-timing-function:cubic-bezier(0.34,1.56,0.5,1)]',
      )}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.r}deg)` }}
    >
      <span className="h-16 rounded-lg bg-gradient-to-br from-brand to-[#f2b28f]" />
      <span className="h-2 w-3/4 rounded-full bg-secondary" />
      <span className="h-2 w-1/2 rounded-full bg-secondary" />
      <span className="mt-1 text-center font-mono text-[10px] text-muted-foreground">Drag me</span>
    </div>
  )
}

function ConfidenceSlider() {
  const [value, setValue] = useState(72)
  const audio = useRef<AudioContext | null>(null)
  const last = useRef(72)

  const tick = (v: number) => {
    if (Math.abs(v - last.current) < 4) return
    last.current = v
    try {
      audio.current ??= new AudioContext()
      const ctx = audio.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = 220 + v * 6
      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06)
      osc.connect(gain).connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.07)
    } catch {}
  }

  const tone = value >= 85 ? 'Auto-approve' : value >= 60 ? 'Quick review' : 'Human review'

  return (
    <div className="flex w-full max-w-56 flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <span className="text-4xl font-semibold tabular-nums tracking-tight">{value}%</span>
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-xs font-medium',
            value >= 85 && 'bg-emerald-100 text-emerald-800',
            value >= 60 && value < 85 && 'bg-amber-100 text-amber-800',
            value < 60 && 'bg-red-100 text-red-800',
          )}
        >
          {tone}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        aria-label="AI confidence threshold"
        onChange={(e) => {
          const v = Number(e.target.value)
          setValue(v)
          tick(v)
        }}
        className="w-full accent-[var(--brand)]"
      />
    </div>
  )
}

const demos = [
  { title: 'Spring switch', meta: 'overshoot easing · 500ms', node: <SpringSwitch /> },
  { title: 'Physics card', meta: 'drag and release', node: <PhysicsCard /> },
  { title: 'Confidence slider', meta: 'pitch follows the value', node: <ConfidenceSlider /> },
]

export function Lab() {
  return (
    <section id="lab" aria-label="The lab" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <SectionHeading eyebrow="The lab" title="Touch the" accent="details." >
        <p className="max-w-xs text-muted-foreground">
          Small interaction studies. The kind of detail that makes AI products feel trustworthy.
        </p>
      </SectionHeading>
      <ul className="mt-14 grid gap-4 md:grid-cols-3">
        {demos.map((d, i) => (
          <Reveal as="li" key={d.title} delay={i * 90}>
            <div className="flex h-80 flex-col rounded-3xl border bg-card p-5">
              <div className="flex flex-1 items-center justify-center rounded-2xl bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]">
                {d.node}
              </div>
              <div className="flex items-baseline justify-between pt-4">
                <h3 className="font-semibold">{d.title}</h3>
                <span className="font-mono text-xs text-muted-foreground">{d.meta}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
