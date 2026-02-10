const bcrypt = require('bcryptjs');

const seedData = async (db) => {
    // 1. Users
    const hashedPw = await bcrypt.hash('123000.0', 10);
    db.users = [
        { id: 1, username: 'qiangzi', password: hashedPw, real_name: '强子', role: '系统管理员', branch: '总部' },
        { id: 2, username: 'sales1', password: hashedPw, real_name: '张三', role: '销售经理', branch: '北京分部' },
        { id: 3, username: 'sales2', password: hashedPw, real_name: '李四', role: '销售组长', branch: '上海分部' }
    ];

    // 2. Branches
    db.branches = [
        { id: 1, name: '总部', code: 'HQ' },
        { id: 2, name: '北京分部', code: 'BJ' },
        { id: 3, name: '上海分部', code: 'SH' },
        { id: 4, name: '广州分部', code: 'GZ' }
    ];

    // 3. Warehouses
    db.warehouses = [
        { id: 1, name: '北京总仓', branch: '北京分部' },
        { id: 2, name: '上海中转仓', branch: '上海分部' },
        { id: 3, name: '顺丰1号仓', branch: '总部' }
    ];

    // 4. Products (10 items)
    db.products = [
        { id: 1, name: '核心智控组件 A1', price: 12800, category: '硬件', stock: 45 },
        { id: 2, name: '量子通信模块 Q2', price: 25600, category: '硬件', stock: 12 },
        { id: 3, name: '企业级云服务包', price: 5000, category: '软件', stock: 999 },
        { id: 4, name: '自动化营销插件', price: 1200, category: '软件', stock: 500 },
        { id: 5, name: '精密传感器 S3', price: 800, category: '零件', stock: 150 },
        { id: 6, name: '高性能工作站 W5', price: 15000, category: '硬件', stock: 8 },
        { id: 7, name: '数据安全审计系统', price: 35000, category: '服务', stock: 20 },
        { id: 8, name: '移动办公终端 M1', price: 3200, category: '硬件', stock: 60 },
        { id: 9, name: 'AI 模型训练基础包', price: 88000, category: '服务', stock: 5 },
        { id: 10, name: '全向散热风扇 F2', price: 150, category: '配件', stock: 300 }
    ];

    // 5. Orders (10 items)
    const now = new Date();
    db.orders = [
        { id: 1, customer: '华为技术有限公司', product: '核心智控组件 A1', amount: 12800, status: '已签收', date: '2026-02-01', sales: '张三' },
        { id: 2, customer: '腾讯控股', product: '企业级云服务包', amount: 5000, status: '已完成', date: '2026-02-02', sales: '李四' },
        { id: 3, customer: '百度在线', product: 'AI 模型训练基础包', amount: 88000, status: '待发货', date: '2026-02-03', sales: '强子' },
        { id: 4, customer: '美团点评', product: '移动办公终端 M1', amount: 6400, status: '已发货', date: '2026-02-04', sales: '张三' },
        { id: 5, customer: '字节跳动', product: '核心智控组件 A1', amount: 25600, status: '已签收', date: '2026-02-05', sales: '李四' },
        { id: 6, customer: '小米科技', product: '量子通信模块 Q2', amount: 25600, status: '已撤单', date: '2026-02-06', sales: '强子' },
        { id: 7, customer: '顺丰速运', product: '全向散热风扇 F2', amount: 1500, status: '已发货', date: '2026-02-07', sales: '张三' },
        { id: 8, customer: '京东集团', product: '高性能工作站 W5', amount: 15000, status: '已签收', date: '2026-02-08', sales: '李四' },
        { id: 9, customer: '大疆创新', product: '精密传感器 S3', amount: 8000, status: '待发货', date: '2026-02-09', sales: '强子' },
        { id: 10, customer: '蔚来汽车', product: '自动化营销插件', amount: 1200, status: '已完成', date: '2026-02-10', sales: '张三' }
    ];

    // 6. Financial Records (10 items)
    db.financial = [
        { id: 1, type: 'income', category: '销售回款', amount: 12800, date: '2026-02-01', desc: '华为 A1 订单回款' },
        { id: 2, type: 'expense', category: '采购成本', amount: 8000, date: '2026-02-02', desc: '采购精密传感器' },
        { id: 3, type: 'income', category: '技术服务费', amount: 5000, date: '2026-02-03', desc: '腾讯云服务包' },
        { id: 4, type: 'expense', category: '员工差旅', amount: 1200, date: '2026-02-04', desc: '上海销售部差旅' },
        { id: 5, type: 'income', category: '预付款', amount: 44000, date: '2026-02-05', desc: '百度 AI 项目首款' },
        { id: 6, type: 'expense', category: '办公租赁', amount: 25000, date: '2026-02-06', desc: '北京分部房租' },
        { id: 7, type: 'income', category: '尾款结算', amount: 25600, date: '2026-02-07', desc: '字节 A1 订单尾款' },
        { id: 8, type: 'expense', category: '市场营销', amount: 5000, date: '2026-02-08', desc: '春季市场推广活动' },
        { id: 9, type: 'income', category: '软件授权', amount: 1200, date: '2026-02-09', desc: '蔚来插件授权' },
        { id: 10, type: 'expense', category: '物流快递', amount: 450, date: '2026-02-10', desc: '顺丰发货运费' }
    ];

    console.log('✅ 大山 CRM 模拟数据初始化完成 (各表已注入 10+ 条测试记录)');
};

module.exports = { seedData };
