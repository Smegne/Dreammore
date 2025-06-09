
        // Highlight active nav link
        try {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    document.querySelector('.nav-link.active')?.classList.remove('active');
                    this.classList.add('active');
                });
            });
        } catch (error) {
            console.error('Error setting up nav link listeners:', error);
        }

        // Formspree submission feedback
        try {
            document.querySelectorAll('form').forEach(form => {
                if (!form.action || form.action.includes('YOUR_FORM_ID') || form.action.includes('YOUR_NEWSLETTER_FORM_ID')) {
                    console.warn('Invalid Formspree ID. Form submission disabled.');
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        alert('Please provide a valid Formspree ID.');
                    });
                } else {
                    form.addEventListener('submit', () => {
                        alert('Thank you! We’ll get back to you soon.');
                    });
                }
            });
        } catch (error) {
            console.error('Error setting up form submission:', error);
        }


          window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('#home') || document.querySelector('.hero-section'); // adjust if needed
    const offset = heroSection ? heroSection.offsetHeight - 80 : 100;

    if (window.scrollY > offset) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
        // Fade-in animation on scroll
        try {
            const fadeInElements = document.querySelectorAll('.fade-in');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            fadeInElements.forEach(element => observer.observe(element));
        } catch (error) {
            console.error('Error setting up fade-in animation:', error);
        }

         AOS.init({
    duration: 1000, // animation duration in ms
    once: true      // animate only once
  });

        // Course search and filter
        try {
            const searchInput = document.getElementById('courseSearch');
            const categorySelect = document.getElementById('courseCategory');
            const courseCards = document.querySelectorAll('.course-card');

            function filterCourses() {
                const searchTerm = searchInput.value.toLowerCase();
                const category = categorySelect.value;

                courseCards.forEach(card => {
                    const title = card.querySelector('.card-title').textContent.toLowerCase();
                    const cardCategory = card.dataset.category;
                    const matchesSearch = title.includes(searchTerm);
                    const matchesCategory = category === 'all' || cardCategory === category;

                    if (matchesSearch && matchesCategory) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }

            searchInput.addEventListener('input', filterCourses);
            categorySelect.addEventListener('change', filterCourses);
        } catch (error) {
            console.error('Error setting up course filter:', error);
        }

       
  document.getElementById("showSignup").addEventListener("click", function () {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
  });

  document.getElementById("showLogin").addEventListener("click", function () {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  });



        // Course progress tracker
        function updateProgressBars() {
            try {
                const userEmail = localStorage.getItem('userEmail');
                if (!userEmail) return;

                const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
                document.querySelectorAll('.course-card').forEach(card => {
                    const courseTitle = card.querySelector('.card-title').textContent;
                    const progress = courseProgress[courseTitle] || 0;
                    const progressBar = card.querySelector('.progress-bar');
                    progressBar.style.width = `${progress}%`;
                    progressBar.setAttribute('aria-valuenow', progress);

                    const enrollBtn = card.querySelector('.enroll-btn');
                    enrollBtn.addEventListener('click', () => {
                        courseProgress[courseTitle] = Math.min((courseProgress[courseTitle] || 0) + 20, 100);
                        localStorage.setItem('courseProgress', JSON.stringify(courseProgress));
                        progressBar.style.width = `${courseProgress[courseTitle]}%`;
                        progressBar.setAttribute('aria-valuenow', courseProgress[courseTitle]);
                    });
                });
            } catch (error) {
                console.error('Error updating progress bars:', error);
            }
        }

        // Initialize progress bars on load
        window.addEventListener('load', updateProgressBars);
   