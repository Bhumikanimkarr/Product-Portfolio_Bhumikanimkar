'use client'

import { useState } from 'react'
import { AlertTriangle, Bot, FileText, ShieldAlert, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const extracted = {
  patient: 'Mr. Sachin Sansaee',
  age: 28,
  date: '2022-10-12',
  clinic: 'The White Tusk Dental Clinic',
  medications: [
    { name: 'Augmentin 625 mg', dose: 'Twice a day', days: 5, timing: 'After meals' },
    { name: 'Enzoflam', dose: 'Twice a day', days: 5, timing: 'After meals' },
    { name: 'Pan-D 40 mg', dose: 'Once a day', days: 5, timing: 'Before meals' },
  ],
}

export function DocurateExportMockup() {
  const [format, setFormat] = useState<'markdown' | 'json'>('json')

  return (
    <div className="grid h-full w-full grid-cols-5 gap-3 bg-[#f3f1ec] p-4 text-[#1d1d1b] md:p-6">
      <div className="col-span-2 hidden flex-col gap-2 rounded-xl bg-white p-4 shadow-sm sm:flex">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <FileText className="size-3.5 text-[#e5602a]" />
          DOC09674.pdf
        </div>
        <div className="mt-1 flex flex-col gap-2" aria-hidden>
          {[90, 70, 82, 60, 76, 50, 66, 40].map((w, i) => (
            <span
              key={i}
              className={cn('h-1.5 rounded-full', i === 2 || i === 5 ? 'bg-[#e5602a]/40' : 'bg-[#e4e1da]')}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <p className="mt-auto rounded-md bg-[#f3f1ec] px-2 py-1 text-[10px] text-[#66645e]">
          3 fields validated · 0 flagged
        </p>
      </div>

      <div className="col-span-5 flex min-w-0 flex-col rounded-xl bg-[#141413] p-3 shadow-sm sm:col-span-3">
        <div role="tablist" aria-label="Export format" className="flex gap-1 self-start rounded-full bg-white/10 p-1">
          {(['markdown', 'json'] as const).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={format === f}
              onClick={() => setFormat(f)}
              className={cn(
                'rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors',
                format === f ? 'bg-[#e5602a] text-white' : 'text-white/60 hover:text-white',
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <pre className="mt-3 min-h-0 flex-1 overflow-hidden font-mono text-[10px] leading-relaxed text-[#e9e6df] md:text-[11px]">
          {format === 'json'
            ? JSON.stringify(extracted, null, 2)
            : [
                `## Prescription: ${extracted.patient} (${extracted.age} yrs)`,
                `Date: ${extracted.date}`,
                `Clinic: ${extracted.clinic}`,
                '',
                ...extracted.medications.map(
                  (m) => `- **${m.name}**: ${m.dose} x ${m.days} days (${m.timing})`,
                ),
              ].join('\n')}
        </pre>
      </div>
    </div>
  )
}

export function MskChatMockup() {
  return (
    <div className="grid h-full w-full grid-cols-5 gap-3 bg-[#e6f7ef] p-4 text-[#1f2a26] md:p-6">
      <div className="col-span-5 flex flex-col gap-2.5 rounded-xl bg-white p-4 shadow-sm sm:col-span-3">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-[#b9a7f5] to-[#f4a7c9]">
            <Bot className="size-3.5 text-white" />
          </span>
          Triage assistant
        </div>
        <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#f1f3f2] px-3 py-2 text-xs">
          Hi Lara, where are you feeling pain today?
        </p>
        <div className="flex flex-wrap gap-1.5">
          {['Neck', 'Lower back', 'Knee', 'Shoulder'].map((c) => (
            <span
              key={c}
              className={cn(
                'rounded-full border px-2.5 py-1 text-[10px]',
                c === 'Lower back' ? 'border-[#e8457c] bg-[#e8457c] text-white' : 'border-[#dfe4e2]',
              )}
            >
              {c}
            </span>
          ))}
        </div>
        <p className="max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-[#1f2a26] px-3 py-2 text-xs text-white">
          Lower back, for about two weeks.
        </p>
        <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#f1f3f2] px-3 py-2 text-xs">
          Thanks. Before we continue, do you have any numbness in your legs or changes in bladder control?
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full bg-[#fff1e8] px-2.5 py-1 text-[10px] font-medium text-[#b4501f]">
          <AlertTriangle className="size-3" />
          NHS red-flag check
        </span>
      </div>
      <div className="col-span-2 hidden flex-col gap-2 rounded-xl bg-white p-4 shadow-sm sm:flex">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#6a7570]">Triage</p>
        <p className="text-sm font-semibold">Routine physio</p>
        <p className="text-[11px] leading-relaxed text-[#6a7570]">No red flags so far. Continue to movement test.</p>
        <div className="mt-auto flex flex-col gap-1.5 text-[10px]">
          {[
            ['Pain area', 'Lower back'],
            ['Duration', '2 weeks'],
            ['Severity', '5 / 10'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-t border-[#eef0ef] pt-1.5">
              <span className="text-[#6a7570]">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const events = [
  { user: 'Riya Kapoor', method: 'Passkey', time: '2m ago', status: 'ok' },
  { user: 'Arjun Mehta', method: 'Authenticator', time: '6m ago', status: 'ok' },
  { user: 'Unknown device', method: 'Password', time: '9m ago', status: 'blocked' },
  { user: 'Sara Nair', method: 'Magic link', time: '14m ago', status: 'ok' },
  { user: 'Vikram Das', method: 'Authenticator', time: '21m ago', status: 'review' },
] as const

export function AuthlynkAuditMockup() {
  return (
    <div className="grid h-full w-full grid-cols-5 gap-3 bg-[#eef0f7] p-4 text-[#1b1f3b] md:p-6">
      <div className="col-span-5 flex min-w-0 flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm sm:col-span-3">
        <p className="text-sm font-semibold">Sign-in activity</p>
        <ul className="flex flex-col">
          {events.map((e) => (
            <li key={e.user + e.time} className="flex items-center justify-between gap-2 border-t border-[#eef0f7] py-1.5 text-[11px]">
              <span className="truncate font-medium">{e.user}</span>
              <span className="hidden text-[#6b7090] md:inline">{e.method}</span>
              <span className="text-[#6b7090]">{e.time}</span>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-medium',
                  e.status === 'ok' && 'bg-[#e7f6ee] text-[#17794a]',
                  e.status === 'blocked' && 'bg-[#fdecec] text-[#b42323]',
                  e.status === 'review' && 'bg-[#fff4e0] text-[#97600b]',
                )}
              >
                {e.status === 'ok' ? 'Verified' : e.status === 'blocked' ? 'Blocked' : 'Review'}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-2 hidden flex-col gap-3 sm:flex">
        <div className="flex flex-col gap-1 rounded-2xl bg-[#4f46e5] p-4 text-white shadow-sm">
          <ShieldCheck className="size-4" />
          <p className="mt-1 text-xs opacity-80">MFA coverage</p>
          <div className="h-1.5 rounded-full bg-white/25">
            <div className="h-full w-[92%] rounded-full bg-white" />
          </div>
          <p className="text-[10px] opacity-80">Finance, HR & Engineering enforced</p>
        </div>
        <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-white p-4 shadow-sm">
          <ShieldAlert className="size-4 text-[#b42323]" />
          <p className="mt-1 text-xs font-semibold">1 blocked attempt</p>
          <p className="text-[10px] leading-relaxed text-[#6b7090]">Password login from an unrecognised device was stopped by policy.</p>
        </div>
      </div>
    </div>
  )
}
