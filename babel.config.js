// module.exports = {
//     presets: [
//         '@vue/app'
//     ],
// };
//
// module.exports = {
//     presets: [
//         [
//             "@babel/preset-env",
//             {
//                 useBuiltIns: 'usage',
//                 targets: {
//                     "browsers": ["last 6 versions"]
//                 },
//                 modules: false,
//                 forceAllTransforms: true,
//                 include : [
//                     "@babel/plugin-transform-arrow-functions",
//                     "@babel/plugin-transform-block-scoping",
//                 ],
//             }
//         ]
//     ],
//     // plugins : [
//     //     "@babel/plugin-transform-arrow-functions",
//     //     "@babel/plugin-transform-block-scoping",
//     // ],
// };

// module.exports = {
//     presets: [
//         ['@babel/preset-env', {
//             useBuiltIns: 'entry',
//             // forceAllTransforms : true,
//             // ignoreBrowserslistConfig : true,
//         },
//         ]
//     ],
// }
module.exports = {
    // presets: [
    //     '@vue/app'
    // ]
    presets: [
        ['@babel/preset-env', {
            useBuiltIns: 'entry',
        }]
    ]
}