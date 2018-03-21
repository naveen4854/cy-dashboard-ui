import _ from 'lodash';

export function ToString(colorObejct) {
    if(colorObejct)
  return (typeof colorObejct === "string") ? colorObejct : `rgba(${colorObejct.r},${colorObejct.g},${colorObejct.b},${colorObejct.a})`;
}

export function hexToRgba(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return {
      r: (c >> 16) & 255,
      g: (c >> 8) & 255,
      b: c & 255,
      a: 1
    };
  }
  throw new Error('Bad Hex: ', hex);
}
export function rgbaStringToObject(strColor) {
  if (/^rgba\(/.test(strColor)) {
    let color = [];
    _.map(strColor.substring(5, strColor.length - 1).split(','), (col) => color.push(parseFloat(col)));
    return {
      r: color[0],
      g: color[1],
      b: color[2],
      a: color[3]
    };
  }
  throw new Error('Bad rgba color format: ', strColor);
}

export function getRandomColor(needHex) {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return needHex ? color : hexToRgba(color);
}

// export function Rgba(r,g,b,a) {
//   return {
//     r,
//     g,
//     b,
//     a
//   }
// }