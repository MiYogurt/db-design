const DB  = require('sequelize')

const connect = new DB('database', '', '', {
	dialect: 'sqlite',
    storage: './database.sqlite',
    define: {
        timestamps: false
    }
});


const User = connect.define('User', {
    name: DB.STRING
});

const Role = connect.define('Role', {
    name: DB.STRING
})

const Permission = connect.define('Permission', {
    oprator: DB.STRING,
    target: DB.STRING
})

const UserRole = connect.define('UserRole', {})
const RolePermission = connect.define('RolePermission', {})

User.belongsToMany(Role, {
    through: UserRole
})
Role.belongsToMany(User, {
    through: UserRole
})

Role.belongsToMany(Permission, {
    through: RolePermission
})

Permission.belongsToMany(Role, {
    through: RolePermission
})

// const Product = connect.define('product', {
//     title: DB.STRING
// });
// const Tag = connect.define('tag', {
//     name: DB.STRING
// });

// Product.belongsToMany(Tag, {
//     through: 'PT'
// });
// Tag.belongsToMany(Product, {
//     through: 'PT'
// });


// Product.create({
//     id: 1,
//     title: 'Chair',
//     tags: [
//         { name: 'Alpha'},
//         { name: 'Beta'}
//     ]
// }, {
//     include: [ Tag ]
// })

connect.sync()

// connect.sync().then(() => {
//     return User.create({
//         name: 'Yoyo'
//     })
// }).then(() =>　{
//     const createO = { oprator: 'create', target: 'post' };
//     const delO = {oprator: 'delete', target:'post'};
//     const getO = {oprator: 'get', target:'post'};
//     [
//         {name: 'Admin', Permissions: [delO, getO, createO]},
//         {name: 'Guest', Permissions: [getO]},
//         {name: 'other', Permissions: [createO]}
//     ].forEach(data => {
//         console.log(data)
//         Role.create(data, {
//             include: [ {
//                 model: Permission,
//             }],
            
//         })
//     })


//     // Role.findAll({
//     //     include: [Permission]
//     // }).then(console.log)



// })


Permission.find({
    where: {
        target: 'post',
        oprator: 'edit'
    }
}).then(p => {
    return p.getRoles()
}).then(roles => {
    User.find({
        where: {
            name: 'yugo'
        }
    }).then(user => {
       return user.hasRoles(roles)
    }).then(console.log).catch(console.error)
})