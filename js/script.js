// ===================================
// Document Ready
// ===================================
$(document).ready(function() {
    
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }
    });

    // ===================================
    // Smooth Scrolling
    // ===================================
    $('a.nav-link, a[href^="#"]').on('click', function(e) {
        const href = $(this).attr('href');
        
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            
            const target = $(href);
            if (target.length) {
                const offsetTop = target.offset().top - 80;
                
                $('html, body').animate({
                    scrollTop: offsetTop
                }, 800, 'swing');
                
                // Close mobile menu if open
                $('.navbar-collapse').collapse('hide');
            }
        }
    });

    // ===================================
    // Scroll to Top Button
    // ===================================
    const scrollTopBtn = $('#scrollTopBtn');
    
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            scrollTopBtn.addClass('show');
        } else {
            scrollTopBtn.removeClass('show');
        }
    });
    
    scrollTopBtn.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
    });

    // ===================================
    // Video Modal
    // ===================================
    const videoModal = $('#videoModal');
    const videoFrame = $('#videoFrame');
    
    // You can add your video URL here
    const videoUrl = 'https://www.youtube.com/embed/8EyhpAPopTU?si=g6TD4zb37Rdsq1Fa';
    
    videoModal.on('show.bs.modal', function() {
        videoFrame.attr('src', videoUrl);
    });
    
    videoModal.on('hide.bs.modal', function() {
        videoFrame.attr('src', '');
    });

    // ===================================
    // Counter Animation
    // ===================================
    function animateCounter() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.text().replace(/\D/g, ''));
            
            $({ countNum: 0 }).animate(
                { countNum: countTo },
                {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        const prefix = $this.text().includes('+') ? '+' : '';
                        const suffix = $this.text().includes('%') ? '%' : '';
                        $this.text(prefix + Math.floor(this.countNum) + suffix);
                    },
                    complete: function() {
                        const prefix = $this.text().includes('+') ? '+' : '';
                        const suffix = $this.text().includes('%') ? '%' : '';
                        $this.text(prefix + countTo + suffix);
                    }
                }
            );
        });
    }

    // Trigger counter animation when hero section is in view
    const heroSection = $('.hero-section');
    let counterAnimated = false;
    
    $(window).on('scroll', function() {
        if (!counterAnimated && heroSection.length) {
            const heroTop = heroSection.offset().top;
            const heroHeight = heroSection.outerHeight();
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            if (scrollTop + windowHeight > heroTop + (heroHeight / 2)) {
                animateCounter();
                counterAnimated = true;
            }
        }
    });

    // ===================================
    // Package Cards Hover Effect
    // ===================================
    $('.package-card').on('mouseenter', function() {
        $(this).find('.package-icon').addClass('rotate-360');
    });

    $('.package-card').on('mouseleave', function() {
        $(this).find('.package-icon').removeClass('rotate-360');
    });

    // ===================================
    // Form Validation (if you add contact form)
    // ===================================
    $('form').on('submit', function(e) {
        const form = $(this);
        
        if (!form[0].checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        form.addClass('was-validated');
    });

    // ===================================
    // Floating Cards Animation Enhancement
    // ===================================
    $('.floating-card').each(function(index) {
        $(this).css('animation-delay', (index * 0.5) + 's');
    });

    // ===================================
    // Lazy Loading Images (Optional)
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===================================
    // Active Nav Link on Scroll
    // ===================================
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));
            
            if (refElement.length && refElement.position().top <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass('active');
                currLink.addClass('active');
            }
        });
    });

    // ===================================
    // Preloader (Optional - if you want to add one)
    // ===================================
    $(window).on('load', function() {
        $('.preloader').fadeOut('slow');
    });

    // ===================================
    // WhatsApp Float Button (Optional)
    // ===================================
    const whatsappBtn = $('<a>', {
        href: 'https://wa.me/+201012552752',
        class: 'whatsapp-float',
        target: '_blank',
        html: '<i class="fab fa-whatsapp"></i>'
    });
    
    // Uncomment to add floating WhatsApp button
    // $('body').append(whatsappBtn);

    // ===================================
    // Prevent Right Click (Optional - for image protection)
    // ===================================
    // Uncomment if you want to disable right click
    // $(document).on('contextmenu', 'img', function() {
    //     return false;
    // });

    // ===================================
    // FAQ Accordion Enhancement
    // ===================================
    $('.accordion-button').on('click', function() {
        const icon = $(this).find('.accordion-number');
        
        setTimeout(() => {
            if ($(this).hasClass('collapsed')) {
                icon.css('transform', 'rotate(0deg)');
            } else {
                icon.css('transform', 'rotate(360deg)');
            }
        }, 100);
    });

    // ===================================
    // Loading Animation for Links
    // ===================================
    $('.btn-package, .btn-program, .btn-cta').on('click', function(e) {
        const btn = $(this);
        const originalText = btn.html();
        
        // Don't add loading if it's a link
        if (btn.attr('href') && btn.attr('href').startsWith('http')) {
            return;
        }
        
        btn.html('<i class="fas fa-spinner fa-spin"></i> جاري التحميل...');
        
        setTimeout(() => {
            btn.html(originalText);
        }, 2000);
    });

    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        $('.hero-image-wrapper').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
        $('.hero-bg-animation').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
    });

    // ===================================
    // Benefits Cards Stagger Animation
    // ===================================
    $('.benefit-card').each(function(index) {
        $(this).attr('data-aos-delay', (index * 100));
    });

    // ===================================
    // Package Cards Click to WhatsApp
    // ===================================
    $('.package-card').on('click', function(e) {
        if (!$(e.target).closest('a').length) {
            const whatsappLink = $(this).find('.btn-package').attr('href');
            if (whatsappLink) {
                window.open(whatsappLink, '_blank');
            }
        }
    });

    // ===================================
    // Dynamic Year in Footer
    // ===================================
    const currentYear = new Date().getFullYear();
    $('.copyright').text($('.copyright').text().replace('2025', currentYear));

    // ===================================
    // Navbar Close on Outside Click (Mobile)
    // ===================================
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ===================================
    // Add Animation to Elements on Scroll
    // ===================================
    function checkScroll() {
        $('.animate-on-scroll').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animated');
            }
        });
    }
    
    $(window).on('scroll', checkScroll);
    checkScroll();

    // ===================================
    // Testimonials Slider (if you add testimonials)
    // ===================================
    // Uncomment and customize if you add a testimonials section
    /*
    const testimonialsSwiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
    */

    // ===================================
    // Console Message
    // ===================================
    console.log('%c🏋️ Website by Coach Mohamed Saleh', 'color: #EC831B; font-size: 16px; font-weight: bold;');
    console.log('%c💪 Ready to transform your body?', 'color: #DDFE25; font-size: 14px;');

});

// ===================================
// Window Load Events
// ===================================
$(window).on('load', function() {
    // Refresh AOS after images load
    AOS.refresh();
    
    // Add loaded class to body
    $('body').addClass('loaded');
});