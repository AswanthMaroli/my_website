import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  FileText,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type NavKey = "home" | "about" | "experience" | "projects";

const profile = {
  name: "Aswanth Maroli",
  location: "Kochi, Kerala, India",
  headline:
    "Automation QA Engineer | Playwright, Selenium, REST Assured, JMeter | UI & API Automation | CI/CD (Azure DevOps, Jenkins)",
  summary:
    "I’m an Automation QA Engineer who treats quality like an engineering problem, not a checkbox. I break systems early, automate what matters, and help teams ship faster with confidence.",
  links: {
    linkedin: "https://www.linkedin.com/in/aswanthmaroli",
    github: "https://github.com/aswanthmaroli",
    resumePdf: "/attached_assets/Profile_(1)_1769675191900.pdf",
    email: "aswanthmaroli07@gmail.com",
  },
  skills: [
    "Playwright",
    "Selenium",
    "REST Assured",
    "Cypress",
    "TestNG",
    "Postman",
    "JMeter",
    "Azure DevOps",
    "Jenkins",
    "JIRA",
  ],
} as const;

function useActiveSection(ids: NavKey[]) {
  const [active, setActive] = useState<NavKey>("home");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActive(visible[0].target.id as NavKey);
      },
      {
        root: null,
        rootMargin: "-25% 0px -65% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.65],
      },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids.join("|")]);

  return active;
}

function scrollToId(id: NavKey) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid-fade noise-overlay">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-10">
        {children}
      </div>
    </div>
  );
}

