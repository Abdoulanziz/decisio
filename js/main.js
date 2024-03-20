document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.querySelector('#navbar-mobile-toggler');
  const sideNav = document.querySelector('#sidebar-mobile');

  function toggleSideNav() {
    sideNav.classList.toggle("d-none");
  }

  if (navbarToggler) {
    navbarToggler.addEventListener('click', toggleSideNav);
  }

  function handleScreenSizeChange() {
    if (window.innerWidth >= 992) {
      sideNav.classList.add("d-none");
    }
  }

  handleScreenSizeChange();
  window.addEventListener('resize', handleScreenSizeChange);




  function togglePostContent() {
    var postContent = document.querySelector(".post-container-content");
    postContent.classList.toggle("visible");
  }

  const postContainerHeader = document.querySelector(".post-container-header");
  postContainerHeader.addEventListener("click", () => {
    togglePostContent();
  });
});