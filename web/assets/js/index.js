async function checkSignIn() {

    const response = await fetch("CheckSignIn");

    if (response.ok) {

        const json = await response.json();

        const response_dto = json.response_dto;

        if (response_dto.success) {
            // signed in

            const user = response_dto.content;

            let st_quick_link = document.getElementById("st-quick-link");

            let st_quick_link_li_1 = document.getElementById("st-quick-link-li-1");
//            let st_quick_link_li_2 = document.getElementById("st-quick-link-li-2");

            st_quick_link_li_1.remove();
//            st_quick_link_li_2.remove();

            let new_li_tag1 = document.createElement("li");
            let new_li_a_tag1 = document.createElement("a");
            new_li_a_tag1.href = "#";
            new_li_a_tag1.innerHTML = user.first_name + " " + user.last_name;
            new_li_tag1.appendChild(new_li_a_tag1);
            st_quick_link.appendChild(new_li_tag1);

//            let st_button_1 = document.getElementById("st-button-1");
//            st_button_1.href = "SignOut";
//            st_button_1.innerHTML = "Sign Out";

//            let st_div_1 = document.getElementById("st-div-1");
//            st_div_1.remove();

        } else {
            //  not signed in
            console.log("not signed in");
        }

        
    }
}


function loadBodyData(){
    
    checkSignIn();
    loadProduct();
}

async function viewCart() {

    const response = await fetch("cart.html");

    if (response.ok) {
        const cartHtmlText = await response.text();
        //const parser = new DOMParser();
        //const cartHtml = parser.parseFromString(cartHtmlText, "text/html");
        //const cartMain = cartHtml.querySelector("#cart-main");
        //document.querySelector("#index-main").innerHTML = cartMain.innerHTML;
        //filters use karoth url eken yana eka nawaththanna puluwan
        document.querySelector("#index-main").innerHTML = cartHtmlText;
        loadCartItems();
    }

}

//
//async function loadProduct() {
//
//    const response = await fetch("LoadProduct");
//
//    if (response.ok) {
//        const json = await response.json();
//        
//        if (json.success) {
//            
//            const productList = json.productList;
//
//        if (productList.length === 0) {
//            console.log("empty items");
//        } else {
//
//            let productItemContainer = document.getElementById("productItemContainer");
//            let productItem = document.getElementById("productItem");
//            
//            productItemContainer.innerHTML = "";
//           
//            console.log(productList);
//
//            productList.forEach(item => {
//             
//                let productItemClone = productItem.cloneNode(true);
//                productItemClone.querySelector("#productItem-a").href = "product.html?pid=" + item.id;
//                productItemClone.querySelector("#productItem-image").src = "product_images/" + item.id + "/image1.png";
//                productItemClone.querySelector("#productItem-name").innerHTML = item.title;
//                productItemClone.querySelector("#productItem-price").innerHTML = new Intl.NumberFormat(
//                        "en-US",
//                        {
//                            minimumFractionDigits: 2
//                        }
//                ).format(item.price);
//
//                //productItemClone.querySelector("#productItem-category").value = item.qty; 
//                productItemContainer.appendChild(productItemClone);
//            });
//
//            
//        }
//            
//            
//        }else{            
//            console.log(json.message);
//        }
//        
//        
//
//    } else {
//        console.log("bad req")
//    }
//
//}


async function loadProduct() {
    const response = await fetch("LoadProduct");

    if (response.ok) {
        const json = await response.json();

        if (json.success) {
            const productList = json.productList;

            if (productList.length === 0) {
                console.log("empty items");
            } else {
                let productItemContainer = document.getElementById("productItemContainer");
                let productItem = document.getElementById("productItem");

                // Clear the container and destroy Owl Carousel if it exists
                $("#productItemContainer").trigger('destroy.owl.carousel'); // Destroy previous Owl instance
                productItemContainer.innerHTML = ""; // Clear container

                console.log(productList);

                productList.forEach(item => {
                    let productItemClone = productItem.cloneNode(true);
                    productItemClone.querySelector("#productItem-a").href = "product.html?pid=" + item.id;
                    productItemClone.querySelector("#productItem-image").src = "product_images/" + item.id + "/image1.png";
                    productItemClone.querySelector("#productItem-name").innerHTML = item.title;
                    productItemClone.querySelector("#productItem-price").innerHTML = new Intl.NumberFormat(
                        "en-US",
                        { minimumFractionDigits: 2 }
                    ).format(item.price);

                    productItemContainer.appendChild(productItemClone);
                });

                // Reinitialize Owl Carousel after appending all items
                $("#productItemContainer").owlCarousel({
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
            }
        } else {
            console.log(json.message);
        }
    } else {
        console.log("bad req");
    }
}
