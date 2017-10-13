let Acl = require('acl');

acl = new Acl(new Acl.memoryBackend());

acl.addUserRoles('joed', 'member')

acl.allow('guest', 'block', ['edit', 'change'])

acl.addRoleParents('c1', ['guest']);
acl.addUserRoles('joed', 'c1')

acl.allow([
    {
        roles:['guest', 'member'],
        allows:[
            {resources:'blogs', permissions: 'get'},
            {resources:['forums', 'news'], permissions:['get', 'put', 'delete']}
        ]
    },
    {
        roles:['gold', 'silver'],
        allows:[
            {resources:'cash', permissions:['sell', 'exchange']},
            {resources:['account', 'deposit'], permissions:['put', 'delete']}
        ]
    }
])

acl.isAllowed('joed', 'block', 'change', function(err, res){
    if(res){
        console.log("User joed is allowed to view blogs")
    }
    console.log(res)
    console.log(err)
})

acl.allowedPermissions('joed', 'block', (err, res) => {
    console.log("allowedPermissions")
    console.log(res)
})

acl.areAnyRolesAllowed('c1', 'block', ['edit','change', 'load'], (err, res) => {
    console.log("================")
    console.log(err)
    console.log(res)
})

acl.whatResources('c1' , ['edit'] , (err, res) => {
    console.log("c1=================== resour")
    console.log(err)
    console.log(res)
})



// addUserRoles( userId, roles, function(err) ) 为 userId 添加 角色
// removeUserRoles( userId, roles, function(err) )

// userRoles( userId, function(err, roles) ) 获取用户所有角色

// roleUsers( rolename, function(err, users) ) 获取角色的所有用户

// hasRole( userId, rolename, function(err, hasRole) ) 用户是否有该角色

// addRoleParents( role, parents, function(err) )  为该角色 设置父类，接管父类所以权限
// removeRoleParents( role, parents, function(err) )

// removeRole( role, function(err) ) 移除角色
// removeResource 移除资源

// allow( roles, resources, permissions, function(err) )  角色对于权限可进行什么操作

// allow( permissionsArray, function(err) ) 
// [{
//     roles:['gold', 'silver'],
//     allows:[
//         {resources:'cash', permissions:['sell', 'exchange']},
//         {resources:['account', 'deposit'], permissions:['put', 'delete']}
//     ]
// }]

// removeAllow( role, resources, permissions, function(err) ) 删除授权

// allowedPermissions( userId, resources, function(err, obj) )  用户对于该资源可以进行些什么操作

// isAllowed( userId, resource, permissions, function(err, allowed) ) 改用是否对该资源有该权限

// areAnyRolesAllowed( roles, resource, permissions, function(err, allowed) ) 对于该资源，是否角色中是否满足权限要求

// whatResources(role, function(err, {resourceName: [permissions]}) 获取该角色 所有资源 以及可以操作的权限
// whatResources(role, permissions, function(err, resources) )  获取该角色对于该操作  何种资源 可以满足





