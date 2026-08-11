import type { CaseId, QuoteId, TeamMemberId } from "./media";

/**
 * The shape every locale dictionary satisfies.
 *
 * Written once here so `pt.ts` and `en.ts` cannot drift: a missing service,
 * a renamed section or a forgotten FAQ answer is a type error, not a runtime
 * hole in the page.
 */

/** A display heading, one entry per line that slides up behind its own mask. */
export type MaskedHeading = readonly string[];

export type SectionIntro = {
  readonly eyebrow: string;
  readonly title: MaskedHeading;
};

export type NavItem = {
  readonly href: string;
  readonly label: string;
};

export type CallToAction = {
  readonly href: string;
  readonly label: string;
};

export type HeroContent = {
  readonly eyebrow: string;
  /** Three lines; the last one is set in the accent. */
  readonly title: MaskedHeading;
  readonly lead: string;
  readonly primaryCta: CallToAction;
  readonly secondaryCta: CallToAction;
  readonly reel: {
    readonly frames: readonly { readonly alt: string }[];
    readonly captionSuffix: string;
    readonly scrollCue: string;
  };
};

export type Stat = {
  readonly value: number;
  readonly suffix?: string;
  readonly label: string;
};

export type Service = {
  readonly title: string;
  readonly description: string;
};

export type ProcessStep = {
  readonly title: string;
  readonly description: string;
};

export type CaseStudy = {
  readonly id: CaseId;
  readonly meta: string;
  readonly title: string;
  readonly description: string;
  readonly metric: string;
  readonly imageAlt: string;
};

export type ClientLogo = {
  /** Rendered in full ink. */
  readonly name: string;
  /** Rendered at 45% ink, right after the name. */
  readonly suffix: string;
};

export type Testimonial = {
  readonly id: QuoteId;
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  readonly imageAlt: string;
};

export type Plan = {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
  /** The accent-filled card in the middle of the row. */
  readonly featured?: boolean;
};

export type TeamMember = {
  readonly id: TeamMemberId;
  readonly name: string;
  readonly role: string;
  readonly imageAlt: string;
};

export type Post = {
  readonly category: string;
  readonly title: string;
  readonly excerpt: string;
  readonly date: string;
};

export type FaqItem = {
  readonly question: string;
  readonly answer: string;
};

export type ContactFormContent = {
  readonly name: { readonly label: string; readonly placeholder: string };
  readonly email: { readonly label: string; readonly placeholder: string };
  readonly company: { readonly label: string; readonly placeholder: string };
  readonly subject: { readonly label: string; readonly options: readonly string[] };
  readonly message: { readonly label: string; readonly placeholder: string };
  readonly submit: string;
  readonly success: string;
};

/**
 * The 404 page. It carries no navigation copy of its own: every link out of it
 * is built from `nav`, so the landing page's sections and the 404's suggestions
 * cannot fall out of step.
 */
export type NotFoundContent = {
  /** `<title>` for the error document — the landing page's does not fit here. */
  readonly metaTitle: string;
  readonly eyebrow: string;
  /** Two lines; the last one is set in the accent, as in the hero. */
  readonly title: MaskedHeading;
  readonly lead: string;
  /** The status plate: the code, then one label per row beneath it. */
  readonly code: string;
  readonly statusLabel: string;
  readonly status: string;
  readonly pathLabel: string;
  /** Stands in for the address until the client has read `location`. */
  readonly pathFallback: string;
  readonly homeCta: string;
  readonly linksTitle: string;
};

export type Dictionary = {
  readonly metadata: {
    readonly title: string;
    readonly description: string;
    readonly ogTitle: string;
    readonly ogDescription: string;
    readonly ogTagline: string;
    readonly ogImageAlt: string;
    readonly keywords: readonly string[];
  };
  readonly nav: {
    readonly items: readonly NavItem[];
    readonly cta: CallToAction;
    readonly menuLabel: string;
    readonly closeLabel: string;
    /** Extra entry the full-screen menu shows that the desktop bar does not. */
    readonly contact: NavItem;
    readonly languageLabel: string;
  };
  readonly hero: HeroContent;
  readonly marquee: readonly string[];
  readonly stats: readonly Stat[];
  readonly services: SectionIntro & { readonly items: readonly Service[] };
  readonly process: SectionIntro & {
    readonly intro: string;
    readonly steps: readonly ProcessStep[];
  };
  readonly cases: SectionIntro & {
    readonly intro: string;
    readonly items: readonly CaseStudy[];
    readonly next: {
      readonly number: string;
      readonly kicker: string;
      readonly title: string;
      readonly description: string;
      readonly cta: CallToAction;
    };
  };
  readonly clients: SectionIntro & {
    readonly logos: readonly ClientLogo[];
    readonly note: string;
  };
  readonly testimonials: SectionIntro & { readonly items: readonly Testimonial[] };
  readonly plans: SectionIntro & { readonly items: readonly Plan[] };
  readonly about: SectionIntro & {
    readonly paragraphs: readonly string[];
    /** Label on the rule that opens the roster; the count beside it is derived. */
    readonly teamLabel: string;
    /** The link out of a portrait, for the members who have one. */
    readonly profile: {
      /** Printed in the caption. The destination is the same for everyone. */
      readonly label: string;
      /** Prefixed with the member's name to name the link for a screen reader. */
      readonly aria: string;
    };
    readonly team: readonly TeamMember[];
  };
  readonly insights: SectionIntro & {
    readonly aside: string;
    readonly posts: readonly Post[];
  };
  readonly faq: SectionIntro & { readonly items: readonly FaqItem[] };
  /**
   * The closing section. Its title is the page's parting statement — the copy
   * the standalone poster band used to carry before the two were merged.
   */
  readonly contact: SectionIntro & {
    readonly intro: string;
    readonly details: {
      readonly emailLabel: string;
      readonly linkedinLabel: string;
      readonly hoursLabel: string;
      readonly hours: string;
    };
    readonly form: ContactFormContent;
  };
  readonly notFound: NotFoundContent;
  readonly footer: {
    readonly copyright: string;
    readonly linkedin: string;
    readonly backToTop: string;
  };
};
