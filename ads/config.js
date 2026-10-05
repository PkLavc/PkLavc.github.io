(function () {
  'use strict';

  // Shared advertising configuration for blog articles and Store.
  // Rules can still be overridden by language, country or region.
  var rotationSeconds = 24;
  var campaigns = ['pklavc_blog', 'macca_blog', 'pklavc_store', 'pklavc_projects'];

  function rotatingPlacement(extra) {
    return Object.assign({
      enabled: true,
      default: campaigns.slice(),
      countries: {},
      regions: {},
      locales: {},
      rotateEverySeconds: rotationSeconds
    }, extra || {});
  }

  window.PKLAVC_BLOG_ADS = {
    geoEndpoint: 'https://api.pklavc.com/ads/geo',
    geoTimeoutMs: 1500,
    placements: {
      // Blog: Prime Video is fixed in-article and always appears first in the desktop sidebar.
      sidebar: rotatingPlacement({
        default: ['amazon_prime_video', 'shopee', 'pklavc_blog', 'macca_blog', 'pklavc_store', 'pklavc_projects']
      }),
      inline: rotatingPlacement({
        default: 'amazon_prime_video',
        rotateEverySeconds: 0
      }),
      // Blog home: a dedicated card is inserted between editorial cards.
      feed: rotatingPlacement({
        default: 'shopee',
        rotateEverySeconds: 0
      }),
      bottom: rotatingPlacement(),
      mobile: rotatingPlacement(),

      // Store: Prime Video is fixed between product rows and in the final ad slot.
      'store-sidebar': rotatingPlacement({
        default: ['amazon_prime_video', 'pklavc_blog', 'macca_blog', 'pklavc_store', 'pklavc_projects']
      }),
      'store-rows': rotatingPlacement({
        default: 'amazon_prime_video',
        everyRows: 10,
        rotateEverySeconds: 0
      }),
      'store-bottom': rotatingPlacement({
        default: 'amazon_prime_video',
        rotateEverySeconds: 0
      })
    },
    campaigns: {
      amazon_prime_video: {
        type: 'image',
        style: 'prime-video',
        brandLogo: '/ads/banners/amazon-logo.png',
        brandLogoAlt: 'Amazon',
        lineupImage: '/ads/banners/prime-video-lineup.jpg',
        locales: {
          en: {
            image: '/ads/banners/prime-video-en-v2.svg',
            imageAlt: 'Prime Video 30-day free trial for eligible new subscribers',
            sidebar: { title: '30 days free with Prime Video', body: 'For eligible new subscribers. Terms apply.', cta: 'Start free trial', href: 'https://kdbov.com/g/6osk6x1ky42fa9b296a4ce4f0d0bb0/' },
            inline: { title: 'Try Prime Video free for 30 days', body: 'For eligible new subscribers. Terms apply.', cta: 'Start free trial', href: 'https://kdbov.com/g/6osk6x1ky42fa9b296a4ce4f0d0bb0/' },
            bottom: { title: '30 days free with Prime Video', body: 'For eligible new subscribers. Terms apply.', cta: 'Start free trial', href: 'https://kdbov.com/g/6osk6x1ky42fa9b296a4ce4f0d0bb0/' },
            mobile: { title: 'Prime Video — 30 days free', body: 'Eligible new subscribers. Terms apply.', cta: 'Try free', href: 'https://kdbov.com/g/6osk6x1ky42fa9b296a4ce4f0d0bb0/' }
          },
          pt: {
            image: '/ads/banners/prime-video-pt-v2.svg',
            imageAlt: 'Prime Video com teste grátis de 30 dias para novos assinantes elegíveis',
            sidebar: { title: '30 dias grátis de Prime Video', body: 'Para novos assinantes elegíveis. Termos se aplicam.', cta: 'Experimentar grátis', href: 'https://kdbov.com/g/6osk6x1ky42fa9b296a4ce4f0d0bb0/' },
            inline: { title: 'Experimente Prime Video grátis por 30 dias', body: 'Para novos assinantes elegíveis. Termos se aplicam.', cta: 'Experimentar grátis', href: 'https://kdbov.com/g/6osk6x1ky42fa9b296a4ce4f0d0bb0/' },
            bottom: { title: '30 dias grátis de Prime Video', body: 'Para novos assinantes elegíveis. Termos se aplicam.', cta: 'Experimentar grátis', href: 'https://kdbov.com/g/6osk6x1ky42fa9b296a4ce4f0d0bb0/' },
            mobile: { title: 'Prime Video — 30 dias grátis', body: 'Novos assinantes elegíveis. Termos se aplicam.', cta: 'Testar grátis', href: 'https://kdbov.com/g/6osk6x1ky42fa9b296a4ce4f0d0bb0/' }
          },
          es: {
            image: '/ads/banners/prime-video-es-v2.svg',
            imageAlt: 'Prime Video con prueba gratis de 30 días para nuevos suscriptores elegibles',
            sidebar: { title: '30 días gratis de Prime Video', body: 'Para nuevos suscriptores elegibles. Se aplican términos.', cta: 'Probar gratis', href: 'https://kdbov.com/g/6osk6x1ky42fa9b296a4ce4f0d0bb0/' },
            inline: { title: 'Prueba Prime Video gratis durante 30 días', body: 'Para nuevos suscriptores elegibles. Se aplican términos.', cta: 'Probar gratis', href: 'https://kdbov.com/g/6osk6x1ky42fa9b296a4ce4f0d0bb0/' },
            bottom: { title: '30 días gratis de Prime Video', body: 'Para nuevos suscriptores elegibles. Se aplican términos.', cta: 'Probar gratis', href: 'https://kdbov.com/g/6osk6x1ky42fa9b296a4ce4f0d0bb0/' },
            mobile: { title: 'Prime Video — 30 días gratis', body: 'Nuevos suscriptores elegibles. Se aplican términos.', cta: 'Probar gratis', href: 'https://kdbov.com/g/6osk6x1ky42fa9b296a4ce4f0d0bb0/' }
          }
        }
      },

      shopee: {
        type: 'image',
        style: 'shopee',
        locales: {
          en: {
            imageAlt: 'Shopee offers',
            sidebar: { title: 'Shopee deals worth a look', body: 'Tech, home and everyday finds at Shopee.', cta: 'See the offers', href: 'https://xqjeo.com/c/knlhlz71ux2fa9b296a404f147125c/' },
            inline: { title: 'Featured offers at Shopee', body: 'Explore products across tech, home and more.', cta: 'See the offers', href: 'https://xqjeo.com/c/knlhlz71ux2fa9b296a404f147125c/' },
            feed: { title: 'Featured offers at Shopee', body: 'Explore products across tech, home and more.', cta: 'Shop Shopee offers', href: 'https://xqjeo.com/c/knlhlz71ux2fa9b296a404f147125c/' }
          },
          pt: {
            imageAlt: 'Ofertas da Shopee',
            sidebar: { title: 'Achados e ofertas na Shopee', body: 'Tecnologia, casa e produtos para o dia a dia.', cta: 'Conferir ofertas', href: 'https://xqjeo.com/c/knlhlz71ux2fa9b296a404f147125c/' },
            inline: { title: 'Ofertas e achados da Shopee', body: 'Produtos de tecnologia, casa e muito mais.', cta: 'Ver ofertas', href: 'https://xqjeo.com/c/knlhlz71ux2fa9b296a404f147125c/' },
            feed: { title: 'OFERTAS E ACHADOS NA SHOPEE', body: 'Produtos de tecnologia, casa e muito mais.', cta: 'Ver ofertas Shopee', href: 'https://xqjeo.com/c/knlhlz71ux2fa9b296a404f147125c/' }
          },
          es: {
            imageAlt: 'Ofertas de Shopee',
            sidebar: { title: 'Ofertas destacadas de Shopee', body: 'Tecnologia, hogar y productos para cada dia.', cta: 'Ver ofertas', href: 'https://xqjeo.com/c/knlhlz71ux2fa9b296a404f147125c/' },
            inline: { title: 'Ofertas y hallazgos de Shopee', body: 'Productos de tecnologia, hogar y mucho mas.', cta: 'Ver ofertas', href: 'https://xqjeo.com/c/knlhlz71ux2fa9b296a404f147125c/' },
            feed: { title: 'OFERTAS DESTACADAS DE SHOPEE', body: 'Productos de tecnologia, hogar y mucho mas.', cta: 'Ver ofertas Shopee', href: 'https://xqjeo.com/c/knlhlz71ux2fa9b296a404f147125c/' }
          }
        }
      },

      pklavc_blog: {
        type: 'image',
        style: 'pklavc-blog',
        locales: {
          en: {
            image: '/ads/banners/blog-en.svg',
            imageAlt: 'PKLAVC engineering blog',
            sidebar: { title: 'Read the PKLAVC Blog', body: 'Verified engineering notes on backend systems, AI, automation and major platform changes.', cta: 'Open blog', href: '/blog/en/' },
            inline: { title: 'More engineering notes', body: 'Continue with technical articles focused on practical systems and confirmed releases.', cta: 'Read the blog', href: '/blog/en/' },
            bottom: { title: 'Continue reading PKLAVC', body: 'Browse the latest engineering articles and technical breakdowns.', cta: 'Open blog', href: '/blog/en/' },
            mobile: { title: 'PKLAVC Blog', body: 'Engineering, backend, AI and automation articles.', cta: 'Read', href: '/blog/en/' }
          },
          pt: {
            image: '/ads/banners/blog-pt.svg',
            imageAlt: 'Blog de engenharia PKLAVC',
            sidebar: { title: 'Leia o Blog PKLAVC', body: 'Conteúdo técnico verificado sobre backend, IA, automação e mudanças de grandes plataformas.', cta: 'Abrir blog', href: '/blog/pt/' },
            inline: { title: 'Mais conteúdo de engenharia', body: 'Continue com artigos técnicos focados em sistemas práticos e lançamentos confirmados.', cta: 'Ler o blog', href: '/blog/pt/' },
            bottom: { title: 'Continue lendo o PKLAVC', body: 'Veja os artigos mais recentes e análises técnicas.', cta: 'Abrir blog', href: '/blog/pt/' },
            mobile: { title: 'Blog PKLAVC', body: 'Engenharia, backend, IA e automação.', cta: 'Ler', href: '/blog/pt/' }
          },
          es: {
            image: '/ads/banners/blog-es.svg',
            imageAlt: 'Blog de ingeniería PKLAVC',
            sidebar: { title: 'Lee el Blog PKLAVC', body: 'Contenido técnico verificado sobre backend, IA, automatización y cambios de grandes plataformas.', cta: 'Abrir blog', href: '/blog/es/' },
            inline: { title: 'Más contenido de ingeniería', body: 'Continúa con artículos técnicos sobre sistemas prácticos y lanzamientos confirmados.', cta: 'Leer el blog', href: '/blog/es/' },
            bottom: { title: 'Sigue leyendo PKLAVC', body: 'Explora los artículos más recientes y análisis técnicos.', cta: 'Abrir blog', href: '/blog/es/' },
            mobile: { title: 'Blog PKLAVC', body: 'Ingeniería, backend, IA y automatización.', cta: 'Leer', href: '/blog/es/' }
          }
        }
      },

      macca_blog: {
        type: 'image',
        style: 'macca',
        locales: {
          en: {
            image: 'https://macca-lab.onrender.com/ads/partner.webp?v=32b22c8aaa',
            imageAlt: 'Macca the Gator partner artwork',
            sidebar: { title: 'Visit the Macca Blog', body: 'GTA and Rockstar coverage from Macca the Gator.', cta: 'Open Macca Blog', href: 'https://macca-lab.onrender.com/blog/' },
            inline: { title: 'More GTA and Rockstar coverage', body: 'Continue on the Macca Blog for GTA, Rockstar and community stories.', cta: 'Visit Macca', href: 'https://macca-lab.onrender.com/blog/' },
            bottom: { title: 'Macca the Gator', body: 'Explore the Macca Blog for GTA and Rockstar coverage.', cta: 'Open blog', href: 'https://macca-lab.onrender.com/blog/' },
            mobile: { title: 'Macca Blog', body: 'GTA and Rockstar coverage.', cta: 'Visit', href: 'https://macca-lab.onrender.com/blog/' }
          },
          pt: {
            image: 'https://macca-lab.onrender.com/ads/partner.webp?v=32b22c8aaa',
            imageAlt: 'Arte de parceria do Macca the Gator',
            sidebar: { title: 'Visite o Macca Blog', body: 'Cobertura de GTA e Rockstar com o Macca the Gator.', cta: 'Abrir Macca Blog', href: 'https://macca-lab.onrender.com/blog/' },
            inline: { title: 'Mais sobre GTA e Rockstar', body: 'Continue no Macca Blog com conteúdo sobre GTA, Rockstar e comunidade.', cta: 'Visitar Macca', href: 'https://macca-lab.onrender.com/blog/' },
            bottom: { title: 'Macca the Gator', body: 'Explore o Macca Blog para acompanhar GTA e Rockstar.', cta: 'Abrir blog', href: 'https://macca-lab.onrender.com/blog/' },
            mobile: { title: 'Macca Blog', body: 'Conteúdo sobre GTA e Rockstar.', cta: 'Visitar', href: 'https://macca-lab.onrender.com/blog/' }
          },
          es: {
            image: 'https://macca-lab.onrender.com/ads/partner.webp?v=32b22c8aaa',
            imageAlt: 'Arte de colaboración de Macca the Gator',
            sidebar: { title: 'Visita el Macca Blog', body: 'Cobertura de GTA y Rockstar con Macca the Gator.', cta: 'Abrir Macca Blog', href: 'https://macca-lab.onrender.com/blog/' },
            inline: { title: 'Más sobre GTA y Rockstar', body: 'Continúa en Macca Blog con contenido sobre GTA, Rockstar y la comunidad.', cta: 'Visitar Macca', href: 'https://macca-lab.onrender.com/blog/' },
            bottom: { title: 'Macca the Gator', body: 'Explora Macca Blog para seguir GTA y Rockstar.', cta: 'Abrir blog', href: 'https://macca-lab.onrender.com/blog/' },
            mobile: { title: 'Macca Blog', body: 'Contenido sobre GTA y Rockstar.', cta: 'Visitar', href: 'https://macca-lab.onrender.com/blog/' }
          }
        }
      },

      pklavc_store: {
        type: 'image',
        style: 'pklavc-store',
        locales: {
          en: {
            image: '/ads/banners/store-en.svg',
            imageAlt: 'PKLAVC Store',
            sidebar: { title: 'Browse the PKLAVC Store', body: 'Selected technology, gaming and partner products in one place.', cta: 'Open Store', href: '/store/' },
            inline: { title: 'Discover the PKLAVC Store', body: 'Browse selected products and current partner offers.', cta: 'Shop now', href: '/store/' },
            bottom: { title: 'Continue to the Store', body: 'See selected technology and gaming products.', cta: 'Open Store', href: '/store/' },
            mobile: { title: 'PKLAVC Store', body: 'Selected tech and gaming products.', cta: 'Open', href: '/store/' }
          },
          pt: {
            image: '/ads/banners/store-pt.svg',
            imageAlt: 'Loja PKLAVC',
            sidebar: { title: 'Conheça a Loja PKLAVC', body: 'Tecnologia, games e produtos selecionados de lojas parceiras.', cta: 'Abrir loja', href: '/store/pt/' },
            inline: { title: 'Explore a Loja PKLAVC', body: 'Veja produtos selecionados e ofertas atuais de parceiros.', cta: 'Ver loja', href: '/store/pt/' },
            bottom: { title: 'Continue para a Loja', body: 'Confira produtos selecionados de tecnologia e games.', cta: 'Abrir loja', href: '/store/pt/' },
            mobile: { title: 'Loja PKLAVC', body: 'Tecnologia e games selecionados.', cta: 'Abrir', href: '/store/pt/' }
          },
          es: {
            image: '/ads/banners/store-es.svg',
            imageAlt: 'Tienda PKLAVC',
            sidebar: { title: 'Conoce la Tienda PKLAVC', body: 'Tecnología, gaming y productos seleccionados de tiendas asociadas.', cta: 'Abrir tienda', href: '/store/es/' },
            inline: { title: 'Explora la Tienda PKLAVC', body: 'Mira productos seleccionados y ofertas actuales de socios.', cta: 'Ver tienda', href: '/store/es/' },
            bottom: { title: 'Continúa a la Tienda', body: 'Descubre productos seleccionados de tecnología y gaming.', cta: 'Abrir tienda', href: '/store/es/' },
            mobile: { title: 'Tienda PKLAVC', body: 'Tecnología y gaming seleccionados.', cta: 'Abrir', href: '/store/es/' }
          }
        }
      },

      pklavc_projects: {
        type: 'image',
        style: 'pklavc-projects',
        locales: {
          en: {
            image: '/ads/banners/projects-en.svg',
            imageAlt: 'PKLAVC real projects and practical engineering',
            sidebar: { title: 'Explore PKLAVC Projects', body: 'Backend systems, integrations, automation and AI built for real use.', cta: 'View projects', href: '/projects/' },
            inline: { title: 'See the engineering in action', body: 'Explore real projects, integrations and AI systems.', cta: 'Browse projects', href: '/projects/' },
            bottom: { title: 'From article to working systems', body: 'Browse implementations behind the engineering notes.', cta: 'View projects', href: '/projects/' },
            mobile: { title: 'PKLAVC Projects', body: 'Backend, AI and automation in practice.', cta: 'View', href: '/projects/' }
          },
          pt: {
            image: '/ads/banners/projects-pt.svg',
            imageAlt: 'Projetos reais e engenharia prática no PKLAVC',
            sidebar: { title: 'Explore os Projetos PKLAVC', body: 'Backend, integrações, automação e IA construídos para uso real.', cta: 'Ver projetos', href: '/pt/projetos/' },
            inline: { title: 'Veja a engenharia em ação', body: 'Explore projetos reais, integrações e sistemas de IA.', cta: 'Conhecer projetos', href: '/pt/projetos/' },
            bottom: { title: 'Do artigo para sistemas reais', body: 'Veja as implementações por trás do conteúdo técnico.', cta: 'Ver projetos', href: '/pt/projetos/' },
            mobile: { title: 'Projetos PKLAVC', body: 'Backend, IA e automação na prática.', cta: 'Ver', href: '/pt/projetos/' }
          },
          es: {
            image: '/ads/banners/projects-es.svg',
            imageAlt: 'Proyectos reales e ingeniería práctica en PKLAVC',
            sidebar: { title: 'Explora los Proyectos PKLAVC', body: 'Backend, integraciones, automatización e IA para uso real.', cta: 'Ver proyectos', href: '/es/proyectos/' },
            inline: { title: 'Mira la ingeniería en acción', body: 'Explora proyectos reales, integraciones y sistemas de IA.', cta: 'Ver proyectos', href: '/es/proyectos/' },
            bottom: { title: 'Del artículo a sistemas reales', body: 'Mira las implementaciones detrás del contenido técnico.', cta: 'Ver proyectos', href: '/es/proyectos/' },
            mobile: { title: 'Proyectos PKLAVC', body: 'Backend, IA y automatización en práctica.', cta: 'Ver', href: '/es/proyectos/' }
          }
        }
      }
    }
  };
}());
