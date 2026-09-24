# Anúncios dos posts

O build de GitHub Pages carrega `ads.css`, `config.js` e `ads.js` em todo post em `/blog/<slug>/`, `/pt/blog/<slug>/` e `/es/blog/<slug>/`, incluindo posts no formato `<slug>.html`. As três raízes do blog ficam fora. Os quatro espaços são `sidebar` (desktop), `inline` (dentro do artigo), `bottom` (após o artigo) e `mobile` (somente telas até 767 px).

Edite apenas [`config.js`](config.js) para trocar campanhas, destinos e imagens. A campanha `pklavc` atual contém uma peça para cada posição em inglês, português e espanhol; os SVGs estão em [`banners/`](banners/). A posição `inline` alterna a cada 15 segundos entre `pklavc` e `pklavc_projects`, demonstrando o rodízio. O idioma vem da URL do post. As peças próprias não carregam scripts de anúncios de terceiros.

## Posição, idioma, país e região

Cada posição (`sidebar`, `inline`, `bottom`, `mobile`) tem configuração independente. `enabled: false` desliga a posição inteira. Em `locales`, `en`, `pt` e `es` podem ter regras próprias; `false` desliga somente aquele idioma. Um valor pode ser um ID, uma lista de IDs ou `[]` para não exibir nada. Se uma regra selecionada estiver vazia, **não é criado contêiner nem espaço em branco**. Campanhas sem peça válida para o idioma e a posição também não geram contêiner.

O navegador consulta `https://api.pklavc.com/ads/geo`. O Worker devolve somente país e código da região, sem gravar a consulta. Se a consulta falhar ou a localização não estiver disponível, vale a regra `default`. A prioridade é: região do idioma (`BR-SP`), país do idioma (`BR`), padrão do idioma, região geral, país geral e padrão geral. Um `[]` explícito interrompe a busca e deixa a posição vazia:

```js
placements: {
  sidebar: {
    enabled: true,
    default: 'pklavc',
    countries: { BR: 'minha-campanha-br' },
    regions: { 'BR-SP': 'minha-campanha-sp' },
    locales: {
      pt: { default: ['pklavc', 'minha-campanha-pt'], rotateEverySeconds: 20 },
      es: false
    }
  },
  mobile: {
    enabled: true,
    default: 'pklavc',
    countries: { BR: [] }, // sem anúncio no celular para BR
    locales: { pt: { countries: { BR: 'minha-campanha-pt' } } }
  }
}
```

As campanhas regionais são opcionais. O exemplo publicado usa as mesmas regras para todos os países e escolhe imagem e texto pelo idioma do post.

## Rodízio

Use `default: ['campanha-a', 'campanha-b']` (ou uma lista em `countries`, `regions` ou `locales`) e `rotateEverySeconds: 15` na posição. O intervalo pode ser sobrescrito em cada idioma e deve ser de pelo menos 2 segundos. A troca só acontece enquanto o anúncio está visível, a aba está ativa e o usuário não está interagindo com ele. A próxima imagem é carregada antes da troca; se falhar, a peça atual permanece.

O rodízio automático é restrito a campanhas próprias do tipo `image`. AdSense, `iframe` e `custom` ficam estáticos mesmo quando aparecem em uma lista: a [política de posicionamento do AdSense](https://support.google.com/adsense/answer/1346295?hl=pt-BR) não permite atualizar automaticamente anúncios da página, e outras redes podem ter regras próprias. Para esses tipos, escolha uma campanha por posição/segmento e siga as regras do fornecedor.

## Tipos de campanha

- `image`: imagem PNG, GIF, WebP ou SVG, link, textos e CTA em `locales.en`, `locales.pt` e `locales.es`. Use `sidebar`, `inline`, `bottom` e `mobile` em cada idioma.
- `adsense`: `clientId: 'ca-pub-...'` e `slots: { sidebar: '...', inline: '...', bottom: '...', mobile: '...' }`. Os IDs de `ADSENSE_CLIENT_ID` e `ADSENSE_BLOG_SLOT_ID` do build continuam disponíveis como fallback, mas não ativam AdSense sozinhos. Para usar, associe o ID da campanha a uma posição.
- `iframe`: `sources: { default: 'https://...', sidebar: 'https://...' }`, com `title` e, se necessário, `sandbox`.
- `custom`: `scriptUrl: 'https://...'` opcional e `render(container, { placement, locale, geo })` para redes com integração própria. O script externo só carrega quando o espaço entra na tela.

Campanhas `adsense`, `iframe` e `custom` são inicializadas apenas quando ficam visíveis. URLs de anúncio devem ser HTTPS; links internos do site também funcionam em `http://localhost` durante desenvolvimento.
