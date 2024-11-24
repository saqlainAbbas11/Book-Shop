$(document).ready(function () {
    const cart = [];
  
    $.getJSON("books.json", function (books) {
      let bookHTML = "";
      books.forEach((book) => {
        bookHTML += `
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="${book.image}" class="card-img-top" alt="${book.title}">
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">Author: ${book.author}</p>
                <p class="card-text">${book.description}</p>
                <p class="card-text"><strong>Price: $${book.price}</strong></p>
                <button class="btn btn-primary add-to-cart" data-id="${book.id}">Add to Cart</button>
              </div>
            </div>
          </div>
        `;
      });
      $("#book-list").html(bookHTML);
    });
  
    // Add to Cart
    $("body").on("click", ".add-to-cart", function () {
      const bookId = $(this).data("id");
  
      $.getJSON("books.json", function (books) {
        const book = books.find((b) => b.id === bookId);
        alert('Item added')
  
        const existingItem = cart.find((item) => item.id === bookId);
        if (existingItem) {
          existingItem.quantity++;
         
        } else {
          cart.push({ ...book, quantity: 1 });
        }
  
        updateCartModal();
      });
    });
  
    function updateCartModal() {
      let cartHTML = "";
      let totalPrice = 0;
  
      cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
  
        cartHTML += `
          <tr>
            <td>${item.title}</td>
            <td>${item.author}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
              <input type="number" class="form-control quantity-input" data-id="${item.id}" value="${item.quantity}" min="1">
            </td>
            <td>
              <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">&times;</button>
            </td>
          </tr>
        `;
      });
  
      $("#cartItems").html(cartHTML);
      $("#totalPrice").text(totalPrice.toFixed(2));
    }
  
    $("body").on("click", ".remove-from-cart", function () {
      const bookId = $(this).data("id");
  
      const index = cart.findIndex((item) => item.id === bookId);
      if (index !== -1) {
        cart.splice(index, 1);
      }
  
      updateCartModal();
    });
  
    $("body").on("change", ".quantity-input", function () {
      const bookId = $(this).data("id");
      const newQuantity = parseInt($(this).val());
  
      const item = cart.find((item) => item.id === bookId);
      if (item) {
        item.quantity = newQuantity;
      }

      updateCartModal();
    });

    $("body").on("click", "#cartModalBtn", function () {
      $("#cartModal").modal("show");
    });
  });
  