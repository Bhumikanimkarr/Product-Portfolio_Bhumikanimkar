export type ProjectCategory =
  | 'AI & Agentic'
  | 'Enterprise SaaS'
  | 'HealthTech'
  | 'Security & IAM'

export type MockupId =
  | 'authlynk'
  | 'authlynk-audit'
  | 'aiims'
  | 'docurate-export'
  | 'msk-chat'

/**
 * `crop` shows one region of a large screenshot. `size` is the source image's
 * pixel size; `rect` is [x, y, width] of the region to show (height follows the frame's 16:10 ratio).
 */
export type ProjectVisual =
  | { type: 'image'; src: string; alt: string; pan?: 'y' }
  | { type: 'strip'; src: string; alt: string; background: string }
  | {
      type: 'crop'
      src: string
      alt: string
      size: [number, number]
      rect: [number, number, number]
      background: string
    }
  | {
      type: 'stack'
      primary: { src: string; alt: string }
      secondary: { src: string; alt: string }
      device?: { src: string; alt: string }
    }
  | { type: 'mockup'; id: MockupId }

export type Metric = { value: string; label: string }

export type CaseStudy = {
  executiveSummary: string
  meta: { role: string; duration: string; team: string; platform: string }
  impact: [Metric, Metric, Metric]
  problem: { intro: string; points: { title: string; body: string }[] }
  research: {
    intro: string
    methods: string[]
    insights: { source: string; title: string; body: string }[]
    quote?: { text: string; source: string }
  }
  process: {
    intro: string
    flow: { title: string; detail: string }[]
    architecture: { group: string; items: string[] }[]
    decisions: { title: string; body: string }[]
  }
  solution: {
    id: string
    title: string
    summary: string
    bullets: string[]
    visual?: ProjectVisual
  }[]
  takeaways: {
    impact: { title: string; body: string }[]
    learnings: { title: string; body: string }[]
  }
}

export type Project = {
  slug: string
  title: string
  tagline: string
  category: string
  filters: ProjectCategory[]
  summary: string
  problem: string
  solution: string
  metrics: Metric[]
  visual: ProjectVisual
  link?: string
  caseStudy: CaseStudy
}

export const projectFilters: ('All' | ProjectCategory)[] = [
  'All',
  'AI & Agentic',
  'Enterprise SaaS',
  'HealthTech',
  'Security & IAM',
]

const docurateFrames = {
  src: '/images/docurate-frames.png',
  size: [1146, 1380] as [number, number],
  background: '#ababab',
}

const mskFrames = {
  src: '/images/msk-frames.png',
  size: [1632, 476] as [number, number],
  background: '#767676',
}

