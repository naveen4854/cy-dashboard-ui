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

export function stylesMapper(styles) {
    return styles ? {
      backgroundColor: styles.sbc,
      color: styles.sc,
      fontFamily: styles.sff,
      fontSize: styles.sfs
    } : {};
  }