function TopNav({ active }: { active: NavKey }) {
  const items: Array<{ key: NavKey; label: string }> = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "experience", label: "Experience" },
    { key: "projects", label: "Projects" },
  ];

  return (
    <div className="sticky top-0 z-40">
      <div className="-mx-5 sm:-mx-6 lg:-mx-10 px-5 sm:px-6 lg:px-10 pt-4">
        <div className="rounded-2xl border border-border/70 bg-background/70 backdrop-blur-xl shadow-[0_18px_60px_-30px_rgba(0,0,0,0.85)]">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              data-testid="link-home"
              onClick={() => scrollToId("home")}
              className="group inline-flex items-center gap-2"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-xl border border-border/70 bg-card/60">
                <Sparkles className="size-4 text-primary" strokeWidth={1.75} />
              </span>
              <span className="font-serif text-[15px] tracking-[-0.01em] text-foreground">
                Aswanth
                <span className="text-foreground/60">.dev</span>
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {items.map((it) => {
                const isActive = active === it.key;
                return (
                  <button
                    key={it.key}
                    data-testid={`link-nav-${it.key}`}
                    onClick={() => scrollToId(it.key)}
                    className={
                      "relative px-3 py-2 text-sm rounded-xl transition " +
                      (isActive
                        ? "text-foreground"
                        : "text-foreground/70 hover:text-foreground")
                    }
                  >
                    {isActive && (
                      <span className="absolute inset-0 -z-10 rounded-xl bg-card/60 border border-border/70" />
                    )}
                    {it.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a
                data-testid="link-linkedin"
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex"
              >
                <Button variant="secondary" size="sm" className="gap-2">
                  <Linkedin className="size-4" strokeWidth={1.75} />
                  LinkedIn
                </Button>
              </a>
              <a
                data-testid="link-github"
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex"
              >
                <Button variant="secondary" size="sm" className="gap-2">
                  <Github className="size-4" strokeWidth={1.75} />
                  GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl px-4 py-3">
      <div
        data-testid={`text-stat-value-${label.toLowerCase().replace(/\s+/g, "-")}`}
        className="text-2xl font-semibold tracking-[-0.02em] text-foreground"
      >
        {value}
      </div>
      <div
        data-testid={`text-stat-label-${label.toLowerCase().replace(/\s+/g, "-")}`}
        className="mt-1 text-xs text-foreground/60"
      >
        {label}
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 rounded-md border border-border/70 bg-card/60" />
        <div data-testid={`text-eyebrow-${eyebrow.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs uppercase tracking-[0.22em] text-foreground/60">
          {eyebrow}
        </div>
      </div>
      <h2
        data-testid={`text-section-title-${title.toLowerCase().replace(/\s+/g, "-")}`}
        className="mt-3 font-serif text-3xl sm:text-4xl leading-[1.05] tracking-[-0.03em] text-foreground"
      >
        {title}
      </h2>
      {description ? (
        <p
          data-testid={`text-section-desc-${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="mt-2 max-w-2xl text-sm sm:text-[15px] leading-relaxed text-foreground/70"
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  const ids = useMemo(() => ["home", "about", "experience", "projects"] as NavKey[], []);
  const active = useActiveSection(ids);

  return (
    <Shell>
      <TopNav active={active} />

      <main className="pb-20">
        {/* HERO */}
        <section id="home" className="pt-10 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="rounded-3xl border border-border/70 bg-card/55 backdrop-blur-xl p-6 sm:p-8 shadow-[0_30px_90px_-55px_rgba(0,0,0,0.9)]">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs text-foreground/70">
                  <span className="inline-flex size-1.5 rounded-full bg-primary" />
                  Open to SDET / Senior Automation opportunities
                </div>

                <h1
                  data-testid="text-headline"
                  className="mt-5 font-serif text-4xl sm:text-5xl leading-[1.02] tracking-[-0.05em]"
                >
                  <span className="text-gradient">Automation QA Engineer</span>
                  <span className="text-foreground/80"> building confidence into releases.</span>
                </h1>

                <p
                  data-testid="text-subheadline"
                  className="mt-4 text-sm sm:text-[15px] leading-relaxed text-foreground/70"
                >
                  {profile.summary}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-foreground/70">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4 text-foreground/60" strokeWidth={1.75} />
                    <span data-testid="text-location">{profile.location}</span>
                  </span>
                  <span className="text-foreground/35">•</span>
                  <span className="inline-flex items-center gap-2">
                    <Briefcase className="size-4 text-foreground/60" strokeWidth={1.75} />
                    <span data-testid="text-role">{profile.headline}</span>
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    data-testid="button-view-resume"
                    href={profile.links.resumePdf}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="gap-2">
                      <FileText className="size-4" strokeWidth={1.75} />
                      View LinkedIn PDF
                      <ArrowUpRight className="size-4" strokeWidth={1.75} />
                    </Button>
                  </a>
                  <a
                    data-testid="button-email"
                    href={`mailto:${profile.links.email}`}
                    className="inline-flex"
                  >
                    <Button variant="secondary" className="gap-2">
                      Contact
                      <ArrowUpRight className="size-4" strokeWidth={1.75} />
                    </Button>
                  </a>
                </div>

                <div className="mt-7">
                  <div className="mb-3 flex items-center justify-between">
                    <div
                      data-testid="text-skills-title"
                      className="text-xs uppercase tracking-[0.22em] text-foreground/60"
                    >
                      Core stack
                    </div>
                    <div className="text-xs text-foreground/55 font-mono">{"// easy to edit"}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((s) => (
                      <Badge
                        data-testid={`badge-skill-${s.toLowerCase().replace(/\s+/g, "-")}`}
                        key={s}
                        variant="secondary"
                        className="border border-border/70 bg-background/30 text-foreground/75"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="h-full rounded-3xl border border-border/70 bg-card/55 backdrop-blur-xl p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div data-testid="text-name" className="text-xl font-semibold tracking-[-0.02em]">
                      {profile.name}
                    </div>
                    <div className="mt-1 text-sm text-foreground/70">
                      <span className="font-mono">aswanthmaroli</span>
                      <span className="text-foreground/40">@</span>
                      <span className="text-foreground/70">linkedin</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full blur-2xl bg-primary/15" />
                    <div
                      data-testid="img-profile"
                      className="relative size-20 rounded-2xl border border-border/70 bg-gradient-to-br from-card to-background neon-ring overflow-hidden"
                      aria-label="Profile image"
                      role="img"
                    >
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="text-xs text-foreground/55">Add photo</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 opacity-60" />

                <div className="grid grid-cols-2 gap-3">
                  <StatCard label="Years in QA" value="3+" />
                  <StatCard label="Defects reduced" value="~70%" />
                  <StatCard label="Focus" value="UI + API" />
                  <StatCard label="CI/CD" value="Azure + Jenkins" />
                </div>

                <Separator className="my-6 opacity-60" />

                <div className="rounded-2xl border border-border/70 bg-background/30 p-4">
                  <div
                    data-testid="text-highlight-title"
                    className="text-xs uppercase tracking-[0.22em] text-foreground/60"
                  >
                    Availability
                  </div>
                  <div data-testid="text-highlight-body" className="mt-2 text-sm leading-relaxed text-foreground/70">
                    Interested in automation-first teams, API-driven testing, and scalable test architecture.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-10">
            <div className="hairline h-px opacity-70" />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="pt-14 sm:pt-16">
          <SectionTitle
            eyebrow="About"
            title="Quality engineering, not just testing"
            description="I treat quality as an engineering problem, not a checkbox—breaking systems early to ship faster with absolute confidence."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-7 rounded-3xl border-border/70 bg-card/55 backdrop-blur-xl p-6 sm:p-8">
              <div data-testid="text-about" className="text-sm sm:text-[15px] leading-relaxed text-foreground/70">
                <p>
                  I specialize in building intelligent automation frameworks that catch high-impact defects before they ever touch production. My approach makes releases feel <strong>boring</strong>—exactly how a stable deployment should be.
                </p>
                <p className="mt-4">
                  With 3+ years of experience across high-stakes domains—from CMS and financial tools to incident management—I partner closely with Agile teams to bake quality into the core of the development lifecycle.
                </p>
                <p className="mt-4">
                  My mission is simple: eliminate production regressions, accelerate release velocity, and provide stakeholders with clear, actionable signals through data-driven test reporting.
                </p>
              </div>
            </Card>

            <Card className="lg:col-span-5 rounded-3xl border-border/70 bg-card/55 backdrop-blur-xl p-6 sm:p-8">
              <div data-testid="text-key-strengths" className="text-xs uppercase tracking-[0.22em] text-foreground/60">
                Key strengths
              </div>
              <div className="mt-4 grid gap-3">
                {["Automation-first mindset", "Reliable CI pipelines", "UI + API coverage", "Defect prevention"].map((t) => (
                  <div
                    key={t}
                    data-testid={`row-strength-${t.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-2xl border border-border/70 bg-background/30 p-4 hover-elevate"
                  >
                    <div className="text-sm font-medium text-foreground">{t}</div>
                    <div className="mt-1 text-sm text-foreground/65">
                      {t === "Reliable CI pipelines"
                        ? "Integrated tests into Azure DevOps & Jenkins for fast feedback."
                        : t === "UI + API coverage"
                          ? "Playwright/Selenium for UI, REST Assured for API validation."
                          : t === "Defect prevention"
                            ? "Focused on catching high-impact defects before production."
                            : "Automate what matters; keep tests maintainable."
                      }
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="pt-14 sm:pt-16">
          <SectionTitle
            eyebrow="Experience"
            title="Recent roles"
            description="A clean timeline layout that’s easy to extend as you add projects and wins."
          />

          <div className="grid gap-4">
            {[
              {
                company: "Smart Hatch Technologies FZE",
                title: "Quality Analyst",
                time: "July 2025 — Present",
                location: "Kochi, Kerala, India",
                bullets: [
                  "Testing CMS workflows and incident & call management systems used in real-world operational environments",
                  "Designed and executed UI automation scripts using Selenium + TestNG, reducing repetitive manual testing",
                  "Performed API automation using REST Assured (auth, headers, payload validation, business rules)",
                  "Logged and tracked defects in JIRA and ensured fixes through retesting + regression",
                ],
              },
              {
                company: "Approcker Technologies Pvt Ltd",
                title: "Software Test Engineer",
                time: "Jan 2023 — Jun 2025",
                location: "Kochi, Kerala, India",
                bullets: [
                  "Built automation frameworks using Playwright and Cypress to improve testing efficiency",
                  "Validated backend services with Postman + Playwright API testing",
                  "Conducted performance/load testing using JMeter to assess reliability",
                  "Integrated automation into Azure DevOps CI/CD for faster releases",
                ],
              },
            ].map((role, idx) => (
              <Card
                key={role.company}
                data-testid={`card-experience-${idx}`}
                className="rounded-3xl border-border/70 bg-card/55 backdrop-blur-xl p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <div className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                      {role.title}
                      <span className="text-foreground/50"> · </span>
                      <span className="underline-neon">{role.company}</span>
                    </div>
                    <div className="mt-1 text-sm text-foreground/65">
                      {role.location}
                      <span className="text-foreground/35"> · </span>
                      {role.time}
                    </div>
                  </div>
                  <Badge variant="secondary" className="self-start border border-border/70 bg-background/30 text-foreground/75">
                    QA / Automation
                  </Badge>
                </div>

                <ul className="mt-4 grid gap-2 text-sm text-foreground/70">
                  {role.bullets.map((b, i) => (
                    <li key={i} data-testid={`text-experience-bullet-${idx}-${i}`} className="flex gap-3">
                      <span className="mt-2 size-1.5 rounded-full bg-primary/80 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="pt-14 sm:pt-16">
          <SectionTitle
            eyebrow="Projects"
            title="Work that shows your craft"
            description="Add real projects as you go — the layout is already built for it."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "Automation Portfolio",
                desc: "A living space to showcase Playwright/Selenium frameworks, patterns, and test architecture decisions.",
                tags: ["Playwright", "CI", "TypeScript"],
                href: profile.links.github,
              },
              {
                name: "API Testing Toolkit",
                desc: "Reusable REST Assured patterns for auth, schema validation, and contract-style assertions.",
                tags: ["REST Assured", "Java", "API"],
                href: profile.links.github,
              },
              {
                name: "Performance Baselines",
                desc: "JMeter-based load profiles to catch regressions early and establish performance budgets.",
                tags: ["JMeter", "Reports", "SLOs"],
                href: profile.links.github,
              },
              {
                name: "Add your next project",
                desc: "Replace this with a real case study: problem → approach → measurable impact.",
                tags: ["Template"],
                href: profile.links.github,
              },
            ].map((p, idx) => (
              <a
                key={p.name}
                data-testid={`card-project-${idx}`}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <Card className="h-full rounded-3xl border-border/70 bg-card/55 backdrop-blur-xl p-6 sm:p-7 transition hover:border-primary/30 hover:shadow-[0_30px_90px_-55px_rgba(0,0,0,0.9)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold tracking-[-0.02em] text-foreground group-hover:text-foreground">
                        {p.name}
                      </div>
                      <div
                        data-testid={`text-project-desc-${idx}`}
                        className="mt-2 text-sm leading-relaxed text-foreground/70"
                      >
                        {p.desc}
                      </div>
                    </div>
                    <div className="mt-1 inline-flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-background/30">
                      <ArrowUpRight className="size-4 text-foreground/70" strokeWidth={1.75} />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge
                        key={t}
                        data-testid={`badge-project-${idx}-${t.toLowerCase().replace(/\s+/g, "-")}`}
                        variant="secondary"
                        className="border border-border/70 bg-background/30 text-foreground/75"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </a>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-border/70 bg-card/40 backdrop-blur-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div data-testid="text-footer-title" className="font-serif text-2xl tracking-[-0.03em]">
                  Want the source?
                </div>
                <div data-testid="text-footer-subtitle" className="mt-1 text-sm text-foreground/70">
                  This site is intentionally structured to be easy to update (one data object + sections).
                </div>
              </div>
              <a data-testid="button-footer-github" href={profile.links.github} target="_blank" rel="noreferrer">
                <Button variant="secondary" className="gap-2">
                  <Github className="size-4" strokeWidth={1.75} />
                  GitHub
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
