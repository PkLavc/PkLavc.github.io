(function () {
  'use strict';

  // Each position can be disabled, targeted by language/country/region, or rotated.
  // An empty list ([]) explicitly leaves the position without an ad.
  window.PKLAVC_BLOG_ADS = {
    geoEndpoint: 'https://api.pklavc.com/ads/geo',
    geoTimeoutMs: 1500,
    placements: {
      sidebar: { enabled: true, default: 'pklavc', countries: {}, regions: {}, locales: {} },
      inline: {
        enabled: true,
        default: ['pklavc', 'pklavc_projects'],
        countries: {},
        regions: {},
        locales: {},
        rotateEverySeconds: 15
      },
      bottom: { enabled: true, default: 'pklavc', countries: {}, regions: {}, locales: {} },
      mobile: { enabled: true, default: 'pklavc', countries: {}, regions: {}, locales: {} }
    },
    campaigns: {
      pklavc: {
        type: 'image',
        locales: {
          en: {
            image: '/ads/banners/en.svg',
            imageAlt: 'PKLAVC — backend systems, AI and automation',
            sidebar: { title: 'Explore the work behind the ideas', body: 'Backend, AI and automation projects built for real operations.', cta: 'See projects', href: '/projects/' },
            inline: { title: 'From article to architecture', body: 'See how these ideas become working systems and integrations.', cta: 'Explore projects', href: '/projects/' },
            bottom: { title: 'Build something reliable together', body: 'Explore the portfolio and the engineering approach behind it.', cta: 'Meet Patrick', href: '/about/' },
            mobile: { title: 'Backend and AI in practice', body: 'A compact look at projects, systems and automation.', cta: 'View projects', href: '/projects/' }
          },
          pt: {
            image: '/ads/banners/pt.svg',
            imageAlt: 'PKLAVC — sistemas backend, IA e automação',
            sidebar: { title: 'Conheça os projetos por trás das ideias', body: 'Backend, IA e automação construídos para operações reais.', cta: 'Ver projetos', href: '/pt/projetos/' },
            inline: { title: 'Do artigo para a arquitetura', body: 'Veja essas ideias em sistemas e integrações funcionais.', cta: 'Explorar projetos', href: '/pt/projetos/' },
            bottom: { title: 'Vamos construir algo confiável', body: 'Conheça o portfólio e a abordagem de engenharia por trás dele.', cta: 'Conhecer Patrick', href: '/pt/sobre/' },
            mobile: { title: 'Backend e IA na prática', body: 'Projetos, sistemas e automação em uma visita rápida.', cta: 'Ver projetos', href: '/pt/projetos/' }
          },
          es: {
            image: '/ads/banners/es.svg',
            imageAlt: 'PKLAVC — sistemas backend, IA y automatización',
            sidebar: { title: 'Explora los proyectos detrás de las ideas', body: 'Backend, IA y automatización para operaciones reales.', cta: 'Ver proyectos', href: '/es/proyectos/' },
            inline: { title: 'Del artículo a la arquitectura', body: 'Mira estas ideas en sistemas e integraciones funcionales.', cta: 'Explorar proyectos', href: '/es/proyectos/' },
            bottom: { title: 'Construyamos algo confiable', body: 'Conoce el portafolio y el enfoque de ingeniería detrás de él.', cta: 'Conocer a Patrick', href: '/es/sobre/' },
            mobile: { title: 'Backend e IA en la práctica', body: 'Proyectos, sistemas y automatización en una visita rápida.', cta: 'Ver proyectos', href: '/es/proyectos/' }
          }
        }
      },
      pklavc_projects: {
        type: 'image',
        locales: {
          en: {
            image: '/ads/banners/projects-en.svg',
            imageAlt: 'PKLAVC — real projects and practical engineering',
            inline: { title: 'See the engineering in action', body: 'Explore real projects, integrations and AI systems.', cta: 'Browse projects', href: '/projects/' }
          },
          pt: {
            image: '/ads/banners/projects-pt.svg',
            imageAlt: 'PKLAVC — projetos reais e engenharia prática',
            inline: { title: 'Veja a engenharia em ação', body: 'Explore projetos reais, integrações e sistemas de IA.', cta: 'Conhecer projetos', href: '/pt/projetos/' }
          },
          es: {
            image: '/ads/banners/projects-es.svg',
            imageAlt: 'PKLAVC — proyectos reales e ingeniería práctica',
            inline: { title: 'Mira la ingeniería en acción', body: 'Explora proyectos reales, integraciones y sistemas de IA.', cta: 'Ver proyectos', href: '/es/proyectos/' }
          }
        }
      }
    }
  };
}());
