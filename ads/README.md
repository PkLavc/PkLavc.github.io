# Anúncios dos posts

O build de GitHub Pages carrega `ads.css`, `config.js` e `ads.js` em todo post em `/blog/<slug>/`, `/pt/blog/<slug>/` e `/es/blog/<slug>/`, incluindo posts no formato `<slug>.html`. As três raízes do blog ficam fora. Os quatro espaços são `sidebar` (desktop), `inline` (dentro do artigo), `bottom` (após o artigo) e `mobile` (somente telas até 767 px).

Edite apenas [`config.js`](config.js) para trocar campanhas, destinos e imagens. A campanha `pklavc` atual contém uma peça para cada posição em inglês, português e espanhol; os SVGs estão em [`banners/`](banners/). O idioma vem da URL do post. As peças próprias não carregam scripts de anúncios de terceiros.

## País e região

O navegador consulta `https://api.pklavc.com/ads/geo`. O Worker devolve somente país e código da região, sem gravar a consulta. Se a consulta falhar ou a localização não estiver disponível, vale `default`. A prioridade de escolha é `regions` (`BR-SP`), depois `countries` (`BR`), depois `default`:

```js
placements: {
  sidebar: {
    default: 'pklavc',
    countries: { BR: 'minha-campanha-br' },
    regions: { 'BR-SP': 'minha-campanha-sp' }
  }
}
```

As campanhas regionais são opcionais. O exemplo publicado usa `pklavc` para todos os países e escolhe imagem e texto pelo idioma do post.

## Tipos de campanha

- `image`: imagem PNG, GIF, WebP ou SVG, link, textos e CTA em `locales.en`, `locales.pt` e `locales.es`. Use `sidebar`, `inline`, `bottom` e `mobile` em cada idioma.
- `adsense`: `clientId: 'ca-pub-...'` e `slots: { sidebar: '...', inline: '...', bottom: '...', mobile: '...' }`. Os IDs de `ADSENSE_CLIENT_ID` e `ADSENSE_BLOG_SLOT_ID` do build continuam disponíveis como fallback, mas não ativam AdSense sozinhos. Para usar, associe o ID da campanha a uma posição.
- `iframe`: `sources: { default: 'https://...', sidebar: 'https://...' }`, com `title` e, se necessário, `sandbox`.
- `custom`: `scriptUrl: 'https://...'` opcional e `render(container, { placement, locale, geo })` para redes com integração própria. O script externo só carrega quando o espaço entra na tela.

Campanhas `adsense`, `iframe` e `custom` são inicializadas apenas quando ficam visíveis. URLs de anúncio devem ser HTTPS; links internos do site também funcionam em `http://localhost` durante desenvolvimento.
