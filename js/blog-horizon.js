(function () {
  'use strict';

  function init() {
    var horizon = document.querySelector('.blog-horizon');
    var stage = horizon && horizon.querySelector('.blog-horizon-stage');
    var canvas = stage && stage.querySelector('[data-horizon-canvas]');
    var title = stage && stage.querySelector('.hero-title');
    var subtitle = stage && stage.querySelector('.hero-subtitle');
    var menu = stage && stage.querySelector('.side-menu');
    var contentSections = stage ? stage.querySelectorAll('[data-horizon-section]') : [];
    var carousel = document.querySelector('[data-blog-carousel]');
    var track = carousel && carousel.querySelector('.blog-carousel-track');
    var library = document.querySelector('.blog-library');
    var footer = document.querySelector('.footer-minimal');
    var skipButton = stage && stage.querySelector('[data-skip-to-posts]');
    var source = library ? library.querySelectorAll('.blog-card') : [];
    var cards = [];
    var activeCard = 0;
    var hoverTimer = 0;
    var hoverCandidate = -1;
    var hoverLockedUntil = 0;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var totalSections = 2;

    if (!horizon || !stage || !canvas) return;

    if (carousel) {
      stage.appendChild(carousel);
      carousel.classList.add('is-in-scene');
      carousel.setAttribute('aria-hidden', 'true');
      carousel.inert = true;
    }
    if (footer) {
      stage.appendChild(footer);
      footer.classList.add('blog-footer-overlay');
      footer.setAttribute('aria-hidden', 'true');
      footer.inert = true;
    }

    if (track && source.length && !track.children.length) {
      Array.prototype.slice.call(source).forEach(function (card) {
        card.classList.add('blog-carousel-card');
        card.querySelectorAll('[id]').forEach(function (node) { node.removeAttribute('id'); });
        track.appendChild(card);
      });
      cards = Array.prototype.slice.call(track.querySelectorAll('.blog-carousel-card'));
      library.remove();
    }

    function renderCoverflow(offset) {
      if (!cards.length) return;
      var spacing = Math.min(window.innerWidth * 0.22, 290);
      cards.forEach(function (card, index) {
        var relative = index - activeCard;
        var distance = Math.abs(relative);
        var direction = relative < 0 ? -1 : 1;
        var visible = distance <= 3;
        var x = relative * spacing + (offset || 0) * Math.max(0.18, 1 - distance * 0.16);
        var rotate = relative === 0 ? 0 : direction * -56;
        card.style.setProperty('--coverflow-x', x.toFixed(1) + 'px');
        card.style.setProperty('--coverflow-z', (-distance * 105).toFixed(1) + 'px');
        card.style.setProperty('--coverflow-rotate', rotate + 'deg');
        card.style.setProperty('--coverflow-scale', Math.max(0.72, 1 - distance * 0.1).toFixed(3));
        card.style.setProperty('--coverflow-opacity', visible ? Math.max(0.2, 1 - distance * 0.22).toFixed(3) : '0');
        card.style.zIndex = String(100 - distance);
        card.style.visibility = visible ? 'visible' : 'hidden';
        card.classList.toggle('is-active', relative === 0);
        card.setAttribute('aria-hidden', relative === 0 ? 'false' : 'true');
        card.querySelectorAll('a, button').forEach(function (control) {
          control.tabIndex = relative === 0 ? 0 : -1;
        });
      });
      track.dataset.activeIndex = String(activeCard);
    }

    function setActiveCard(index) {
      activeCard = Math.max(0, Math.min(cards.length - 1, index));
      renderCoverflow(0);
    }
    if (track) {
      track.tabIndex = 0;
      track.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') { event.preventDefault(); setActiveCard(activeCard - 1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); setActiveCard(activeCard + 1); }
      });
      track.addEventListener('mousemove', function (event) {
        if (Date.now() < hoverLockedUntil) return;
        var activeRect = cards[activeCard] && cards[activeCard].getBoundingClientRect();
        if (activeRect && event.clientX >= activeRect.left && event.clientX <= activeRect.right && event.clientY >= activeRect.top && event.clientY <= activeRect.bottom) {
          hoverCandidate = -1;
          window.clearTimeout(hoverTimer);
          return;
        }
        var candidate = cards.findIndex(function (card, index) {
          if (index === activeCard || card.style.visibility === 'hidden') return false;
          var rect = card.getBoundingClientRect();
          return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
        });
        if (candidate < 0 || candidate === hoverCandidate) return;
        hoverCandidate = candidate;
        window.clearTimeout(hoverTimer);
        hoverTimer = window.setTimeout(function () {
          if (hoverCandidate < 0 || hoverCandidate === activeCard) return;
          setActiveCard(hoverCandidate);
          hoverLockedUntil = Date.now() + 650;
          hoverCandidate = -1;
        }, 120);
      });
      track.addEventListener('mouseleave', function () {
        hoverCandidate = -1;
        window.clearTimeout(hoverTimer);
      });
      track.addEventListener('click', function (event) {
        if (event.target !== track) return;
        var candidate = cards.findIndex(function (card, index) {
          if (index === activeCard || card.style.visibility === 'hidden') return false;
          var rect = card.getBoundingClientRect();
          return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
        });
        if (candidate >= 0) setActiveCard(candidate);
      });
      cards.forEach(function (card, index) {
        card.addEventListener('mouseenter', function () {
          if (index === activeCard) return;
          window.clearTimeout(hoverTimer);
          hoverTimer = window.setTimeout(function () {
            if (card.matches(':hover')) setActiveCard(index);
          }, 120);
        });
        card.addEventListener('mouseleave', function () { window.clearTimeout(hoverTimer); });
        card.addEventListener('click', function (event) {
          if (index !== activeCard) {
            event.preventDefault();
            setActiveCard(index);
            return;
          }
          if (!event.target.closest('a')) {
            var link = card.querySelector('h3 a');
            if (link) window.location.assign(link.href);
          }
        });
      });
    }
    renderCoverflow(0);
    window.addEventListener('resize', function () { renderCoverflow(0); });

    if (skipButton) skipButton.addEventListener('click', function () {
      var horizonTop = horizon.getBoundingClientRect().top + window.scrollY;
      var destination = horizonTop + Math.max(1, horizon.offsetHeight - window.innerHeight);
      window.scrollTo({ top: destination, behavior: reduced ? 'auto' : 'smooth' });
    });

    if (!window.THREE || !window.gsap) {
      stage.classList.add('horizon-fallback');
      return;
    }
    var THREE = window.THREE;
    if (window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);

    var refs = {
      scene: new THREE.Scene(), camera: null, renderer: null, composer: null,
      stars: [], nebula: null, mountains: [], atmosphere: null, locations: [],
      animationId: null, targetCameraX: 0, targetCameraY: 30, targetCameraZ: 300
    };
    var smoothCameraPos = { x: 0, y: 30, z: 100 };
    var scrollProgress = 0;

    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);
    refs.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2000);
    refs.camera.position.set(0, 20, 100);
    try {
      refs.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    } catch (error) {
      stage.classList.add('horizon-fallback');
      return;
    }
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;
    if (THREE.EffectComposer && THREE.RenderPass && THREE.UnrealBloomPass) {
      refs.composer = new THREE.EffectComposer(refs.renderer);
      refs.composer.addPass(new THREE.RenderPass(refs.scene, refs.camera));
      refs.composer.addPass(new THREE.UnrealBloomPass(new THREE.Vector2(1, 1), 0.8, 0.4, 0.85));
    }

    function createStarField() {
      var starCount = 5000;
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
          uniforms: { time: { value: 0 }, depth: { value: layer } },
          vertexShader: [
            'attribute float size;', 'attribute vec3 color;', 'varying vec3 vColor;',
            'uniform float time;', 'uniform float depth;', 'void main() {',
            'vColor = color; vec3 pos = position;',
            'float angle = time * 0.05 * (1.0 - depth * 0.3);',
            'mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));',
            'pos.xy = rot * pos.xy;',
            'vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);',
            'gl_PointSize = size * (300.0 / -mvPosition.z);',
            'gl_Position = projectionMatrix * mvPosition;', '}'
          ].join('\n'),
          fragmentShader: [
            'varying vec3 vColor;', 'void main() {',
            'float dist = length(gl_PointCoord - vec2(0.5));', 'if (dist > 0.5) discard;',
            'float opacity = 1.0 - smoothstep(0.0, 0.5, dist);',
            'gl_FragColor = vec4(vColor, opacity);', '}'
          ].join('\n'),
          transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
        });
        var starField = new THREE.Points(geometry, material);
        refs.scene.add(starField);
        refs.stars.push(starField);
      }
    }

    function createNebula() {
      var geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
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
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));
        var mountain = new THREE.Mesh(
          new THREE.ShapeGeometry(new THREE.Shape(points)),
          new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: layer.opacity, side: THREE.DoubleSide })
        );
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance;
        mountain.userData = { baseZ: layer.distance, index: layerIndex };
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

    createStarField();
    createNebula();
    createMountains();
    createAtmosphere();

    function resize() {
      var bounds = stage.getBoundingClientRect();
      var width = Math.max(1, bounds.width);
      var height = Math.max(1, bounds.height);
      refs.camera.aspect = width / height;
      refs.camera.updateProjectionMatrix();
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
      refs.nebula.position.z = refs.mountains[3].position.z;
      stage.style.setProperty('--hero-progress', scrollProgress.toFixed(4));
      var introOpacity = scrollProgress <= 0.18 ? 1 : Math.max(0, 1 - (scrollProgress - 0.18) / 0.12);
      var cosmosOpacity = scrollProgress < 0.24 ? 0 : scrollProgress < 0.34 ? (scrollProgress - 0.24) / 0.1 : scrollProgress <= 0.5 ? 1 : Math.max(0, 1 - (scrollProgress - 0.5) / 0.12);
      var infinityOpacity = scrollProgress < 0.58 ? 0 : scrollProgress < 0.68 ? (scrollProgress - 0.58) / 0.1 : scrollProgress <= 0.8 ? 1 : Math.max(0, 1 - (scrollProgress - 0.8) / 0.1);
      if (stage.querySelector('.blog-horizon-copy')) stage.querySelector('.blog-horizon-copy').style.opacity = introOpacity.toFixed(3);
      if (contentSections[0]) contentSections[0].style.opacity = cosmosOpacity.toFixed(3);
      if (contentSections[1]) contentSections[1].style.opacity = infinityOpacity.toFixed(3);
      var pageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
      var finalStage = scrollProgress >= 0.999 && pageEnd;
      stage.classList.toggle('show-carousel', finalStage);
      if (carousel) carousel.setAttribute('aria-hidden', finalStage ? 'false' : 'true');
      if (footer) footer.setAttribute('aria-hidden', finalStage ? 'false' : 'true');
      if (carousel) carousel.inert = !finalStage;
      if (footer) footer.inert = !finalStage;
    }

    function animate() {
      refs.animationId = window.requestAnimationFrame(animate);
      var time = Date.now() * 0.001;
      refs.stars.forEach(function (starField) { starField.material.uniforms.time.value = reduced ? 0 : time; });
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
        mountain.position.x = reduced ? 0 : Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + (reduced ? 0 : Math.cos(time * 0.15) * parallaxFactor);
      });
      if (refs.composer) refs.composer.render();
      else refs.renderer.render(refs.scene, refs.camera);
    }

    function splitTitle() {
      if (!title || title.querySelector('.title-char')) return;
      var label = title.textContent.trim();
      title.setAttribute('aria-label', label);
      title.textContent = '';
      label.split(/\s+/).forEach(function (word) {
        var wordSpan = document.createElement('span');
        wordSpan.className = 'title-word';
        wordSpan.setAttribute('aria-hidden', 'true');
        Array.from(word).forEach(function (character) {
          var span = document.createElement('span');
          span.className = 'title-char';
          span.textContent = character;
          wordSpan.appendChild(span);
        });
        title.appendChild(wordSpan);
      });
    }

    splitTitle();
    resize();
    updateScroll();
    animate();
    window.gsap.set([menu, title, subtitle], { visibility: 'visible' });
    var timeline = window.gsap.timeline();
    if (menu) timeline.from(menu, { x: -100, opacity: 0, duration: 1, ease: 'power3.out' });
    if (title) timeline.from(title.querySelectorAll('.title-char'), { y: 200, opacity: 0, duration: 1.5, stagger: 0.05, ease: 'power4.out' }, '-=0.5');
    if (subtitle) timeline.from(subtitle.querySelectorAll('.subtitle-line'), { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=0.8');
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateScroll, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}());
