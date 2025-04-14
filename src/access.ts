/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  
  // 判断用户是否有特定角色的辅助函数
  const hasRole = (role: string | string[]) => {
    if (!currentUser || !currentUser.tags) return false;
    
    const roles = Array.isArray(role) ? role : [role];
    return currentUser.tags.some(tag => 
      tag.key === 'role' && tag.label && roles.includes(tag.label)
    );
  };
  
  // 基本权限控制
  return {
    // 管理员权限 - 可访问所有功能
    isAdmin: currentUser && (currentUser.access === 'admin' || hasRole('ADMIN')),
    
    // 普通用户权限 - 仅可访问任务查询和绘画测试
    isUser: hasRole(['USER', 'ADMIN'])
  };
}
