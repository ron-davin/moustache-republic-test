const productImageElement = document.querySelector(".product-image img")
const productTitleElement = document.querySelector(".product-title")
const productPriceElement = document.querySelector(".product-price")
const productDescriptionElement = document.querySelector(".product-description")
const productVariantsSelection = document.querySelector(".variants-selection")
const sizeSelectedElement = document.querySelector(".size-selected")
const addToCartButton = document.querySelector(".add-to-cart")
const cartText = document.querySelector(".cart-text")
const cartDrawer = document.querySelector(".cart-items")
const cartQuantity = document.querySelector("#cart-quantity")
const emptyNote = document.querySelector(".empty-note")
let totalCartQuantity = 0


async function fetchProductData(url) {
  const response = await fetch(url)
  const data = await response.json()
  
  return data
}

function handleSizeSelection() {
  document.querySelectorAll(".size").forEach((variant) => {
    variant.addEventListener("click", function(e) {
      removeSelected()
      variant.classList.add("selected")
      sizeSelectedElement.textContent = variant.textContent
    })
  })
}

function removeSelected() {
  document.querySelectorAll(".size").forEach((variant) => {
    variant.classList.remove("selected")
  })
}

function handleAddToCart(title, price, image) {
  const cartItems = []
  let smallQuantity = 0
  let mediumQuantity = 0
  let largeQuantity = 0

  addToCartButton.addEventListener("click", function() {
    if (totalCartQuantity == 0 && !document.querySelector(".selected")) {
      alert("Select tee variant")
    } else {
      emptyNote.style.display = "none"
    }

    if (document.querySelector(".selected").textContent == "S") {
      smallQuantity++
      if (!cartItems.includes("S")) {
        cartDrawer.insertAdjacentHTML("afterbegin", 
        `<div class='cart-item'>
          <img class='cart-item-image' src="${image}">
          <div class='cart-item-info'>
            <p class='cart-item-title'>${title}</p>
            <p class='cart-item-quantity'><span class="small"></span> x $${price}</p>
            <p class='cart-item-variant'>Size: S</p>
          </div>
        </div>`)
      }
      cartItems.push("S")
      document.querySelector(".cart-item-quantity .small").textContent = smallQuantity
      totalCartQuantity++
    } else if (document.querySelector(".selected").textContent == "M") {
      mediumQuantity++
      if (!cartItems.includes("M")) {
        cartDrawer.insertAdjacentHTML("afterbegin", 
        `<div class='cart-item'>
          <img class='cart-item-image' src="${image}">
          <div class='cart-item-info'>
            <p class='cart-item-title'>${title}</p>
            <p class='cart-item-quantity'><span class="medium"></span> x $${price}</p>
            <p class='cart-item-variant'>Size: M</p>
          </div>
        </div>`)
      }
      cartItems.push("M")
      document.querySelector(".cart-item-quantity .medium").textContent = mediumQuantity
      totalCartQuantity++
    } else if (document.querySelector(".selected").textContent == "L") {
      largeQuantity++
      if (!cartItems.includes("L")) {
        cartDrawer.insertAdjacentHTML("afterbegin", 
        `<div class='cart-item'>
          <img class='cart-item-image' src="${image}">
          <div class='cart-item-info'>
            <p class='cart-item-title'>${title}</p>
            <p class='cart-item-quantity'><span class="large"></span> x $${price}</p>
            <p class='cart-item-variant'>Size: L</p>
          </div>
        </div>`)
      }
      cartItems.push("L")
      document.querySelector(".cart-item-quantity .large").textContent = largeQuantity
      totalCartQuantity++
    }

    cartQuantity.textContent = totalCartQuantity
  })
}

fetchProductData("https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product").then((data) => {
  productImageElement.src = data["imageURL"]
  productPriceElement.textContent = "$" + data["price"]
  productTitleElement.textContent = data["title"]
  productDescriptionElement.textContent = data["description"]

  data["sizeOptions"].forEach((size) => {
    const sizeElement = document.createElement("div")
    sizeElement.className = size.label + "_" + size.id + " size"
    sizeElement.textContent = size.label

    productVariantsSelection.append(sizeElement)
  })

  handleSizeSelection()
  handleAddToCart(data["title"], data["price"], data["imageURL"])
})

document.addEventListener("click", function(e) {
  if (e.target == cartText || e.target == addToCartButton) {
    cartDrawer.classList.add("show")
  } else {
    cartDrawer.classList.remove("show")
  }
})

