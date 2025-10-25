async function loadProduct() {

    const parameters = new URLSearchParams(window.location.search);

    if (parameters.has("pid")) {
        const pid = parameters.get("pid");
        const response = await fetch("LoadSingleProduct?pid=" + pid);

        if (response.ok) {
            const json = await response.json();

            const id = json.product.id;
            document.getElementById("image1").src = "product_images/" + id + "/image1.png";            
            document.getElementById("leftimage1").src = "product_images/" + id + "/image1.png";        
            document.getElementById("leftimage2").src = "product_images/" + id + "/image2.png";  
            document.getElementById("leftimage3").src = "product_images/" + id + "/image3.png";

            document.getElementById("title").innerHTML = json.product.title;
//            document.getElementById("product-published-on").innerHTML = json.product.date_time;

            document.getElementById("product-price").innerHTML = new Intl.NumberFormat(
                    "en-US",
                    {
                        minimumFractionDigits: 2
                    }
            ).format(json.product.price);

            document.getElementById("product-category").innerHTML = json.product.model.category.name;
            document.getElementById("product-model").innerHTML = json.product.model.name;
            document.getElementById("product-condition").innerHTML = json.product.product_condition.name;
            document.getElementById("product-stock").innerHTML = json.product.qty; 
            document.getElementById("product-storage").innerHTML = json.product.storage.value;
            document.getElementById("color-background").innerHTML = json.product.color.name;
            console.log(json.product.color.name);
             document.getElementById("product-description").innerHTML = json.product.description;
            
           

            document.getElementById("add-to-cart-main").addEventListener("click", (e) => {
                addToCart(json.product.id, document.getElementById("add-to-cart-qty").value);
                e.preventDefault();
            });

            let productHtml = document.getElementById("similar-product");
             $("#similar-product-main").trigger('destroy.owl.carousel'); // Destroy previous Owl instance
            document.getElementById("similar-product-main").innerHTML = "";

            json.productList.forEach(item => {

                let productCloneHtml = productHtml.cloneNode(true);

                productCloneHtml.querySelector("#similar-product-a1").href = "product.html?pid=" + item.id;
                productCloneHtml.querySelector("#similar-product-image").src = "product_images/" + item.id + "/image1.png";
                productCloneHtml.querySelector("#similar-product-image1").src = "product_images/" + item.id + "/image1.png";
                productCloneHtml.querySelector("#similar-product-image2").src = "product_images/" + item.id + "/image2.png";
                productCloneHtml.querySelector("#similar-product-image3").src = "product_images/" + item.id + "/image3.png";
               // productCloneHtml.querySelector("#similar-product-a2").href = "single-product.html?pid=" + item.id;
                productCloneHtml.querySelector("#similar-product-title").innerHTML = item.title;
               // productCloneHtml.querySelector("#similar-product-storage").innerHTML = item.storage.value;
                productCloneHtml.querySelector("#similar-product-price").innerHTML = "Rs. " + new Intl.NumberFormat(
                        "en-US",
                        {
                            minimumFractionDigits: 2
                        }
                ).format(item.price);

//                productCloneHtml.querySelector("#similar-product-color-border").style.borderColor = item.color.name;

                productCloneHtml.querySelector("#similar-product-color").innerHTML = item.color.name;

                productCloneHtml.querySelector("#similar-product-add-to-cart").addEventListener("click", (e) => {

                    addToCart(item.id, 1);
                    e.preventDefault();

                });

                document.getElementById("similar-product-main").appendChild(productCloneHtml);
            });

             // Reinitialize Owl Carousel after appending all items
                $("#similar-product-main").owlCarousel({
                    nav: true,
                    dots: true,
                    margin: 20,
                    loop: false,
                    responsive: {
                        0: { items: 2 },
                        600: { items: 2 },
                        992: { items: 3 },
                        1200: { items: 4 }
                    }
                });

        } else {
            window.location = "index.html";
        }

    } else {
        window.location = "index.html";
    }

}

async function addToCart(pid, qty) {

    const response = await fetch("AddToCart?pid=" + pid + "&qty=" + qty);

    const popup = Notification();

    if (response.ok) {
        const json = await response.json();
        if (json.success) {
            popup.success({
                message: json.content
            });
        } else {
            popup.error({
                message: json.content
            });
        }
    } else {
        popup:error({
            message: "Unable to process your request"
        });
    }

}