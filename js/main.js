document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.querySelector('#navbar-mobile-toggler');
  const navbarTogglerOnMenu = document.querySelector('#navbar-mobile-toggler-on-menu');
  const sideNav = document.querySelector('#sidebar-mobile');

  function toggleSideNav() {
    sideNav.classList.toggle("d-none");
  }

  function toggleSideNavOnMenu() {
    sideNav.classList.toggle("d-none");
  }

  if (navbarToggler) {
    navbarToggler.addEventListener('click', toggleSideNav);
  }

  if (navbarTogglerOnMenu) {
    navbarTogglerOnMenu.addEventListener('click', toggleSideNavOnMenu);
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
  postContainerHeader?.addEventListener("click", () => {
    togglePostContent();
  });

  // const toggleDropdown = document.querySelector('#toggle-dropdown');
  // const dropdownMenu = document.querySelector('#dropdown-menu');
  // let isDropdownToggled = false;
  // toggleDropdown?.addEventListener('click', () => {
  //   if (!isDropdownToggled) {
  //     isDropdownToggled = true;
  //     dropdownMenu.style.display = "block";
  //     renderNavDropDown(); // Call renderNavDropDown here
  //   } else {
  //     isDropdownToggled = false;
  //     dropdownMenu.style.display = "none";
  //     renderNavDropDown(); // Call renderNavDropDown here
  //   }
  // });

  // function renderNavDropDown() {
  //   // Dropdown
  //   const dropdownMenu = document.querySelector('#dropdown-menu');

  //   // Hide the dropdown function
  //   const hideDropdown = () => {
  //     if (isDropdownToggled) {
  //         isDropdownToggled = false;
  //         dropdownMenu.style.display = "none";
  //     }
  //   };

  //   // Hide dropdown when user clicks outside
  //   document.addEventListener('click', (event) => {
  //       const target = event.target;
  //       if (!dropdownMenu.contains(target) && target !== toggleDropdown) {
  //           hideDropdown();
  //       }
  //   });

  // }

  const toggleDropdown = document.querySelector('#toggle-dropdown');
  const dropdownMenu = document.querySelector('#dropdown-menu');
  let overlay = null;
  let isDropdownToggled = false;

  toggleDropdown?.addEventListener('click', () => {
    if (!isDropdownToggled) {
      isDropdownToggled = true;
      dropdownMenu.style.display = "block";
      overlay = document.createElement('div');
      overlay.classList.add('overlay');
      document.body.appendChild(overlay); // Append overlay to body
      renderNavDropDown(); // Call renderNavDropDown here
    } else {
      isDropdownToggled = false;
      dropdownMenu.style.display = "none";
      if (overlay) {
        overlay.remove(); // Remove overlay from body if it exists
        overlay = null;
      }
      renderNavDropDown(); // Call renderNavDropDown here
    }
  });

  function renderNavDropDown() {
    // Dropdown
    const dropdownMenu = document.querySelector('#dropdown-menu');

    // Hide the dropdown function
    const hideDropdown = () => {
      if (isDropdownToggled) {
        isDropdownToggled = false;
        dropdownMenu.style.display = "none";
        if (overlay) {
          overlay.remove(); // Remove overlay from body if it exists
          overlay = null;
        }
      }
    };

    // Hide dropdown when user clicks outside
    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!dropdownMenu.contains(target) && target !== toggleDropdown) {
        hideDropdown();
      }
    });

  }


});
