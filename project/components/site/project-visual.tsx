import Image from 'next/image'
import type { MockupId, ProjectVisual as Visual } from '@/data/projects'
import { AiimsMockup, AuthlynkMockup } from './mockups'
import { AuthlynkAuditMockup, DocurateExportMockup, MskChatMockup } from './case-mockups'
import { cn } from '@/lib/utils'

const mockups: Record<MockupId, () => React.JSX.Element> = {
  authlynk: AuthlynkMockup,
  'authlynk-audit': AuthlynkAuditMockup,
  aiims: AiimsMockup,
  'docurate-export': DocurateExportMockup,
  'msk-chat': MskChatMockup,
}

export function ProjectVisual({
  visual,
  className,
  interactive = true,
  priority = false,
}: {
  visual: Visual
  className?: string
  interactive?: boolean
  priority?: boolean
}) {
  return (
    <div
      inert={!interactive}
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden rounded-2xl border bg-secondary',
        className,
      )}
    >
      {visual.type === 'image' && (
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 1100px, 100vw"
          className={cn('object-cover object-top', visual.pan === 'y' && 'animate-pan-y')}
        />
      )}

      {visual.type === 'strip' && (
        <div
          role="img"
          aria-label={visual.alt}
          className="absolute inset-0 animate-pan-x"
          style={{
            backgroundColor: visual.background,
            backgroundImage: `url(${visual.src})`,
            backgroundSize: 'auto 200%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0% 12%',
          }}
        />
      )}

      {visual.type === 'crop' && <CropVisual visual={visual} />}

      {visual.type === 'stack' && (
        <div className="absolute inset-0 bg-[#fbf6f1]">
          <div className="absolute left-[5%] top-[7%] w-[72%] overflow-hidden rounded-xl border bg-white shadow-lg">
            <Image
              src={visual.primary.src}
              alt={visual.primary.alt}
              width={640}
              height={455}
              priority={priority}
              className="h-auto w-full"
            />
          </div>
          <div className="absolute bottom-[6%] right-[4%] w-[46%] overflow-hidden rounded-xl border bg-white shadow-xl">
            <Image
              src={visual.secondary.src}
              alt={visual.secondary.alt}
              width={640}
              height={455}
              className="h-auto w-full"
            />
          </div>
          {visual.device && (
            <Image
              src={visual.device.src}
              alt={visual.device.alt}
              width={640}
              height={360}
              className="absolute right-[3%] top-[4%] h-auto w-[30%] animate-float drop-shadow-2xl"
            />
          )}
        </div>
      )}

      {visual.type === 'mockup' && <MockupFrame id={visual.id} />}
    </div>
  )
}

function MockupFrame({ id }: { id: MockupId }) {
  const Mockup = mockups[id]
  return (
    <div className="absolute inset-0">
      <Mockup />
    </div>
  )
}

function CropVisual({ visual }: { visual: Extract<Visual, { type: 'crop' }> }) {
  const [imageW, imageH] = visual.size
  const [x, y, w] = visual.rect
  const h = (w * 10) / 16
  return (
    <div
      role="img"
      aria-label={visual.alt}
      className="absolute inset-0"
      style={{
        backgroundColor: visual.background,
        backgroundImage: `url(${visual.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${(imageW / w) * 100}% auto`,
        backgroundPosition: `${(x / (imageW - w)) * 100}% ${(y / (imageH - h)) * 100}%`,
      }}
    />
  )
}
