// Set today's date in expense date input
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('expDate').value = today;
    loadDashboard();
    loadAllData();
});

function getMonthOffset() {
    const offset = parseInt(document.getElementById('monthSelector').value) || 0;
    const today = new Date();
    const targetDate = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    return { year: targetDate.getFullYear(), month: targetDate.getMonth() + 1 };
}

// Show page
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page + 'Page').classList.add('active');
    
    const titles = {
        dashboard: '📊 Dashboard',
        expenses: '💸 Expenses',
        analytics: '📈 Analytics',
        history: '📋 History',
        insights: '💡 Insights',
        telegram: '🤖 Telegram Bot Setup',
        settings: '⚙️ Settings'
    };
    document.getElementById('pageTitle').textContent = titles[page];
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    if (page === 'analytics') loadAnalytics();
    if (page === 'history') loadHistory();
    if (page === 'insights') loadInsights();
    if (page === 'settings') loadSettings();
}

// Load Dashboard
async function loadDashboard() {
    const { year, month } = getMonthOffset();
    try {
        const res = await fetch(`/api/summary?year=${year}&month=${month}`);
        const data = await res.json();
        
        document.getElementById('userName').textContent = data.name;
        document.getElementById('userXP').textContent = `⚡ ${data.xp} XP`;
        
        document.getElementById('budgetStat').textContent = `₹${data.total.toLocaleString('en-IN')}`;
        document.getElementById('budgetFill').style.width = data.budget_pct + '%';
        document.getElementById('budgetLabel').textContent = 
            `₹${data.total.toLocaleString('en-IN')} of ₹${data.budget.toLocaleString('en-IN')} used`;
        
        // Dashboard Chart
        const ctx = document.getElementById('dashboardChart');
        if (ctx && ctx.chart) ctx.chart.destroy();
        ctx.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(data.categories),
                datasets: [{
                    data: Object.values(data.categories),
                    backgroundColor: [
                        '#d63384', '#ff69b4', '#ff1493', '#c71585',
                        '#db7093', '#ffc0cb', '#ffb6c1', '#ffc0cb'
                    ]
                }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });
        
        // Load Insights
        loadInsightsForDashboard();
    } catch (e) {
        console.error(e);
    }
}

async function loadInsightsForDashboard() {
    const { year, month } = getMonthOffset();
    try {
        const res = await fetch(`/api/insights?year=${year}&month=${month}`);
        const data = await res.json();
        const container = document.getElementById('dashboardInsights');
        container.innerHTML = data.insights.slice(0, 3).map(ins => 
            `<div class="insight-card">${ins}</div>`
        ).join('');
    } catch (e) {
        console.error(e);
    }
}

// Load Expenses
async function loadExpenses() {
    const { year, month } = getMonthOffset();
    try {
        const res = await fetch(`/api/expenses?year=${year}&month=${month}`);
        const expenses = await res.json();
        
        const container = document.getElementById('expensesList');
        container.innerHTML = expenses.map(e => `
            <div class="expense-item">
                <div class="expense-info">
                    <div class="expense-category">${e.category}</div>
                    <div class="expense-desc">${e.description}</div>
                    <div class="expense-date">${new Date(e.date).toLocaleDateString()}</div>
                </div>
                <div style="text-align: right;">
                    <div class="expense-amount">₹${e.amount.toLocaleString('en-IN')}</div>
                    <small>${e.is_surprise ? '⭐ Surprise' : ''}</small>
                </div>
                <button onclick="deleteExpense(${e.id})" style="background: #fee; color: #c33; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-left: 10px;">🗑️</button>
            </div>
        `).join('');
    } catch (e) {
        console.error(e);
    }
}

async function addExpense() {
    const amount = parseFloat(document.getElementById('expAmount').value);
    const category = document.getElementById('expCategory').value;
    const description = document.getElementById('expDescription').value;
    const date = document.getElementById('expDate').value;
    const notes = document.getElementById('expNotes').value;
    
    if (!amount || !category || !description || !date) {
        alert('Please fill all fields');
        return;
    }
    
    try {
        const res = await fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, category, description, date, notes })
        });
        
        if (res.ok) {
            const data = await res.json();
            document.getElementById('expAmount').value = '';
            document.getElementById('expDescription').value = '';
            document.getElementById('expNotes').value = '';
            document.getElementById('expDate').value = new Date().toISOString().split('T')[0];
            
            if (data.is_surprise) alert('⭐ That was a surprise expense!');
            
            loadExpenses();
            loadDashboard();
            updateAllPages();
        }
    } catch (e) {
        console.error(e);
    }
}

