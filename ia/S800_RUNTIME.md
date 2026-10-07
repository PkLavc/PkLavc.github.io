# S-800 em `/ia/`

O controlador do S-800 nesta rota é o mesmo que foi validado em
`/lab/t800/`. A cópia de produção fica inteiramente em
`assets/models/s800/`:

- `s800-runtime.js`: controlador Three.js com rig, olhos, cabeça e mandíbula;
- `S-800-bust.glb`: modelo otimizado usado pelo controlador;
- `vendor/three/`: Three.js, GLTFLoader, DRACOLoader e decodificador Draco.

## Contrato da página

Cada página localizada (`/ia/`, `/pt/ia/` e `/es/ia/`) mantém estes IDs:

- `#viewport`, `#loading` e `#error` para o visualizador;
- `#speech-form` e `#speech-input` para a fala do personagem;
- `#chat-log` e `#voice-toggle` para a camada de chat.

O script do chat registra o envio na fase de captura. Mensagens do visitante
vão ao Worker; quando o áudio está ativo, a resposta é reenviada pelo
formulário original para reutilizar a fala e a animação da mandíbula.

## Comando especial

O modelo é carregado desde o início, mas o canvas permanece oculto até a
mensagem exata `1997`. Esse comando apenas revela o S-800 e não chama a API.

Não alterar `s800-runtime.js` para ajustes específicos de chat. Alterações de
rig, câmera, olhos, cabeça ou boca devem ser primeiro validadas em
`D:\Projects\lab\t800\main.js` e então copiadas para
`assets/models/s800/s800-runtime.js`.

A única adaptação em relação ao arquivo do Lab é a resolução de URLs: GLB e
Draco são calculados a partir de `import.meta.url`, para que permaneçam dentro
de `assets/models/s800/` independentemente de a página aberta ser `/ia/`,
`/pt/ia/` ou `/es/ia/`. O controlador de rig e animação permanece o mesmo.
