# Auditoria de SEO e descoberta por IA — pklavc.com

Data: 8 de setembro de 2026. Escopo: site estático em GitHub Pages, domínio próprio com Cloudflare à frente, versões EN/PT/ES. O proprietário confirmou que já possui Google Search Console e Bing Webmaster Tools.

Publicação: GitHub Pages configurado para usar exclusivamente o workflow `Deploy GitHub Pages`, preservando `pklavc.com`. O workflow testa e publica o artefato otimizado, verifica a revisão publicada e notifica os mecanismos participantes do IndexNow.

## Diagnóstico verificado

- A auditoria do site publicado realizou **440 requisições**, incluindo as **407 URLs do sitemap**, arquivos de descoberta, variantes do domínio e testes com identificadores de bots. Não houve falhas HTTP inesperadas ou desafios detectados nessa amostra; uma URL inexistente retornou HTTP 404.
- O `robots.txt` público permite todos os rastreadores. O Cloudflare não acrescentou bloqueios ao conteúdo desse arquivo no teste.
- Googlebot, bingbot, OAI-SearchBot, GPTBot, ChatGPT-User, Amzn-SearchBot, Amzn-User, PerplexityBot e Claude-SearchBot receberam respostas públicas. **Alterar o User-Agent não equivale a testar a infraestrutura/IP real desses provedores.** Confirmar visitas e bloqueios reais nos registros do Cloudflare e nos relatórios dos buscadores.
- A pesquisa pública já encontrou o perfil, a página sobre e páginas de projetos. Isso prova alguma descoberta, sem determinar a cobertura total, posição média ou quantidade de citações por IA.
- O HTML já contém o conteúdo principal dos artigos e projetos, canonical, alternativas de idioma, RSS e JSON-LD. A prioridade técnica é corrigir inconsistências e manter esses recursos sincronizados.
- Identificadores de `Person` variavam entre páginas/idiomas; e-mail aparecia como perfil em `sameAs`. O enriquecimento de projetos inferia tecnologias do HTML inteiro, inclusive rodapé, e podia usar `github.com/sponsors/PkLavc` como repositório.
- Havia parágrafos ocultos de palavras-chave depois do conteúdo/rodapé e um redirecionamento `noscript` da homepage para ela mesma.
- Arquivos de contexto eram cópias estáticas e não acompanhavam todos os projetos atuais. A publicação apenas copiava mapas/feeds previamente gravados, e o gerador de sitemap possuía data de fallback fixa.

Evidência local da varredura pública: `_temp/seo-live-before.json` (ignorado pelo Git). A varredura descreve a versão publicada **antes** das alterações desta auditoria.

## Melhorias preparadas no repositório

O build normaliza o artefato `.pages-dist`. A única correção aplicada diretamente aos três HTML de entrada é a remoção do redirecionamento sem JavaScript para a própria página; os demais metadados recebem normalização automaticamente na publicação. Não há alteração de design, CSS, navegação ou textos visíveis.

1. Normalização de identidade/autoria, dados estruturados e metadados a partir de fatos já publicados. Referência comum: `https://pklavc.com/#person`.
2. Correção da extração de repositórios e linguagens de programação; exclusão de inferências baseadas no rodapé e de links de patrocínio usados como código-fonte.
3. Remoção de blocos finais ocultos de palavras-chave, preservando títulos e descrições utilizados para acessibilidade; remoção do redirecionamento sem JavaScript da homepage para ela mesma.
4. `noindex, follow` nas páginas operacionais de busca, status e mapa de visitantes; elas continuam acessíveis. Conteúdo profissional, projetos e artigos continuam elegíveis à indexação.
5. Sitemap completo na raiz, índice de compatibilidade, datas derivadas do histórico disponível e alternativas de idioma verificadas. A geração considera o HTML efetivamente publicado.
6. RSS e diretórios `llms.txt`, `llms-full.txt`, `context.txt`, `portfolio-context.txt` e `ai.txt` regenerados a cada build. O diretório completo inclui URLs e resumos das páginas canônicas; não se apresenta como texto integral dos artigos.
7. Verificação automatizada antes do upload ao GitHub Pages para detectar regressões técnicas e mudanças no conteúdo visual.

