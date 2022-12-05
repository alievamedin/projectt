  
let API = " http://localhost:8000/posts"

let closeModalBtn = document.querySelector("#close-modal");
let statusImg = document.querySelector("#statusImgUrl");
let nikName = document.querySelector("#nikName");
let adress = document.querySelector("#location");
let mainPostImg = document.querySelector("#mainPostImg");
let saveInfo = document.getElementById("saveInfo");
let details = document.querySelector("#details");

let sectionRead = document.querySelector("#section-read");

let postCard = document.querySelector("#filter-post");
let mainModal = document.getElementsByClassName("main-modal")[0];
let closeModal = document.querySelector("#close-modal");

let closeModalEdit = document.querySelector("#close-modal2");
let statusImgEdit = document.querySelector("#statusImgUrlEdit");
let nikNameEdit = document.querySelector("#nikNameEdit");
let adressEdit = document.querySelector("#locationEdit");
let mainPostImgEdit = document.getElementById("mainPostImgEdit");
let detailsEdit = document.getElementById("detailsEdit");
let saveInfoEdit = document.getElementById("saveInfoEdit");

let mainModal2 = document.getElementsByClassName("main-modal2")[0];

let search = document.getElementsByClassName("search-txt")[0];
searchValue = search.value;

let prevBtn = document.getElementById("paginateNext");
let nextBtn = document.getElementById("paginatePrev");
let currentPage = 1;

//todo ================================= CREATE START ==================================
function createInfo(obj) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  }).then(() => readInfo());
}

saveInfo.addEventListener("click", () => {
  if (
    !statusImg.value.trim() ||
    !nikName.value.trim() ||
    !adress.value.trim() ||
    !mainPostImg.value.trim() ||
    !details.value.trim()
  ) {
    alert("Заполните поле");
    return;
  }
  let objInfo = {
    status: statusImg.value,
    name: nikName.value,
    adress: adress.value,
    mainImg: mainPostImg.value,
    details: details.value,
  };
  createInfo(objInfo);
  statusImg.value = "";
  nikName.value = "";
  adress.value = "";
  mainPostImg.value = "";
  details.value = "";
  mainModal.style.display = "none";
});
postCard.addEventListener("click", () => {
  mainModal.style.display = "block";
});
closeModal.addEventListener("click", () => {
  mainModal.style.display = "none";
});

//todo  ===============================CREATE END ===================================

//TODO   =============================READ START ==============================
function readInfo() {
  fetch(`${API}?q=${searchValue}&_page=${currentPage}&_limit=3
    `)
    .then((res) => res.json())
    .then((data) => {
      sectionRead.innerHTML = "";
      data.forEach((information) => {
        sectionRead.innerHTML += `
  <div class="card">
  <div class="card-head">
    <div class="user-info">
      <img 
      id = "profile_pic"
        src="${information.status}"
        alt=""
        
      />
    </div>
    <div class="name-adress">
      <span>${information.name}</span>
      <span>${information.adress}</span>
    </div>
    <div class="update-delete">
      <button onclick="handleEditBtn(${information.id})">Edit</button>
      <button onclick="deleteInfo(${information.id})">Delete</button>
    </div>
  </div>
  <div class="img-post">
    <img
    id = "main__pic"
      src="${information.mainImg}"
      alt=""
    />
  </div>
  <div class="card-footer">
    <div class="filter-comment">
      <div class="comm-like">
        <div>
          <img
            src="https://icons.veryicon.com/png/o/miscellaneous/template-four/comment-59.png"
            alt=""
            style="width: 30px; height: 45%"
          />
        </div>
        <div>
          <img
            src="https://icons.veryicon.com/png/o/application/basic-linear-icon-2/heart-138.png"
            alt=""
            style="width: 30px; height: 45%"
          />
        </div>
      </div>
      <div class="izb">
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3916/3916593.png"
            alt=""
            style="width: 25px; height: 45%"
          />
        </div>
      </div>
    </div>
    <div class="like">Likes: 0</div>
    <div class="details-card">${information.details}</div>
  </div>
  </div>
  `;
      });
    });
  pageTotal();
}
readInfo();
//TODO   =============================READ END=================================

// ! ============ Delete Start ===========
function deleteInfo(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE",
  }).then(() => readInfo());
}
// ? ============ Delete End ===========
// ! =============== Edit Sart ===========
function editInfo(id, editedObj) {
  if (
    !statusImgEdit.value.trim() ||
    !nikNameEdit.value.trim() ||
    !adressEdit.value.trim() ||
    !mainPostImgEdit.value.trim() ||
    !detailsEdit.value.trim()
  ) {
    alert("Заполните поле");
    return;
  }
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedObj),
  }).then(() => readInfo());
}
let editId = "";
function handleEditBtn(id) {
  fetch(`${API}/${id}`)
    .then((res) => res.json())
    .then((infoObj) => {
      statusImgEdit.value = infoObj.status;
      nikNameEdit.value = infoObj.name;
      adressEdit.value = infoObj.adress;
      mainPostImgEdit.value = infoObj.mainImg;
      detailsEdit.value = infoObj.details;
      editId = infoObj.id;
    });
  mainModal2.style.display = "block";
}

closeModalEdit.addEventListener("click", () => {
  mainModal2.style.display = "none";
});

saveInfoEdit.addEventListener("click", () => {
  let objInfo = {
    status: statusImgEdit.value,
    name: nikNameEdit.value,
    adress: adressEdit.value,
    mainImg: mainPostImgEdit.value,
    details: detailsEdit.value,
  };
  editInfo(editId, objInfo);
  mainModal2.style.display = "none";
});

// ? =============== Edit End ===========

// ! ============ Search Start ==========
search.addEventListener("input", (e) => {
  searchValue = e.target.value;
  readInfo();
});
// ? ============ Search End ==========
// ! ========== Paginate Start =========
let countPage = 1;
function pageTotal() {
  fetch(`${API}?q=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      countPage = Math.ceil(data.length / 3);
    });
}

prevBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  readInfo();
});
nextBtn.addEventListener("click", () => {
  if (currentPage >= countPage) return;
  currentPage++;
  readInfo();
});
// ? ========== Paginate End ===========