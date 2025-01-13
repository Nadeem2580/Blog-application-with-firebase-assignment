const routeHandler = () => {
    const UID = localStorage.getItem("uid");
    if (UID) {
        window.location.replace("./dashboard.html")
    }
}


import { getAuth, signInWithEmailAndPassword, auth } from "./firebase.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
let choose_img_Btn = document.querySelector(".choose_img button");
let choose_Input = document.querySelector(".choose_img input");
let imgSrc = document.querySelector(".viewImg");
console.log(imgSrc.src == "http://127.0.0.1:5500/Assets/one%20(2).png")
choose_img_Btn.addEventListener("click", () => choose_Input.click());

choose_Input.addEventListener("change", () => {
    let file = choose_Input.files[0];
    if (!file) return;

    let reader = new FileReader();

    reader.onloadend = () => {
        let base64Image = reader.result;
        localStorage.setItem("profileImage", base64Image);

        imgSrc.src = base64Image;

        imgSrc.addEventListener("load", () => {
            document.querySelector(".container").classList.remove("disabled");
        });
    };
    reader.readAsDataURL(file);
});




const signIn = async () => {
    try {
        if (!email.value || !password.value) {
            alert("Please enter correct credentials");
            return
        }
        if (imgSrc.src == "http://127.0.0.1:5500/Assets/one%20(2).png") {
            alert("Please upload your profile picture")
            return
        }
        const signInProcess = await signInWithEmailAndPassword(auth, email.value, password.value);
        localStorage.setItem("uid", signInProcess.user.uid);
        alert("Login Successfully");
        window.location.replace("./dashboard.html")

    } catch (error) {
        console.log("error", error.message)
    }


}


window.routeHandler = routeHandler;
window.signIn = signIn;