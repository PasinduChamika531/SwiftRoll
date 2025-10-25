async function signUp() {

    const user_dto = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const response = await fetch(
            "SignUp",
            {
                method: "POST",
                body: JSON.stringify(user_dto),
                headers: {
                    "Content-Type": "application/json"
                }
            }
    );

    if (response.ok) {
        const json = await response.json();

        if (json.success) {
            window.location = "verification.html";
        } else {
            document.getElementById("message-alert").innerHTML = json.content;
            
        }
    } else {
        document.getElementById("message-alert").innerHTML = "Please try agin later";
    }
}