const routeHandler = () => {
    const UID = localStorage.getItem("uid");
    if (!UID) {
        window.location.replace("./index.html")
    }
}



import { deleteDoc, collection, db, addDoc, getDocs, doc, updateDoc, query, where } from "./firebase.js"
const blogTitile = document.querySelector("#blogTitile");
const blogs = document.querySelector("#blogs");
const checkStatus = document.querySelector("#checkStatus");
const name = document.querySelector("#name");

const addblogs = async () => {
    try {

        const blogData = {
            name: name.value,
            blogTitile: blogTitile.value,
            blogs: blogs.value,
            uid: localStorage.getItem("uid"),
            checkStatus: checkStatus.checked
        }

        if (name.value.length < 3 || blogTitile.value.length < 3 || blogs.value.length < 3) {
            alert("All fields are required")
        }
        const docRef = await addDoc(collection(db, "blogs"), blogData);
        blogShow()
        console.log("docRef", docRef)
        name.value = ""
        blogTitile.value = ""
        blogs.value = ""
        checkStatus.checked = ""
    } catch (error) {
        alert(error.code, "Error")
    }
}


const blogShow = async () => {
    try {

        const blogCards = document.querySelector(".blog-cards");
        const querySnapshot = await getDocs(collection(db, "blogs"));
        blogCards.innerHTML = ""
        querySnapshot.forEach((doc) => {
            if (doc.data().checkStatus) {
                if (doc.data().uid == localStorage.getItem("uid")) {
                    blogCards.innerHTML += `<div class="alert alert-warning my-4" role="alert">
                <h4 class="card-header mb-1">${doc.data().blogTitile}
                </h4>
                <p>${doc.data().blogs}</p>
                ${doc.data().uid === localStorage.getItem("uid") ?

                            `"<i class="fa-solid fa-pen-to-square" id="${doc.id}"></i>" "<i class="fa-solid fa-trash" id="${doc.id}"></i>"` : ""
                        }
                <br />
                <h3 class="card-footer">  ${doc.data().name}</h3>
            </div>`

                }
            } else {
                // console.log(doc.data().blogTitile)
                blogCards.innerHTML += `<div class="alert alert-warning my-4" role="alert">

                    <h4 class="card-header mb-1">${doc.data().blogTitile} 
                    </h4>
                    <p>${doc.data().blogs}</p>
                    <br />
                    <h3 class="card-footer">  ${doc.data().name}</h3>
                </div>`

            }
        });

        const edtiBtn = document.querySelectorAll(".alert .fa-pen-to-square")

        edtiBtn.forEach((ele) => {

            ele.addEventListener("click", editHandler)
            console.log(ele.id)
        })

        const delBtn = document.querySelectorAll(".alert .fa-trash")

        delBtn.forEach((ele) => {

            ele.addEventListener("click", deleteFunc)
            console.log(ele.id)
        })

    } catch (error) {
        alert("Error", error.message)
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
        blogShow()
    } catch (error) {
        alert("Error", error.message)

    }
}

const deleteFunc = async (ele) => {
    try {
        await deleteDoc(doc(db, "blogs", ele.target.id));
        blogShow()

    } catch (error) {
        alert("Error", error.message)

    }

}



window.editHandler = editHandler;
window.deleteFunc = deleteFunc;
window.routeHandler = routeHandler;
window.blogShow = blogShow;
window.addblogs = addblogs;