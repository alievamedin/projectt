let inpSearch = document.querySelector(".search-txt")
let searchValue = inpSearch.value



inpSearch.addEventListener("input",(e)=>{
    searchValue =  e.target.value
    readProducts()
  })

  async function readProducts() {
    let data = await fetch(`${API}?q=${searchValue}&_page=${currentPage}&_limit=${limit}&${category === "all" ? "" : "category=" + category}`).then((res) => res.json());
    console.log(data);
  }
  readProducts()