var modelList;
async function loadFeatures() {

    const response = await fetch("LoadFeatures");
    if (response.ok) {

        const json = await response.json();
        const categoryList = json.categoryList;
        modelList = json.modelList;
        const colorList = json.colorList;
        const storageList = json.storageList;
        const conditionList = json.conditionList;
        loadSelectOptions("category-select", categoryList, ["id", "name"]);
        loadSelectOptions("model-select", modelList, ["id", "name"]);
        loadSelectOptions("color-select", colorList, ["id", "name"]);
        loadSelectOptions("storage-select", storageList, ["id", "value"]);
        loadSelectOptions("condition-select", conditionList, ["id", "name"]);
    } else {
        console.log("Error");
    }

}

function loadSelectOptions(selectTagId, list, propertyArray) {
    const selectTag = document.getElementById(selectTagId);
    list.forEach(item => {
        let optionTag = document.createElement("option");
        optionTag.value = item[propertyArray[0]];
        optionTag.innerHTML = item[propertyArray[1]];
        selectTag.appendChild(optionTag);
    });
}

function updateModels() {

    let modelSelectTag = document.getElementById("model-select");
    modelSelectTag.length = 1;
    let selectedCategoryId = document.getElementById("category-select").value;
    modelList.forEach(model => {
        if (model.category.id == selectedCategoryId) {
            let optionTag = document.createElement("option");
            optionTag.value = model.id;
            optionTag.innerHTML = model.name;
            modelSelectTag.appendChild(optionTag);
        }
    });
}

async function productListing() {

    const categorySelectTag = document.getElementById("category-select");
    const modelSelectTag = document.getElementById("model-select");
    const titleTag = document.getElementById("title");
    const descriptionTag = document.getElementById("description");
    const storageSelectTag = document.getElementById("storage-select");
    const colorSelectTag = document.getElementById("color-select");
    const conditionSelectTag = document.getElementById("condition-select");
    const priceTag = document.getElementById("price");
    const quantityTag = document.getElementById("quantity");
    const image1Tag = document.getElementById("image1");
    const image2Tag = document.getElementById("image2");
    const image3Tag = document.getElementById("image3");
    const showMessage = document.getElementById("message");

    const data = new FormData();
    data.append("categoryId", categorySelectTag.value);
    data.append("modelId", modelSelectTag.value);
    data.append("title", titleTag.value);
    data.append("description", descriptionTag.value);
    data.append("storageId", storageSelectTag.value);
    data.append("colorId", colorSelectTag.value);
    data.append("conditionId", conditionSelectTag.value);
    data.append("price", priceTag.value);
    data.append("quantity", quantityTag.value);
    data.append("image1", image1Tag.files[0]);
    data.append("image2", image2Tag.files[0]);
    data.append("image3", image3Tag.files[0]);

    const response = await fetch(
            "ProductListing",
            {
                method: "POST",
                body: data
            }
    );

    if (response.ok) {
        const json = await response.json();

        const popup = Notification();

        if (json.success) {
            categorySelectTag.value = 0;
            modelSelectTag.value = 0;
            titleTag.value = "";
            descriptionTag.value = "";
            storageSelectTag.value = 0;
            colorSelectTag.value = 0;
            conditionSelectTag.value = 0;
            priceTag.value = "";
            quantityTag.value = 1;
            image1Tag.value = null;
            image2Tag.value = null;
            image3Tag.value = null;

            popup.success({
                message: json.content
            });

        } else {

            popup.error({
                message: json.content
            });
        }

    } else {
        console.log("try agin");
    }

}

async function updateProfile12() {


    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    let line1 = document.getElementById("line1").value;
    let line2 = document.getElementById("line2").value;
    let mobile = document.getElementById("mobile").value;
    let postal_code = document.getElementById("postal_code").value;
    let city_select = document.getElementById("city_select").value;
    let old_password = document.getElementById("old_password").value;
    let new_password = document.getElementById("new_password").value;


    let formData = new FormData();
    formData.append("firstName", first_name);
    formData.append("lastName", last_name);
    formData.append("email", email);
    formData.append("line1", line1);
    formData.append("line2", line2);
    formData.append("mobile", mobile);
    formData.append("postal_code", postal_code);
    formData.append("city_select", city_select);
    formData.append("oldPassword", old_password);
    formData.append("newPassword", new_password);

    const response = await fetch(
            "UpdateProfile",
            {
                method: "POST",
                body: formData,

            }
    );

    if (response.ok) {
        const json = await response.json();

        const popup = Notification();

        if (json.success) {

            popup.success({
                message: json.message
            });

            //window.location = "dashboard.html";
        } else {
            // document.getElementById("message-alert").innerHTML = json.content;
            console.log();

        }
    } else {
        //document.getElementById("message-alert").innerHTML = "Please try agin later";
        console.log();
    }
}




