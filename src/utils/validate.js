export const checkValidDataForSignIn = (email,password) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    if(!isEmailValid) return "Email is not valid"
    if(!isPasswordValid) return "Pasword is not valid"
    return null
}

export const checkValidDataForSignUp = (name,email,password) => {
    const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name)
    if(!isNameValid) return "Name is not valid"
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    if(!isEmailValid) return "Email is not valid"
    if(!isPasswordValid) return "Pasword is not valid"
    return null
    // checkValidDataForSignIn(email,password)
}