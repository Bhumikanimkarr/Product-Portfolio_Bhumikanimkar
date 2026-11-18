'use client'

import { useState } from 'react'
import { Fingerprint, KeyRound, Mail, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const users = [
  { initials: 'RK', name: 'Riya Kapoor', team: 'Finance', role: 'Admin' },
  { initials: 'AM', name: 'Arjun Mehta', team: 'Engineering', role: 'Editor' },
  { initials: 'SN', name: 'Sara Nair', team: 'HR', role: 'Viewer' },
  { initials: 'VD', name: 'Vikram Das', team: 'Support', role: 'Editor' },
]

const roles = ['Admin', 'Editor', 'Viewer'] as const

export function AuthlynkMockup() {
  const [method, setMethod] = useState<'passkey' | 'mfa' | 'magic'>('passkey')
  const [userRoles, setUserRoles] = useState(users.map((u) => u.role))

  const cycleRole = (i: number) =>
    setUserRoles((prev) =>
      prev.map((r, idx) =>
        idx === i ? roles[(roles.indexOf(r as (typeof roles)[number]) + 1) % roles.length] : r,
      ),
    )

  return (
    <div className="grid h-full w-full grid-cols-5 gap-3 bg-[#eef0f7] p-4 text-[#1b1f3b] md:p-6">
      <div className="col-span-5 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm sm:col-span-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <ShieldCheck className="size-4 text-[#4f46e5]" />
          Authlynk
        </div>
        <div>
          <p className="text-base font-semibold">Sign in to your workspace</p>
          <p className="text-xs text-[#6b7090]">One login for every internal tool</p>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { id: 'passkey', label: 'Continue with passkey', icon: Fingerprint },
            { id: 'mfa', label: 'Authenticator code', icon: KeyRound },
            { id: 'magic', label: 'Email me a magic link', icon: Mail },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethod(m.id as typeof method)}
              className={cn(
                'flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors',
                method === m.id
                  ? 'border-[#4f46e5] bg-[#4f46e5] text-white'
                  : 'border-[#dde0ee] bg-white hover:border-[#4f46e5]',
              )}
            >
              <m.icon className="size-3.5" />
              {m.label}
            </button>
          ))}
        </div>
        <div className="mt-auto rounded-lg bg-[#f5f6fb] p-3 text-xs" aria-live="polite">
          {method === 'passkey' && <p>Touch your fingerprint sensor to continue.</p>}
          {method === 'mfa' && (
            <div className="flex gap-1.5">
              {['4', '8', '2', '9', '1', '6'].map((d, i) => (
                <span
                  key={i}
                  className="flex size-6 items-center justify-center rounded-md border border-[#dde0ee] bg-white font-mono font-semibold"
                >
                  {d}
                </span>
              ))}
            </div>
          )}
          {method === 'magic' && <p>Link sent to riya@company.com · expires in 10 min</p>}
        </div>
      </div>

      <div className="col-span-5 hidden flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm sm:col-span-3 sm:flex">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Access control</p>
          <span className="rounded-full bg-[#e7f7ee] px-2 py-0.5 text-[10px] font-medium text-[#1a8a4a]">
            SOC 2 ready
          </span>
        </div>
        <p className="text-[11px] text-[#6b7090]">Click a role to change it</p>
        <ul className="flex flex-col divide-y divide-[#eef0f7]">
          {users.map((u, i) => (
            <li key={u.name} className="flex items-center gap-2 py-2 text-xs">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#e0e3f7] text-[10px] font-semibold">
                {u.initials}
              </span>
              <span className="flex-1">
                <span className="block font-medium">{u.name}</span>
                <span className="text-[10px] text-[#6b7090]">{u.team}</span>
              </span>
              <button
                type="button"
                onClick={() => cycleRole(i)}
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors',
                  userRoles[i] === 'Admin' && 'bg-[#4f46e5] text-white',
                  userRoles[i] === 'Editor' && 'bg-[#e0e3f7] text-[#4f46e5]',
                  userRoles[i] === 'Viewer' && 'bg-[#f1f1f4] text-[#6b7090]',
                )}
              >
                {userRoles[i]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function AiimsMockup() {
  const [decision, setDecision] = useState<'pending' | 'accepted' | 'override'>('pending')

  return (
    <div className="grid h-full w-full grid-cols-5 gap-3 bg-[#0f1115] p-4 text-[#e8eaf0] md:p-6">
      <div className="relative col-span-3 overflow-hidden rounded-2xl bg-black">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 10% 50%, #9a9a9a 0%, #4a4a4a 45%, #111 75%), radial-gradient(circle at 30% 40%, #c8c8c8 0, transparent 18%)',
          }}
        />
        <div
          aria-hidden
          className="absolute left-[34%] top-[38%] size-[22%] rounded-full opacity-70 blur-md"
          style={{ background: 'radial-gradient(circle, #ff4d4d, #ffb84d 50%, transparent 70%)' }}
        />
        <div className="absolute left-[30%] top-[32%] h-[34%] w-[30%] rounded-md border-2 border-dashed border-[#ffb84d]">
          <span className="absolute -top-5 left-0 rounded bg-[#ffb84d] px-1.5 text-[9px] font-semibold text-black">
            ROI 1 · 0.78
          </span>
        </div>
        <span className="absolute bottom-2 left-2 font-mono text-[9px] text-white/60">
          L-MLO · heatmap on
        </span>
      </div>

      <div className="col-span-2 flex flex-col gap-3 rounded-2xl bg-[#181b22] p-3 text-xs">
        <p className="font-semibold">AI findings</p>
        <div>
          <p className="text-[10px] text-white/50">Suggested assessment</p>
          <p className="text-base font-semibold text-[#ffb84d]">BI-RADS 4A</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[10px] text-white/60">
            <span>Model confidence</span>
            <span>78%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10">
            <div className="h-full w-[78%] rounded-full bg-[#ffb84d]" />
          </div>
        </div>
        <p className="text-[10px] leading-relaxed text-white/60">
          Irregular mass, upper outer quadrant. Clinician review required.
        </p>
        <div className="mt-auto flex flex-col gap-1.5" aria-live="polite">
          {decision === 'pending' ? (
            <>
              <button
                type="button"
                onClick={() => setDecision('accepted')}
                className="rounded-lg bg-[#e8eaf0] px-2 py-1.5 font-medium text-black"
              >
                Accept finding
              </button>
              <button
                type="button"
                onClick={() => setDecision('override')}
                className="rounded-lg border border-white/20 px-2 py-1.5 font-medium"
              >
                Override
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setDecision('pending')}
              className="rounded-lg bg-white/10 px-2 py-1.5 text-left"
            >
              {decision === 'accepted' ? 'Accepted · sent to report' : 'Override logged for audit'}
              <span className="block text-[10px] text-white/50">Tap to undo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
