// export function extend (a, b, context) {
//     for (let key in b) {
//         if (b.hasOwnProperty(key)) {
//             if (typeof b[key] === 'function') {
//                 a[key] = b[key].bind(context);
//             } else {
//                 a[key] = b[key];
//             }
//         }
//     }
// }

exports.extend = function(a, b, context) {
    for (let key in b) {
        if (b.hasOwnProperty(key)) {
            if (typeof b[key] === 'function') {
                a[key] = b[key].bind(context);
            } else {
                a[key] = b[key];
            }
        }
    }
}