## O que realmente ajuda ChatGPT, Alexa e outros sistemas

**Acesso, entendimento e escolha como fonte são etapas distintas.** O site pode permitir um bot sem ser selecionado para uma resposta. Dados estruturados ajudam a desambiguar identidade e autoria; não constituem validação independente de reputação.

- **ChatGPT:** OAI-SearchBot participa da descoberta para busca. GPTBot é um controle distinto relacionado a treinamento. Permitir treinamento não faz um modelo memorizar Patrick Araujo e não garante citação. [Documentação oficial da OpenAI](https://developers.openai.com/api/docs/bots).
- **Alexa:** Amzn-SearchBot torna conteúdo elegível a experiências de busca como Alexa; Amzn-User pode buscar informações ao responder perguntas. Não há garantia de que uma consulta ambígua apenas pelo nome selecione este Patrick Araujo. [Documentação oficial da Amazon](https://developer.amazon.com/en/amazonbot).
- **Google com IA:** as práticas de SEO continuam válidas; não há schema especial ou arquivo de IA obrigatório. Conteúdo original útil, texto acessível, links e coerência com os dados estruturados importam mais que multiplicar arquivos. [Recursos de IA e sites](https://developers.google.com/search/docs/appearance/ai-features), [guia de otimização para IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
- **Arquivos llms/context:** são um recurso opcional para ferramentas que decidam consultá-los. Não há evidência aqui de que manter esses arquivos aumente posições, force citações ou substitua a indexação do HTML.

## Próximas ações nos serviços já configurados

### Google Search Console

Antes das inspeções, conferir **Configurações → Search generative AI → Include** (ou herança equivalente). O controle é separado de `robots.txt` e a documentação informa disponibilização global em 31/08/2026. A configuração real da sua propriedade não foi acessada. [Controle oficial](https://support.google.com/webmasters/answer/16908024).

1. Após publicar, enviar ou confirmar `https://pklavc.com/sitemap.xml`. O endereço de índice antigo permanece funcionando.
2. Inspecionar `/`, `/pt/`, `/about/`, `/pt/sobre/`, três projetos prioritários e três artigos prioritários. Conferir canonical selecionada, acesso ao HTML e elegibilidade. Solicitar indexação das páginas que tiveram alterações relevantes, sem repetir solicitações diariamente.
3. Exportar os últimos três meses de Desempenho, por consultas e páginas. Separar nome/handle, contratação, projetos/repositórios e dúvidas técnicas. Comparar períodos equivalentes depois da nova coleta.
4. Revisar os motivos de exclusão, especialmente páginas descobertas/rastreadas sem indexação, duplicatas e canonical divergente. Um sitemap aceito não significa que todas as páginas estejam indexadas.

Conferir também o relatório **Generative AI performance** para impressões em AI Overviews/AI Mode. A visibilidade do relatório pode depender de disponibilidade e volume suficiente; ele não mede todas as plataformas de IA. [Relatório oficial](https://support.google.com/webmasters/answer/16984139).

### Bing Webmaster Tools e Cloudflare

1. Confirmar processamento do sitemap e usar URL Inspection nos mesmos exemplos. Revisar erros de rastreamento antes de pedir novas indexações.
2. Verificar as métricas de citações em AI Performance, se o recurso estiver disponível na conta. Citações não equivalem a cliques ou contatos profissionais. [Apresentação oficial do Bing](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview).
3. No Cloudflare, verificar AI Crawl Control, eventos do firewall e regras de bots para o domínio. Um `Allow` no repositório não sobrepõe um bloqueio na borda. Não liberar tráfego apenas porque declara um User-Agent: usar a identificação verificada disponibilizada pelo serviço.
4. IndexNow está integrado ao workflow após a publicação: verifica a revisão implantada e o arquivo público de propriedade; envia páginas alteradas, removidas ou o conjunto canônico quando há mudanças gerais de SEO. Uma execução manual permite reenviar o conjunto completo. Respostas 200/202 indicam recebimento, não indexação. Ele notifica motores participantes; não é uma API de submissão ao Google. [Protocolo oficial](https://www.indexnow.org/documentation).

A sessão local de Wrangler foi consultada e não possui a zona `pklavc.com`. O workflow manual `Configure Cloudflare AI Discovery` usa o segredo Cloudflare já existente no repositório, sem exportá-lo. Ele consulta apenas a zona exata e permite alterar o bloqueio específico de bots de IA; mantém as demais proteções e verifica o resultado. Falta de acesso ou de permissão é reportada como falha, nunca como configuração concluída. Crawler Hints permanece uma opção de painel; a automação IndexNow já cobre notificações de atualização. As configurações privadas do Search Console e Bing não foram acessadas.

## Crescimento que exige trabalho editorial e reputação

| Objetivo | Próxima ação concreta | Evidência a acompanhar |
| --- | --- | --- |
| Ser reconhecido pelo nome | Manter Patrick Araujo, PkLavc, função e domínio consistentes nos perfis próprios; ligar GitHub/LinkedIn ao site e o site a esses perfis | Consultas pelo nome, URLs selecionadas, referências corretas à pessoa |
| Atrair contratação | Priorizar os estudos de caso que comprovem backend, IA aplicada, integrações e confiabilidade; mostrar problema, contribuição e resultado verificável | Consultas relevantes, visitas a projeto/currículo e contatos recebidos |
| Atrair usuários de código aberto | Nos repositórios públicos, manter link para a página correspondente, instalação, exemplo reproduzível, licença e documentação de contribuição reais | Visitas ao projeto, acessos ao repositório e uso/contribuições |
| Virar fonte técnica | Publicar resultados e explicações que só a experiência do autor oferece: testes reproduzíveis, decisões, falhas, limitações e dados autorizados | Links editoriais, consultas específicas e citações com contexto correto |
| Ganhar autoridade fora do domínio | Contribuições relevantes, documentação reconhecida por mantenedores, artigos convidados ou referências espontâneas de projetos e comunidades | Menções e links de terceiros, sem tratar autodeclarações como validação independente |

É possível manter o layout atual ao melhorar o conteúdo dos artigos e estudos de caso existentes. Ampliar assuntos apenas para gerar volume de páginas não substitui profundidade e originalidade. A prioridade editorial sugerida é o núcleo em que há evidência de trabalho: backend, automação, integrações e IA aplicada.

## Validação e manutenção

O artefato foi construído com **412 páginas HTML**, **402 URLs indexáveis**, **1.584 alternativas de idioma** e **89 artigos no RSS inglês**. A redução de 407 para 402 URLs remove somente busca, status e os três mapas de visitantes do sitemap. O comparador verifica conteúdo/estrutura de 412 HTML e 15 CSS contra a fonte, permitindo apenas as alterações invisíveis descritas. Os seis links de demonstração para `/codepulse-monorepo/` pertencem a outro projeto publicado no mesmo domínio; o destino respondeu HTTP 200 e não deve ser removido por estar fora deste artefato.

Resultado final: **6 testes de normalização aprovados**, incluindo idempotência em todas as páginas; auditoria estrita do artefato com **zero erros e zero avisos**. A auditoria também passou em uma construção com configuração fictícia de AdSense, sem consultar anúncios. O artefato final foi reconstruído com a configuração local normal. Sintaxe dos scripts e `git diff --check` aprovados.

```powershell
node scripts/build-pages-artifact.mjs
node --test scripts/normalize-seo.test.mjs
python scripts/audit-seo.py --root .pages-dist --compare-source . --strict-links --allow-adsense-injection
node scripts/check-live-seo.mjs --all --output _temp/seo-live.json
git diff --check
```

O comparador permite explicitamente apenas os dois scripts de AdSense já adicionados pelo build quando existe configuração válida; isso preserva o comportamento anterior de publicação. O último comando Node consulta a versão pública e exige rede. A auditoria local é estrutural; não mede Core Web Vitals de usuários reais nem substitui URL Inspection/Rich Results Test. Relatórios privados do Search Console/Bing e logs reais dos bots não foram acessados. Não é possível atribuir aumento de tráfego às alterações antes da publicação e de um período de observação.
