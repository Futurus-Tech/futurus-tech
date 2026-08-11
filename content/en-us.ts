import { siteConfig } from "@/lib/site";
import type { Dictionary } from "./types";

/**
 * English (en-US) copy, transcribed from the `data-en` attributes in
 * design/Futurus Tech.dc.html. Strings the design leaves untranslated
 * (the technology marquee, the client names) stay as they are there.
 */
export const enUS = {
  metadata: {
    title: "Futurus Tech · Software consulting and product engineering",
    description:
      "We design, build and maintain software with the people who will live with it. No intermediaries, no vendor lock-in: the code, the decisions and the documentation are yours from day one.",
    ogTitle: "Software that carries the weight of your business.",
    ogDescription:
      "Software consulting and product engineering. Tell us the problem and we answer within 24 hours.",
    ogTagline: "Software consulting · Product engineering",
    ogImageAlt:
      "Futurus Tech: software that carries the weight of your business. Software consulting and product engineering.",
    keywords: [
      "software consulting",
      "product engineering",
      "web development",
      "mobile apps",
      "software architecture",
      "cloud and devops",
      "data and BI",
    ],
  },

  nav: {
    items: [
      { href: "#servicos", label: "Services" },
      { href: "#processo", label: "Process" },
      { href: "#cases", label: "Work" },
      { href: "#clientes", label: "Clients" },
      { href: "#sobre", label: "About" },
    ],
    cta: { href: "#contato", label: "Talk to us" },
    menuLabel: "Menu",
    closeLabel: "Close",
    contact: { href: "#contato", label: "Contact" },
    languageLabel: "View in Portuguese",
  },

  hero: {
    eyebrow: "Software consulting · Product engineering",
    title: ["Software that", "carries the weight", "of your business."],
    lead: "We are a small team of engineers who design, build and maintain software with the people who will live with it. No layers of intermediaries, no vendor lock-in: the code, the decisions and the documentation are yours from day one.",
    primaryCta: { href: "#contato", label: "Start a project" },
    secondaryCta: { href: "#cases", label: "See our work" },
    reel: {
      frames: [
        { alt: "The Futurus Tech team working together" },
        { alt: "A product screen under development" },
        { alt: "A meeting with a client" },
      ],
      captionSuffix: "/ 03 · Futurus Tech",
      scrollCue: "Scroll",
    },
  },

  marquee: [
    "Web",
    "Mobile",
    "Arquitetura",
    "APIs",
    "Cloud & DevOps",
    "Dados & BI",
    "IA & Automação",
    "UX/UI",
    "Sustentação",
  ],

  stats: [
    { value: 38, label: "Projects delivered since 2021" },
    { value: 100, suffix: "%", label: "Of the code in your repository, no lock-in" },
    { value: 12, label: "Active clients right now" },
    { value: 24, suffix: "h", label: "To answer any message you send us" },
  ],

  services: {
    eyebrow: "Services",
    title: ["Nine ways we can", "get in the trench with you."],
    items: [
      {
        title: "Web development",
        description:
          "Applications, portals and internal systems built to be read by whoever comes next: typed, tested and deployed continuously.",
      },
      {
        title: "Mobile apps",
        description:
          "iOS and Android from one codebase when that is the right call, native when it is not. Store submission included.",
      },
      {
        title: "Consulting & architecture",
        description:
          "We read what you already have, name the real bottleneck and write down a plan your team can execute without us.",
      },
      {
        title: "Integrations & APIs",
        description:
          "Payment gateways, ERPs, legacy systems and third parties talking to each other, with contracts, retries and observability.",
      },
      {
        title: "Cloud & DevOps",
        description:
          "Infrastructure as code, pipelines, monitoring and cost review. Boring infrastructure is the goal.",
      },
      {
        title: "Data & BI",
        description:
          "Pipelines, warehouse and dashboards that answer the question someone actually asked in the meeting.",
      },
      {
        title: "AI & automation",
        description:
          "Language models and scripted automation applied where they remove real hours of work, not where they look good in a slide.",
      },
      {
        title: "UX/UI design",
        description:
          "Flows, interface and a design system built with the developers, so what was drawn is what ships.",
      },
      {
        title: "Maintenance & support",
        description:
          "Someone on call who knows the system, with agreed response times and a monthly report you can actually read.",
      },
    ],
  },

  process: {
    eyebrow: "Process",
    title: ["Four steps, and", "you see all of them."],
    intro:
      "Weekly demos, an open board and direct access to whoever is writing the code. You will never have to ask how the project is going.",
    steps: [
      {
        title: "Listening",
        description:
          "One conversation to understand the operation, not the wishlist. We leave with the problem written in your words and a first estimate of size.",
      },
      {
        title: "Shaping",
        description:
          "Scope, architecture and screens on the table before anyone writes production code. This is where we cut what is not needed.",
      },
      {
        title: "Building",
        description:
          "Short cycles with something working at the end of each one. You test it in the same week it was built.",
      },
      {
        title: "Handover & care",
        description:
          "Deploy, documentation and a walkthrough with your team. If you want us to stay for maintenance, we stay; if not, everything is in your hands.",
      },
    ],
  },

  cases: {
    eyebrow: "Selected work",
    title: ["Six problems solved,", "six lighter operations."],
    intro:
      "Every one of them started with a no-strings conversation. Below: the problem, what we built and what changed after.",
    items: [
      {
        id: "kairo-bank",
        meta: "Kairo Bank · Fintech · 2025",
        title: "Account opening in 4 minutes",
        description:
          "We replaced a three-day onboarding with real-time document checks and a review queue reserved for exceptions.",
        metric: "3 days → 4 min",
        imageAlt: "Kairo Bank: digital account opening",
      },
      {
        id: "meridian-log",
        meta: "Meridian Log · Logistics · 2025",
        title: "Control tower for 1,200 routes a day",
        description:
          "One dashboard joining telemetry, incidents and cost per delivery, alerting before a route runs late.",
        metric: "−31% cost per delivery",
        imageAlt: "Meridian Log: logistics control tower",
      },
      {
        id: "orbita-saude",
        meta: "Órbita Saúde · Healthtech · 2024",
        title: "A record system doctors do not fight",
        description:
          "We redesigned the consultation flow around what the clinical team already did on paper, and cut half the required fields.",
        metric: "8 min saved per visit",
        imageAlt: "Órbita Saúde: electronic medical record",
      },
      {
        id: "cerrado-agro",
        meta: "Cerrado Agro · Agribusiness · 2024",
        title: "42 farms on a single dashboard",
        description:
          "A data pipeline consolidating harvest, weather and machinery; the monthly close is no longer one spreadsheet per unit.",
        metric: "Monthly close in 1 day",
        imageAlt: "Cerrado Agro: agricultural data dashboard",
      },
      {
        id: "vallar-energia",
        meta: "Vallar Energia · Energy · 2024",
        title: "Six legacy systems speaking one language",
        description:
          "An integration layer with versioned contracts, automatic reprocessing and end-to-end observability.",
        metric: "Zero downtime on migration",
        imageAlt: "Vallar Energia: legacy system integration",
      },
      {
        id: "tenda-digital",
        meta: "Tenda Digital · Retail · 2023",
        title: "Loyalty with 90k active users",
        description:
          "A rewards app wired into the POS of all 74 stores, validating a coupon at the till in under a second.",
        metric: "+22% repeat purchase",
        imageAlt: "Tenda Digital: retail loyalty app",
      },
    ],
    next: {
      number: "07",
      kicker: "Next case",
      title: "Yours, if you want it",
      description:
        "Tell us the problem and we will come back with scope, timeline and price, with no strings attached.",
      cta: { href: "#contato", label: "Talk to us" },
    },
  },

  clients: {
    eyebrow: "Clients",
    title: ["Teams that trusted", "us with their operation."],
    logos: [
      { name: "Kairo", suffix: " Bank" },
      { name: "Meridian", suffix: " Log" },
      { name: "Órbita", suffix: " Saúde" },
      { name: "Cerrado", suffix: " Agro" },
      { name: "Vallar", suffix: " Energia" },
      { name: "Tenda", suffix: " Digital" },
      { name: "Praiã", suffix: " Retail" },
      { name: "Nordeste", suffix: " Mob" },
    ],
    note: "Some of the teams we have worked with over the past few years, across fintech, logistics, health, agribusiness, energy and retail.",
  },

  testimonials: {
    eyebrow: "Testimonials",
    title: ["What the people who", "worked with us say."],
    items: [
      {
        id: "marina-alcantara",
        quote:
          "We arrived with a project stuck for eight months. In two weeks we had a clickable prototype, in two months a first version in production. The team slotted into our routine as if they were ours.",
        author: "Marina Alcântara",
        role: "Head of Product · Kairo Bank",
        imageAlt: "Marina Alcântara",
      },
      {
        id: "rafael-duarte",
        quote:
          "What surprised me most was the clarity. Every Friday I knew what was done, what was left and what it cost. I never had to chase a report.",
        author: "Rafael Duarte",
        role: "Operations Director · Meridian Log",
        imageAlt: "Rafael Duarte",
      },
      {
        id: "helena-prado",
        quote:
          "They turned down half of what we asked for and explained why. The system came out smaller, simpler, and the clinical team adopted it with no training.",
        author: "Dra. Helena Prado",
        role: "Superintendent · Órbita Saúde",
        imageAlt: "Dra. Helena Prado",
      },
    ],
  },

  plans: {
    eyebrow: "Ways to work together",
    title: ["Three formats. Pick", "the one that fits the moment."],
    items: [
      {
        label: "Format 01",
        title: "Discovery sprint",
        description:
          "Two to three weeks to turn an idea or a mess into scope, architecture and estimate. Ends with a document, not a promise.",
        features: ["Technical diagnosis", "Clickable prototype", "Roadmap and cost"],
      },
      {
        label: "Format 02 · most common",
        title: "Dedicated squad",
        description:
          "A team plugged into your operation for a defined period: design, development and infrastructure in weekly cycles, with a demo every Friday.",
        features: [
          "Weekly delivery",
          "Open board and repository",
          "Direct channel with the engineers",
        ],
        featured: true,
      },
      {
        label: "Format 03",
        title: "Consulting on call",
        description:
          "Hours per month for code review, architecture decisions, hiring support or a second opinion before a big move.",
        features: ["Code and infra review", "Technical mentoring", "No minimum contract"],
      },
    ],
  },

  about: {
    eyebrow: "About us",
    title: ["A small team,", "on purpose."],
    paragraphs: [
      "Futurus Tech was born out of a simple frustration: good software projects fail less for lack of technology and more for lack of conversation. So we work close: few clients at a time, the same people from the first call to the handover.",
      "We serve startups looking for an MVP, mid-sized companies modernising what already runs, enterprises needing extra hands with judgement, white-label partners and public-sector teams.",
    ],
    teamLabel: "The people",
    team: [
      {
        id: "ricardo-paje",
        name: "Ricardo Pajé",
        role: "CEO",
        imageAlt: "Ricardo Pajé",
      },
      {
        id: "fabio-junior",
        name: "Fábio Júnior",
        role: "Front-end developer",
        imageAlt: "Fábio Júnior",
      },
      {
        id: "gabriel-hermenegildo",
        name: "Gabriel Hermenegildo",
        role: "Mobile developer",
        imageAlt: "Gabriel Hermenegildo",
      },
      {
        id: "guido-sanchis",
        name: "Guido Sanchis",
        role: "Back-end developer",
        imageAlt: "Guido Sanchis",
      },
      {
        id: "rafael-ruddy",
        name: "Rafael Ruddy",
        role: "Full-stack developer",
        imageAlt: "Rafael Ruddy",
      },
    ],
  },

  insights: {
    eyebrow: "Insights",
    title: ["What we learn,", "written down."],
    aside: "Three recent notes",
    posts: [
      {
        category: "Architecture",
        title: "When a monolith is still the right answer",
        excerpt:
          "Three projects where splitting everything into services would cost six months and fix nothing.",
        date: "12 mar 2026",
      },
      {
        category: "Process",
        title: "Estimating without lying to yourself",
        excerpt: "How we turn “about two months” into a number a board can approve.",
        date: "04 feb 2026",
      },
      {
        category: "AI",
        title: "Automation that survives the second month",
        excerpt: "What separates a pretty pilot from a process nobody switches off.",
        date: "21 jan 2026",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: ["The questions we", "hear the most."],
    items: [
      {
        question: "How much does a project cost?",
        answer:
          "It depends on scope, and we only quote after understanding it. The discovery sprint exists exactly for that: it has a fixed price and ends with a number you can take to your board.",
      },
      {
        question: "You have no cases yet. Why hire you?",
        answer:
          "Because we would rather show our engineering than a portfolio. We can walk you through our code, our infrastructure and our decisions, and start with a small paid scope so you can judge us by the work.",
      },
      {
        question: "Who owns the code?",
        answer:
          "Yours. The repository is in your organisation from the first commit, and so are the infrastructure accounts.",
      },
      {
        question: "Do you work with our team?",
        answer:
          "Often, yes: in the same rituals, the same board and the same repository. Part of the job is leaving your team able to keep going without us.",
      },
      {
        question: "How long until something is running?",
        answer:
          "Two weeks for a prototype you can click through, and usually six to twelve for a first version in production, depending on integrations and approvals on your side.",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: ["Tell us the problem.", "We answer in 24 hours."],
    intro:
      "No sales script on the other side: the message goes straight to the people who would work on your project.",
    details: {
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      hoursLabel: "Hours",
      hours: "Mon–Fri, 9am–7pm (BRT)",
    },
    form: {
      name: { label: "Name", placeholder: "What should we call you" },
      email: { label: "Email", placeholder: "you@company.com" },
      company: { label: "Company", placeholder: "Optional" },
      subject: {
        label: "What do you need",
        options: [
          "New product / MVP",
          "Modernise an existing system",
          "Consulting / architecture",
          "Maintenance & support",
          "Something else",
        ],
      },
      message: {
        label: "Message",
        placeholder: "Tell us the context, the deadline and what already exists today.",
      },
      submit: "Send message",
      success: "Thanks, we will reply within 24 hours.",
    },
  },

  notFound: {
    metaTitle: `Page not found · ${siteConfig.name}`,
    eyebrow: "Error 404",
    title: ["This page", "does not exist."],
    lead: "The address you opened does not match any page on this site. It may be an old link, a typo, or something that was never here. The rest of the site is right where you left it.",
    code: "404",
    statusLabel: "Status",
    status: "Not Found",
    pathLabel: "Address",
    pathFallback: "Unavailable",
    homeCta: "Back to home",
    linksTitle: "You may be looking for",
  },

  footer: {
    copyright: `© 2026 ${siteConfig.name} · software consulting and product engineering.`,
    linkedin: "LinkedIn",
    backToTop: "Back to top",
  },
} as const satisfies Dictionary;
