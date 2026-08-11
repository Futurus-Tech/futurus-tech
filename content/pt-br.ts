import { siteConfig } from "@/lib/site";
import type { Dictionary } from "./types";

/**
 * Portuguese (pt-BR) copy, transcribed from design/Futurus Tech.dc.html.
 * The technology marquee is intentionally identical in every locale,
 * because the design leaves those terms untranslated.
 */
export const ptBR = {
  metadata: {
    title: "Futurus Tech · Consultoria de software e engenharia de produto",
    description:
      "Projetamos, construímos e mantemos software junto com quem vai conviver com ele. Sem intermediários, sem lock-in: o código, as decisões e a documentação são seus desde o primeiro dia.",
    ogTitle: "Software que sustenta o peso do seu negócio.",
    ogDescription:
      "Consultoria de software e engenharia de produto. Conte o problema e respondemos em 24 horas.",
    ogTagline: "Consultoria de software · Engenharia de produto",
    ogImageAlt:
      "Futurus Tech: software que sustenta o peso do seu negócio. Consultoria de software e engenharia de produto.",
    keywords: [
      "consultoria de software",
      "engenharia de produto",
      "desenvolvimento web",
      "apps mobile",
      "arquitetura de software",
      "cloud e devops",
      "dados e BI",
    ],
  },

  nav: {
    items: [
      { href: "#servicos", label: "Serviços" },
      { href: "#processo", label: "Processo" },
      { href: "#cases", label: "Cases" },
      { href: "#clientes", label: "Clientes" },
      { href: "#sobre", label: "Sobre" },
    ],
    cta: { href: "#contato", label: "Fale com a gente" },
    menuLabel: "Menu",
    closeLabel: "Fechar",
    contact: { href: "#contato", label: "Contato" },
    languageLabel: "Ver em inglês",
  },

  hero: {
    eyebrow: "Consultoria de software · Engenharia de produto",
    title: ["Software que", "sustenta o peso", "do seu negócio."],
    lead: "Somos um time pequeno de engenheiros que projeta, constrói e mantém software junto com quem vai conviver com ele. Sem camadas de intermediários, sem lock-in: o código, as decisões e a documentação são seus desde o primeiro dia.",
    primaryCta: { href: "#contato", label: "Começar um projeto" },
    secondaryCta: { href: "#cases", label: "Ver nosso trabalho" },
    reel: {
      frames: [
        { alt: "Time da Futurus Tech trabalhando junto" },
        { alt: "Tela de um produto em desenvolvimento" },
        { alt: "Reunião com cliente" },
      ],
      captionSuffix: "/ 03 · Futurus Tech",
      scrollCue: "Role",
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
    { value: 38, label: "Projetos entregues desde 2021" },
    { value: 100, suffix: "%", label: "Do código no seu repositório, sem lock-in" },
    { value: 12, label: "Clientes ativos neste momento" },
    { value: 24, suffix: "h", label: "Para responder qualquer mensagem sua" },
  ],

  services: {
    eyebrow: "Serviços",
    title: ["Nove frentes para", "entrar no problema com você."],
    items: [
      {
        title: "Desenvolvimento web",
        description:
          "Aplicações, portais e sistemas internos feitos para serem lidos por quem vier depois: tipados, testados e com deploy contínuo.",
      },
      {
        title: "Apps mobile",
        description:
          "iOS e Android a partir de uma base de código quando faz sentido, nativo quando não faz. Publicação nas lojas incluída.",
      },
      {
        title: "Consultoria e arquitetura",
        description:
          "Lemos o que você já tem, nomeamos o gargalo real e escrevemos um plano que seu time consegue executar sem nós.",
      },
      {
        title: "Integrações e APIs",
        description:
          "Gateways de pagamento, ERPs, sistemas legados e terceiros conversando entre si, com contratos, retries e observabilidade.",
      },
      {
        title: "Cloud e DevOps",
        description:
          "Infraestrutura como código, pipelines, monitoramento e revisão de custos. Infraestrutura sem surpresa é o objetivo.",
      },
      {
        title: "Dados e BI",
        description:
          "Pipelines, data warehouse e dashboards que respondem a pergunta que alguém realmente fez na reunião.",
      },
      {
        title: "IA e automação",
        description:
          "Modelos de linguagem e automações aplicados onde tiram horas reais de trabalho, não onde ficam bonitos no slide.",
      },
      {
        title: "UX/UI design",
        description:
          "Fluxos, interface e design system construídos junto com quem desenvolve, para que o desenhado seja o entregue.",
      },
      {
        title: "Sustentação e suporte",
        description:
          "Alguém de plantão que conhece o sistema, com tempo de resposta acordado e um relatório mensal que dá para ler.",
      },
    ],
  },

  process: {
    eyebrow: "Processo",
    title: ["Quatro etapas, e", "você acompanha todas."],
    intro:
      "Demonstração semanal, quadro aberto e acesso direto a quem está escrevendo o código. Você nunca vai precisar perguntar como está o projeto.",
    steps: [
      {
        title: "Escuta",
        description:
          "Uma conversa para entender a operação, não a lista de desejos. Saímos dela com o problema escrito nas suas palavras e uma primeira noção de tamanho.",
      },
      {
        title: "Desenho",
        description:
          "Escopo, arquitetura e telas na mesa antes de alguém escrever código de produção. É aqui que cortamos o que não é necessário.",
      },
      {
        title: "Construção",
        description:
          "Ciclos curtos com algo funcionando no fim de cada um. Você testa na mesma semana em que foi construído.",
      },
      {
        title: "Entrega e cuidado",
        description:
          "Deploy, documentação e um repasse com o seu time. Se quiser que a gente fique na sustentação, ficamos; se não, tudo está na sua mão.",
      },
    ],
  },

  cases: {
    eyebrow: "Cases e projetos",
    title: ["Seis problemas resolvidos,", "seis operações mais leves."],
    intro:
      "Cada um deles começou com uma conversa sem compromisso. Abaixo: o problema, o que construímos e o que mudou depois.",
    items: [
      {
        id: "kairo-bank",
        meta: "Kairo Bank · Fintech · 2025",
        title: "Abertura de conta em 4 minutos",
        description:
          "Substituímos um onboarding de três dias por um fluxo com validação de documentos em tempo real e fila de análise só para exceções.",
        metric: "3 dias → 4 min",
        imageAlt: "Kairo Bank: abertura de conta digital",
      },
      {
        id: "meridian-log",
        meta: "Meridian Log · Logística · 2025",
        title: "Torre de controle para 1.200 rotas por dia",
        description:
          "Um painel único que junta telemetria, ocorrências e custo por entrega, com alerta antes de a rota atrasar.",
        metric: "−31% custo por entrega",
        imageAlt: "Meridian Log: torre de controle logística",
      },
      {
        id: "orbita-saude",
        meta: "Órbita Saúde · Healthtech · 2024",
        title: "Prontuário que o médico usa sem reclamar",
        description:
          "Redesenhamos o fluxo de atendimento em cima do que a equipe clínica já fazia no papel, e cortamos metade dos campos obrigatórios.",
        metric: "8 min por consulta",
        imageAlt: "Órbita Saúde: prontuário eletrônico",
      },
      {
        id: "cerrado-agro",
        meta: "Cerrado Agro · Agronegócio · 2024",
        title: "42 fazendas em um só painel",
        description:
          "Pipeline de dados que consolida colheita, clima e maquinário; o fechamento mensal deixou de ser uma planilha por unidade.",
        metric: "Fechamento em 1 dia",
        imageAlt: "Cerrado Agro: painel de dados agrícolas",
      },
      {
        id: "vallar-energia",
        meta: "Vallar Energia · Energia · 2024",
        title: "Seis sistemas legados falando a mesma língua",
        description:
          "Camada de integração com contratos versionados, reprocessamento automático e observabilidade de ponta a ponta.",
        metric: "Zero downtime na migração",
        imageAlt: "Vallar Energia: integração de sistemas legados",
      },
      {
        id: "tenda-digital",
        meta: "Tenda Digital · Varejo · 2023",
        title: "Fidelidade com 90 mil usuários ativos",
        description:
          "App de clube de vantagens integrado ao PDV das 74 lojas, com cupom validado no caixa em menos de um segundo.",
        metric: "+22% de recompra",
        imageAlt: "Tenda Digital: app de fidelidade no varejo",
      },
    ],
    next: {
      number: "07",
      kicker: "Próximo case",
      title: "O seu, se você quiser",
      description: "Conte o problema e voltamos com escopo, prazo e preço, sem compromisso.",
      cta: { href: "#contato", label: "Falar com a gente" },
    },
  },

  clients: {
    eyebrow: "Clientes",
    title: ["Times que confiaram", "a operação para nós."],
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
    note: "Alguns dos times com quem trabalhamos nos últimos anos, entre fintech, logística, saúde, agronegócio, energia e varejo.",
  },

  testimonials: {
    eyebrow: "Depoimentos",
    title: ["O que diz quem", "trabalhou com a gente."],
    items: [
      {
        id: "marina-alcantara",
        quote:
          "Chegamos com um projeto travado há oito meses. Em duas semanas tínhamos protótipo navegável e em dois meses a primeira versão em produção. O time entrou na nossa rotina como se fosse nosso.",
        author: "Marina Alcântara",
        role: "Head de Produto · Kairo Bank",
        imageAlt: "Marina Alcântara",
      },
      {
        id: "rafael-duarte",
        quote:
          "O que mais me surpreendeu foi a clareza. Toda sexta eu sabia o que tinha sido feito, o que faltava e quanto custava. Nunca precisei cobrar relatório.",
        author: "Rafael Duarte",
        role: "Diretor de Operações · Meridian Log",
        imageAlt: "Rafael Duarte",
      },
      {
        id: "helena-prado",
        quote:
          "Eles recusaram metade do que pedimos e explicaram por quê. O sistema ficou menor, mais simples, e a equipe clínica adotou sem treinamento.",
        author: "Dra. Helena Prado",
        role: "Superintendente · Órbita Saúde",
        imageAlt: "Dra. Helena Prado",
      },
    ],
  },

  plans: {
    eyebrow: "Formas de trabalhar juntos",
    title: ["Três formatos. Escolha", "o que caber no momento."],
    items: [
      {
        label: "Formato 01",
        title: "Sprint de descoberta",
        description:
          "Duas a três semanas para transformar uma ideia ou uma bagunça em escopo, arquitetura e estimativa. Termina com um documento, não com uma promessa.",
        features: ["Diagnóstico técnico", "Protótipo navegável", "Roadmap e custo"],
      },
      {
        label: "Formato 02 · mais comum",
        title: "Squad dedicado",
        description:
          "Um time plugado na sua operação por um período definido: design, desenvolvimento e infraestrutura em ciclos semanais, com demonstração toda sexta.",
        features: [
          "Entrega semanal",
          "Quadro e repositório abertos",
          "Canal direto com os engenheiros",
        ],
        featured: true,
      },
      {
        label: "Formato 03",
        title: "Consultoria pontual",
        description:
          "Horas por mês para revisão de código, decisões de arquitetura, apoio em contratação ou uma segunda opinião antes de um passo grande.",
        features: ["Revisão de código e infra", "Mentoria técnica", "Sem contrato mínimo"],
      },
    ],
  },

  about: {
    eyebrow: "Sobre nós",
    title: ["Um time pequeno,", "de propósito."],
    paragraphs: [
      "A Futurus Tech nasceu de uma frustração simples: projetos de software bons falham menos por falta de tecnologia e mais por falta de conversa. Então trabalhamos perto: poucos clientes por vez, as mesmas pessoas do primeiro contato até a entrega.",
      "Atendemos startups buscando um MVP, empresas médias modernizando o que já roda, grandes empresas que precisam de mãos com critério, parceiros white-label e equipes do setor público.",
    ],
    teamLabel: "Quem faz",
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
        role: "Desenvolvedor Front-End",
        imageAlt: "Fábio Júnior",
      },
      {
        id: "gabriel-hermenegildo",
        name: "Gabriel Hermenegildo",
        role: "Desenvolvedor Mobile",
        imageAlt: "Gabriel Hermenegildo",
      },
      {
        id: "guido-sanchis",
        name: "Guido Sanchis",
        role: "Desenvolvedor Back-End",
        imageAlt: "Guido Sanchis",
      },
      {
        id: "rafael-ruddy",
        name: "Rafael Ruddy",
        role: "Desenvolvedor Full-Stack",
        imageAlt: "Rafael Ruddy",
      },
    ],
  },

  insights: {
    eyebrow: "Insights",
    title: ["O que aprendemos,", "escrito aqui."],
    aside: "Três textos recentes",
    posts: [
      {
        category: "Arquitetura",
        title: "Quando um monolito ainda é a resposta certa",
        excerpt:
          "Três projetos em que quebrar tudo em serviços custaria seis meses e não resolveria nada.",
        date: "12 mar 2026",
      },
      {
        category: "Processo",
        title: "Estimar sem mentir para si mesmo",
        excerpt:
          "Como transformamos “uns dois meses” em um número que a diretoria consegue aprovar.",
        date: "04 fev 2026",
      },
      {
        category: "IA",
        title: "Automação que sobrevive ao segundo mês",
        excerpt: "O que separa um piloto bonito de um processo que ninguém desliga depois.",
        date: "21 jan 2026",
      },
    ],
  },

  faq: {
    eyebrow: "Dúvidas",
    title: ["As perguntas que", "mais escutamos."],
    items: [
      {
        question: "Quanto custa um projeto?",
        answer:
          "Depende do escopo, e só orçamos depois de entendê-lo. O sprint de descoberta existe justamente para isso: tem preço fechado e termina com um número que você pode levar para a diretoria.",
      },
      {
        question: "Vocês ainda não têm cases. Por que contratar?",
        answer:
          "Porque preferimos mostrar nossa engenharia a um portfólio. Podemos abrir nosso código, nossa infraestrutura e nossas decisões, e começar por um escopo pequeno e pago para você nos julgar pelo trabalho.",
      },
      {
        question: "De quem é o código?",
        answer:
          "Seu. O repositório fica na sua organização desde o primeiro commit, e as contas de infraestrutura também.",
      },
      {
        question: "Vocês trabalham junto com o nosso time?",
        answer:
          "Com frequência, sim: nos mesmos rituais, no mesmo quadro e no mesmo repositório. Parte do trabalho é deixar seu time capaz de seguir sem nós.",
      },
      {
        question: "Em quanto tempo algo entra no ar?",
        answer:
          "Duas semanas para um protótipo navegável, e normalmente de seis a doze para uma primeira versão em produção, dependendo de integrações e aprovações do seu lado.",
      },
    ],
  },

  contact: {
    eyebrow: "Contato",
    title: ["Conte o problema.", "Respondemos em 24 horas."],
    intro:
      "Não tem roteiro comercial do outro lado: a mensagem vai direto para quem trabalharia no seu projeto.",
    details: {
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      hoursLabel: "Horário",
      hours: "Seg–Sex, 9h–19h (BRT)",
    },
    form: {
      name: { label: "Nome", placeholder: "Como podemos te chamar" },
      email: { label: "Email", placeholder: "voce@empresa.com" },
      company: { label: "Empresa", placeholder: "Opcional" },
      subject: {
        label: "O que você precisa",
        options: [
          "Produto novo / MVP",
          "Modernizar sistema existente",
          "Consultoria / arquitetura",
          "Sustentação e suporte",
          "Outro assunto",
        ],
      },
      message: {
        label: "Mensagem",
        placeholder: "Conte o contexto, o prazo e o que já existe hoje.",
      },
      submit: "Enviar mensagem",
      success: "Obrigado, respondemos em até 24 horas.",
    },
  },

  notFound: {
    metaTitle: `Página não encontrada · ${siteConfig.name}`,
    eyebrow: "Erro 404",
    title: ["Esta página", "não existe."],
    lead: "O endereço que você abriu não corresponde a nenhuma página do site. Pode ser um link antigo, um erro de digitação, ou algo que nunca esteve aqui. O resto do site continua no lugar.",
    code: "404",
    statusLabel: "Status",
    status: "Not Found",
    pathLabel: "Endereço",
    pathFallback: "Indisponível",
    homeCta: "Voltar ao início",
    linksTitle: "Talvez você procure",
  },

  footer: {
    copyright: `© 2026 ${siteConfig.name} · consultoria de software e engenharia de produto.`,
    linkedin: "LinkedIn",
    backToTop: "Voltar ao topo",
  },
} as const satisfies Dictionary;
