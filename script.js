

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {  // when scrolled more than 50px
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  


// JavaScript for toggling chat & sending messages

const liveChatBtn = document.getElementById('liveChatBtn');
const liveChatBox = document.getElementById('liveChatBox');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

liveChatBtn.addEventListener('click', () => {
  liveChatBox.style.display = 'flex';
  chatInput.focus();
  liveChatBtn.style.display = 'none';
});

closeChatBtn.addEventListener('click', () => {
  liveChatBox.style.display = 'none';
  liveChatBtn.style.display = 'block';
});

// Function to add a message
function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// On send button click
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (message === '') return;

  addMessage(message, 'user');
  chatInput.value = '';

  // Simulated bot reply
  setTimeout(() => {
    addMessage('Thanks for your message! We will get back to you shortly.', 'bot');
  }, 1000);
}



// <!-- Small JS to improve hover behaviour and ensure accessibility 
  
    (function(){
      // For desktop: show mega menu on hover (also keeps mobile click behaviour)
      const megaItems = document.querySelectorAll('.nav-item.mega');

      megaItems.forEach(item => {
        // mouseenter/leave to add/remove .show (Bootstrap expects .show)
        item.addEventListener('mouseenter', () => {
          const menu = item.querySelector('.dropdown-menu');
          menu.classList.add('show');
        });
        item.addEventListener('mouseleave', () => {
          const menu = item.querySelector('.dropdown-menu');
          menu.classList.remove('show');
        });

        // Ensure touch/click toggles still work on small screens
        const trigger = item.querySelector('.nav-link');
        trigger.addEventListener('click', (e) => {
          const menu = item.querySelector('.dropdown-menu');
          // on small screens let bootstrap handle; on desktop prevent default to keep hover UX
          if (window.innerWidth > 991) {
            e.preventDefault();
            // toggle manually if needed
            if (menu.classList.contains('show')) menu.classList.remove('show');
            else menu.classList.add('show');
          }
        });
      });

      // Close mega menus when clicking outside
      document.addEventListener('click', function(e){
        megaItems.forEach(item=>{
          if (!item.contains(e.target)) {
            const menu = item.querySelector('.dropdown-menu');
            if (menu) menu.classList.remove('show');
          }
        });
      });
    })();

    document.querySelectorAll('.slider-container').forEach(container => {
  const grid = container.querySelector('.masonry-grid');
  const dots = container.querySelectorAll('.slider-dots .dot');
  const cardsPerSlide = 3; // Adjust this number based on how many cards you want per dot

  // Click event for each dot
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const cardWidth = grid.children[0].offsetWidth + 20; // 20 = gap
      const scrollAmount = index * cardWidth * cardsPerSlide;
      grid.scrollTo({ left: scrollAmount, behavior: 'smooth' });

      // Set active dot
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  // Optional: Update active dot when scrolling manually
  grid.addEventListener('scroll', () => {
    const cardWidth = grid.children[0].offsetWidth + 20;
    const currentIndex = Math.round(grid.scrollLeft / (cardWidth * cardsPerSlide));
    dots.forEach(d => d.classList.remove('active'));
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  });
});



// Select the image about image float
const aboutImage = document.querySelector('.about-image');

// Create an Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-left'); // trigger animation
    }
  });
}, { threshold: 0.3 }); // triggers when 30% of image is visible

// Observe the image
observer.observe(aboutImage);




    const testimonials = [
        {
            id: 1,
            quote: 'Spacely has been invaluable to me for what we do in our office. I highly recommend it to anyone looking for speed without compromising with quality',
            name: 'Ali',
            title: 'VP, Figma',
            img_url: './IMG/review5.jfif'
        },
        {
            id: 2,
            quote: 'Working with them transformed our workflow. The team is dedicated and the **results speak for themselves**. A truly **game-changing partnership** for our Q3 goals.',
            name: 'Rija',
            title: 'CTO, TechCorp Solutions',
            img_url: './IMG/review1.jpg'
        },
        {
            id: 3,
            quote: 'We saw a **25% increase in conversions** after implementing their strategy. This solution is robust, scalable, and the **best investment** we made all year.',
            name: 'Ayesha',
            title: 'Founder, Grace Marketing Agency',
            img_url: './IMG/review3.jpg'
        },
        {
            id: 4,
            quote: 'Exceptional service and **unparalleled speed**. Their support staff is the most **responsive and helpful** I have ever encountered. Absolutely five stars.',
            name: 'Zain',
            title: 'Lead Developer, Synapse Inc.',
            img_url: './IMG/review4.jpg'
        },
        {
            id: 5,
            quote: 'The interface is **incredibly intuitive** and saved us countless hours of training. It is powerful enough for our enterprise needs, yet simple enough for **daily use by everyone**.',
            name: 'Zara',
            title: 'Director of Operations, Global Finance',
            img_url: './IMG/review2.jpg'
        }
    ];

    /**
     * Updates the main testimonial content based on the given ID.
     * @param {number} id - The ID of the testimonial to display.
     */
    function updateTestimonial(id) {
        const testimonial = testimonials.find(t => t.id === id);
        if (!testimonial) return;

        const textElement = document.getElementById('testimonial-text');
        const nameElement = document.getElementById('profile-name');
        const titleElement = document.getElementById('profile-title');
        const selectorContainer = document.getElementById('profile-selector');

        // Apply transition effects for smooth switching
        textElement.style.opacity = 0;
        textElement.style.transform = 'translateY(10px)';

        setTimeout(() => {
            // Update Text Content
            // Using innerHTML to allow for the **bolding** (strong tags) in the quote
            textElement.innerHTML = testimonial.quote.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            nameElement.textContent = testimonial.name;
            titleElement.textContent = testimonial.title;

            // Update Active State on Thumbnails
            const thumbs = selectorContainer.querySelectorAll('.profile-thumb');
            thumbs.forEach(thumb => {
                thumb.classList.remove('active');
                if (parseInt(thumb.getAttribute('data-id')) === id) {
                    thumb.classList.add('active');
                }
            });

            // Restore visibility
            textElement.style.opacity = 1;
            textElement.style.transform = 'translateY(0)';
        }, 150); // Match transition time
    }

    /**
     * Initializes the thumbnail row and attaches click handlers.
     */
    function initializeTestimonials() {
        const selectorContainer = document.getElementById('profile-selector');

        testimonials.forEach(t => {
            const img = document.createElement('img');
            img.src = t.img_url;
            img.alt = `Profile of ${t.name}`;
            img.className = 'profile-thumb';
            img.setAttribute('data-id', t.id);
            img.onclick = () => updateTestimonial(t.id);
            
            selectorContainer.appendChild(img);
        });

        // Load the first testimonial on page load
        if (testimonials.length > 0) {
            updateTestimonial(testimonials[0].id);
        }
    }

    // Run initialization function when the window is loaded
    window.onload = initializeTestimonials;




