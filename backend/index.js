const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const { seedData } = require('./seeder');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'dashan-crm-2026-secure';

// 托管静态文件
app.use(express.static(path.join(__dirname, '../frontend')));

const db = {
    users: [],
    branches: [],
    warehouses: [],
    products: [],
    orders: [],
    financial: []
};

seedData(db);

// --- 认证 ---
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = db.users.find(u => u.username === username);
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ success: false, message: '认证失败' });
    }
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '24h' });
    res.json({ success: true, token, user: { username: user.username, real_name: user.real_name, role: user.role } });
});

// --- 获取数据 ---
app.get('/api/dashboard/stats', (req, res) => {
    res.json({
        success: true,
        data: {
            totalOrders: db.orders.length,
            pendingShipment: db.orders.filter(o => o.status === '待发货').length,
            shipped: db.orders.filter(o => o.status === '已发货').length,
            signed: db.orders.filter(o => o.status === '已签收').length,
            totalAmount: db.orders.reduce((acc, o) => acc + o.amount, 0),
            income: db.financial.filter(f => f.type === 'income').reduce((acc, f) => acc + f.amount, 0),
            expense: db.financial.filter(f => f.type === 'expense').reduce((acc, f) => acc + f.amount, 0),
        }
    });
});

app.get('/api/orders', (req, res) => res.json({ success: true, data: db.orders }));
app.get('/api/products', (req, res) => res.json({ success: true, data: db.products }));
app.get('/api/branches', (req, res) => res.json({ success: true, data: db.branches }));
app.get('/api/warehouses', (req, res) => res.json({ success: true, data: db.warehouses }));
app.get('/api/financial', (req, res) => res.json({ success: true, data: db.financial }));
app.get('/api/users', (req, res) => res.json({ success: true, data: db.users }));

// --- 提交数据 ---
app.post('/api/orders', (req, res) => {
    const newOrder = { id: db.orders.length + 1, ...req.body, date: new Date().toISOString().split('T')[0] };
    db.orders.unshift(newOrder);
    res.json({ success: true, message: '订单已创建', data: newOrder });
});

app.post('/api/products', (req, res) => {
    const newProduct = { id: db.products.length + 1, ...req.body };
    db.products.unshift(newProduct);
    res.json({ success: true, message: '产品已添加', data: newProduct });
});

app.post('/api/financial', (req, res) => {
    const newRecord = { id: db.financial.length + 1, ...req.body, date: new Date().toISOString().split('T')[0] };
    db.financial.unshift(newRecord);
    res.json({ success: true, message: '账目已记录', data: newRecord });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(3001, () => console.log(`🚀 大山 CRM 运行中`));
