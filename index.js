const DB  = require('sequelize')
const prettyMs = require('pretty-ms')
const Benchmark = require('benchmark');

const connect = new DB('database', '', '', {
	dialect: 'sqlite',
	storage: './database.sqlite'
});

const Category = connect.define('cateogry', {
	name: DB.STRING,
	parentId: DB.INTEGER
});
// childer -> parent
Category.belongsTo(Category, {
	as: 'parent',
	foreignKey: 'parentId',
	targetKey: 'id'
})

// parent has childer
Category.hasMany(Category, {
	as: 'childrens',
	foreignKey: 'parentId'
})

// connect.sync({
// 	force: false
// }).then(() => {
// 	Category.create({
// 		name: 'IT',
// 		parentId: 0
// 	}).then(() => {
// 		Category.create({
// 			name: 'PHP',
// 			parentId: 1
// 		})
// 		Category.create({
// 			name: 'Java',
// 			parentId: 1
// 		})
// 	})
// })

// Category.find({
// 	where: {
// 		parentId: 0
// 	},
// 	include: [
// 		{
// 			model: Category,
// 			as: 'childrens',
// 			include: [{
// 				all: true,
// 				nested: true
// 			}]
// 		},
// 		{
// 			model: Category,
// 			as: 'parent'
// 		}
// 	]
// }).then(category => {
// 	console.log(category.childrens[0].childrens)
// })


// let result = []

// Category.findAll().then(categorys => {
// 	console.time('yes')
// 	console.log(getParent(categorys, 5))
// 	console.timeEnd('yes')
// })

// // 族谱
// function getParent(data, pid){
// 	for(let c of data){
// 		if(c.id == pid){
// 			c = c.toJSON()
// 			result.push(c)
// 			getParent(data, c.parentId)
// 		}
// 	}
// 	return result;
// }

// 子孙
let array = [];

function getChildren(data, id = 0, leve = 0){
	for(let c of data){ // current_id 所有子节点
		c = c.toJSON()
		if(c.parentId == id){
			c.level = leve;
			array.push(c)
			getChildren(data, c.id, leve + 1)
		}
	}
	return array;
}

Category.findAll().then(categorys => {
	console.time('yes')
	console.log(getChildren(categorys))
	console.timeEnd('yes')
	for(let a of array){
		console.log('-'.repeat(a.level) + a.name)
	}
})




