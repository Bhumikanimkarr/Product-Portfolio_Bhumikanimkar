import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdjacentProjects, getProject, projects } from '@/data/projects'
import { CaseNav } from '@/components/case-study/case-nav'
import { CaseHero, ImpactStrip } from '@/components/case-study/case-hero'
import {
  ProblemSection,
  ProcessSection,
  ResearchSection,
  SolutionSection,
  TakeawaysSection,
} from '@/components/case-study/case-narrative'
import { NextProject } from '@/components/case-study/next-project'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title}: ${project.tagline} | Bhumika Nimkar`,
    description: project.caseStudy.executiveSummary,
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { index, next } = getAdjacentProjects(slug)
  const cs = project.caseStudy

  return (
    <>
      <CaseNav index={index} total={projects.length} title={project.title} next={next} />
      <main>
        <CaseHero project={project} />
        <ImpactStrip project={project} />
        <ProblemSection problem={cs.problem} />
        <ResearchSection research={cs.research} />
        <ProcessSection process={cs.process} />
        <SolutionSection solution={cs.solution} />
        <TakeawaysSection takeaways={cs.takeaways} />
        <NextProject next={next} />
      </main>
      <CaseNav index={index} total={projects.length} title={project.title} next={next} position="bottom" />
    </>
  )
}
