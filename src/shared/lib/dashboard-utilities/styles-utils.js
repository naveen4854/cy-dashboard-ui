/**
 * Map Styles to server obj
 */
export function stylesMapperToServer(styles) {
    return styles ? {
        sbc: styles.backgroundColor,
        sc: styles.color,
        sff: styles.fontFamily,
        sfs: styles.fontSize
    } : {};
}

export function stylesMapper(styles, sTag) {
    return styles ? {
        backgroundColor: styles.sbc ? styles.sbc : sTag && sTag == 'b' ? { r: 255, g: 255, b: 255, a: 1 } : null,
        color: styles.sc ? styles.sc : sTag && sTag == 'v' ? { r: 0, g: 0, b: 0, a: 1 } : null,
        fontFamily: styles.sff,
        fontSize: styles.sfs
    } : {};
}

