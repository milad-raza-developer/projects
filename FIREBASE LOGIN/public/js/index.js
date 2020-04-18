const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener('click', () =>
    container.classList.add('right-panel-active')
);

signInButton.addEventListener("click", () =>
    container.classList.remove("right-panel-active")
);



firebase.auth().onAuthStateChanged(function(user) {
  alert("hello")
    if (user) {
        alert("hello")
      // User is signed in.
      document.getElementById("user-div").style.display = "block"
      document.getElementById("container").style.display = "none"
    } else {
      // No user is signed in.
      alert("hello")
      document.getElementById("user-div").style.display = "none"
      document.getElementById("container").style.display = "flex"
    }
  });

function login() {
    var userEmail = document.getElementById("email_field").value
    var userPassword = document.getElementById("password_field").value

        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
        // ...
      });
}