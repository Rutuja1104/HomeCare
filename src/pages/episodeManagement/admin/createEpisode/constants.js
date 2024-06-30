export const episodeDuration = [
    { label: 60, value: 60 },
    { label: 90, value: 90 },
    { label: 120, value: 120 },
    // { label: 180, value: 180 }
];

export const emergencyLevel = [
    { label: "All", value: "All" },
    { label: "CLASS_I", value: "CLASS_I" },
    { label: "CLASS_II", value: "CLASS_II" },
    { label: "CLASS_III", value: "CLASS_III" },
    { label: "CLASS_IV", value: "CLASS_IV" },
    { label: "NA", value: "NA" }
];

export const STAFF_SELECTION = {
    discipline: { value: "", errors: {}, rules: { required: true } },
    selectedUser: { value: "", errors: {}, rules: { required: true } },
    episodePurpose: {value: "", erros: {}, rules: {required: true}},
}