async function updateProfile() {
    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    let line1 = document.getElementById("line1").value;
    let line2 = document.getElementById("line2").value;
    let mobile = document.getElementById("mobile").value;
    let postal_code = document.getElementById("postal_code").value;
    let city_select = document.getElementById("city_select").value;
    let old_password = document.getElementById("old_password").value;
    let new_password = document.getElementById("new_password").value;

    console.log(first_name);

    const popup = Notification();

    if (city_select == "0") {
        popup.success({
            message: "Please Select a City",
        });
        return;
    }



    let formData = new FormData();
    formData.append("firstName", first_name);
    formData.append("lastName", last_name);
    formData.append("email", email);
    formData.append("line1", line1);
    formData.append("line2", line2);
    formData.append("mobile", mobile);
    formData.append("postal_code", postal_code);
    formData.append("city_select", city_select);
    formData.append("oldPassword", old_password);
    formData.append("newPassword", new_password);


    try {
        const response = await fetch("UpdateProfile", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const json = await response.json();

            if (json.success) {
                popup.success({
                    message: json.message,
                });
                // Optional: redirect the user after success
                // window.location = "dashboard.html";
            } else {
                popup.error({
                    message: json.message || "An error occurred during the update.",
                });
                console.error("Error Response:", json.message);
            }
        } else {
            console.error("HTTP Error:", response.status);
            alert("Server error occurred. Please try again later.");
        }
    } catch (error) {
        console.error("Network Error:", error);
        alert("Network error occurred. Please check your connection.");
    }
}















async function loadUserData() {

//    let first_name = document.getElementById("first_name").value;
//    let last_name = document.getElementById("last_name").value;
//    let email = document.getElementById("email").value;
//    let line1 = document.getElementById("line1").value;
//    let line2 = document.getElementById("line2").value;
//    let mobile = document.getElementById("mobile").value;
//    let postal_code = document.getElementById("postal_code").value;
//    let city_select = document.getElementById("city_select").value;
//    let old_password = document.getElementById("old_password").value;
//    let new_password = document.getElementById("new_password").value;

    const response = await fetch("LoadUserData");

    if (response.ok) {
        const json = await response.json();



        if (json.success) {

            document.getElementById("first_name").value = json.user.first_name;
            document.getElementById("last_name").value = json.user.last_name;
            document.getElementById("email").value = json.user.email;
            document.getElementById("line1").value = json.address.line1;
            document.getElementById("line2").value = json.address.line2;
            document.getElementById("mobile").value = json.address.mobile;
            document.getElementById("postal_code").value = json.address.postal_code;
            //document.getElementById("city_select").value = json.address.city;

            const selectTag = document.getElementById("city_select");
            json.citylist.forEach(item => {
                let optionTag = document.createElement("option");
                optionTag.value = item.id;
                optionTag.innerHTML = item.name;
                selectTag.appendChild(optionTag);
            });




        } else {
//            document.getElementById("message-alert").innerHTML = json.content;
            popup.error({
                message: json.message
            });
        }
    } else {
        document.getElementById("message-alert").innerHTML = "Please try agin later";
    }






}



async function loadUserData1() {

    const response = await fetch("LoadUserData");

    if (response.ok) {
        const json = await response.json();

        if (json.success) {
            // Populate form fields with user data
            document.getElementById("first_name").value = json.user.first_name;
            document.getElementById("last_name").value = json.user.last_name;
            document.getElementById("email").value = json.user.email;

            // Check if address object exists before accessing its properties
            if (json.address) {
                if (json.address.line1) {
                    document.getElementById("line1").value = json.address.line1;
                }
                if (json.address.line2) {
                    document.getElementById("line2").value = json.address.line2;
                }
                if (json.address.postal_code) {
                    document.getElementById("postal_code").value = json.address.postal_code;
                }
                if (json.address.mobile) {
                    document.getElementById("mobile").value = json.address.mobile;
                }
            }

            // Populate the city dropdown
            const selectTag = document.getElementById("city_select");
            selectTag.innerHTML = ''; // Clear previous options
            json.citylist.forEach(item => {
                let optionTag = document.createElement("option");
                optionTag.value = item.id;
                optionTag.innerHTML = item.name;
                selectTag.appendChild(optionTag);
            });

            // Optionally, select the current city if provided
//            if (json.user.city_id) {
//                selectTag.value = json.user.city_id;
//            }

        } else {
            // Error case: Show error message in a popup
            popup.error({
                message: json.message
            });
        }
    } else {
        // Network error case
        document.getElementById("message-alert").innerHTML = "Please try again later.";
    }
}

