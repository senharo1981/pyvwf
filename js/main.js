
// =========================================================
// PYVWF — پاکستان یوتھ وائس اینڈ رائٹرز فورم
// بنیادی جاوا سکرپٹ: مینو، سکرول پراگریس، ریویل اینیمیشن، شمار کاؤنٹر
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- موبائل مینو ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- فعال نیوی گیشن لنک (اسکرول کے مطابق) ---------- */
  const sections = document.querySelectorAll('main section[id], main.hero, section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  const setActiveLink = () => {
    let currentId = 'home';
    const scrollPos = window.scrollY + 140;

    document.querySelectorAll('section[id], div#home').forEach(sec => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  };

  /* ---------- سکرول پراگریس بار ---------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = progress + '%';

    if (backToTop) backToTop.classList.toggle('show', scrollTop > 500);

    setActiveLink();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- سکرول ریویل اینیمیشن ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- اعدادوشمار کاؤنٹر ---------- */
  const statNums = document.querySelectorAll('.stat-num');

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && statNums.length) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => statObserver.observe(el));
  }

  /* ---------- ٹکر (بریکنگ نیوز) — لسٹ کو ڈپلیکیٹ کر کے مسلسل حرکت دی جاتی ہے ---------- */
  const tickerList = document.getElementById('tickerList');
  if (tickerList) {
    tickerList.innerHTML += tickerList.innerHTML; // مسلسل لوپ کے لیے مواد دہرایا گیا
  }

  /* ---------- ممبرشپ فارم (ڈیمو سبمٹ) ---------- */
  const membershipForm = document.getElementById('membershipForm');
  if (membershipForm) {
    membershipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('شکریہ! آپ کی رجسٹریشن موصول ہو گئی ہے۔ انتظامیہ کی منظوری کے بعد آپ سے رابطہ کیا جائے گا۔');
      membershipForm.reset();
    });
  }

  /* ---------- رابطہ فارم (ڈیمو سبمٹ) ---------- */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('شکریہ! آپ کا پیغام موصول ہو گیا ہے۔');
      contactForm.reset();
    });
  }

});
