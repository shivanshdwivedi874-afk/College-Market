let products = [];

function addProduct(){

  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let desc = document.getElementById("desc").value;

  products.push({
    title,
    price,
    desc
  });

  showProducts();
}

function showProducts(){

  let box = document.getElementById("products");
  box.innerHTML = "";

  products.forEach(p=>{
    box.innerHTML += `
      <div class="card">
        <h3>${p.title}</h3>
        <p>₹${p.price}</p>
        <p>${p.desc}</p>

        <button onclick="messageSeller('${p.title}')">
          Message Seller
        </button>
      </div>
    `;
  });
}

function messageSeller(product){
  alert("Messaging seller for: " + product);
}