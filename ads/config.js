(function () {
  'use strict';

  // Assign a campaign ID by region (BR-SP), country (BR), then default.
  // The sample campaign stays the same everywhere and changes its creative by page language.
  window.PKLAVC_BLOG_ADS = {
    geoEndpoint: 'https://api.pklavc.com/ads/geo',
    geoTimeoutMs: 1500,
    placements: {
      sidebar: { default: 'pklavc', countries: {}, regions: {} },
      inline: { default: 'pklavc', countries: {}, regions: {} },
      bottom: { default: 'pklavc', countries: {}, regions: {} },
      mobile: { default: 'pklavc', countries: {}, regions: {} }
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
      }
    }
  };
}());
