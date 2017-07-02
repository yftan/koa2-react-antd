/**
 * Created by tanyufeng on 2017/6/28.
 */
export default async(ctx, next) => {
    ctx.body = {
        "visibleTodos": [{
            text: "111",
            completed: "true"
        }, {
            text: "222",
            completed: "false"
        }],
        visibilityFilter: "SHOW_ALL"
    }
}

// ctx.body = {
//     "code": 200,
//     "msg": "ok",
//     "result": {
//         "count": 128,
//         "list": [{
//             visibleTodos: {
//                 completed: "true",
//                 text: "111"
//             },
//             visibilityFilter: "SHOW_ALL"
//         }, {
//             visibleTodos: {
//                 completed: "false",
//                 text: "222"
//             },
//             visibilityFilter: "SHOW_ALL"
//         }]
//     }

// }
//}