(function () {
    var form = document.getElementById('contactForm');
    var thanksEl = document.getElementById('thanksModal');
    if (form && thanksEl) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
            new bootstrap.Modal(thanksEl).show();
            form.reset();
            form.classList.remove('was-validated');
        });
    }
})();

(function () {
    if (typeof bootstrap === 'undefined') return;
    var triggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    triggers.forEach(function (el) {
        new bootstrap.Tooltip(el);
    });
})();

(function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    document.documentElement.classList.add('js-anim');

    document.querySelectorAll('.level').forEach(function (lvl) {
        lvl.querySelectorAll('span').forEach(function (s, i) { s.style.setProperty('--i', i); });
    });

    var targets = document.querySelectorAll(
        '.main h2, .about p, .project, .skill-list > li, #skills h3, .timeline li, .contact > p, .contact .mb-3, .contact .btn-navy'
    );
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.setProperty('--d', (i % 4) * 0.08 + 's');
        observer.observe(el);
        el.addEventListener('transitionend', function (e) {
            if (e.propertyName === 'opacity') el.classList.add('done');
        });
    });
})();
