(function () {
  'use strict';

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function toRadians(value) { return value * Math.PI / 180; }

  function makeDots(count) {
    var dots = [];
    var golden = Math.PI * (3 - Math.sqrt(5));
    for (var index = 0; index < count; index += 1) {
      var y = 1 - (index / (count - 1)) * 2;
      var radius = Math.sqrt(1 - y * y);
      var theta = golden * index;
      dots.push({ x: Math.cos(theta) * radius, y: y, z: Math.sin(theta) * radius });
    }
    return dots;
  }

  function project(point, rotationX, rotationY) {
    var cosY = Math.cos(rotationY);
    var sinY = Math.sin(rotationY);
    var x = point.x * cosY - point.z * sinY;
    var z = point.x * sinY + point.z * cosY;
    var cosX = Math.cos(rotationX);
    var sinX = Math.sin(rotationX);
    var y = point.y * cosX - z * sinX;
    z = point.y * sinX + z * cosX;
    return { x: x, y: y, z: z };
  }

  function fromCoordinates(marker) {
    var latitude = toRadians(marker.lat || 0);
    var longitude = toRadians(marker.lng || 0);
    return {
      x: Math.cos(latitude) * Math.sin(longitude),
      y: Math.sin(latitude),
      z: Math.cos(latitude) * Math.cos(longitude)
    };
  }

  function createFallbackPosition(code, index) {
    var value = String(code || index).split('').reduce(function (total, character) {
      return total + character.charCodeAt(0);
    }, 0);
    return { lat: ((value * 17) % 120) - 60, lng: ((value * 43) % 300) - 150 };
  }

  function mount(element, options) {
    if (!element || element.dataset.globeMounted) { return null; }
    element.dataset.globeMounted = 'true';
    options = options || {};

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var dots = makeDots(options.dotCount || 860);
    var markers = (options.markers || []).slice();
    var width = 0;
    var height = 0;
    var radius = 0;
    var centerX = 0;
    var centerY = 0;
    var rotationX = -0.16;
    var rotationY = 0.7;
    var targetX = rotationX;
    var targetY = rotationY;
    var dragging = false;
    var moved = false;
    var pointerStart = null;
    var lastTime = 0;
    var frame = 0;
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var renderedMarkers = [];

    canvas.className = 'interactive-globe-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    element.appendChild(canvas);

    function resize() {
      var rect = element.getBoundingClientRect();
      var scale = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      radius = Math.min(width, height) * 0.35;
      centerX = width / 2;
      centerY = height / 2;
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      context.setTransform(scale, 0, 0, scale, 0, 0);
    }

    function drawSelene(timestamp, front) {
      if (options.selene === false) return;
      var phase = reducedMotion ? 0.42 : timestamp * 0.00048;
      var depth = Math.sin(phase);
      if ((depth >= 0) !== front) return;
      var x = centerX + Math.cos(phase) * radius * 1.34;
      var y = centerY + depth * radius * 0.34;
      var moonRadius = Math.max(5, radius * (0.052 + (depth + 1) * 0.012));
      var moon = context.createRadialGradient(x - moonRadius * .3, y - moonRadius * .35, 1, x, y, moonRadius);
      moon.addColorStop(0, '#fff7fd');
      moon.addColorStop(.22, '#ff9bd2');
      moon.addColorStop(.58, '#f235a1');
      moon.addColorStop(1, '#541555');
      context.save();
      var depthProgress = (depth + 1) * .5;
      context.globalAlpha = .38 + depthProgress * .62;
      context.shadowBlur = 8 + depthProgress * 10;
      context.shadowColor = '#ff42ad';
      context.beginPath();
      context.arc(x, y, moonRadius, 0, Math.PI * 2);
      context.fillStyle = moon;
      context.fill();
      context.restore();
    }

    function render(timestamp) {
      var delta = lastTime ? Math.min(50, timestamp - lastTime) : 16;
      lastTime = timestamp;
      if (!dragging && !reducedMotion) { targetY += delta * 0.00012; }
      rotationX += (targetX - rotationX) * 0.08;
      rotationY += (targetY - rotationY) * 0.08;
      context.clearRect(0, 0, width, height);

      drawSelene(timestamp, false);

      var glow = context.createRadialGradient(centerX, centerY, radius * 0.15, centerX, centerY, radius * 1.2);
      glow.addColorStop(0, 'rgba(18, 216, 255, .09)');
      glow.addColorStop(.58, 'rgba(143, 75, 255, .04)');
      glow.addColorStop(1, 'rgba(255, 79, 184, 0)');
      context.fillStyle = glow;
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(4, 12, 28, .24)';
      context.fill();
      context.strokeStyle = 'rgba(64, 223, 255, .42)';
      context.lineWidth = 1;
      context.stroke();

      dots.forEach(function (dot, index) {
        var point = project(dot, rotationX, rotationY);
        if (point.z < -0.04) { return; }
        var alpha = 0.11 + point.z * 0.33;
        var size = point.z > .55 ? 1.75 : 1.05;
        context.fillStyle = index % 17 === 0 ? 'rgba(127, 213, 255, ' + alpha + ')' : 'rgba(91, 174, 237, ' + alpha + ')';
        context.fillRect(centerX + point.x * radius, centerY - point.y * radius, size, size);
      });

      renderedMarkers = markers.map(function (marker, index) {
        var point = project(fromCoordinates(marker), rotationX, rotationY);
        return { marker: marker, point: point, index: index };
      }).filter(function (item) { return item.point.z > -0.12; });

      renderedMarkers.forEach(function (item) {
        var point = item.point;
        var x = centerX + point.x * radius;
        var y = centerY - point.y * radius;
        var size = 2.7 + Math.min(1.8, Math.log((item.marker.value || 1) + 1) * .28);
        var color = '#6ad7ff';
        context.beginPath();
        context.arc(x, y, size + 5.5, 0, Math.PI * 2);
        context.strokeStyle = 'rgba(106, 215, 255, .65)';
        context.lineWidth = 1;
        context.stroke();
        context.beginPath();
        context.arc(x, y, size, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
        if (item.marker.label && point.z > .08) {
          context.font = '500 ' + Math.max(9, radius * .046) + 'px Inter, sans-serif';
          context.fillStyle = 'rgba(127, 218, 255, .9)';
          context.textAlign = x > centerX ? 'right' : 'left';
          context.textBaseline = 'middle';
          context.fillText(item.marker.label, x + (context.textAlign === 'right' ? -10 : 10), y + 1);
        }
      });

      drawSelene(timestamp, true);

      frame = window.requestAnimationFrame(render);
    }

    function pick(event) {
      var rect = canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      var candidate = renderedMarkers.reduce(function (closest, item) {
        var markerX = centerX + item.point.x * radius;
        var markerY = centerY - item.point.y * radius;
        var distance = Math.hypot(markerX - x, markerY - y);
        return !closest || distance < closest.distance ? { item: item, distance: distance } : closest;
      }, null);
      if (candidate && candidate.distance < 26 && typeof options.onMarkerClick === 'function') {
        options.onMarkerClick(candidate.item.marker);
      }
    }

    canvas.addEventListener('pointerdown', function (event) {
      dragging = true;
      moved = false;
      pointerStart = { x: event.clientX, y: event.clientY, rotationX: targetX, rotationY: targetY };
      canvas.setPointerCapture(event.pointerId);
      element.classList.add('is-dragging');
    });
    canvas.addEventListener('pointermove', function (event) {
      if (!dragging || !pointerStart) { return; }
      var dx = event.clientX - pointerStart.x;
      var dy = event.clientY - pointerStart.y;
      moved = moved || Math.abs(dx) + Math.abs(dy) > 4;
      targetY = pointerStart.rotationY + dx * .012;
      targetX = clamp(pointerStart.rotationX + dy * .009, -1.18, 1.18);
    });
    canvas.addEventListener('pointerup', function (event) {
      if (!moved) { pick(event); }
      dragging = false;
      pointerStart = null;
      element.classList.remove('is-dragging');
    });
    canvas.addEventListener('pointercancel', function () { dragging = false; pointerStart = null; element.classList.remove('is-dragging'); });

    var observer = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;
    if (observer) { observer.observe(element); }
    resize();
    frame = window.requestAnimationFrame(render);

    return {
      setMarkers: function (nextMarkers) {
        markers = (nextMarkers || []).map(function (marker, index) {
          var fallback = createFallbackPosition(marker.code, index);
          return Object.assign({ lat: fallback.lat, lng: fallback.lng }, marker);
        });
      },
      reset: function () { targetX = -0.16; targetY = 0.7; },
      destroy: function () { window.cancelAnimationFrame(frame); if (observer) { observer.disconnect(); } }
    };
  }

  window.PkLavcInteractiveGlobe = { mount: mount };
}());
