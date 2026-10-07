(function () {
  'use strict';

  function init() {
    var horizon = document.querySelector('.blog-horizon');
    var stage = horizon && horizon.querySelector('.blog-horizon-stage');
    var canvas = stage && stage.querySelector('[data-horizon-canvas]');
    var contentSections = stage ? stage.querySelectorAll('[data-horizon-section]') : [];
    var carousel = document.querySelector('[data-blog-carousel]');
    var track = carousel && carousel.querySelector('.blog-carousel-track');
    var library = document.querySelector('.blog-library');
    var footer = document.querySelector('.footer-minimal');
    var skipButton = stage && stage.querySelector('[data-skip-to-posts]');
    var source = library ? library.querySelectorAll('.blog-card') : [];
    var cards = [];
    var activeCard = 0;
    var autoplayTimer = 0;
    var autoplayDelay = 8000;
    var dragPointer = null;
    var dragStartX = 0;
    var dragOffset = 0;
    var dragBaseCard = 0;
    var dragMoved = false;
    var suppressClickUntil = 0;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var totalSections = 2;
    var scrollProgress = 0;

    if (!horizon || !stage || !canvas) return;

    if (carousel) {
      stage.appendChild(carousel);
      carousel.classList.add('is-in-scene');
      carousel.setAttribute('aria-hidden', 'true');
      // The carousel is visually and pointer-event hidden until its scene is
      // active. Do not use `inert` here: it remains active after the scene is
      // revealed and makes every article link unclickable.
    }
    if (footer) {
      stage.appendChild(footer);
      footer.classList.add('blog-footer-overlay');
      footer.setAttribute('aria-hidden', 'true');
      function syncFooterHeight() {
        stage.style.setProperty('--blog-footer-height', footer.offsetHeight + 'px');
      }
      syncFooterHeight();
      if ('ResizeObserver' in window) new ResizeObserver(syncFooterHeight).observe(footer);
    }

    function populateCarousel() {
      if (!track || !source.length || cards.length) return;
      var fragment = document.createDocumentFragment();
      Array.prototype.slice.call(source).forEach(function (card) {
        card.classList.add('blog-carousel-card');
        card.setAttribute('data-glow', '');
        card.querySelectorAll('[id]').forEach(function (node) { node.removeAttribute('id'); });
        fragment.appendChild(card);
      });
      track.appendChild(fragment);
      cards = Array.prototype.slice.call(track.querySelectorAll('.blog-carousel-card'));
      if (library) library.remove();
      renderCoverflow(activeCard);
    }

    function syncGlowPointer(event) {
      if (!stage.classList.contains('show-carousel')) return;
      cards.forEach(function (card) {
        if (card.style.visibility !== 'visible') return;
        var rect = card.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        // Blend the site's cyan (#00d1ff) into pink (#ff2aaa) across the card.
        var pinkAmount = Math.max(0, Math.min(1, x / Math.max(rect.width, 1)));
        card.style.setProperty('--x', x.toFixed(2) + 'px');
        card.style.setProperty('--y', y.toFixed(2) + 'px');
        card.style.setProperty('--spotlight-color', 'rgb(' +
          Math.round(255 * pinkAmount) + ' ' +
          Math.round(209 - 167 * pinkAmount) + ' ' +
          Math.round(255 - 85 * pinkAmount) + ')');
      });
    }
    document.addEventListener('pointermove', syncGlowPointer, { passive: true });

    function renderCoverflow(position) {
      if (!cards.length) return;
      var spacing = Math.max(86, Math.min(window.innerWidth * 0.22, 290));
      var visualPosition = position == null ? activeCard : position;
      cards.forEach(function (card, index) {
        var relative = index - visualPosition;
        if (cards.length > 2) {
          while (relative > cards.length / 2) relative -= cards.length;
          while (relative < -cards.length / 2) relative += cards.length;
        }
        var distance = Math.abs(relative);
        var direction = relative < 0 ? -1 : relative > 0 ? 1 : 0;
        var visible = distance <= 3.5;
        var isActive = index === activeCard;
        var x = relative * spacing;
        var rotate = direction * -56 * Math.min(1, distance);
        card.style.setProperty('--coverflow-x', x.toFixed(1) + 'px');
        card.style.setProperty('--coverflow-z', (-distance * 105).toFixed(1) + 'px');
        card.style.setProperty('--coverflow-rotate', rotate + 'deg');
        card.style.setProperty('--coverflow-scale', Math.max(0.72, 1 - distance * 0.1).toFixed(3));
        card.style.setProperty('--coverflow-opacity', visible ? Math.max(0.08, 1 - distance * 0.24).toFixed(3) : '0');
        card.style.zIndex = String(100 - distance);
        card.style.visibility = visible ? 'visible' : 'hidden';
        card.classList.toggle('is-active', isActive);
        card.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        card.querySelectorAll('a, button').forEach(function (control) {
          control.tabIndex = isActive ? 0 : -1;
        });
      });
      track.dataset.activeIndex = String(activeCard);
    }

    function setActiveCard(index) {
      if (!cards.length) return;
      activeCard = ((index % cards.length) + cards.length) % cards.length;
      renderCoverflow(activeCard);
    }

    function scheduleAutoplay(delay) {
      window.clearTimeout(autoplayTimer);
      if (reduced || cards.length < 2 || document.hidden || !stage.classList.contains('show-carousel')) return;
      autoplayTimer = window.setTimeout(function advanceCarousel() {
        if (dragPointer !== null || track.matches(':focus-within')) {
          scheduleAutoplay(autoplayDelay);
          return;
        }
        setActiveCard(activeCard + 1);
        scheduleAutoplay(autoplayDelay);
      }, delay == null ? autoplayDelay : delay);
    }

    if (track) {
      track.tabIndex = 0;
      track.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') { event.preventDefault(); setActiveCard(activeCard - 1); scheduleAutoplay(autoplayDelay); }
        if (event.key === 'ArrowRight') { event.preventDefault(); setActiveCard(activeCard + 1); scheduleAutoplay(autoplayDelay); }
      });
      track.addEventListener('pointerdown', function (event) {
        if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
        dragPointer = event.pointerId;
        dragStartX = event.clientX;
        dragOffset = 0;
        dragBaseCard = activeCard;
        dragMoved = false;
        window.clearTimeout(autoplayTimer);
        track.classList.add('is-dragging');
      });
      track.addEventListener('pointermove', function (event) {
        if (event.pointerId !== dragPointer) return;
        dragOffset = event.clientX - dragStartX;
        if (Math.abs(dragOffset) > 6) dragMoved = true;
        var spacing = Math.max(86, Math.min(window.innerWidth * 0.22, 290));
        var visualPosition = dragBaseCard - dragOffset / spacing;
        activeCard = ((Math.round(visualPosition) % cards.length) + cards.length) % cards.length;
        renderCoverflow(visualPosition);
      });
      track.addEventListener('dragstart', function (event) { event.preventDefault(); });
      function finishDrag(event) {
        if (event.pointerId !== dragPointer) return;
        track.classList.remove('is-dragging');
        if (dragMoved) suppressClickUntil = Date.now() + 350;
        dragPointer = null;
        dragOffset = 0;
        void track.offsetWidth;
        renderCoverflow(activeCard);
        scheduleAutoplay(autoplayDelay);
      }
      track.addEventListener('pointerup', finishDrag);
      track.addEventListener('pointercancel', finishDrag);
      track.addEventListener('click', function (event) {
        if (Date.now() < suppressClickUntil) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        var card = event.target.closest('.blog-carousel-card');
        if (!card) return;
        var index = cards.indexOf(card);
        if (index !== activeCard) {
          event.preventDefault();
          setActiveCard(index);
          scheduleAutoplay(autoplayDelay);
          return;
        }
        var link = card.querySelector('h3 a');
        if (link) {
          event.preventDefault();
          window.location.assign(link.href);
        }
      });
      track.addEventListener('focusin', function () { window.clearTimeout(autoplayTimer); });
      track.addEventListener('focusout', function () { scheduleAutoplay(autoplayDelay); });
      document.addEventListener('visibilitychange', function () { scheduleAutoplay(autoplayDelay); });
      new MutationObserver(function () {
        if (stage.classList.contains('show-carousel')) scheduleAutoplay(autoplayDelay);
        else window.clearTimeout(autoplayTimer);
      }).observe(stage, { attributes: true, attributeFilter: ['class'] });
    }
    renderCoverflow(activeCard);
    scheduleAutoplay(autoplayDelay);
    window.addEventListener('resize', function () { renderCoverflow(activeCard); });

    if (skipButton) skipButton.addEventListener('click', function () {
      var horizonTop = horizon.getBoundingClientRect().top + window.scrollY;
      var destination = horizonTop + Math.max(1, horizon.offsetHeight - window.innerHeight);
      window.scrollTo({ top: destination, behavior: reduced ? 'auto' : 'smooth' });
    });

    var fallbackHandlers = null;
    function showFallback() {
      if (fallbackHandlers) return;
      stage.classList.add('horizon-fallback');
      function updateFallbackScroll() {
        var bounds = horizon.getBoundingClientRect();
        var travel = Math.max(1, horizon.offsetHeight - window.innerHeight);
        scrollProgress = Math.max(0, Math.min(1, -bounds.top / travel));
        stage.style.setProperty('--hero-progress', scrollProgress.toFixed(4));
        var introOpacity = scrollProgress <= 0.18 ? 1 : Math.max(0, 1 - (scrollProgress - 0.18) / 0.12);
        var cosmosOpacity = scrollProgress < 0.24 ? 0 : scrollProgress < 0.34 ? (scrollProgress - 0.24) / 0.1 : scrollProgress <= 0.5 ? 1 : Math.max(0, 1 - (scrollProgress - 0.5) / 0.12);
        var infinityOpacity = scrollProgress < 0.58 ? 0 : scrollProgress < 0.68 ? (scrollProgress - 0.58) / 0.1 : scrollProgress <= 0.8 ? 1 : Math.max(0, 1 - (scrollProgress - 0.8) / 0.1);
        var copy = stage.querySelector('.blog-horizon-copy');
        if (copy) copy.style.opacity = introOpacity.toFixed(3);
        if (contentSections[0]) contentSections[0].style.opacity = cosmosOpacity.toFixed(3);
        if (contentSections[1]) contentSections[1].style.opacity = infinityOpacity.toFixed(3);
        var pageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
        var finalStage = scrollProgress >= 0.999 && pageEnd;
        if (finalStage) populateCarousel();
        stage.classList.toggle('show-carousel', finalStage);
        if (carousel) carousel.setAttribute('aria-hidden', finalStage ? 'false' : 'true');
        if (footer) footer.setAttribute('aria-hidden', finalStage ? 'false' : 'true');
      }
      updateFallbackScroll();
      window.addEventListener('scroll', updateFallbackScroll, { passive: true });
      window.addEventListener('resize', updateFallbackScroll);
      fallbackHandlers = { scroll: updateFallbackScroll };
    }

    showFallback();
    function startWebGL() {
      if (!window.THREE) return;
      if (fallbackHandlers) {
        window.removeEventListener('scroll', fallbackHandlers.scroll);
        window.removeEventListener('resize', fallbackHandlers.scroll);
        fallbackHandlers = null;
      }
      stage.classList.remove('horizon-fallback');
    var THREE = window.THREE;
    var compactViewport = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;

    var refs = {
      scene: new THREE.Scene(), camera: null, renderer: null, composer: null,
      stars: [], nebula: null, mountains: [], atmosphere: null, locations: [],
      animationId: null, targetCameraX: 0, targetCameraY: 30, targetCameraZ: 300,
      sceneVisible: null, lastFrameTime: 0, resizeObserver: null,
      foregroundOpacity: 0, foregroundStartTime: null, foregroundTimer: 0
    };
    var smoothCameraPos = { x: 0, y: 30, z: 100 };

    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);
    refs.camera = new THREE.PerspectiveCamera(compactViewport ? 84 : 75, 1, 0.1, 2000);
    refs.camera.position.set(0, 20, 100);
    try {
      refs.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    } catch (error) {
      showFallback();
      return;
    }
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compactViewport ? 1.15 : 1.5));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;
    if (!compactViewport && THREE.EffectComposer && THREE.RenderPass && THREE.UnrealBloomPass) {
      refs.composer = new THREE.EffectComposer(refs.renderer);
      refs.composer.addPass(new THREE.RenderPass(refs.scene, refs.camera));
      refs.composer.addPass(new THREE.UnrealBloomPass(new THREE.Vector2(1, 1), compactViewport ? 0.48 : 0.8, compactViewport ? 0.28 : 0.4, compactViewport ? 0.92 : 0.85));
    }

    function createStarField() {
      // Mobile GPUs were producing visible point trails/banding on real devices.
      // Keep the rest of the 3D scene and remove only the star particles there.
      if (compactViewport) return;
      var starCount = 2200;
      for (var layer = 0; layer < 3; layer += 1) {
        var geometry = new THREE.BufferGeometry();
        var positions = new Float32Array(starCount * 3);
        var colors = new Float32Array(starCount * 3);
        var sizes = new Float32Array(starCount);
        for (var index = 0; index < starCount; index += 1) {
          var radius = 200 + Math.random() * 800;
          var theta = Math.random() * Math.PI * 2;
          var phi = Math.acos(Math.random() * 2 - 1);
          var color = new THREE.Color();
          var colorChoice = Math.random();
          positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[index * 3 + 2] = radius * Math.cos(phi);
          var pathX = positions[index * 3];
          var pathY = positions[index * 3 + 1] - 40;
          var pathDistance = Math.max(0.001, Math.hypot(pathX, pathY));
          var pathClearance = compactViewport ? 115 : 70;
          if (pathDistance < pathClearance) {
            positions[index * 3] = pathX * pathClearance / pathDistance;
            positions[index * 3 + 1] = 40 + pathY * pathClearance / pathDistance;
          }
          if (colorChoice < 0.7) color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          else if (colorChoice < 0.9) color.setHSL(0.08, 0.5, 0.8);
          else color.setHSL(0.6, 0.5, 0.8);
          colors[index * 3] = color.r;
          colors[index * 3 + 1] = color.g;
          colors[index * 3 + 2] = color.b;
          sizes[index] = Math.random() * 2 + 0.5;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        var material = new THREE.ShaderMaterial({
          uniforms: { time: { value: 0 }, depth: { value: layer }, foregroundOpacity: { value: 0 } },
          vertexShader: [
            'attribute float size;', 'attribute vec3 color;', 'varying vec3 vColor;', 'varying float vVisible;',
            'uniform float time;', 'uniform float depth;', 'void main() {',
            'vColor = color; vec3 pos = position;',
            'float angle = time * 0.05 * (1.0 - depth * 0.3);',
            'mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));',
            'pos.xy = rot * pos.xy;',
            'vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);',
            'vVisible = step(mvPosition.z, -2.0);',
            'float depthScale = clamp(240.0 / max(24.0, -mvPosition.z), 0.35, 2.4);',
            'gl_PointSize = clamp(size * depthScale, 0.65, 4.2);',
            'gl_Position = projectionMatrix * mvPosition;', '}'
          ].join('\n'),
          fragmentShader: [
            'varying vec3 vColor;', 'varying float vVisible;', 'uniform float foregroundOpacity;', 'void main() {',
            'if (vVisible < 0.5) discard;',
            'float dist = length(gl_PointCoord - vec2(0.5));', 'if (dist > 0.5) discard;',
            'float opacity = 1.0 - smoothstep(0.0, 0.5, dist);',
            'gl_FragColor = vec4(vColor, opacity * foregroundOpacity);', '}'
          ].join('\n'),
          transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
        });
        var starField = new THREE.Points(geometry, material);
        refs.scene.add(starField);
        refs.stars.push(starField);
      }
    }

    function createNebula() {
      var geometry = new THREE.PlaneGeometry(8000, 4000, 48, 32);
      var material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }, color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) }, opacity: { value: 0.3 }
        },
        vertexShader: [
          'varying vec2 vUv;', 'varying float vElevation;', 'uniform float time;', 'void main() {',
          'vUv = uv; vec3 pos = position;',
          'float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;',
          'pos.z += elevation; vElevation = elevation;',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);', '}'
        ].join('\n'),
        fragmentShader: [
          'uniform vec3 color1;', 'uniform vec3 color2;', 'uniform float opacity;', 'uniform float time;',
          'varying vec2 vUv;', 'varying float vElevation;', 'void main() {',
          'float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);',
          'vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);',
          'float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);',
          'alpha *= 1.0 + vElevation * 0.01;', 'gl_FragColor = vec4(color, alpha);', '}'
        ].join('\n'),
        transparent: true, blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide, depthWrite: false
      });
      refs.nebula = new THREE.Mesh(geometry, material);
      refs.nebula.position.z = -1050;
      refs.scene.add(refs.nebula);
    }

    function createMountains() {
      var layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 }
      ];
      layers.forEach(function (layer, layerIndex) {
        var points = [];
        for (var index = 0; index <= 50; index += 1) {
          var x = (index / 50 - 0.5) * 1000;
          var y = Math.sin(index * 0.1) * layer.height + Math.sin(index * 0.05) * layer.height * 0.5 + Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        // Extend the fill well below the camera frustum so the terrain cannot
        // expose the polygon's straight closing edge on tall/mobile viewports.
        points.push(new THREE.Vector2(7000, -2600));
        points.push(new THREE.Vector2(-7000, -2600));
        var mountain = new THREE.Mesh(
          new THREE.ShapeGeometry(new THREE.Shape(points)),
          new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: 0, side: THREE.DoubleSide })
        );
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance;
        mountain.userData = { baseZ: layer.distance, index: layerIndex, targetOpacity: layer.opacity };
        refs.scene.add(mountain);
        refs.mountains.push(mountain);
        refs.locations.push(layer.distance);
      });
    }

    function createAtmosphere() {
      var material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: [
          'varying vec3 vNormal;', 'varying vec3 vPosition;', 'void main() {',
          'vNormal = normalize(normalMatrix * normal); vPosition = position;',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);', '}'
        ].join('\n'),
        fragmentShader: [
          'varying vec3 vNormal;', 'varying vec3 vPosition;', 'uniform float time;', 'void main() {',
          'float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);',
          'vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;',
          'float pulse = sin(time * 2.0) * 0.1 + 0.9; atmosphere *= pulse;',
          'gl_FragColor = vec4(atmosphere, intensity * 0.25);', '}'
        ].join('\n'),
        side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true
      });
      refs.atmosphere = new THREE.Mesh(new THREE.SphereGeometry(600, 32, 32), material);
      refs.scene.add(refs.atmosphere);
    }

    createNebula();
    createAtmosphere();

    function resize() {
      var bounds = stage.getBoundingClientRect();
      var width = Math.max(1, bounds.width);
      var height = Math.max(1, bounds.height);
      refs.camera.aspect = width / height;
      refs.camera.updateProjectionMatrix();
      if (refs.viewportWidth === width && refs.viewportHeight === height) return;
      refs.viewportWidth = width;
      refs.viewportHeight = height;
      refs.renderer.setSize(width, height, false);
      if (refs.composer) refs.composer.setSize(width, height);
    }

    function updateScroll() {
      var bounds = horizon.getBoundingClientRect();
      var travel = Math.max(1, horizon.offsetHeight - window.innerHeight);
      scrollProgress = Math.max(0, Math.min(1, -bounds.top / travel));
      var totalProgress = scrollProgress * totalSections;
      var currentSection = Math.min(totalSections, Math.floor(totalProgress));
      var sectionProgress = totalProgress % 1;
      var cameraPositions = [
        { x: 0, y: 30, z: 300 }, { x: 0, y: 40, z: -50 }, { x: 0, y: 50, z: -700 }
      ];
      var currentPos = cameraPositions[currentSection] || cameraPositions[0];
      var nextPos = cameraPositions[currentSection + 1] || currentPos;
      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;
      refs.mountains.forEach(function (mountain, index) {
        var speed = 1 + index * 0.9;
        var targetZ = mountain.userData.baseZ + (-bounds.top) * speed * 0.5;
        refs.nebula.position.z = targetZ + scrollProgress * speed * 0.01 - 100;
        mountain.userData.targetZ = targetZ;
        mountain.position.z = scrollProgress > 0.7 ? 600000 : refs.locations[index];
      });
      if (refs.mountains.length) refs.nebula.position.z = refs.mountains[refs.mountains.length - 1].position.z;
      stage.style.setProperty('--hero-progress', scrollProgress.toFixed(4));
      var introOpacity = scrollProgress <= 0.18 ? 1 : Math.max(0, 1 - (scrollProgress - 0.18) / 0.12);
      var cosmosOpacity = scrollProgress < 0.24 ? 0 : scrollProgress < 0.34 ? (scrollProgress - 0.24) / 0.1 : scrollProgress <= 0.5 ? 1 : Math.max(0, 1 - (scrollProgress - 0.5) / 0.12);
      var infinityOpacity = scrollProgress < 0.58 ? 0 : scrollProgress < 0.68 ? (scrollProgress - 0.58) / 0.1 : scrollProgress <= 0.8 ? 1 : Math.max(0, 1 - (scrollProgress - 0.8) / 0.1);
      if (stage.querySelector('.blog-horizon-copy')) stage.querySelector('.blog-horizon-copy').style.opacity = introOpacity.toFixed(3);
      if (contentSections[0]) contentSections[0].style.opacity = cosmosOpacity.toFixed(3);
      if (contentSections[1]) contentSections[1].style.opacity = infinityOpacity.toFixed(3);
      var pageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
      var finalStage = scrollProgress >= 0.999 && pageEnd;
      if (finalStage) populateCarousel();
      stage.classList.toggle('show-carousel', finalStage);
      if (carousel) carousel.setAttribute('aria-hidden', finalStage ? 'false' : 'true');
      if (footer) footer.setAttribute('aria-hidden', finalStage ? 'false' : 'true');
    }

    function animate(frameTime) {
      refs.animationId = 0;
      if (document.hidden || !stage.isConnected || (refs.sceneVisible === false)) return;
      refs.animationId = window.requestAnimationFrame(animate);
      if (compactViewport && frameTime - refs.lastFrameTime < 1000 / 30) return;
      refs.lastFrameTime = frameTime;
      var time = Date.now() * 0.001;
      if (refs.foregroundStartTime !== null) {
        refs.foregroundOpacity = Math.min(1, Math.max(0, (performance.now() - refs.foregroundStartTime) / 1100));
      }
      refs.stars.forEach(function (starField) {
        starField.material.uniforms.time.value = reduced ? 0 : time;
        starField.material.uniforms.foregroundOpacity.value = refs.foregroundOpacity;
      });
      refs.nebula.material.uniforms.time.value = reduced ? 0 : time * 0.5;
      refs.atmosphere.material.uniforms.time.value = reduced ? 0 : time;
      var smoothingFactor = reduced ? 1 : 0.05;
      smoothCameraPos.x += (refs.targetCameraX - smoothCameraPos.x) * smoothingFactor;
      smoothCameraPos.y += (refs.targetCameraY - smoothCameraPos.y) * smoothingFactor;
      smoothCameraPos.z += (refs.targetCameraZ - smoothCameraPos.z) * smoothingFactor;
      var floatX = reduced ? 0 : Math.sin(time * 0.1) * 2;
      var floatY = reduced ? 0 : Math.cos(time * 0.15);
      refs.camera.position.set(smoothCameraPos.x + floatX, smoothCameraPos.y + floatY, smoothCameraPos.z);
      refs.camera.lookAt(0, 10, -600);
      refs.mountains.forEach(function (mountain, index) {
        var parallaxFactor = 1 + index * 0.5;
        mountain.material.opacity = mountain.userData.targetOpacity * refs.foregroundOpacity;
        mountain.position.x = reduced ? 0 : Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + (reduced ? 0 : Math.cos(time * 0.15) * parallaxFactor);
      });
      if (refs.composer) refs.composer.render();
      else refs.renderer.render(refs.scene, refs.camera);
    }

    resize();
    updateScroll();
    animate();
    stage.classList.add('horizon-scene-ready');
    refs.foregroundTimer = window.setTimeout(function () {
      if (!stage.isConnected) return;
      createStarField();
      createMountains();
      refs.foregroundStartTime = performance.now();
      updateScroll();
    }, 1250);
    if ('IntersectionObserver' in window) {
      var sceneObserver = new IntersectionObserver(function (entries) {
        refs.sceneVisible = entries[0].isIntersecting;
        if (refs.sceneVisible && !document.hidden && !refs.animationId) animate();
        else if (!refs.sceneVisible && refs.animationId) {
          window.cancelAnimationFrame(refs.animationId);
          refs.animationId = 0;
        }
      }, { threshold: 0.01 });
      sceneObserver.observe(stage);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && refs.animationId) {
        window.cancelAnimationFrame(refs.animationId);
        refs.animationId = 0;
      } else if (!document.hidden && !refs.animationId && refs.sceneVisible !== false) {
        animate();
      }
    });
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateScroll, { passive: true });
    if ('ResizeObserver' in window) {
      refs.resizeObserver = new ResizeObserver(resize);
      refs.resizeObserver.observe(stage);
    }
    }

    var dependencies = window.PkLavcBlogHorizonReady || Promise.resolve(false);
    dependencies.then(function (available) {
      if (available) startWebGL();
    });
  }

  function boot() {
    init();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}());
