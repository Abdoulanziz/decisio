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




  // Profile img
  const profileImage = document.querySelector('.profile-avatar img');
  const updateButton = document.querySelector('.profile-img-update-cta .submit-btn'); // Select update button
  const deleteButton = document.querySelector('.profile-img-update-cta .delete-btn'); // Select delete button

  // Function to handle image upload (replace with your actual upload logic)
  function handleImageUpload(event) {
    // Simulate user interaction for now (replace with actual upload functionality)
    alert('Image upload functionality not implemented yet!');
    // You would typically handle file selection, upload to server, and update image src here
  }

  // Function to handle image deletion with style maintenance
  function handleImageDelete() {
    if (confirm('Are you sure you want to delete your profile image?')) {
      const placeholderImage = new Image();
      placeholderImage.src = '/img/profile-default.png'; // Replace with your placeholder image path
      placeholderImage.onload = function() {
        profileImage.style.width = 78 + 'px';
        profileImage.style.height = 74 + 'px';
        profileImage.style.borderRadius = 100 + '%';
        profileImage.src = '/img/profile-default.png';
        profileImage.classList.add('default-profile-image'); // Add class for default styles
      };
    }
  }

  // Add click event listener to the update button
  updateButton.addEventListener('click', () => {
    // Create a hidden file input element (optional, can be triggered differently)
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    // Simulate file selection click (replace with a more user-friendly approach)
    fileInput.click();

    // Add change event listener to the file input (optional)
    fileInput.addEventListener('change', handleImageUpload);

    // Add the file input element to the DOM (optional, can be placed elsewhere)
    document.body.appendChild(fileInput);
  });

  // Add click event listener to the delete button
  deleteButton.addEventListener('click', handleImageDelete);

  // Profile img







});
