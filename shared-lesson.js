/* ============================================================
   shared-lesson.js  —  Melinda Metin English Course
   Accordion toggle + answer checking
   ============================================================ */

(function () {
  'use strict';

  /* ── Accordion ─────────────────────────────────────────────── */
  function initAccordions() {
    document.querySelectorAll('.accordion').forEach(function (btn) {
      var panel = btn.nextElementSibling;
      if (!panel || !panel.classList.contains('panel')) return;

      btn.addEventListener('click', function () {
        var isOpen = panel.classList.contains('open');

        // Close all open panels first
        document.querySelectorAll('.panel.open').forEach(function (p) {
          p.classList.remove('open');
          var prevBtn = p.previousElementSibling;
          if (prevBtn && prevBtn.classList.contains('accordion')) {
            prevBtn.classList.remove('open');
          }
        });

        // Toggle this one
        if (!isOpen) {
          panel.classList.add('open');
          btn.classList.add('open');
          setTimeout(function () {
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 60);
        }
      });
    });
  }

  /* ── Normalise answer string ───────────────────────────────── */
  function norm(s) {
    return (s || '').toLowerCase().trim()
      .replace(/['']/g, "'")
      .replace(/\s+/g, ' ');
  }

  /* ── Show result on a single input ────────────────────────── */
  function showResult(input, correct) {
    var prev = input.parentNode.querySelector('.feedback-msg');
    if (prev) prev.remove();

    if (correct) {
      input.classList.add('correct');
      input.classList.remove('incorrect');
    } else {
      input.classList.add('incorrect');
      input.classList.remove('correct');
    }

    var span = document.createElement('span');
    span.className = 'feedback-msg ' + (correct ? 'ok' : 'bad');
    span.textContent = correct ? '✓' : '✗ ' + input.dataset.answer;
    input.insertAdjacentElement('afterend', span);
  }

  /* ── checkById(id) ─────────────────────────────────────────── */
  window.checkById = function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    showResult(el, norm(el.value) === norm(el.dataset.answer));
  };

  /* ── checkAll(cardId) ──────────────────────────────────────── */
  window.checkAll = function (cardId) {
    var card = document.getElementById(cardId);
    if (!card) return;
    card.querySelectorAll('input[type="text"][data-answer]').forEach(function (el) {
      showResult(el, norm(el.value) === norm(el.dataset.answer));
    });
  };

  /* ── Boot ──────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordions);
  } else {
    initAccordions();
  }

}());
