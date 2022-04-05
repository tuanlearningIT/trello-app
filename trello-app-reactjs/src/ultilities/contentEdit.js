

export const selectAll = (e) => {
    e.target.select()
    e.target.focus()
}
export const saveContent = (e) => {
    if (e.key === "Enter") {
        e.target.blur()
        e.preventDefault()
    }
}