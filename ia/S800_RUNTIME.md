# S-800 em `/ia/`

Este documento descreve a configuração em produção do S-800 exibido no fundo
da assistente. O objetivo é manter o comportamento visual e a animação iguais
ao visualizador em `/lab/t800/`, sem carregar o modelo até o comando secreto.

## Arquivos envolvidos

| Arquivo | Responsabilidade |
| --- | --- |
| `ia/index.html` | Contém o host vazio: `<div class="s800-background" data-s800-background>`. |
| `ia/skylet-chat.js` | Revela o S-800 somente quando a mensagem é exatamente `1997`; também encaminha a fala ao runtime quando o áudio está ligado. |
| `ia/skylet-chat.css` | Posiciona o canvas como fundo fixo e mantém chat, menu e compositor utilizáveis por cima dele. |
| `assets/models/s800/s800-background.js` | Ponto de entrada mínimo do módulo. |
| `assets/models/s800/s800-runtime.js` | Carregamento sob demanda, câmera, rig, olhos, cabeça e mandíbula. |
| `assets/models/s800/S-800-bust.glb` | Mesmo GLB usado em `/lab/t800/`; inclui apenas o busto e o armature necessário. |

## Gatilho e carregamento

1. A página `/ia/` não baixa Three.js, Draco nem o GLB ao abrir.
2. Ao enviar uma mensagem cujo conteúdo seja somente `1997`, `skylet-chat.js`
   chama `window.S800Background.reveal()`.
3. O runtime importa Three.js, GLTFLoader e DRACOLoader, baixa o GLB e cria o
   canvas dentro de `[data-s800-background]`.
4. O host informa o estado por atributos para diagnóstico:
   - `data-s800-ready="loading"` durante o carregamento;
   - `data-s800-ready="true"` quando o canvas está ativo;
   - `data-s800-controls="eyes:1,head:1,jaw:1"` quando os três controles
     foram encontrados no rig.

## Modelo e qualidade visual

`assets/models/s800/S-800-bust.glb` deve ser idêntico ao arquivo
`D:\Projects\lab\t800\S-800-bust.glb`. Não substituir por exportações com
texturas reduzidas sem comparar visualmente: a versão 1K/WebP degradava a
aparência e não deve voltar ao site.

O runtime usa os mesmos valores principais do Lab:

- câmera perspectiva de 26 graus;
- pixel ratio limitado a 2;
- tone mapping ACES, exposição 1.15;
- iluminação hemisférica, luz principal e rim light nos mesmos valores;
- enquadramento calculado a partir de `S800Endo-Head`.

## Movimento

Os ossos usados são `L_j_eyeball_endo`, `R_j_eyeball_endo`, `j_head`,
`j_neck` e `j_jaw_endo`.

- O ponto neutro do olhar é a projeção do ponto médio entre os olhos reais,
  não o centro geométrico da tela.
- Os olhos usam o alvo do cursor, suavização `0.2` e limite de rotação `0.62`.
- Cabeça e pescoço seguem mais lentamente, com suavização `0.075` e as mesmas
  sensibilidades do Lab.
- A mandíbula responde aos eventos `boundary` do `SpeechSynthesisUtterance`.
  Portanto, ela só se move enquanto o botão de áudio da assistente estiver
  ligado e a resposta estiver sendo lida pelo navegador.

## Alterar ou testar

Para editar o comportamento, altere somente
`assets/models/s800/s800-runtime.js`; o arquivo do Lab continua sendo a
referência de comportamento. Após qualquer mudança:

1. execute `node scripts/build-pages-artifact.mjs` na raiz do repositório;
2. rode `node --test scripts/normalize-seo.test.mjs`;
3. abra o artefato gerado em `.pages-dist/ia/`, envie `1997` e confira
   `data-s800-ready` e `data-s800-controls` no host;
4. mova o cursor pelo centro dos olhos, pelas laterais e acima/abaixo para
   verificar olhos, cabeça e pescoço;
5. faça commit e push. O gerador aplica hash aos assets, evitando cache antigo
   de JavaScript e GLB após a publicação.
