// Đợi cho toàn bộ nội dung trang web được tải xong rồi mới chạy script
document.addEventListener("DOMContentLoaded", function () {
  // --- CÁC HÀM TIỆN ÍCH ---

  /**
   * Chuyển chuỗi tiền tệ (vd: "42.990.000₫") thành số (vd: 42990000)
   * @param {string} priceString Chuỗi tiền tệ cần chuyển đổi
   * @returns {number} Số nguyên
   */
  function parsePrice(priceString) {
    return parseInt(priceString.replace(/\./g, "").replace("₫", ""));
  }

  /**
   * Chuyển số thành chuỗi tiền tệ (vd: 42990000 -> "42.990.000₫")
   * @param {number} number Số cần định dạng
   * @returns {string} Chuỗi tiền tệ
   */
  function formatPrice(number) {
    return number
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace(/\s/g, "");
  }

  // --- HÀM CẬP NHẬT CHÍNH ---

  /**
   * Tính toán và cập nhật lại toàn bộ giỏ hàng
   */
  function updateCartTotals() {
    const productRows = document.querySelectorAll(".product-row");
    const cartTableBody = document.querySelector(".cart-table tbody");
    let totalCartPrice = 0;
    // --- XÓA THÔNG BÁO GIỎ HÀNG TRỐNG (nếu có) TRƯỚC KHI TÍNH TOÁN ---
    const emptyCartRow = cartTableBody.querySelector(".empty-cart-message");
    if (emptyCartRow) {
      emptyCartRow.remove();
    }
    // Lặp qua từng dòng sản phẩm
    productRows.forEach((row) => {
      const priceElement = row.querySelector(".product-price");
      const quantityInput = row.querySelector(".qt-input");
      const subtotalElement = row.querySelector(".product-subtotal");

      const price = parsePrice(priceElement.textContent);
      const quantity = parseInt(quantityInput.value);

      // Tính toán tạm tính cho sản phẩm này
      const subtotal = price * quantity;

      // Cập nhật lại cột "Tạm tính" của dòng này
      subtotalElement.textContent = formatPrice(subtotal);

      // Cộng dồn vào tổng tiền của cả giỏ hàng
      totalCartPrice += subtotal;
    });

    // Cập nhật các giá trị ở ô tổng cộng bên phải
    const summarySubtotal = document.getElementById("summary-subtotal");
    const summaryTotal = document.getElementById("summary-total");

    summarySubtotal.textContent = formatPrice(totalCartPrice);
    summaryTotal.innerHTML = `<strong>${formatPrice(totalCartPrice)}</strong>`;
    // --- KIỂM TRA VÀ HIỂN THỊ THÔNG BÁO GIỎ HÀNG TRỐNG ---
    if (productRows.length === 0) {
      // Tạo một dòng mới
      const newRow = document.createElement("tr");
      newRow.classList.add("empty-cart-message"); // Thêm class để dễ nhận biết

      // Tạo một ô mới và gộp nó qua 4 cột
      const newCell = document.createElement("td");
      newCell.setAttribute("colspan", "4");
      newCell.textContent = "Không có sản phẩm nào trong giỏ hàng!";
      newCell.style.textAlign = "center";
      newCell.style.padding = "40px 0";
      newCell.style.fontSize = "18px";
      newCell.style.color = "#777";

      // Gắn ô vào dòng, và gắn dòng vào tbody
      newRow.appendChild(newCell);
      cartTableBody.appendChild(newRow);
    }
  }

  // --- GẮN SỰ KIỆN CHO CÁC NÚT ---

  const quantitySelectors = document.querySelectorAll(".quantity-selector");

  quantitySelectors.forEach((selector) => {
    const minusBtn = selector.querySelector(".qt-minus");
    const plusBtn = selector.querySelector(".qt-plus");
    const quantityInput = selector.querySelector(".qt-input");

    // Sự kiện click nút trừ
    minusBtn.addEventListener("click", function () {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        // Đảm bảo số lượng không nhỏ hơn 1
        quantityInput.value = currentValue - 1;
        updateCartTotals(); // Gọi hàm cập nhật lại giỏ hàng
      }
    });

    // Sự kiện click nút cộng
    plusBtn.addEventListener("click", function () {
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
      updateCartTotals(); // Gọi hàm cập nhật lại giỏ hàng
    });

    // Sự kiện khi người dùng tự nhập số lượng (tùy chọn)
    quantityInput.addEventListener("change", function () {
      if (
        parseInt(quantityInput.value) < 1 ||
        isNaN(parseInt(quantityInput.value))
      ) {
        quantityInput.value = 1;
      }
      updateCartTotals();
    });
  });
  // --- GẮN SỰ KIỆN CHO CÁC NÚT XÓA ---
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 1. Tìm thẻ <tr> cha gần nhất và xóa nó
      button.closest(".product-row").remove();

      // 2. Gọi hàm cập nhật lại tổng tiền
      updateCartTotals();
    });
  });

  // Chạy hàm update một lần khi tải trang để đảm bảo mọi thứ đều đúng
  updateCartTotals();
});
