const navBtn = document.querySelector('.my-btn-new');
const body = document.querySelector('body')

navBtn.addEventListener('click', () => {
  

    body.classList.toggle('is-nav-open')

})

function handleScroll() {
    const scrollThreshold = 50;

    if (window.scrollY > scrollThreshold) {
        body.classList.add('is-scrolled');
    } else {
        body.classList.remove('is-scrolled');
    }
}

window.addEventListener('scroll', handleScroll);


function toggleActiveClass(event) {
    // Prevent default behavior of the button
    event.preventDefault();

    // Get the parent ul element
    const ul = event.target.closest('ul');
    
  
    // Remove is-active class from all buttons inside the ul
    ul.querySelectorAll('button').forEach(button => {
        button.classList.remove('is-active');
    });

    // Add is-active class to the clicked button
    event.target.closest('button').classList.add('is-active');
}

// Add event listener to each button inside the ul
document.querySelectorAll('.c-navbar-mobile-item__arrow button').forEach(button => {
    button.addEventListener('click', toggleActiveClass);
});

