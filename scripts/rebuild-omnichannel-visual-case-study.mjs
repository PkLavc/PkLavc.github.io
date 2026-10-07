import { readFileSync, writeFileSync } from 'node:fs';

const configs = [
  {
    file: 'projects/omnichannel/index.html', lang: 'en', category: 'AI & Customer Service',
    lead: 'A multi-company customer-service operating system: channels, specialist agents, RAG, Tools, service cards, governed learning, and human teams working as one.',
    readMore: 'Architecture, modules and interaction map', docLabel: 'Omnichannel visual case study',
    intro: '<strong>Omnichannel</strong> goes beyond a chatbot. It is a portable service operation built around Chatwoot and an AI Gateway, with five specialist roles, verified business sources, structured customer context, auditable human handoff, and continuous improvement under human control.',
    kpis: [['5','specialist agent roles'],['5+','channel families'],['6','RAG file formats'],['384D','tenant-scoped embeddings']],
    legend: ['Chatwoot','Multi-agent AI','RAG + Tools','Human-in-the-loop'],
    overviewLabel: 'System map', overviewTitle: 'The complete service landscape', overviewText: 'Every incoming interaction is bound to a company and channel before it reaches memory, knowledge, Tools or an AI provider. The response returns through the same channel or becomes a qualified human handoff.',
    stageTitle: 'End-to-end architecture',
    architectureCaption: 'Channel → authenticated tenant → specialist orchestration → verified sources → reply or human handoff.',
    arch: {
      channels: ['WhatsApp','Instagram / Facebook','Website / API'], channelHint: 'Customer channels',
      chatwoot: ['Chatwoot','Unified inbox, contacts, teams and operators'],
      gateway: ['AI Gateway','Tenant resolution, state, policy and orchestration'],
      services: [['Specialist router','Intent + retained context'],['Quality Gate','Grounding and safety'],['Audit log','Provider, latency, cost and sources']],
      data: [['PostgreSQL + pgvector','Conversations, prompts, RAG and metrics'],['Tools / business APIs','Customer, stock, warranty, orders and scheduling'],['Private data root','Exports, imports, attachments and portable state']],
    },
    lifecycleLabel: 'Runtime', lifecycleTitle: 'What happens to one customer message', lifecycleText: 'The path is deterministic around identity and evidence, while AI is used only inside controlled boundaries.',
    lifecycle: [['Receive','Chatwoot emits a message_created webhook.'],['Validate','Tenant ID, webhook secret, account and inbox are checked.'],['Serialize','Messages from the same conversation enter one ordered queue.'],['Route','Intent selects Intake, Sales, Customer Care or Technical.'],['Enrich','Confirmed fields, Tool results and tenant RAG build context.'],['Generate','Allowed providers run by priority with sequential fallback.'],['Guard','Quality rules block unsupported facts and unsafe promises.'],['Deliver','Reply in the original channel or hand off with the card filled.']],
    agentsLabel: 'Agent graph', agentsTitle: 'One bot, five internal specialties', agentsText: 'The customer sees one continuous identity. Internally, deterministic routing preserves context and moves only when explicit intent changes.',
    agents: { hub:['Conversation coordinator','Tenant + active context'], intake:['Intake','Minimum-data triage'], sales:['Sales','Products and next step'], care:['Customer Care','Orders, warranty and complaints'], technical:['Technical','Safe symptom triage'], quality:['Quality','Internal review only'] },
    agentCaption: 'Quality is internal-only: customer text cannot route itself into the reviewer role.',
    ragLabel: 'Knowledge', ragTitle: 'RAG ingestion and retrieval', ragText: 'The same tenant knowledge supports every allowed provider. Corpus versioning invalidates stale cache entries automatically.',
    ragIngestTitle: 'Ingestion pipeline', ragIngest: ['XLSX / PDF / DOCX / MD / TXT / HTML','Loader','Normalizer','Overlapping chunks','384D embeddings','pgvector + corpus version'],
    ragQueryTitle: 'Retrieval pipeline', ragQuery: ['Question hash + embedding','Semantic cache','HNSW candidates','Hybrid reranker','Context Builder','Active provider'],
    ragNote: 'Hybrid ranking combines 72% vector similarity with 28% lexical signals. Every query, cache key, document, chunk and embedding includes the tenant scope.',
    learningLabel: 'Governed improvement', learningTitle: 'Learning without uncontrolled self-modification', learningText: 'Real conversations become evidence, not immediate instructions. Behaviour can improve only after consolidation and explicit review; factual claims still require an official source.',
    learning: [['Conversation','Messages and active specialty'],['Evidence','Verified outcome, order or payment'],['Assessment','Human feedback + deterministic rubric'],['Candidate','Signals consolidated by tactic and specialty'],['Grounding gate','Commercial facts require Tool, rule or RAG'],['Human review','Approve, reject or reopen'],['Dataset','PII-redacted, deduplicated and versioned'],['Prompt candidate','System, Sales, Support and Post-sale bundle'],['Canary','Deterministic conversation bucket'],['Promote / rollback','Audited release control']],
    thresholds: [['8','conversations'],['5','distinct customers'],['3','verified outcomes'],['4','supporting signals'],['72%','minimum confidence'],['≤25%','contradiction']],
    learningCaption: 'The platform does not train provider models automatically and never lets conversation repetition validate prices, discounts, warranties or policy.',
    tenantLabel: 'Multi-tenancy', tenantTitle: 'Shared capacity, isolated business context', tenantText: 'The platform shares infrastructure deliberately. Business identity and data never become global.',
    sharedTitle: 'Shared platform', sharedItems: ['Gateway and Admin','Chatwoot infrastructure','Provider configurations','Scope ALL or SELECTED'],
    tenantATitle: 'Tenant A', tenantBTitle: 'Tenant B', tenantItems: ['Identity and bot','Channels and credentials','RAG, rules and prompts','Conversations and cards','Logs, outcomes and datasets'],
    tenantCaption: 'Changing a browser header does not grant access. The backend resolves the authenticated user-to-tenant relationship and denies unknown, inactive or unauthorized IDs by default.',
    toolsLabel: 'Business integrations', toolsTitle: 'Tools turn answers into verified operations', toolsText: 'Adapters normalize business systems without embedding company logic in the model. A timeout and response contract keeps unavailable integrations from becoming invented answers.',
    tools: [['Customer lookup','Recognize returning customers and recover allowed context.'],['Products and stock','Confirm catalog, availability and conditions.'],['Warranty','Check coverage and official policy.'],['Service orders','Read status and recent service history.'],['Scheduling','Query availability and qualify a request before handoff.'],['Orders and payments','Attach verified commercial evidence to outcomes.']],
    sourceOrder: [['1. Tool','Live verified business data'],['2. Tenant RAG','Official indexed knowledge'],['3. Constrained answer','Only what evidence supports']],
    interfacesLabel: 'Interface mockups', interfacesTitle: 'Operational control and customer experience', interfacesText: 'The Admin explains what the system knows and why. Chatwoot keeps the operator inside a familiar inbox while AI enriches the conversation in the background.',
    adminTitle: 'Omnichannel Admin', adminNav: ['Overview','Bots / companies','AI & providers','Knowledge / RAG','Conversations','Continuous improvement'],
    adminStats: [['12','active conversations'],['94%','grounded replies'],['3','providers healthy']], adminRows: [['Source','Status','Chunks'],['Service catalog','Ready','428'],['Policies','Ready','96'],['Quick replies','Ready','184']],
    chatTitle: 'Customer conversation', chatMessages: ['Hi, I need help with my device.','Of course. Which model and what symptom are you seeing?','It is a phone that stopped charging.','Thanks. I recorded the symptom; tell me the exact model so I can continue safely.'], chatInput: 'Type a message…',
    cardLabel: 'Service card', cardTitle: 'The conversation fills a structured handoff', cardText: 'Confirmed fields accumulate without forcing the customer to repeat information. When scheduling is requested, missing data is collected before a human receives the case.',
    cardStatus: 'Collecting data', cardFields: [['Conversation ID','#8421'],['Name','Confirmed'],['Phone','Confirmed'],['CPF / e-mail','When needed'],['Device / model','Captured'],['Service / symptom','Captured'],['Desired unit','Pending'],['Date and time','Pending'],['Appointment ID','After integration'],['Status','In service']],
    checklistTitle: 'Qualified handoff', checklist: ['Conversation context preserved','Active specialty recorded','Missing fields identified','Chatwoot team selected by sector','Human receives the service card'],
    dataLabel: 'Persistence', dataTitle: 'Portable application, separate private data', dataText: 'The reusable source can be distributed without company identity. Configuration, tenant files and database state live in a sibling private root that can be exported and restored.',
    appStackTitle: 'Application repository', appStack: [['Gateway','Runtime and integrations'],['Admin','Configuration interface'],['Compose','Services and networking'],['Docs and tests','Contracts and validation']],
    privateStackTitle: 'Private data root', privateStack: [['config','Infrastructure secrets'],['tenants','RAG, rules, contacts, cards and datasets'],['imports / exports','Large conversation archives'],['state / backups','Portable databases and volumes']],
    dataCaption: 'Manual startup can download the private state; graceful stop can snapshot it. Nothing needs to start automatically with Windows.',
    safetyLabel: 'Trust and observability', safetyTitle: 'Controls around every decision', safetyText: 'The platform records enough operational evidence to investigate an answer without exposing secrets or raw model reasoning.',
    safety: [['Prompt security','Untrusted customer and historical text is sanitized and wrapped as data, never as system instruction.'],['Idempotency','Tenant plus external IDs prevent duplicate conversations, messages and verified links.'],['Provider fallback','Only enabled and tenant-authorized configurations participate, ordered by priority.'],['Grounding','Tools and official RAG take precedence; unsupported claims can be blocked.'],['Auditability','Provider, model, prompt version, RAG sources, latency, tokens, cost and errors are attributed to the tenant.'],['Human control','Transfers, learning approval, dataset publication, canary promotion and rollback remain explicit actions.']],
    closingTitle: 'Built as an operating system for service, not a single bot', closingText: 'The result is a modular foundation that can be copied to a new organization as clean software, then configured through its private tenant data and integrations—without carrying another company’s identity, conversations or knowledge.',
    cta: 'View source on GitHub', ctaAria: 'Project source',
  },
  {
    file: 'pt/projetos/omnichannel/index.html', lang: 'pt-BR', category: 'IA e Atendimento',
    lead: 'Um sistema operacional de atendimento multiempresa: canais, agentes especialistas, RAG, Tools, cartões, aprendizado governado e equipes humanas trabalhando como uma única operação.',
    readMore: 'Arquitetura, módulos e mapa de interações', docLabel: 'Estudo de caso visual do Omnichannel',
    intro: '<strong>Omnichannel</strong> vai muito além de um chatbot. É uma operação portátil de atendimento construída sobre Chatwoot e um Gateway de IA, com cinco papéis especialistas, fontes de negócio verificadas, contexto estruturado do cliente, transferência humana auditável e melhoria contínua sob controle humano.',
    kpis: [['5','papéis de agentes especialistas'],['5+','famílias de canais'],['6','formatos aceitos no RAG'],['384D','embeddings isolados por tenant']],
    legend: ['Chatwoot','IA multiagente','RAG + Tools','Humano no circuito'],
    overviewLabel: 'Mapa do sistema', overviewTitle: 'O ecossistema completo de atendimento', overviewText: 'Cada interação recebida é vinculada à empresa e ao canal antes de acessar memória, conhecimento, Tools ou um provider de IA. A resposta retorna pelo mesmo canal ou vira uma transferência humana qualificada.',
    stageTitle: 'Arquitetura ponta a ponta',
    architectureCaption: 'Canal → tenant autenticado → orquestração especialista → fontes verificadas → resposta ou transferência humana.',
    arch: {
      channels: ['WhatsApp','Instagram / Facebook','Site / API'], channelHint: 'Canais do cliente',
      chatwoot: ['Chatwoot','Inbox unificada, contatos, equipes e atendentes'],
      gateway: ['Gateway de IA','Tenant, estado, políticas e orquestração'],
      services: [['Roteador especialista','Intenção + contexto mantido'],['Quality Gate','Fontes e segurança'],['Log de auditoria','Provider, latência, custo e fontes']],
      data: [['PostgreSQL + pgvector','Conversas, prompts, RAG e métricas'],['Tools / APIs de negócio','Cliente, estoque, garantia, OS e agenda'],['Pasta privada','Exportações, importações, anexos e estado portátil']],
    },
    lifecycleLabel: 'Execução', lifecycleTitle: 'O que acontece com uma mensagem do cliente', lifecycleText: 'Identidade e evidência seguem um caminho determinístico; a IA atua somente dentro de limites controlados.',
    lifecycle: [['Receber','O Chatwoot emite o webhook message_created.'],['Validar','ID do tenant, segredo, conta e inbox são conferidos.'],['Serializar','Mensagens da mesma conversa entram em uma fila ordenada.'],['Rotear','A intenção seleciona Triagem, Comercial, SAC ou Técnico.'],['Enriquecer','Campos confirmados, Tools e RAG do tenant montam o contexto.'],['Gerar','Providers permitidos rodam por prioridade e fallback sequencial.'],['Proteger','O Quality Gate bloqueia fatos sem fonte e promessas inseguras.'],['Entregar','Responde no canal original ou transfere com o cartão preenchido.']],
    agentsLabel: 'Grafo de agentes', agentsTitle: 'Um bot, cinco especialidades internas', agentsText: 'O cliente percebe uma identidade contínua. Internamente, o roteamento determinístico preserva o contexto e só muda de especialidade quando a intenção explícita muda.',
    agents: { hub:['Coordenador da conversa','Tenant + contexto ativo'], intake:['Triagem','Coleta mínima de dados'], sales:['Comercial','Produtos e próximo passo'], care:['SAC','Pedidos, garantia e reclamações'], technical:['Assistência técnica','Triagem segura de sintomas'], quality:['Qualidade','Somente revisão interna'] },
    agentCaption: 'Qualidade é um papel somente interno: o texto do cliente não consegue se rotear para o agente revisor.',
    ragLabel: 'Conhecimento', ragTitle: 'Ingestão e recuperação RAG', ragText: 'A mesma base do tenant atende todos os providers autorizados. O versionamento do corpus invalida automaticamente caches antigos.',
    ragIngestTitle: 'Pipeline de ingestão', ragIngest: ['XLSX / PDF / DOCX / MD / TXT / HTML','Loader','Normalização','Chunks sobrepostos','Embeddings 384D','pgvector + versão do corpus'],
    ragQueryTitle: 'Pipeline de consulta', ragQuery: ['Hash + embedding da pergunta','Cache semântico','Candidatos HNSW','Reranker híbrido','Context Builder','Provider ativo'],
    ragNote: 'O ranking híbrido combina 72% de similaridade vetorial com 28% de sinais lexicais. Toda consulta, chave de cache, documento, chunk e embedding inclui o tenant.',
    learningLabel: 'Melhoria governada', learningTitle: 'Aprendizado sem autoalteração descontrolada', learningText: 'Conversas reais viram evidências, não instruções imediatas. Comportamentos só evoluem após consolidação e revisão explícita; fatos continuam exigindo fonte oficial.',
    learning: [['Conversa','Mensagens e especialidade ativa'],['Evidência','Resultado, pedido ou pagamento verificado'],['Avaliação','Feedback humano + rubrica determinística'],['Candidato','Sinais consolidados por tática e especialidade'],['Bloqueio de fonte','Fatos comerciais exigem Tool, regra ou RAG'],['Revisão humana','Aprovar, rejeitar ou reabrir'],['Dataset','PII removida, deduplicado e versionado'],['Prompt candidato','Bundle Sistema, Comercial, SAC e Pós-venda'],['Canário','Bucket determinístico por conversa'],['Promover / rollback','Controle auditado de release']],
    thresholds: [['8','conversas'],['5','clientes distintos'],['3','resultados verificados'],['4','evidências favoráveis'],['72%','confiança mínima'],['≤25%','contradição']],
    learningCaption: 'A plataforma não treina modelos dos providers automaticamente e nunca permite que repetição de conversa valide preço, desconto, garantia ou política.',
    tenantLabel: 'Multiempresa', tenantTitle: 'Capacidade compartilhada, contexto isolado', tenantText: 'A infraestrutura é compartilhada de forma deliberada. Identidade e dados de negócio nunca se tornam globais.',
    sharedTitle: 'Plataforma compartilhada', sharedItems: ['Gateway e Admin','Infraestrutura Chatwoot','Configurações de providers','Escopo ALL ou SELECTED'],
    tenantATitle: 'Tenant A', tenantBTitle: 'Tenant B', tenantItems: ['Identidade e bot','Canais e credenciais','RAG, regras e prompts','Conversas e cartões','Logs, resultados e datasets'],
    tenantCaption: 'Alterar um header no navegador não concede acesso. O backend resolve a relação entre usuário autenticado e tenant e nega por padrão IDs desconhecidos, inativos ou não autorizados.',
    toolsLabel: 'Integrações de negócio', toolsTitle: 'Tools transformam respostas em operações verificadas', toolsText: 'Adapters normalizam sistemas externos sem embutir regras da empresa no modelo. Timeout e contrato de resposta impedem que uma integração indisponível vire uma resposta inventada.',
    tools: [['Consulta de clientes','Reconhece clientes recorrentes e recupera contexto permitido.'],['Produtos e estoque','Confirma catálogo, disponibilidade e condições.'],['Garantia','Verifica cobertura e política oficial.'],['Ordens de serviço','Consulta status e histórico recente.'],['Agendamento','Consulta disponibilidade e qualifica o pedido antes da transferência.'],['Pedidos e pagamentos','Vincula evidência comercial verificada aos resultados.']],
    sourceOrder: [['1. Tool','Dado vivo e verificado'],['2. RAG do tenant','Conhecimento oficial indexado'],['3. Resposta limitada','Somente o que a evidência sustenta']],
    interfacesLabel: 'Maquetes de interface', interfacesTitle: 'Controle operacional e experiência do cliente', interfacesText: 'O Admin explica o que o sistema conhece e por quê. O Chatwoot mantém o atendente em uma inbox familiar enquanto a IA enriquece a conversa em segundo plano.',
    adminTitle: 'Admin Omnichannel', adminNav: ['Visão geral','Bots / empresas','IA e providers','Conhecimento / RAG','Conversas','Melhoria contínua'],
    adminStats: [['12','conversas ativas'],['94%','respostas com fonte'],['3','providers saudáveis']], adminRows: [['Fonte','Status','Chunks'],['Catálogo de serviços','Pronto','428'],['Políticas','Pronto','96'],['Mensagens rápidas','Pronto','184']],
    chatTitle: 'Conversa com cliente', chatMessages: ['Olá, preciso de ajuda com meu aparelho.','Claro. Qual é o modelo e qual sintoma ele apresenta?','É um celular que parou de carregar.','Obrigado. Registrei o sintoma; informe o modelo exato para eu continuar com segurança.'], chatInput: 'Digite uma mensagem…',
    cardLabel: 'Cartão de atendimento', cardTitle: 'A conversa preenche uma transferência estruturada', cardText: 'Os dados confirmados acumulam sem obrigar o cliente a repetir informações. Quando há intenção de agendamento, os campos ausentes são coletados antes de um humano receber o caso.',
    cardStatus: 'Coletando dados', cardFields: [['ID da conversa','#8421'],['Nome','Confirmado'],['Telefone','Confirmado'],['CPF / e-mail','Quando necessário'],['Aparelho / modelo','Coletado'],['Serviço / sintoma','Coletado'],['Unidade desejada','Pendente'],['Data e horário','Pendente'],['ID do agendamento','Após integração'],['Status','Em atendimento']],
    checklistTitle: 'Transferência qualificada', checklist: ['Contexto da conversa preservado','Especialidade ativa registrada','Campos ausentes identificados','Equipe do Chatwoot escolhida por setor','Humano recebe o cartão completo'],
    dataLabel: 'Persistência', dataTitle: 'Aplicação portátil, dados privados separados', dataText: 'O código reutilizável pode ser distribuído sem identidade empresarial. Configurações, arquivos dos tenants e estado dos bancos ficam em uma raiz privada irmã, exportável e restaurável.',
    appStackTitle: 'Repositório da aplicação', appStack: [['Gateway','Runtime e integrações'],['Admin','Interface de configuração'],['Compose','Serviços e rede'],['Docs e testes','Contratos e validação']],
    privateStackTitle: 'Raiz de dados privados', privateStack: [['config','Segredos de infraestrutura'],['tenants','RAG, regras, contatos, cartões e datasets'],['imports / exports','Grandes arquivos de conversas'],['state / backups','Bancos e volumes portáteis']],
    dataCaption: 'A inicialização manual pode baixar o estado privado; a parada segura pode gerar o snapshot. Nada precisa iniciar automaticamente com o Windows.',
    safetyLabel: 'Confiança e observabilidade', safetyTitle: 'Controles em torno de cada decisão', safetyText: 'A plataforma registra evidência operacional suficiente para investigar uma resposta sem expor segredos nem raciocínio bruto do modelo.',
    safety: [['Segurança de prompt','Texto do cliente e histórico são higienizados e tratados como dados, nunca como instrução de sistema.'],['Idempotência','Tenant mais IDs externos evitam duplicação de conversas, mensagens e vínculos verificados.'],['Fallback de providers','Somente configurações habilitadas e autorizadas para o tenant participam, por prioridade.'],['Grounding','Tools e RAG oficial têm precedência; afirmações sem fonte podem ser bloqueadas.'],['Auditoria','Provider, modelo, versão do prompt, fontes RAG, latência, tokens, custo e erros pertencem ao tenant.'],['Controle humano','Transferências, aprovação de aprendizado, publicação de dataset, promoção de canário e rollback são ações explícitas.']],
    closingTitle: 'Construído como sistema operacional de atendimento, não como um bot isolado', closingText: 'O resultado é uma base modular que pode ser copiada limpa para outra organização e configurada por seus dados privados e integrações—sem carregar identidade, conversas ou conhecimento de outra empresa.',
    cta: 'Ver código no GitHub', ctaAria: 'Código do projeto',
  },
  {
    file: 'es/proyectos/omnichannel/index.html', lang: 'es', category: 'IA y Atención',
    lead: 'Un sistema operativo de atención multiempresa: canales, agentes especialistas, RAG, Tools, tarjetas, aprendizaje gobernado y equipos humanos trabajando como una sola operación.',
    readMore: 'Arquitectura, módulos y mapa de interacciones', docLabel: 'Caso de estudio visual de Omnichannel',
    intro: '<strong>Omnichannel</strong> va mucho más allá de un chatbot. Es una operación portátil de atención basada en Chatwoot y un Gateway de IA, con cinco roles especialistas, fuentes comerciales verificadas, contexto estructurado del cliente, transferencia humana auditable y mejora continua bajo control humano.',
    kpis: [['5','roles de agentes especialistas'],['5+','familias de canales'],['6','formatos aceptados en RAG'],['384D','embeddings aislados por tenant']],
    legend: ['Chatwoot','IA multiagente','RAG + Tools','Humano en el circuito'],
    overviewLabel: 'Mapa del sistema', overviewTitle: 'El ecosistema completo de atención', overviewText: 'Cada interacción queda vinculada a empresa y canal antes de acceder a memoria, conocimiento, Tools o un proveedor de IA. La respuesta vuelve por el mismo canal o se convierte en una transferencia humana calificada.',
    stageTitle: 'Arquitectura de extremo a extremo',
    architectureCaption: 'Canal → tenant autenticado → orquestación especialista → fuentes verificadas → respuesta o transferencia humana.',
    arch: {
      channels: ['WhatsApp','Instagram / Facebook','Sitio / API'], channelHint: 'Canales del cliente',
      chatwoot: ['Chatwoot','Bandeja unificada, contactos, equipos y operadores'],
      gateway: ['Gateway de IA','Tenant, estado, políticas y orquestación'],
      services: [['Enrutador especialista','Intención + contexto retenido'],['Quality Gate','Fuentes y seguridad'],['Registro de auditoría','Proveedor, latencia, costo y fuentes']],
      data: [['PostgreSQL + pgvector','Conversaciones, prompts, RAG y métricas'],['Tools / APIs comerciales','Cliente, stock, garantía, OS y agenda'],['Carpeta privada','Exportaciones, importaciones, adjuntos y estado portátil']],
    },
    lifecycleLabel: 'Ejecución', lifecycleTitle: 'Qué sucede con un mensaje del cliente', lifecycleText: 'Identidad y evidencia siguen un camino determinista; la IA actúa únicamente dentro de límites controlados.',
    lifecycle: [['Recibir','Chatwoot emite el webhook message_created.'],['Validar','Se comprueban ID del tenant, secreto, cuenta e inbox.'],['Serializar','Los mensajes de la misma conversación entran en una cola ordenada.'],['Enrutar','La intención selecciona Recepción, Ventas, SAC o Técnico.'],['Enriquecer','Campos, Tools y RAG del tenant construyen el contexto.'],['Generar','Los proveedores permitidos se ejecutan por prioridad y fallback.'],['Proteger','Quality Gate bloquea hechos sin fuente y promesas inseguras.'],['Entregar','Responde en el canal original o transfiere con la tarjeta completa.']],
    agentsLabel: 'Grafo de agentes', agentsTitle: 'Un bot, cinco especialidades internas', agentsText: 'El cliente percibe una identidad continua. Internamente, el enrutamiento determinista conserva el contexto y solo cambia cuando cambia la intención explícita.',
    agents: { hub:['Coordinador de conversación','Tenant + contexto activo'], intake:['Recepción','Recopilación mínima'], sales:['Ventas','Productos y siguiente paso'], care:['Atención al cliente','Pedidos, garantía y reclamos'], technical:['Asistencia técnica','Triaje seguro de síntomas'], quality:['Calidad','Solo revisión interna'] },
    agentCaption: 'Calidad es un rol solo interno: el texto del cliente no puede enrutar la conversación hacia el agente revisor.',
    ragLabel: 'Conocimiento', ragTitle: 'Ingesta y recuperación RAG', ragText: 'La misma base del tenant atiende a todos los proveedores autorizados. El versionado del corpus invalida automáticamente cachés antiguos.',
    ragIngestTitle: 'Pipeline de ingesta', ragIngest: ['XLSX / PDF / DOCX / MD / TXT / HTML','Loader','Normalización','Chunks superpuestos','Embeddings 384D','pgvector + versión del corpus'],
    ragQueryTitle: 'Pipeline de consulta', ragQuery: ['Hash + embedding de pregunta','Caché semántica','Candidatos HNSW','Reranker híbrido','Context Builder','Proveedor activo'],
    ragNote: 'El ranking híbrido combina 72% de similitud vectorial con 28% de señales léxicas. Cada consulta, clave de caché, documento, chunk y embedding incluye el tenant.',
    learningLabel: 'Mejora gobernada', learningTitle: 'Aprendizaje sin autoalteración descontrolada', learningText: 'Las conversaciones reales se convierten en evidencia, no en instrucciones inmediatas. El comportamiento solo evoluciona después de consolidación y revisión explícita; los hechos aún requieren fuente oficial.',
    learning: [['Conversación','Mensajes y especialidad activa'],['Evidencia','Resultado, pedido o pago verificado'],['Evaluación','Feedback humano + rúbrica determinista'],['Candidato','Señales consolidadas por táctica y especialidad'],['Bloqueo de fuente','Hechos comerciales exigen Tool, regla o RAG'],['Revisión humana','Aprobar, rechazar o reabrir'],['Dataset','PII eliminada, deduplicado y versionado'],['Prompt candidato','Bundle Sistema, Ventas, SAC y Posventa'],['Canario','Bucket determinista por conversación'],['Promover / rollback','Control auditado de release']],
    thresholds: [['8','conversaciones'],['5','clientes distintos'],['3','resultados verificados'],['4','evidencias favorables'],['72%','confianza mínima'],['≤25%','contradicción']],
    learningCaption: 'La plataforma no entrena automáticamente los modelos de los proveedores y nunca permite que la repetición valide precios, descuentos, garantías o políticas.',
    tenantLabel: 'Multiempresa', tenantTitle: 'Capacidad compartida, contexto aislado', tenantText: 'La infraestructura se comparte deliberadamente. La identidad y los datos comerciales nunca se vuelven globales.',
    sharedTitle: 'Plataforma compartida', sharedItems: ['Gateway y Admin','Infraestructura Chatwoot','Configuraciones de proveedores','Alcance ALL o SELECTED'],
    tenantATitle: 'Tenant A', tenantBTitle: 'Tenant B', tenantItems: ['Identidad y bot','Canales y credenciales','RAG, reglas y prompts','Conversaciones y tarjetas','Logs, resultados y datasets'],
    tenantCaption: 'Cambiar un header en el navegador no concede acceso. El backend resuelve la relación entre usuario autenticado y tenant y niega por defecto IDs desconocidos, inactivos o no autorizados.',
    toolsLabel: 'Integraciones comerciales', toolsTitle: 'Tools convierten respuestas en operaciones verificadas', toolsText: 'Los adapters normalizan sistemas externos sin incrustar reglas de empresa en el modelo. El timeout y el contrato evitan que una integración no disponible se convierta en respuesta inventada.',
    tools: [['Consulta de clientes','Reconoce clientes recurrentes y recupera contexto permitido.'],['Productos y stock','Confirma catálogo, disponibilidad y condiciones.'],['Garantía','Verifica cobertura y política oficial.'],['Órdenes de servicio','Consulta estado e historial reciente.'],['Agendamiento','Consulta disponibilidad y califica la solicitud antes de transferir.'],['Pedidos y pagos','Vincula evidencia comercial verificada con resultados.']],
    sourceOrder: [['1. Tool','Dato vivo y verificado'],['2. RAG del tenant','Conocimiento oficial indexado'],['3. Respuesta limitada','Solo lo respaldado por evidencia']],
    interfacesLabel: 'Maquetas de interfaz', interfacesTitle: 'Control operativo y experiencia del cliente', interfacesText: 'El Admin explica qué conoce el sistema y por qué. Chatwoot mantiene al operador en una bandeja familiar mientras la IA enriquece la conversación en segundo plano.',
    adminTitle: 'Admin Omnichannel', adminNav: ['Vista general','Bots / empresas','IA y proveedores','Conocimiento / RAG','Conversaciones','Mejora continua'],
    adminStats: [['12','conversaciones activas'],['94%','respuestas con fuente'],['3','proveedores saludables']], adminRows: [['Fuente','Estado','Chunks'],['Catálogo de servicios','Listo','428'],['Políticas','Listo','96'],['Respuestas rápidas','Listo','184']],
    chatTitle: 'Conversación con cliente', chatMessages: ['Hola, necesito ayuda con mi dispositivo.','Claro. ¿Cuál es el modelo y qué síntoma presenta?','Es un teléfono que dejó de cargar.','Gracias. Registré el síntoma; dime el modelo exacto para continuar con seguridad.'], chatInput: 'Escribe un mensaje…',
    cardLabel: 'Tarjeta de atención', cardTitle: 'La conversación completa una transferencia estructurada', cardText: 'Los datos confirmados se acumulan sin obligar al cliente a repetir información. Cuando solicita una cita, se recopilan los campos faltantes antes de entregar el caso a una persona.',
    cardStatus: 'Recopilando datos', cardFields: [['ID de conversación','#8421'],['Nombre','Confirmado'],['Teléfono','Confirmado'],['CPF / e-mail','Cuando sea necesario'],['Dispositivo / modelo','Recopilado'],['Servicio / síntoma','Recopilado'],['Unidad deseada','Pendiente'],['Fecha y hora','Pendiente'],['ID de cita','Después de integración'],['Estado','En atención']],
    checklistTitle: 'Transferencia calificada', checklist: ['Contexto de conversación preservado','Especialidad activa registrada','Campos faltantes identificados','Equipo de Chatwoot elegido por sector','La persona recibe la tarjeta completa'],
    dataLabel: 'Persistencia', dataTitle: 'Aplicación portátil, datos privados separados', dataText: 'El código reutilizable puede distribuirse sin identidad empresarial. Configuraciones, archivos de tenants y estado de bases viven en una raíz privada hermana, exportable y restaurable.',
    appStackTitle: 'Repositorio de aplicación', appStack: [['Gateway','Runtime e integraciones'],['Admin','Interfaz de configuración'],['Compose','Servicios y red'],['Docs y pruebas','Contratos y validación']],
    privateStackTitle: 'Raíz de datos privados', privateStack: [['config','Secretos de infraestructura'],['tenants','RAG, reglas, contactos, tarjetas y datasets'],['imports / exports','Grandes archivos de conversaciones'],['state / backups','Bases y volúmenes portátiles']],
    dataCaption: 'El inicio manual puede descargar el estado privado y la parada segura puede crear el snapshot. Nada necesita iniciarse automáticamente con Windows.',
    safetyLabel: 'Confianza y observabilidad', safetyTitle: 'Controles alrededor de cada decisión', safetyText: 'La plataforma registra suficiente evidencia operativa para investigar una respuesta sin exponer secretos ni razonamiento bruto del modelo.',
    safety: [['Seguridad de prompt','El texto del cliente y el historial se higienizan y tratan como datos, nunca como instrucciones del sistema.'],['Idempotencia','Tenant más IDs externos evitan duplicar conversaciones, mensajes y vínculos verificados.'],['Fallback de proveedores','Solo configuraciones habilitadas y autorizadas participan, por prioridad.'],['Grounding','Tools y RAG oficial tienen prioridad; afirmaciones sin fuente pueden bloquearse.'],['Auditoría','Proveedor, modelo, versión de prompt, fuentes RAG, latencia, tokens, costo y errores pertenecen al tenant.'],['Control humano','Transferencias, aprobación del aprendizaje, publicación de dataset, promoción de canario y rollback son acciones explícitas.']],
    closingTitle: 'Construido como sistema operativo de atención, no como un bot aislado', closingText: 'El resultado es una base modular que puede copiarse limpia para otra organización y configurarse con sus datos privados e integraciones, sin llevar identidad, conversaciones ni conocimiento de otra empresa.',
    cta: 'Ver código en GitHub', ctaAria: 'Código del proyecto',
  },
];

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const stageBar = (title) => `<div class="omni-stage-title"><span>${esc(title)}</span><span class="omni-stage-dots" aria-hidden="true"><i></i><i></i><i></i></span></div>`;
const nodes = (items, className = '') => items.map(([title, text]) => `<div class="omni-node ${className}"><strong>${esc(title)}</strong><small>${esc(text)}</small></div>`).join('');
const pipeline = (items) => `<div class="omni-pipeline">${items.map((item, i) => `${i ? '<b aria-hidden="true">→</b>' : ''}<span>${esc(item)}</span>`).join('')}</div>`;
const sectionHead = (c, label, title, text) => `<div class="omni-section-heading"><div><span class="omni-label">${esc(label)}</span><h3>${esc(title)}</h3></div><p>${esc(text)}</p></div>`;
const list = (items) => `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;

function agentSvg(c) {
  const a = c.agents;
  const box = (x, y, w, h, label, desc, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" class="agent-box ${extra}"/><text x="${x + w / 2}" y="${y + 37}" class="agent-name">${esc(label)}</text><text x="${x + w / 2}" y="${y + 62}" class="agent-desc">${esc(desc)}</text>`;
  return `<div class="omni-agent-scroll"><svg class="omni-agent-svg" viewBox="0 0 1000 540" role="img" aria-labelledby="agent-title-${c.lang}"><title id="agent-title-${c.lang}">${esc(c.agentsTitle)}</title>
    <line x1="500" y1="260" x2="190" y2="100" class="link"/><line x1="500" y1="260" x2="190" y2="430" class="link"/>
    <line x1="500" y1="260" x2="810" y2="100" class="link"/><line x1="500" y1="260" x2="810" y2="430" class="link"/>
    <line x1="500" y1="310" x2="500" y2="435" class="link link--quality"/>
    ${box(370, 205, 260, 110, a.hub[0], a.hub[1], 'agent-box--hub')}
    ${box(55, 50, 270, 95, a.intake[0], a.intake[1])}${box(55, 382, 270, 95, a.sales[0], a.sales[1])}
    ${box(675, 50, 270, 95, a.care[0], a.care[1])}${box(675, 382, 270, 95, a.technical[0], a.technical[1])}
    ${box(370, 430, 260, 90, a.quality[0], a.quality[1], 'agent-box--quality')}
  </svg></div>`;
}

