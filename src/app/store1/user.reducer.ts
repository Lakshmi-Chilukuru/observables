
const user ={
    name:'',
    mail :''
}
export const UserReducer = function(state=user,action:any){
    switch(action.type){
        case 'name-edit':
            return {...state,name : action.payload}
        case 'mail-edit':
            return {...state, mail :action.payload}
        default:
            return state;
    }

}
// export function UserReducer(state=user,action:any){
//     switch(action.type){
//         case 'name-edit':
//             return {...state,name : action.payload}
//         case 'mail-edit':
//             return {...state, mail :action.payload}
//         default:
//             return state;
//     }
// }