async function deleteExpense(id) {
    if (!confirm('Delete this expense?')) return;
    try {
        const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
        if (res.ok) {
            loadExpenses();
            loadDashboard();
            updateAllPages();
        }
    } catch (e) {
        console.error(e);
    }
}

// Load Analytics
async function loadAnalytics() {
    const { year, month } = getMonthOffset();
    try {
        const res = await fetch(`/api/summary?year=${year}&month=${month}`);
        const data = await res.json();
        
        // Category Chart
        const catCtx = document.getElementById('categoryChart');
        if (catCtx && catCtx.chart) catCtx.chart.destroy();
        catCtx.chart = new Chart(catCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(data.categories),
                datasets: [{
                    label: 'Amount (₹)',
                    data: Object.values(data.categories),
                    backgroundColor: '#d63384'
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: { legend: { position: 'bottom' } }
            }
        });
        
        // Trend Chart
        const histRes = await fetch(`/api/history?months=4&year=${year}&month=${month}`);
        const histData = await histRes.json();
        
        const trendCtx = document.getElementById('trendChart');
        if (trendCtx && trendCtx.chart) trendCtx.chart.destroy();
        trendCtx.chart = new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: histData.data.map(m => m.month),
                datasets: [{
                    label: 'Spending',
                    data: histData.data.map(m => m.total),
                    borderColor: '#d63384',
                    backgroundColor: 'rgba(214, 51, 132, 0.1)',
                    fill: true
                }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });
    } catch (e) {
        console.error(e);
    }
}

// Load History
async function loadHistory() {
    const { year, month } = getMonthOffset();
    try {
        const res = await fetch(`/api/history?months=4&year=${year}&month=${month}`);
        const data = await res.json();
        
        const container = document.getElementById('historyContent');
        container.innerHTML = data.data.map(m => `
            <div style="padding: 15px; background: #fdf4f7; border-radius: 8px;">
                <h4 style="color: #d63384; margin-bottom: 10px;">${m.month}</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    <div><strong>Total:</strong> ₹${m.total.toLocaleString('en-IN')}</div>
                    <div><strong>Expenses:</strong> ${m.count}</div>
                    ${Object.entries(m.categories).filter(([_, v]) => v > 0).map(([cat, amt]) =>
                        `<div>${cat}: ₹${amt.toLocaleString('en-IN')}</div>`
                    ).join('')}
                </div>
            </div>
        `).join('');
    } catch (e) {
        console.error(e);
    }
}

// Load Insights
async function loadInsights() {
    const { year, month } = getMonthOffset();
    try {
        const res = await fetch(`/api/insights?year=${year}&month=${month}`);
        const data = await res.json();
        
        const container = document.getElementById('insightsList');
        container.innerHTML = data.insights.map(ins => 
            `<div class="insight-card">${ins}</div>`
        ).join('');
    } catch (e) {
        console.error(e);
    }
}

// Load Settings
async function loadSettings() {
    try {
        const res = await fetch('/api/summary');
        const data = await res.json();
        document.getElementById('budgetInput').value = data.budget;
    } catch (e) {
        console.error(e);
    }
}

async function updateBudget() {
    const budget = parseFloat(document.getElementById('budgetInput').value);
    if (!budget || budget < 100) {
        alert('Please enter a valid budget');
        return;
    }
    
    try {
        const res = await fetch('/api/budget', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ budget })
        });
        
        if (res.ok) {
            alert('✅ Budget updated!');
            loadDashboard();
        }
    } catch (e) {
        console.error(e);
    }
}

async function linkTelegram() {
    const telegramId = document.getElementById('telegramId').value.trim();
    if (!telegramId) {
        alert('Please enter your Telegram username');
        return;
    }
    
    try {
        const res = await fetch('/api/telegram/link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ telegram_id: telegramId })
        });
        
        if (res.ok) {
            document.getElementById('telegramStatus').textContent = 
                `✅ Linked successfully! Search for @smartexpense_ai_bot on Telegram and start using it.`;
        } else {
            alert('Error linking Telegram');
        }
    } catch (e) {
        console.error(e);
    }
}

async function exportData() {
    window.location.href = '/api/export/csv';
}

function updateAllPages() {
    loadDashboard();
    loadExpenses();
}

async function logout() {
    try {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/';
    } catch (e) {
        console.error(e);
    }
}

async function loadAllData() {
    loadExpenses();
}
