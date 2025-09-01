 document.querySelectorAll(".menu li, .menu li a").forEach(item => {
    item.addEventListener("click", function() {
      document.querySelectorAll(".menu li").forEach(li => li.classList.remove("active"));
      this.closest("li").classList.add("active");
    });
  });