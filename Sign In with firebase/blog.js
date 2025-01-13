const routeHandler = () => {
    const UID = localStorage.getItem("uid");
    if (!UID) {
        window.location.replace("./index.html")
    }
}
import { collection, db, query, where, getDocs, doc, updateDoc, deleteDoc } from "./firebase.js";
const blogCards = document.querySelector(".blog-cards");

const cardsRender = async () => {
    try {
        const blogRef = collection(db, "blogs");
        const q = query(blogRef, where("uid", "==", localStorage.getItem("uid")));

        const querySnapshot = await getDocs(q);
        blogCards.innerHTML = ""
        querySnapshot.forEach((doc) => {
            blogCards.innerHTML += `  <div class="alert alert-warning my-4" role="alert">
            <h4 class="card-header">${doc.data().blogTitile} 
            <i class="fa-solid fa-pen-to-square float-end mx-2" id="${doc.id}"></i>
            <i class="fa-solid fa-trash float-end" id="${doc.id}"></i>
            </h4>
            <p class="description">${doc.data().blogs}</p>
            <h3 class="card-footer">${doc.data().name}</h3>
            
            </div>`
        });

        const edtiBtn = document.querySelectorAll(".alert .fa-pen-to-square")

        edtiBtn.forEach((ele) => {

            ele.addEventListener("click", editHandler)
            console.log(ele.id)
        })

        const delBtn = document.querySelectorAll(".alert .fa-trash")

        delBtn.forEach((ele) => {

            ele.addEventListener("click", deleteFunc)
        })

    } catch (error) {
        alert("error", error.message)
    }
}



const editHandler = async (ele) => {
    try {

        const prompts = prompt("Enter edit value");
        if (!prompts) {
            alert("Enter edit value")
            return
        }
        const washingtonRef = await doc(db, "blogs", ele.target.id);

        await updateDoc(washingtonRef, {
            blogs: prompts
        })
        cardsRender()

    } catch (error) {
        console.log("Error", error.message)

    }
}

const deleteFunc = async (ele) => {
    try {
        await deleteDoc(doc(db, "blogs", ele.target.id));
        cardsRender()

    } catch (error) {
        console.log("error", error.message)
    }

}

const logout = () => {
    localStorage.clear()
    window.location.replace("./index.html")
    console.log("hello")
}

window.editHandler = editHandler;
window.deleteFunc = deleteFunc;
window.cardsRender = cardsRender;
window.logout = logout;
window.routeHandler = routeHandler;