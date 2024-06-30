import General from "../utility/General"

export const isAccessAllowed = (allowedRoles) => {
    const role = General.getLocalStorageData('role')

    return allowedRoles.includes(role)
}