function main(c) {
  return `<main role="main" class="omni-case">
    <section class="project-hero">
      <span class="project-category-badge">${esc(c.category)}</span>
      <div class="project-hero-title"><h1>Omnichannel</h1></div>
      <p style="color:#aaa;font-size:1.1rem;margin-top:15px;">${esc(c.lead)}</p>
    </section>
    <section class="full-readme-section" aria-label="${esc(c.docLabel)}"><div class="full-readme-container">
      <h2 style="color:#fff;margin-bottom:20px;">${esc(c.readMore)}</h2>
      <article class="markdown-body">
        <h2>Omnichannel</h2><p class="omni-intro">${c.intro}</p>
        <div class="omni-legend">${c.legend.map((item,index)=>`<span class="omni-chip" style="--chip:${['#69b7ff','#a88bff','#58d6a9','#f4c86a'][index]}">${esc(item)}</span>`).join('')}</div>
        <div class="omni-kpis">${c.kpis.map(([n,t])=>`<div class="omni-kpi"><strong>${esc(n)}</strong><span>${esc(t)}</span></div>`).join('')}</div>

        <section class="omni-section">${sectionHead(c,c.overviewLabel,c.overviewTitle,c.overviewText)}
          <figure class="omni-stage">${stageBar(c.stageTitle)}<div class="omni-architecture">
            <div class="omni-arch-column"><span class="omni-arch-title">${esc(c.arch.channelHint)}</span>${c.arch.channels.map(x=>`<div class="omni-node"><strong>${esc(x)}</strong></div>`).join('')}</div><div class="omni-arrow-column" aria-hidden="true">→</div>
            <div class="omni-arch-column"><div class="omni-node omni-node--core"><strong>${esc(c.arch.chatwoot[0])}</strong><small>${esc(c.arch.chatwoot[1])}</small></div><div class="omni-node omni-node--core"><strong>${esc(c.arch.gateway[0])}</strong><small>${esc(c.arch.gateway[1])}</small></div>${nodes(c.arch.services)}</div><div class="omni-arrow-column" aria-hidden="true">↔</div>
            <div class="omni-arch-column">${nodes(c.arch.data,'omni-node--data')}</div>
          </div><figcaption class="omni-caption">${esc(c.architectureCaption)}</figcaption></figure>
        </section>

        <section class="omni-section">${sectionHead(c,c.lifecycleLabel,c.lifecycleTitle,c.lifecycleText)}
          <div class="omni-stage">${stageBar(c.lifecycleTitle)}<div class="omni-sequence">${c.lifecycle.map(([a,b])=>`<div class="omni-sequence-step"><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join('')}</div></div>
        </section>

        <section class="omni-section">${sectionHead(c,c.agentsLabel,c.agentsTitle,c.agentsText)}
          <figure class="omni-stage">${stageBar(c.agentsTitle)}${agentSvg(c)}<figcaption class="omni-caption">${esc(c.agentCaption)}</figcaption></figure>
        </section>

        <section class="omni-section">${sectionHead(c,c.ragLabel,c.ragTitle,c.ragText)}
          <div class="omni-stage">${stageBar(c.ragTitle)}<div class="omni-dual-flow"><div class="omni-flow-panel"><h4>${esc(c.ragIngestTitle)}</h4>${pipeline(c.ragIngest)}</div><div class="omni-flow-panel"><h4>${esc(c.ragQueryTitle)}</h4>${pipeline(c.ragQuery)}<div class="omni-note">${esc(c.ragNote)}</div></div></div></div>
        </section>

        <section class="omni-section">${sectionHead(c,c.learningLabel,c.learningTitle,c.learningText)}
          <figure class="omni-stage">${stageBar(c.learningTitle)}<div class="omni-learning">${c.learning.map(([a,b],i)=>`<div class="omni-learning-step ${i===4||i===5?'omni-learning-step--gate ':''}${i===8||i===9?'omni-learning-step--release':''}"><em>${String(i+1).padStart(2,'0')}</em><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join('')}</div><div class="omni-thresholds">${c.thresholds.map(([a,b])=>`<div class="omni-threshold"><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join('')}</div><figcaption class="omni-caption">${esc(c.learningCaption)}</figcaption></figure>
        </section>

        <section class="omni-section">${sectionHead(c,c.tenantLabel,c.tenantTitle,c.tenantText)}
          <figure class="omni-stage">${stageBar(c.tenantTitle)}<div class="omni-tenants"><div class="omni-shared"><h4>${esc(c.sharedTitle)}</h4>${list(c.sharedItems)}</div><div class="omni-tenant"><h4>${esc(c.tenantATitle)}</h4>${list(c.tenantItems)}</div><div class="omni-tenant omni-tenant--b"><h4>${esc(c.tenantBTitle)}</h4>${list(c.tenantItems)}</div></div><figcaption class="omni-caption">${esc(c.tenantCaption)}</figcaption></figure>
        </section>

        <section class="omni-section">${sectionHead(c,c.toolsLabel,c.toolsTitle,c.toolsText)}
          <div class="omni-stage">${stageBar(c.toolsTitle)}<div class="omni-tool-grid">${c.tools.map(([a,b])=>`<div class="omni-tool"><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join('')}</div><div class="omni-source-order">${c.sourceOrder.map(([a,b],i)=>`${i?'<div class="omni-source-arrow" aria-hidden="true">→</div>':''}<div class="omni-source"><strong>${esc(a)}</strong><small>${esc(b)}</small></div>`).join('')}</div></div>
        </section>

        <section class="omni-section">${sectionHead(c,c.interfacesLabel,c.interfacesTitle,c.interfacesText)}
          <div class="omni-mockups">
            <figure class="omni-window"><div class="omni-window-bar"><span>${esc(c.adminTitle)}</span><span class="omni-stage-dots"><i></i><i></i><i></i></span></div><div class="omni-window-body"><aside class="omni-mock-sidebar"><div class="omni-mock-brand">OMNI</div><div class="omni-mock-nav">${c.adminNav.map((x,i)=>`<span class="${i===2?'active':''}">${esc(x)}</span>`).join('')}</div></aside><div class="omni-mock-main"><div class="omni-mock-title"><span>${esc(c.adminTitle)}</span><span class="omni-mock-pill">Tenant Alpha</span></div><div class="omni-mock-grid">${c.adminStats.map(([a,b])=>`<div class="omni-mock-stat"><b>${esc(a)}</b><small>${esc(b)}</small></div>`).join('')}</div><div class="omni-mock-table">${c.adminRows.map(r=>`<div class="omni-mock-row">${r.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`).join('')}</div></div></div></figure>
            <figure class="omni-window omni-chat-window"><div class="omni-window-bar"><span>Chatwoot</span><span>● online</span></div><div class="omni-window-body"><div class="omni-chat-area"><div class="omni-chat-head">${esc(c.chatTitle)}</div><div class="omni-chat-messages">${c.chatMessages.map((x,i)=>`<div class="omni-bubble ${i%2?'omni-bubble--bot':''}">${esc(x)}</div>`).join('')}</div><div class="omni-chat-input">${esc(c.chatInput)}</div></div></div></figure>
          </div>
        </section>

        <section class="omni-section">${sectionHead(c,c.cardLabel,c.cardTitle,c.cardText)}
          <div class="omni-card-layout"><div class="omni-service-card"><div class="omni-service-card-head"><strong>${esc(c.cardLabel)} #8421</strong><span class="omni-status">${esc(c.cardStatus)}</span></div><div class="omni-fields">${c.cardFields.map(([a,b])=>`<div class="omni-field"><small>${esc(a)}</small><b>${esc(b)}</b></div>`).join('')}</div></div><aside class="omni-checklist"><h4>${esc(c.checklistTitle)}</h4>${c.checklist.map(x=>`<div class="omni-check">${esc(x)}</div>`).join('')}</aside></div>
        </section>

        <section class="omni-section">${sectionHead(c,c.dataLabel,c.dataTitle,c.dataText)}
          <figure class="omni-stage">${stageBar(c.dataTitle)}<div class="omni-data-map"><div class="omni-data-stack"><h4>${esc(c.appStackTitle)}</h4>${c.appStack.map(([a,b])=>`<div class="omni-data-box"><strong>${esc(a)}</strong><small>${esc(b)}</small></div>`).join('')}</div><div class="omni-data-arrow" aria-hidden="true">⇄</div><div class="omni-data-stack"><h4>${esc(c.privateStackTitle)}</h4>${c.privateStack.map(([a,b])=>`<div class="omni-data-box"><strong>${esc(a)}</strong><small>${esc(b)}</small></div>`).join('')}</div></div><figcaption class="omni-caption">${esc(c.dataCaption)}</figcaption></figure>
        </section>

        <section class="omni-section">${sectionHead(c,c.safetyLabel,c.safetyTitle,c.safetyText)}<div class="omni-safety-grid">${c.safety.map(([a,b])=>`<div class="omni-safety"><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join('')}</div></section>
        <section class="omni-section"><h3>${esc(c.closingTitle)}</h3><p class="omni-intro">${esc(c.closingText)}</p></section>
      </article>
    </div></section>
    <section class="cta-section" aria-label="${esc(c.ctaAria)}"><a class="cta-button" href="https://github.com/PkLavc/omnichannel" target="_blank" rel="noopener noreferrer">${esc(c.cta)}</a></section>
  </main>`;
}

for (const c of configs) {
  let html = readFileSync(c.file, 'utf8');
  if (!html.includes('/css/omnichannel-case-study.css')) {
    html = html.replace(/(<link rel="stylesheet" href="\/css\/projects\.css\?v=[^"]+">)/, '$1\n    <link rel="stylesheet" href="/css/omnichannel-case-study.css">');
  }
  html = html.replace(/\s*<main role="main"(?: class="[^"]*")?>[\s\S]*?<\/main>/, `\n        ${main(c)}`);
  writeFileSync(c.file, html, 'utf8');
}
