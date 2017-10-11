const DB  = require('sequelize')

const connect = new DB('database', '', '', {
	dialect: 'sqlite',
	storage: './database.sqlite'
});

const Category = connect.define('cateogry2', {
	name: DB.STRING,
    parentId: DB.INTEGER,
    evel:　DB.INTEGER
}, {
    timestamps: false
});

// connect.sync()

Category.findAll({
    order: [
        ['parentId'],
        ['evel'],
    ]
}).then((data) => {
    for(let a of data){
		console.log(a.id + ' ' + '-'.repeat(a.evel) + a.name + ' ' + a.parentId)
    }
    let data2 = [];

    for(let c of data){
        if(c.parentId == 0){
            data2.push(Object.assign({}, c.toJSON(),{ children: [] }))
            continue;
        }

        who = findPath(data2, c)
        who.children.push(Object.assign({}, c.toJSON(),{ children: [] }))
    }

    function findPath(data, obj, task = []){
        for(let d of data){
            if(d.id == obj.parentId){
                return d;
            }
            if(d.children.length){
                task.push(d)
            }
        }
        let pop = task.pop();
        return findPath(pop.children, obj, task)
    }

    console.log(data2)
})
