// violationsData.js
export const violations = JSON.parse(localStorage.getItem("violations")) || [];

export const addViolation = (violation) => {
    violations.push(violation);
    localStorage.setItem("violations", JSON.stringify(violations));
};
