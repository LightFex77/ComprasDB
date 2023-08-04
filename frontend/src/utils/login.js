export const verifyAccount = async (email, password) => {
    const data = {
        email: email,
        password : password
    }

    try {
        await fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
    } catch(error) {
        console.error("Error de usuario", error)
    }
}