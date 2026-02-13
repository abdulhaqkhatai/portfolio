import React, { useEffect } from 'react';
import './App.css';

export default function App() {
  useEffect(() => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const first = document.getElementById('first');
    const second = document.getElementById('second');
    const third = document.getElementById('third');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        first.classList.toggle('one');
        second.classList.toggle('two');
        third.classList.toggle('three');
      });
    }
    if (navLinks) {
      navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          navLinks.classList.remove('open');
          first.classList.remove('one');
          second.classList.remove('two');
          third.classList.remove('three');
        }
      });
    }

    let lastScrollTop = 0;
    const header = document.getElementById('header');
    const handleScroll = () => {
      if (window.innerWidth <= 750) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          header.classList.add('navbar-hidden');
        } else {
          header.classList.remove('navbar-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      } else {
        header.classList.remove('navbar-hidden');
      }

      const sections = document.querySelectorAll('section');
      const navItems = document.querySelectorAll('.nav-links li a');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
          li.classList.add('active');
        }
      });

      const backToTop = document.querySelector('.back-to-top');
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (backToTop) backToTop.classList.toggle('show', scrollPosition > 500);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
      if (window.innerWidth > 750) {
        header.classList.remove('navbar-hidden');
      }
    });

    let _typedInstance = null;
    if (window.Typed) {
      // Match original HTML behavior for crisp typing & deleting
      // Save the instance so we can destroy it in cleanup (prevents double cursors
      // when React StrictMode mounts the component twice in development).
      _typedInstance = new window.Typed('.typed', {
        strings: ['Web Developer', 'UI/UX Designer', 'Freelancer'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1200,
        loop: true
      });
    }

    if (window.ScrollReveal) {
      const srConfig = { duration: 500, reset: true, delay: 100 };
      setTimeout(() => {
        window.ScrollReveal().reveal('.about-img', { ...srConfig, origin: 'left', distance: '40px' });
        window.ScrollReveal().reveal('.about-details', { ...srConfig, origin: 'right', distance: '40px' });
        window.ScrollReveal().reveal('.skill-card', { ...srConfig, interval: 150, origin: 'bottom', distance: '30px' });
        window.ScrollReveal().reveal('.service-card', { ...srConfig, interval: 150, origin: 'bottom', distance: '30px' });
        window.ScrollReveal().reveal('.portfolio-card', { ...srConfig, interval: 150, origin: 'bottom', distance: '30px' });
        window.ScrollReveal().reveal('.contact-info', { ...srConfig, origin: 'left', distance: '40px' });
        window.ScrollReveal().reveal('.contact-form', { ...srConfig, origin: 'left', distance: '40px' });
        window.ScrollReveal().reveal('.download-buttons .btn', { ...srConfig, interval: 150, origin: 'right', distance: '40px' });
        window.ScrollReveal().reveal('.social-card', { ...srConfig, interval: 150, origin: 'bottom', distance: '30px' });
        window.ScrollReveal().reveal('.card', { ...srConfig, interval: 150, origin: 'bottom', distance: '30px' });
      }, 100);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = this.querySelector('input[name=\"name\"]').value.trim();
        const email = this.querySelector('input[name=\"email\"]').value.trim();
        const message = this.querySelector('textarea[name=\"message\"]').value.trim();
        const to = 'abdulhaq@email.com';
        const subject = 'Portfolio Inquiry';
        const body = `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl, '_blank');
        const fm = document.getElementById('form-message');
        if (fm) fm.textContent = 'Your email client is opening with pre-filled details. Please click \"Send\" to complete.';
        this.reset();
      });
    }

    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    return () => {
      // Remove the scroll listener
      window.removeEventListener('scroll', handleScroll);
      // Destroy Typed.js instance to avoid duplicate cursors when effect re-runs
      try {
        if (_typedInstance && typeof _typedInstance.destroy === 'function') {
          _typedInstance.destroy();
        }
      } catch (e) {
        // ignore destruction errors
      }
    };
  }, []);

  return (
    <>
      <header id="header">
        <nav>
          <div className="logo">MyPortfolio</div>
          <ul className="nav-links" id="nav-links">
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="menu-toggle" id="menu-toggle" aria-label="Toggle menu" role="button" tabIndex="0">
            <span id="first"></span>
            <span id="second"></span>
            <span id="third"></span>
          </div>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Hi, I'm <span>Abdul Haq</span></h1>
          <span className="typed"></span>
          <p>I'm a passionate web developer crafting beautiful and functional websites. Let's work together!</p>
          <a href="#contact" className="btn">Contact Me</a>
        </div>
        <div className="hero-img">
          <img src="https://i.pinimg.com/736x/7b/ba/12/7bba12c7e07a5126de7ca1d0c175bdd1.jpg" alt="Male professional portrait with vibrant neon accents" />
        </div>
      </section>

      <section id="about">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-img">
            <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=300&h=300&q=100&dpr=2" alt="About" />
          </div>
          <div className="about-details">
            <h3>Web Developer & Designer</h3>
            <p>I have 3+ years of experience building responsive, modern websites and web apps. I love turning ideas into reality using code and design.</p>
            <ul>
              <li><b>Frontend:</b> HTML, CSS, JavaScript, React</li>
              <li><b>Backend:</b> Node.js, Express, MongoDB</li>
              <li><b>Tools:</b> Git, Webpack, Figma</li>
              <li><b>Experience:</b> Freelance, Remote Teams</li>
              <li><b>Education:</b> B.Sc. in Computer Science</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="skills">
        <h2>Skills</h2>

        <div className="skills-list">
          <div className="skill-card">
            <i className="bx bx-palette"></i>
            <h3>Figma</h3>
            <p>Crafting intuitive UI designs and prototypes</p>
          </div>
          <div className="skill-card">
            <i className="bx bx-paint"></i>
            <h3>Adobe XD</h3>
            <p>Designing interactive and user-friendly interfaces</p>
          </div>
          <div className="skill-card">
            <i className="bx bx-brush"></i>
            <h3>Sketch</h3>
            <p>Creating clean and modern design mockups</p>
          </div>
          <div className="skill-card">
            <i className="bx bx-layer"></i>
            <h3>InVision</h3>
            <p>Building collaborative prototypes for teams</p>
          </div>
          <div className="skill-card">
            <i className="bx bx-layout"></i>
            <h3>Wireframing</h3>
            <p>Structuring layouts for optimal user experience</p>
          </div>
          <div className="skill-card">
            <i className="bx bx-search-alt"></i>
            <h3>User Research</h3>
            <p>Analyzing user needs for effective designs</p>
          </div>
        </div>
      </section>

      <section id="services">
        <h2>Services</h2>
        <div className="services-list">
          <div className="service-card">
            <i className="bx bx-code-alt"></i>
            <h3>Web Development</h3>
            <p>Building responsive and dynamic websites using modern technologies.</p>
          </div>
          <div className="service-card">
            <i className="bx bx-paint"></i>
            <h3>UI/UX Design</h3>
            <p>Designing user-friendly and visually appealing interfaces.</p>
          </div>
          <div className="service-card">
            <i className="bx bx-mobile-alt"></i>
            <h3>Mobile Friendly</h3>
            <p>Ensuring your website looks great on all devices.</p>
          </div>
        </div>
      </section>

      <section id="portfolio">
        <h2>Portfolio</h2>
        <div className="portfolio-list">
          <div className="portfolio-card">
            <img src="https://images.pexels.com/photos/270557/pexels-photo-270557.jpeg?auto=compress&cs=tinysrgb&w=400&h=140&fit=crop&q=85" alt="Modern website design on laptop" />
            <h4>Website Design</h4>
            <p>A responsive website for a modern business.</p>
            <a href="#" className="project-link">View Project</a>
          </div>
          <div className="portfolio-card">
            <img src="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400&h=140&fit=crop&q=85" alt="Mobile app interface on smartphone" />
            <h4>Mobile App</h4>
            <p>User-friendly app interface design.</p>
            <a href="#" className="project-link">View Project</a>
          </div>
          <div className="portfolio-card">
            <img src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400&h=140&fit=crop&q=85" alt="Interactive web dashboard on screen" />
            <h4>Web Dashboard</h4>
            <p>Interactive dashboard for data analytics.</p>
            <a href="#" className="project-link">View Project</a>
          </div>
        </div>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <div className="contact-info">
          <p>Email: <a href="mailto:abdulhaq@email.com">abdulhaq@email.com</a></p>
          <p>Location: Remote / Worldwide</p>
        </div>
        <div className="contact-content">
          <form className="contact-form" id="contact-form">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea rows="4" name="message" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
            <div id="form-message"></div>
          </form>
          <div className="download-buttons">
            <a href="/assets/resume.pdf" className="btn" download aria-label="Download my resume as a PDF" tabIndex="0" rel="noopener noreferrer">Download Resume</a>
            <a href="/assets/cv.pdf" className="btn" download aria-label="Download my CV as a PDF" tabIndex="0" rel="noopener noreferrer">Download CV</a>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonials-grid">
          <div className="card">
            <div className="testimonial-content">
              <img className="client-photo" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80" alt="James Carter" />
              <p className="quote">“Abdul Haq built us a sleek, modern website. His technical expertise is unmatched.”</p>
              <div className="author-details">
                <div className="rating">★★★★★</div>
                <span className="author">James Carter</span>
                <span className="role">CTO, CodeZap</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="testimonial-content">
              <img className="client-photo" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80" alt="Mark Chen" />
              <p className="quote">“Abdul Haq’s creativity transformed our brand. The site’s performance is outstanding.”</p>
              <div className="author-details">
                <div className="rating">★★★★★</div>
                <span className="author">Mark Chen</span>
                <span className="role">CEO, InnovateCo</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="testimonial-content">
              <img className="client-photo" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80" alt="David Kim" />
              <p className="quote">“Abdul Haq delivered a flawless app interface. Collaboration was seamless.”</p>
              <div className="author-details">
                <div className="rating">★★★★★</div>
                <span className="author">David Kim</span>
                <span className="role">Director, NextGen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="social">
        <div className="social-list">
          <a href="https://linkedin.com/in/yourprofile" className="social-card" aria-label="Visit my LinkedIn" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-linkedin"></i>
            <span className="social-tooltip">LinkedIn</span>
          </a>
          <a href="https://instagram.com/yourprofile" className="social-card" aria-label="Visit my Instagram" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-instagram"></i>
            <span className="social-tooltip">Instagram</span>
          </a>
          <a href="https://facebook.com/yourprofile" className="social-card" aria-label="Visit my Facebook" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-facebook"></i>
            <span className="social-tooltip">Facebook</span>
          </a>
          <a href="https://github.com/yourprofile" className="social-card" aria-label="Visit my GitHub" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-github"></i>
            <span className="social-tooltip">GitHub</span>
          </a>
          <a href="https://x.com/yourprofile" className="social-card" aria-label="Visit my Twitter/X" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-twitter"></i>
            <span className="social-tooltip">Twitter/X</span>
          </a>
        </div>
      </section>

      <button className="back-to-top" aria-label="Back to top">
        <i className="bx bx-chevron-up"></i>
        <span className="top-text">Go to Top</span>
      </button>

      <footer>
        © 2025 Abdul Haq. All rights reserved.
      </footer>
    </>
  );
}
