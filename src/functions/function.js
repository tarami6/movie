export const checkList = (list) => {
    return (
        list.length > 4 ? true : false
    )

}
export const slidesScreenSize = (screen) => {
    if (screen > 767) {
        return 5
    } else if (screen < 767 &&  screen > 576) {
        return 4
    } else {
        return 2
    }
}

export const speedScreenSize = (screen) => {
    if (screen > 576) {
        return 500
    } else {
        return false
    }
}