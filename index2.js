const DB  = require('sequelize')

const connect = new DB('database', '', '', {
	dialect: 'sqlite',
	storage: './database.sqlite'
});

const Category = connect.define('cateogry', {
	name: DB.STRING,
	parentId: DB.INTEGER
});


// 族谱
// let arr = []
// function getParent(categorys, parentId){
//     while(parentId > 0){
//         for(let category of categorys){
//             if(category.id == parentId){
//                 arr.push(category.toJSON())
//                 parentId = category.parentId
//             }
//         }
//     }
//     return arr;
// }

// Category.findAll().then(categorys => {
// 	console.time('parent')
// 	console.log(getParent(categorys, 5))
// 	console.timeEnd('parent')
// })

// 子孙
// error
// function getChildren(categorys, id = 0 , level = 0){
//     let data = []
//     let ok = true;
//     while(ok){
//         for(let c of categorys){
//             if(c.parentId == id){
//                 let category = c.toJSON()
//                 data.push(category)
//                 category.level = level;
//                 id = category.id
//                 // id -> 2
//                 // laravel -> id = 4  -> hello
//                 // Sym -> id = 6 -> null
//                 level += 1;
//             }else if(data.length == categorys.length){
//                 ok = false
//                 break;
//             }
//         }

//         // let currentCategory = categorys.find(c => c.parentId == id)
//         // if(!currentCategory) break;
//         // currentCategory = currentCategory.toJSON();
//         // currentCategory.level = level;
//         // data.push(currentCategory)
//         // id = currentCategory.id;
//         // level+=1;
//     }
//     return data;
// }

Category.findAll().then(categorys => {
	console.time('c1')
	console.log(getChildren(categorys))
	console.timeEnd('c1')
})


function getChildren(data, id = 0){
    task = [0]
    son = [] // 结果
    while(data.length > 0){ 
        flag = false;
        for(let i in data){
            let k = i;
            let v = data[i];
            if(v.parentId == id){
                v = v.toJSON()
                v.level = task.length - 1;
                son.push(v)
                task.push(v.id) // 当前查找的 id 推到任务里面去,保存可回退的状态
                id = v.id
                data.splice(k, 1)
                flag = true
            }
        }

        if(flag == false){
            task.pop() //
            id = task[task.length - 1]
        }
    }

    return son;
}