export const projects: Project[] = [
  {
    slug: 'docurate',
    title: 'Docurate',
    tagline: 'Unified AI-powered OCR platform',
    category: 'B2B Enterprise SaaS / AI',
    filters: ['Enterprise SaaS', 'AI & Agentic'],
    summary:
      'Reimagining document intelligence across Healthcare, Finance, Supply Chain and HR with automated parsing and gamified validation workflows.',
    problem:
      'Traditional OCR tools fail on handwritten and multi-format documents, causing manual file sharing and slow reviews.',
    solution:
      'An AI parsing platform with Markdown/JSON exports, batch uploads and human-in-the-loop validator workflows.',
    metrics: [
      { value: '~95%', label: 'AI accuracy' },
      { value: '4', label: 'Industries served' },
      { value: '8 wks', label: 'Timeline' },
    ],
    visual: {
      type: 'image',
      src: '/images/docurate-frames.png',
      alt: 'Docurate admin console, create-project modal and validator console screens',
      pan: 'y',
    },
    caseStudy: {
      executiveSummary:
        'Docurate turns messy, handwritten and multi-format documents into clean structured data. I designed the admin and validator consoles so AI does the heavy lifting and people only check what matters.',
      meta: {
        role: 'Lead Product Designer',
        duration: '8 weeks',
        team: '1 PM, 4 engineers, 1 ML lead',
        platform: 'Web (B2B SaaS)',
      },
      impact: [
        { value: '~95%', label: 'AI extraction accuracy' },
        { value: '4', label: 'Industries on one platform' },
        { value: '8 wks', label: 'Research to handoff' },
      ],
      problem: {
        intro:
          'Operations teams in healthcare, finance, supply chain and HR were still retyping documents by hand. Existing OCR tools broke on handwriting, mixed layouts and scanned tables, so every file needed a person to check it.',
        points: [
          {
            title: 'OCR breaks on real documents',
            body: 'Handwritten prescriptions, stamped invoices and multi-column forms produced garbled output that nobody trusted.',
          },
          {
            title: 'Reviews lived in email threads',
            body: 'Files were shared over email and chat for checking, with no audit trail and no idea who had verified what.',
          },
          {
            title: 'Output was not usable downstream',
            body: 'Engineering teams needed structured JSON for their systems, but tools exported flat text or PDFs.',
          },
          {
            title: 'Validation was slow and tiring',
            body: 'Validators scanned whole documents line by line, which led to fatigue, missed errors and slow turnaround.',
          },
        ],
      },
      research: {
        intro:
          'I looked at how documents actually move through each industry, from upload to the system they end up in, and where people lose time along the way.',
        methods: [
          'Stakeholder interviews',
          'Validator shadowing',
          'Competitor audit',
          'Workflow mapping',
          'Document sampling',
        ],
        insights: [
          {
            source: 'Validator shadowing',
            title: 'People only care about the uncertain fields',
            body: 'Validators spent most of their time re-reading fields the AI already got right. They needed the doubtful ones pointed out.',
          },
          {
            source: 'Stakeholder interviews',
            title: 'Every industry groups work differently',
            body: 'Finance grouped by vendor, healthcare by patient and HR by employee. A rigid folder system would not fit everyone.',
          },
          {
            source: 'Competitor audit',
            title: 'No tool showed the source and the output together',
            body: 'Competing tools hid the original scan behind the extracted text, so checking a value meant switching between windows.',
          },
        ],
        quote: {
          text: 'I don\u2019t need to read the whole page. Just show me what the machine wasn\u2019t sure about.',
          source: 'Validator, healthcare operations',
        },
      },
      process: {
        intro:
          'I mapped one end-to-end flow shared by all four industries, then designed two role-based consoles on top of it: Admin for setting up projects and Validator for reviewing them.',
        flow: [
          { title: 'Create project', detail: 'Choose document type and industry template' },
          { title: 'Batch upload', detail: 'Drag in PDFs, scans and photos' },
          { title: 'AI parsing', detail: 'Extract fields with confidence scores' },
          { title: 'Validate', detail: 'Review only the low-confidence fields' },
          { title: 'Export', detail: 'Download Markdown or JSON, or push via API' },
        ],
        architecture: [
          { group: 'Admin console', items: ['All projects', 'Create project', 'Update project', 'All files'] },
          { group: 'Validator console', items: ['Assigned projects', 'Review queue', 'Side-by-side review'] },
          { group: 'Outputs', items: ['Markdown export', 'JSON export', 'Audit history'] },
        ],
        decisions: [
          {
            title: 'Side-by-side review over modal editing',
            body: 'The original scan sits next to the extracted data, so validators check values without losing context.',
          },
          {
            title: 'Confidence-first review queue',
            body: 'Fields are sorted by AI confidence, so attention goes where errors are most likely.',
          },
          {
            title: 'Templates as the project starting point',
            body: 'Admins pick a document type and industry first, which preloads the right fields and keeps setup to one modal.',
          },
        ],
      },
      solution: [
        {
          id: 'console',
          title: 'Admin console',
          summary:
            'A visual project library where admins see every document set at a glance, filter by type and jump into any project.',
          bullets: [
            'Thumbnail cards with project ID, type and progress',
            'Filters for document type and status',
            'One-click entry to update or reassign',
          ],
          visual: {
            type: 'crop',
            ...docurateFrames,
            alt: 'Docurate admin console showing project cards with document thumbnails',
            rect: [30, 278, 360],
          },
        },
        {
          id: 'create',
          title: 'Guided project setup',
          summary:
            'Creating a project is one focused modal: choose a document type, pick an industry template and name it.',
          bullets: [
            'Chip-based document type picker',
            'Industry templates preload extraction fields',
            'Same modal for new and edited projects',
          ],
          visual: {
            type: 'crop',
            ...docurateFrames,
            alt: 'Create project modal with document type and template selection',
            rect: [397, 398, 340],
          },
        },
        {
          id: 'review',
          title: 'Side-by-side validation',
          summary:
            'The original document sits beside its extracted table, so validators can confirm or fix each value in place.',
          bullets: [
            'Source scan and extracted fields in one view',
            'Page thumbnails for multi-page files',
            'Inline editing with change history',
          ],
          visual: {
            type: 'crop',
            ...docurateFrames,
            alt: 'Update project view with extracted table beside the original document',
            rect: [397, 150, 340],
          },
        },
        {
          id: 'export',
          title: 'Structured exports',
          summary:
            'Validated data exports as clean Markdown for people or JSON for systems, ready for downstream tools.',
          bullets: [
            'Toggle between Markdown and JSON preview',
            'Batch download across a whole project',
            'API-ready schema per template',
          ],
          visual: { type: 'mockup', id: 'docurate-export' },
        },
      ],
      takeaways: {
        impact: [
          {
            title: 'Faster, focused validation',
            body: 'Validators now review flagged fields instead of whole documents, which reduces repetitive checking.',
          },
          {
            title: 'One platform, four industries',
            body: 'Template-driven setup let one product serve healthcare, finance, supply chain and HR without custom builds.',
          },
          {
            title: 'Traceable reviews',
            body: 'Moving reviews out of email gave teams a clear audit history of who verified each file.',
          },
        ],
        learnings: [
          {
            title: 'Design for trust, not just accuracy',
            body: 'High model accuracy only mattered once people could see why a field was flagged and fix it quickly.',
          },
          {
            title: 'Make the system flexible',
            body: 'Building on templates instead of fixed screens kept the product adaptable as new industries came on.',
          },
        ],
      },
    },
  },
  {
    slug: 'msk-triage',
    title: 'MSK Triage',
    tagline: 'Conversational UX for AI physiotherapy triage',
    category: 'Healthcare / Conversational AI',
    filters: ['HealthTech', 'AI & Agentic'],
    summary:
      'Remote-first physiotherapy triage aligned with NHS guidelines, combining conversational dialogue with anonymized pose estimation for Range of Motion analysis.',
    problem:
      'Existing remote physio tools compromise privacy with raw video or lack clinical precision for early intervention.',
    solution:
      'A privacy-first conversational triage flow with skeletal keypoint tracking, clinical red-flag categorization and clinician review dashboards.',
    metrics: [
      { value: '85%', label: 'Usability score' },
      { value: '+64%', label: 'Trust score' },
      { value: '12 wks', label: 'Timeline' },
    ],
    visual: {
      type: 'strip',
      src: '/images/msk-frames.png',
      alt: 'MSK triage flow: guided stretch with pose tracking, completion screen and screening summary dashboard',
      background: '#767676',
    },
    caseStudy: {
      executiveSummary:
        'A remote triage experience for musculoskeletal pain that talks patients through their symptoms and measures movement with anonymised pose tracking. Clinicians get a clear, NHS-aligned summary before the first appointment.',
      meta: {
        role: 'Product & Conversational UX Designer',
        duration: '12 weeks',
        team: '1 physiotherapist advisor, 3 engineers, 1 CV engineer',
        platform: 'Web (desktop & tablet)',
      },
      impact: [
        { value: '85%', label: 'Usability score' },
        { value: '+64%', label: 'Increase in patient trust' },
        { value: '12 wks', label: 'Research to validated prototype' },
      ],
      problem: {
        intro:
          'Patients with back, neck and joint pain often wait weeks for a first physio assessment. Remote tools either record raw video, which patients don\u2019t trust, or use static forms that miss the movement data clinicians need.',
        points: [
          {
            title: 'Privacy concerns stop people using video',
            body: 'Patients didn\u2019t want recordings of themselves at home stored on unknown servers.',
          },
          {
            title: 'Forms miss clinical precision',
            body: 'Questionnaires can\u2019t capture range of motion, so clinicians still had to repeat assessments in person.',
          },
          {
            title: 'Red flags can get buried',
            body: 'Urgent symptoms such as numbness or bladder changes were mixed in with routine answers and easy to overlook.',
          },
          {
            title: 'Long waits make pain worse',
            body: 'Without early guidance, minor issues became chronic before patients were seen.',
          },
        ],
      },
      research: {
        intro:
          'I combined clinical guidance with patient interviews to understand what a safe, trustworthy remote assessment needs to cover.',
        methods: [
          'NHS MSK pathway review',
          'Physiotherapist interviews',
          'Patient interviews',
          'Competitor analysis',
          'Usability testing',
        ],
        insights: [
          {
            source: 'NHS guidelines',
            title: 'Red-flag screening has to come first',
            body: 'NHS MSK pathways expect serious pathology to be ruled out before routine advice, so the conversation needed a safety gate up front.',
          },
          {
            source: 'Patient interviews',
            title: 'Seeing a skeleton, not a video, builds trust',
            body: 'Patients were much more comfortable when they saw that only body keypoints were captured, never their face or home.',
          },
          {
            source: 'Physiotherapist interviews',
            title: 'Clinicians want angles, not footage',
            body: 'Physios said measured range of motion and a structured symptom summary were more useful than watching raw video.',
          },
          {
            source: 'Competitor analysis',
            title: 'Chatbots felt cold and robotic',
            body: 'Existing symptom checkers used long, rigid forms. A warmer, step-by-step conversation reduced drop-off.',
          },
        ],
        quote: {
          text: 'If I can see it\u2019s just dots and lines, not me in my living room, I\u2019m happy to do it.',
          source: 'Patient, usability testing',
        },
      },
      process: {
        intro:
          'The flow mirrors a real first physio appointment: talk about the pain, check for anything urgent, measure movement, then hand a summary to a clinician.',
        flow: [
          { title: 'Conversational intake', detail: 'Location, onset and severity of pain' },
          { title: 'Red-flag gate', detail: 'NHS-aligned safety questions first' },
          { title: 'Guided movement', detail: 'On-screen coaching with a camera preview' },
          { title: 'Pose estimation', detail: 'Anonymised keypoints measure range of motion' },
          { title: 'Clinician summary', detail: 'Triage category and next steps' },
        ],
        architecture: [
          { group: 'Patient flow', items: ['Welcome & consent', 'Symptom chat', 'Red-flag check', 'Movement tests', 'Completion'] },
          { group: 'Clinician dashboard', items: ['Screening summary', 'Range of motion', 'Possible conditions', 'Next steps'] },
          { group: 'Safety layer', items: ['Urgent escalation', 'Privacy controls', 'Audit trail'] },
        ],
        decisions: [
          {
            title: 'Show the skeleton overlay live',
            body: 'Patients see their keypoints while moving, which made it clear that no video is kept.',
          },
          {
            title: 'Red flags stop the flow',
            body: 'Any urgent answer ends the self-assessment and points the patient to urgent care, so safety comes before completion.',
          },
          {
            title: 'One question at a time',
            body: 'Short conversational steps with answer chips replaced long forms and kept people engaged.',
          },
        ],
      },
      solution: [
        {
          id: 'chat',
          title: 'Conversational intake',
          summary:
            'A friendly assistant asks one question at a time, with tap-to-answer chips and an early red-flag safety check.',
          bullets: [
            'Body-area and severity chips',
            'NHS-aligned red-flag questions',
            'Plain-language explanations at every step',
          ],
          visual: { type: 'mockup', id: 'msk-chat' },
        },
        {
          id: 'movement',
          title: 'Guided movement test',
          summary:
            'On-screen prompts coach the patient into position while a reference video shows the movement.',
          bullets: [
            'Picture-in-picture reference pose',
            'Live instructions and timer',
            'Progress shown for each repetition',
          ],
          visual: {
            type: 'crop',
            ...mskFrames,
            alt: 'Patient performing a seated stretch with reference video and timer',
            rect: [0, 75, 300],
          },
        },
        {
          id: 'pose',
          title: 'Anonymised pose tracking',
          summary:
            'Skeletal keypoints measure range of motion in real time. Only the angles are kept, never the footage.',
          bullets: [
            'Keypoint overlay builds trust',
            'Range of motion measured per joint',
            'No raw video stored',
          ],
          visual: {
            type: 'crop',
            ...mskFrames,
            alt: 'Standing posture check with pose tracking indicator',
            rect: [612, 75, 300],
          },
        },
        {
          id: 'summary',
          title: 'Clinician screening summary',
          summary:
            'Clinicians get one screen covering symptoms, range of motion, possible conditions and a recommended next step.',
          bullets: [
            'Symptoms and interview answers',
            'Expected vs measured range of motion',
            'Possible conditions and next steps',
          ],
          visual: {
            type: 'crop',
            ...mskFrames,
            alt: 'Screening summary dashboard with symptoms, range of motion and next steps',
            rect: [1220, 75, 300],
          },
        },
      ],
      takeaways: {
        impact: [
          {
            title: '85% usability score',
            body: 'Patients finished the full assessment on their own, including the movement tests.',
          },
          {
            title: '+64% trust score',
            body: 'Showing keypoints instead of video was the single biggest driver of patient trust in testing.',
          },
          {
            title: 'Earlier, safer triage',
            body: 'Clinicians receive a structured, red-flag-checked summary before the first appointment.',
          },
        ],
        learnings: [
          {
            title: 'Privacy has to be visible',
            body: 'Telling users their data was safe wasn\u2019t enough. Showing them what the system captures was what built trust.',
          },
          {
            title: 'Clinical safety shapes the flow',
            body: 'Working from NHS pathways from day one meant the conversation was safe by design, not patched later.',
          },
        ],
      },
    },
  },
  {
    slug: 'adicare',
    title: 'AdiCare',
    tagline: 'Smart clinical pad, AI scribe & doctor dashboard',
    category: 'HealthTech / Clinical AI',
    filters: ['HealthTech', 'AI & Agentic'],
    summary:
      'A connected care system for doctors: a smart writing pad that digitises handwritten prescriptions, a voice AI scribe and an analytics dashboard for the whole practice.',
    problem:
      'Doctors write prescriptions by hand and lose the data, while consultation notes and appointment insights live in disconnected tools.',
    solution:
      'Designed handwriting-to-structured-data extraction, a voice scribe with suggested prompts, and an overview dashboard with schedules, follow-ups and AI analysis.',
    metrics: [
      { value: '3', label: 'Connected surfaces' },
      { value: 'Ink + Voice', label: 'Input modes' },
      { value: 'Ask AI', label: 'Built-in analysis' },
    ],
    visual: {
      type: 'stack',
      primary: {
        src: '/images/adicare-dashboard.webp',
        alt: 'AdiCare doctor overview dashboard with appointment stats and schedule timeline',
      },
      secondary: {
        src: '/images/adicare-scribe.webp',
        alt: 'AdiCare AI scribe recording a consultation',
      },
      device: {
        src: '/images/adicare-device.webp',
        alt: 'AdiCare smart writing pad with stylus',
      },
    },
    caseStudy: {
      executiveSummary:
        'AdiCare lets doctors keep writing and talking the way they already do. A smart pad, a voice scribe and a practice dashboard quietly turn both into structured records.',
      meta: {
        role: 'Product Designer',
        duration: '10 weeks',
        team: '1 PM, 5 engineers, hardware partner',
        platform: 'Tablet, smart pad & web dashboard',
      },
      impact: [
        { value: '3', label: 'Connected surfaces' },
        { value: 'Ink + Voice', label: 'Natural input modes' },
        { value: 'Ask AI', label: 'Built-in practice analysis' },
      ],
      problem: {
        intro:
          'Doctors in busy clinics write prescriptions by hand and take notes between patients. That information rarely reaches a digital record, so practice-level insights are lost.',
        points: [
          {
            title: 'Paper prescriptions disappear',
            body: 'Handwritten notes were scanned rarely, if ever, and never became searchable data.',
          },
          {
            title: 'Typing gets in the way of care',
            body: 'Doctors didn\u2019t want to look at a screen instead of the patient during consultations.',
          },
          {
            title: 'Disconnected tools',
            body: 'Appointments, notes and analytics lived in separate systems with no shared view.',
          },
        ],
      },
      research: {
        intro:
          'I observed consultations and spoke with doctors and front-desk staff to understand how a typical clinic day runs.',
        methods: ['Clinic observation', 'Doctor interviews', 'Front-desk interviews', 'Device testing'],
        insights: [
          {
            source: 'Clinic observation',
            title: 'Handwriting is not going away',
            body: 'Doctors were fastest with a pen, so the solution had to start from ink instead of replacing it.',
          },
          {
            source: 'Doctor interviews',
            title: 'Voice is fine if it stays in the background',
            body: 'Doctors were open to a scribe if it didn\u2019t interrupt and they could check the notes afterwards.',
          },
          {
            source: 'Front-desk interviews',
            title: 'The day is organised around sessions',
            body: 'Clinics plan morning and evening sessions, so the dashboard schedule was built around those.',
          },
        ],
      },
      process: {
        intro:
          'I designed three surfaces that share one patient record: the pad for ink, the scribe for voice and the dashboard for the whole practice.',
        flow: [
          { title: 'Book', detail: 'New patient or follow-up' },
          { title: 'Consult', detail: 'Write on the pad, scribe listens' },
          { title: 'Extract', detail: 'Ink and speech become structured data' },
          { title: 'Share', detail: 'Send prescription via WhatsApp, mail or print' },
          { title: 'Analyse', detail: 'Practice trends with Ask AI' },
        ],
        architecture: [
          { group: 'Smart pad', items: ['Writing canvas', 'Original vs extracted', 'Share sheet'] },
          { group: 'AI scribe', items: ['Recording', 'Suggested prompts', 'Manual input'] },
          { group: 'Dashboard', items: ['Overview', 'Appointments', 'Patients', 'Analytics'] },
        ],
        decisions: [
          {
            title: 'Original and extracted views side by side',
            body: 'A simple toggle lets doctors compare their handwriting with the digitised prescription before sharing.',
          },
          {
            title: 'One-tap session controls for the scribe',
            body: 'Large pause and stop controls keep the doctor in charge without breaking eye contact.',
          },
        ],
      },
      solution: [
        {
          id: 'dashboard',
          title: 'Practice overview',
          summary: 'A daily view of appointments, follow-ups and a session timeline for the clinic.',
          bullets: ['Appointment stats at a glance', 'Morning and evening session timeline', 'Quick booking for new patients and follow-ups'],
          visual: { type: 'image', src: '/images/adicare-dashboard.webp', alt: 'AdiCare overview dashboard' },
        },
        {
          id: 'scribe',
          title: 'AI scribe',
          summary: 'A voice scribe that records the consultation and suggests follow-up prompts.',
          bullets: ['Simple record, pause and stop controls', 'Suggested prompts', 'Manual text input fallback'],
          visual: { type: 'image', src: '/images/adicare-scribe.webp', alt: 'AdiCare AI scribe recording screen' },
        },
        {
          id: 'analytics',
          title: 'Analytics & Ask AI',
          summary: 'Practice-level breakdowns by region, gender, family history and age, with an Ask AI entry point.',
          bullets: ['Daily, weekly, monthly and annual views', 'New, follow-up and resolved cases', 'Natural-language questions'],
          visual: { type: 'image', src: '/images/adicare-analytics.webp', alt: 'AdiCare analytics dashboard' },
        },
      ],
      takeaways: {
        impact: [
          { title: 'Paper becomes data', body: 'Handwritten prescriptions are now structured and shareable.' },
          { title: 'More eye contact', body: 'The scribe and pad let doctors focus on the patient, not a keyboard.' },
          { title: 'Practice insight', body: 'Clinic owners can see trends across patients for the first time.' },
        ],
        learnings: [
          { title: 'Meet users where they are', body: 'Designing around the pen, not against it, made adoption possible.' },
          { title: 'Hardware and software are one experience', body: 'The device, app and dashboard had to feel like a single product.' },
        ],
      },
    },
  },
  {
    slug: 'authlynk',
    title: 'Authlynk',
    tagline: 'Enterprise SSO & user management portal',
    category: 'Enterprise Security / IAM',
    filters: ['Security & IAM', 'Enterprise SaaS'],
    summary:
      'A centralized Single Sign-On and Identity Access Management platform streamlining authentication across fragmented internal enterprise tools.',
    problem:
      'Fragmented logins across internal apps caused frequent credential resets, lost productivity and compliance risks.',
    solution:
      'A unified login supporting passkeys, MFA and magic links, alongside a role-based admin access control dashboard.',
    metrics: [
      { value: '1', label: 'Login for every tool' },
      { value: '3', label: 'Auth methods' },
      { value: '8 wks', label: 'Timeline' },
    ],
    visual: { type: 'mockup', id: 'authlynk' },
    caseStudy: {
      executiveSummary:
        'Authlynk gives employees one secure login for every internal tool and gives IT one place to manage who can access what. Passkeys, MFA and magic links replace a pile of passwords.',
      meta: {
        role: 'Product Designer',
        duration: '8 weeks',
        team: '1 PM, 3 engineers, 1 security lead',
        platform: 'Web (employee portal & admin console)',
      },
      impact: [
        { value: '1', label: 'Unified login for every tool' },
        { value: '3', label: 'Passwordless & MFA methods' },
        { value: '8 wks', label: 'Discovery to dev handoff' },
      ],
      problem: {
        intro:
          'Employees juggled separate credentials for HR, finance, engineering and support tools. IT spent its days resetting passwords, and access reviews were done in spreadsheets.',
        points: [
          {
            title: 'Too many passwords',
            body: 'Each internal app had its own login, so people reused weak passwords or kept getting locked out.',
          },
          {
            title: 'Reset requests swamped IT',
            body: 'Credential resets were among the most common helpdesk tickets and took time away from real work.',
          },
          {
            title: 'No single view of access',
            body: 'Admins couldn\u2019t see which roles had access to which tools, which made audits slow and risky.',
          },
          {
            title: 'Security felt like friction',
            body: 'MFA was seen as a hassle, so adoption was low even where it was available.',
          },
        ],
      },
      research: {
        intro:
          'I talked to employees and IT admins and reviewed how leading identity platforms handle sign-in and access control.',
        methods: [
          'Employee interviews',
          'IT admin interviews',
          'Helpdesk ticket analysis',
          'Competitor analysis (Okta, Azure AD, Google Workspace)',
          'Card sorting',
        ],
        insights: [
          {
            source: 'Helpdesk tickets',
            title: 'Most friction happens at sign-in',
            body: 'Password resets and lockouts were a recurring theme, which pointed to passwordless options as the biggest win.',
          },
          {
            source: 'IT admin interviews',
            title: 'Admins think in roles, not people',
            body: 'IT wanted to grant access by role and team, then handle exceptions, instead of editing each user.',
          },
          {
            source: 'Competitor analysis',
            title: 'Enterprise consoles are overloaded',
            body: 'Established IAM tools expose every setting at once. A focused admin view for common tasks was a clear gap.',
          },
        ],
        quote: {
          text: 'I just want to open my laptop and get to work, not remember which password goes where.',
          source: 'Employee, finance team',
        },
      },
      process: {
        intro:
          'I split the product into two clear experiences: a fast sign-in for every employee and a role-based console for admins, both sharing one identity model.',
        flow: [
          { title: 'Open any app', detail: 'Redirect to one Authlynk sign-in' },
          { title: 'Choose a method', detail: 'Passkey, authenticator code or magic link' },
          { title: 'Verify', detail: 'MFA policy applied by role' },
          { title: 'Access', detail: 'Single session across every tool' },
          { title: 'Govern', detail: 'Admins review roles and activity' },
        ],
        architecture: [
          { group: 'Employee portal', items: ['Sign in', 'My apps', 'Security settings', 'Devices'] },
          { group: 'Admin console', items: ['Users', 'Roles & permissions', 'App connections', 'Policies'] },
          { group: 'Security', items: ['Activity log', 'Alerts', 'Access reviews'] },
        ],
        decisions: [
          {
            title: 'Passkey as the default option',
            body: 'The fastest and most secure method sits at the top, with other methods one tap away.',
          },
          {
            title: 'Roles before individual permissions',
            body: 'Admins assign roles in one click from the user list, and edit individual exceptions only when needed.',
          },
          {
            title: 'Plain-language security messages',
            body: 'Every security prompt explains what\u2019s happening and why, which made MFA feel helpful rather than annoying.',
          },
        ],
      },
      solution: [
        {
          id: 'signin',
          title: 'Unified sign-in & access control',
          summary:
            'One screen for every employee, with passkeys, authenticator codes and magic links, plus a role-based access table for admins. Try it: switch methods and click a role.',
          bullets: [
            'Passkey, MFA and magic-link methods',
            'Inline feedback for each method',
            'Click a role to cycle permissions',
          ],
          visual: { type: 'mockup', id: 'authlynk' },
        },
        {
          id: 'activity',
          title: 'Security activity & policies',
          summary:
            'Admins see sign-in activity, blocked attempts and MFA coverage in one place, with clear status labels.',
          bullets: [
            'Live activity log by user and method',
            'Blocked and suspicious attempts highlighted',
            'MFA coverage across teams',
          ],
          visual: { type: 'mockup', id: 'authlynk-audit' },
        },
      ],
      takeaways: {
        impact: [
          {
            title: 'One login everywhere',
            body: 'Employees sign in once and reach every connected internal tool.',
          },
          {
            title: 'Fewer reset requests',
            body: 'Passwordless methods target the biggest source of helpdesk tickets.',
          },
          {
            title: 'Audit-ready access',
            body: 'Role-based access and an activity log give IT a clear view for compliance reviews.',
          },
        ],
        learnings: [
          {
            title: 'Security UX is product UX',
            body: 'When the secure option is also the easiest one, people actually choose it.',
          },
          {
            title: 'Design for the common task',
            body: 'Prioritising what admins do daily over every possible setting kept the console usable.',
          },
        ],
      },
    },
  },
  {
    slug: 'aiims',
    title: 'AIIMS Breast Cancer Detection',
    tagline: 'Clinical decision-support interface',
    category: 'Clinical AI / HealthTech',
    filters: ['HealthTech', 'AI & Agentic'],
    summary:
      'A diagnostic decision-support interface that assists clinicians with early detection workflows and clear data interpretation.',
    problem:
      'AI findings were hard for clinicians to interpret and verify quickly during high-volume screening.',
    solution:
      'End-to-end research and UI for a reviewer that surfaces AI regions of interest, confidence and a clinician-first accept or override flow.',
    metrics: [
      { value: 'Clinical', label: 'UX focus' },
      { value: 'E2E', label: 'Research & UI' },
    ],
    visual: { type: 'mockup', id: 'aiims' },
    caseStudy: {
      executiveSummary:
        'A decision-support reviewer that helps clinicians understand AI screening results quickly. The clinician always makes the final call.',
      meta: {
        role: 'UX Researcher & Designer',
        duration: 'Research project',
        team: 'Clinicians & ML researchers',
        platform: 'Web (clinical workstation)',
      },
      impact: [
        { value: 'Clinical', label: 'UX focus' },
        { value: 'E2E', label: 'Research & UI' },
        { value: '1', label: 'Clinician-first review flow' },
      ],
      problem: {
        intro:
          'Screening clinicians review many cases a day. AI predictions were useful but hard to read and verify under time pressure.',
        points: [
          { title: 'Black-box results', body: 'Clinicians couldn\u2019t see why the model flagged a region.' },
          { title: 'High volume, little time', body: 'Every extra click in a review slows down the whole screening queue.' },
          { title: 'Unclear accountability', body: 'It wasn\u2019t obvious how to record when a clinician disagreed with the AI.' },
        ],
      },
      research: {
        intro: 'I worked with clinicians to understand how they read scans and make decisions today.',
        methods: ['Contextual inquiry', 'Clinician interviews', 'Workflow mapping'],
        insights: [
          {
            source: 'Clinician interviews',
            title: 'Show where, then how sure',
            body: 'Clinicians wanted the region of interest first, with confidence as supporting context.',
          },
          {
            source: 'Contextual inquiry',
            title: 'Overrides must be fast',
            body: 'Disagreeing with the AI had to be as quick as agreeing, or clinicians would ignore the tool.',
          },
        ],
      },
      process: {
        intro: 'The reviewer follows how clinicians already read a case, with AI help layered on top.',
        flow: [
          { title: 'Open case', detail: 'Patient context and scan' },
          { title: 'See regions', detail: 'AI regions of interest highlighted' },
          { title: 'Check confidence', detail: 'Clear confidence per finding' },
          { title: 'Decide', detail: 'Accept or override with a reason' },
        ],
        architecture: [
          { group: 'Worklist', items: ['Queue', 'Priority', 'Status'] },
          { group: 'Reviewer', items: ['Scan viewer', 'AI findings', 'Decision panel'] },
        ],
        decisions: [
          {
            title: 'Clinician always decides',
            body: 'AI findings are suggestions. The accept or override action is always the clinician\u2019s.',
          },
        ],
      },
      solution: [
        {
          id: 'reviewer',
          title: 'AI-assisted reviewer',
          summary: 'Regions of interest, confidence and a one-click accept or override flow in one view.',
          bullets: ['Highlighted regions of interest', 'Confidence shown per finding', 'Accept or override with a reason'],
          visual: { type: 'mockup', id: 'aiims' },
        },
      ],
      takeaways: {
        impact: [
          { title: 'Explainable results', body: 'Clinicians can see where and how confident the AI is.' },
          { title: 'Clear accountability', body: 'Every decision is recorded, including overrides.' },
        ],
        learnings: [
          { title: 'AI should support, not replace', body: 'Keeping the clinician in control was key to trust.' },
        ],
      },
    },
  },
  {
    slug: 'unstudio-ai',
    title: 'Unstudio AI',
    tagline: 'AI product photography platform for furniture & home decor brands',
    category: 'AI & Commercial SaaS',
    filters: ['AI & Agentic', 'Enterprise SaaS'],
    summary:
      '2024 product experience, UX research, and front-end UI for Unstudio AI’s generative product photography platform serving furniture and home decor brands (prior to the company’s 2026 pivot to AI marketing).',
    problem:
      'Traditional furniture and decor photoshoots are expensive and slow, yet retail teams hesitated to adopt AI imagery due to realism and product-consistency concerns.',
    solution:
      'Designed and built a clear, trust-led web experience explaining model fine-tuning, human-in-the-loop editing, real retail use cases, and transparent pricing.',
    metrics: [
      { value: '2024', label: '0-to-1 launch' },
      { value: '3-Step', label: 'Hybrid AI workflow' },
      { value: 'B2B', label: 'Furniture & decor focus' },
    ],
    visual: {
      type: 'image',
      src: '/images/unstudio-hero.png',
      alt: 'Unstudio AI landing visual showcasing photorealistic interior renders',
    },
    caseStudy: {
      executiveSummary:
        'In 2024, I worked as a UI Developer and UX Researcher during the initial launch of Unstudio AI when the company focused on AI-generated product photography for furniture, lighting, and home decor brands. I researched how retail buyers evaluate AI visuals against traditional studio shoots and built responsive UI flows that turned skepticism into clear product understanding.',
      meta: {
        role: 'UI Developer & UX Researcher',
        duration: '2024 (Launch phase)',
        team: 'Founders, AI engineers, design team',
        platform: 'Web (B2B SaaS)',
      },
      impact: [
        { value: '2024', label: '0-to-1 product launch' },
        { value: '3-Step', label: 'AI + human editing pipeline' },
        { value: '3+', label: 'Enterprise retail use cases' },
      ],
      problem: {
        intro:
          'Furniture, lighting, and home decor brands spend heavily shipping physical inventory to studios and staging room sets. Early generative AI tools promised speed, but retail teams struggled to trust whether AI could preserve exact textures, proportions, and brand styling.',
        points: [
          {
            title: 'High logistics cost of studio shoots',
            body: 'Shipping bulky furniture and staging multiple room environments created long lead times and high production costs per SKU.',
          },
          {
            title: 'Distrust of generic AI renders',
            body: 'Brand teams worried off-the-shelf AI generators would distort product geometry, fabric grain, or lighting accuracy.',
          },
          {
            title: 'Unclear onboarding & pricing expectations',
            body: 'Prospective B2B clients didn’t know how custom model training worked or how per-product commitments scaled.',
          },
        ],
      },
      research: {
        intro:
          'I interviewed prospective e-commerce and catalog stakeholders and audited competing AI photography tools to uncover what prevented furniture brands from switching away from physical shoots.',
        methods: [
          'Stakeholder & buyer discovery',
          'Competitive AI photography audit',
          'Visual quality & trust evaluation',
          'Information architecture testing',
        ],
        insights: [
          {
            source: 'Buyer discovery',
            title: 'Teams wanted human QA alongside AI speed',
            body: 'Pure automation felt risky for flagship catalogs. Explaining that designers refine lighting, shadows, and textures after model generation significantly increased confidence.',
          },
          {
            source: 'Visual trust evaluation',
            title: 'Real brand proof mattered more than technical jargon',
            body: 'Seeing recognizable furniture and decor categories styled in realistic interiors answered quality questions faster than model specs.',
          },
          {
            source: 'Onboarding audit',
            title: 'Custom model training needed transparent unit pricing',
            body: 'Separating one-time product model training from per-image generation costs made budgeting straightforward for catalog managers.',
          },
        ],
      },
      process: {
        intro:
          'I translated these research findings into a narrative page architecture and built responsive UI components that guided visitors from visual proof to workflow clarity and pricing.',
        flow: [
          { title: 'Visual proof', detail: 'Lead with photorealistic interior renders to establish quality immediately' },
          { title: 'Value framing', detail: 'Compare studio bottlenecks against AI speed, accuracy, and cost' },
          { title: 'Workflow transparency', detail: 'Break down fine-tuning, expert editing, and custom environments' },
          { title: 'Retail validation', detail: 'Showcase category-specific furniture and decor applications' },
          { title: 'Clear pricing', detail: 'Present model training and per-image tiers upfront' },
        ],
        architecture: [
          { group: 'Discovery & Proof', items: ['Hero showcase', 'Category positioning', 'ROI comparison'] },
          { group: 'Workflow & Trust', items: ['Fine-tuned AI models', 'Expert-led editing', 'Custom environments'] },
          { group: 'Conversion', items: ['Brand use cases', 'Tiered pricing breakdown', 'Direct inquiry'] },
        ],
        decisions: [
          {
            title: 'Lead with high-contrast visual framing',
            body: 'Used bold masked typography and real interior outputs up front so visitors judged visual realism within seconds.',
          },
          {
            title: 'Make human-in-the-loop editing explicit',
            body: 'Highlighted designer retouching as a core step between AI generation and final delivery to remove perceived quality risk.',
          },
          {
            title: 'Structure pricing around SKU training + output volume',
            body: 'Presented minimum product commitments and per-image rates in scannable cards to reduce back-and-forth sales friction.',
          },
        ],
      },
      solution: [
        {
          id: 'workflow',
          title: 'Transparent 3-step AI + human workflow',
          summary:
            'Broke down the production pipeline into product-specific model training, expert designer refinement, and custom environment styling.',
          bullets: [
            'Clear explanation of product-specific AI fine-tuning',
            'Explicit human design QA for shadows, textures, and proportions',
            'Custom room environments without physical studio constraints',
          ],
          visual: {
            type: 'image',
            src: '/images/unstudio-process.png',
            alt: 'Unstudio AI three-step workflow: Fine-Tuned AI Models, Expert-Led Editing, and Creative Freedom',
          },
        },
        {
          id: 'use-cases',
          title: 'Category-led retail showcase',
          summary:
            'Organized visual proof around real furniture, lighting, and home decor applications for brands like Wakefit, Orange Tree, and Hometown.',
          bullets: [
            'Context-rich interior scenes across sofas, dining, and decor accents',
            'Consistent brand styling across multiple angles and rooms',
            'Social proof anchored in recognizable retail partners',
          ],
          visual: {
            type: 'image',
            src: '/images/unstudio-usecases.png',
            alt: 'Unstudio AI retail use cases featuring furniture and home decor renders',
          },
        },
        {
          id: 'pricing',
          title: 'Scannable B2B pricing & packaging',
          summary:
            'Structured commercial terms into clear cards covering per-product model training, included edited renders, and add-on image pricing.',
          bullets: [
            'Upfront per-product training cost and minimum commitment',
            'Included edited images per trained SKU',
            'Transparent per-image scaling and custom enterprise path',
          ],
          visual: {
            type: 'image',
            src: '/images/unstudio-pricing.png',
            alt: 'Unstudio AI pricing cards detailing product training and per-image rates',
          },
        },
      ],
      takeaways: {
        impact: [
          {
            title: 'Aligned UX with commercial clarity',
            body: 'Turned a complex AI rendering pipeline into a structured, self-explanatory product story for retail buyers.',
          },
          {
            title: 'Bridged research and front-end execution',
            body: 'Combined user discovery with hands-on UI implementation to ship cohesive, responsive layouts quickly during early launch.',
          },
        ],
        learnings: [
          {
            title: 'In generative AI, process transparency builds trust',
            body: 'Showing where human craft refines AI output matters just as much as showcasing the final generated image.',
          },
          {
            title: 'Document 0-to-1 work in its historical context',
            body: 'Even when an early-stage startup later pivots its direction, clearly framing the user problem and shipped work keeps the case study grounded and credible.',
          },
        ],
      },
    },
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug)
  return {
    index,
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  }
}
