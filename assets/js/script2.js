let header = document.getElementById("myHeader");
let sticky = header.offsetTop;
let mybutton = document.getElementById("myBtn");

window.addEventListener("scroll", function () {
  // Sticky header
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }

  // Button to top
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
});

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
