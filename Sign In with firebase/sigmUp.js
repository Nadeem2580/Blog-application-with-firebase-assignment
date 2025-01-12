const routeHandler = () => {
    const UID = localStorage.getItem("uid");
    if (UID) {
        window.location.replace("./dashboard.html")
    }
}



import {
    auth, getAuth, createUserWithEmailAndPassword,
    doc, setDoc,
    db
} from "./firebase.js";
const fName = document.querySelector("#fName")
const lName = document.querySelector("#lName")
const number = document.querySelector("#number")
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const cnic = document.querySelector("#cnic")
const confirmPassword = document.querySelector("#confirmPassword")
let choose_img_Btn = document.querySelector(".choose_img button");
let choose_Input = document.querySelector(".choose_img input");
let imgSrc = document.querySelector(".view_img img");

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



const submitFunc = async () => {
    try {

        if (!fName.value || !lName.value || !number.value || !email.value || imgSrc.src == "") {
            alert("All Fields are mendatory and more than two character");
            return
        }

        if (password.value !== confirmPassword.value) {
            alert("Password does not match please check");
            return
        }
        if (imgSrc.src == "http://127.0.0.1:5500/Assets/one%20(2).png") {
            alert("Please upload your profile picture")
            return
        }
        const dob = `${day.value} - ${month.value} - ${year.value}  `
        const data = {
            fName: fName.value,
            lName: lName.value,
            number: number.value,
            email: email.value,
            dob: dob,
            joinDate: new Date().toLocaleDateString(),
            CNIC: cnic.value
        }
        const signUpProcess = await createUserWithEmailAndPassword(auth, email.value, password.value);
        await setDoc(doc(db, "users", signUpProcess.user.uid), data)
        alert("successfullu login")

        window.location.replace("./index.html")


    } catch (error) {
        console.log(error.message, "message")
    }


}


window.routeHandler = routeHandler
window.submitFunc = submitFunc