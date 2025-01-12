import { db, doc, getDoc } from "./firebase.js";

const routeHandler = () => {
    const UID = localStorage.getItem("uid");
    if (!UID) {
        window.location.replace("./index.html")
    }
}

const fullName = document.querySelector(".fullName");
const dob = document.querySelector(".dob");
const number = document.querySelector(".number");
const joinDate = document.querySelector(".joinDate");
const Cnic = document.querySelector(".Cnic");
const email = document.querySelector(".email");


const getData = async () => {

    const docRef = doc(db, "users", localStorage.getItem("uid"));
    const docSnap = await getDoc(docRef);
    fullName.innerHTML = `${docSnap.data().fName} ${docSnap.data().lName}`;
    dob.innerHTML = `${docSnap.data().dob}`;
    number.innerHTML = `${docSnap.data().number} `;
    joinDate.innerHTML = `${docSnap.data().joinDate} `;
    Cnic.innerHTML = `${docSnap.data().CNIC} `;
    email.innerHTML = `${docSnap.data().email} `;

    console.log(docSnap.data())

}




const imageLoad = () => {
    let storedImage = localStorage.getItem("profileImage");
    const profileImage = document.querySelector("#profileImage");
    console.log(profileImage.src)
    if (storedImage) {
        profileImage.src = storedImage;
    }
};


const logout = () => {
    localStorage.clear()
    window.location.replace("./index.html")
    console.log("hello")
}














window.logout = logout;
window.imageLoad = imageLoad;
window.getData = getData;
window.routeHandler = routeHandler;