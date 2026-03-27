<template>
  <div class="dashboard-container">
    <!-- Navigation Bar -->
    <NavBar />

    <!-- Main Content -->
    <div class="dashboard-content">
      <!-- Welcome Section -->
      <div class="welcome-section">
        <div class="welcome-text">
          <h2>Welcome back, <span class="username">Demo User</span>!</h2>
          <p>Here's your financial overview</p>
        </div>
        <div class="date-badge">
          <i class="bi bi-calendar3"></i>
          <span>March 27, 2026</span>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card income-card">
          <div class="stat-icon">
            <i class="bi bi-arrow-down-circle-fill"></i>
          </div>
          <div class="stat-info">
            <h3>Total Income</h3>
            <p class="stat-value">¥12,580.00</p>
            <span class="stat-trend positive">
              <i class="bi bi-arrow-up-short"></i> +12.5%
            </span>
          </div>
        </div>

        <div class="stat-card expense-card">
          <div class="stat-icon">
            <i class="bi bi-arrow-up-circle-fill"></i>
          </div>
          <div class="stat-info">
            <h3>Total Expense</h3>
            <p class="stat-value">¥8,420.00</p>
            <span class="stat-trend negative">
              <i class="bi bi-arrow-down-short"></i> -8.2%
            </span>
          </div>
        </div>

        <div class="stat-card balance-card">
          <div class="stat-icon">
            <i class="bi bi-wallet2"></i>
          </div>
          <div class="stat-info">
            <h3>Balance</h3>
            <p class="stat-value">¥4,160.00</p>
            <span class="stat-trend positive">
              <i class="bi bi-arrow-up-short"></i> +24.3%
            </span>
          </div>
        </div>

        <div class="stat-card transaction-card">
          <div class="stat-icon">
            <i class="bi bi-receipt"></i>
          </div>
          <div class="stat-info">
            <h3>Transactions</h3>
            <p class="stat-value">23</p>
            <span class="stat-trend neutral">
              <i class="bi bi-plus"></i> +5 this month
            </span>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-grid">
        <!-- Category Distribution Chart -->
        <div class="chart-card">
          <div class="chart-header">
            <h4><i class="bi bi-pie-chart"></i> Spending by Category</h4>
            <select class="chart-period-select">
              <option>This Month</option>
              <option>This Week</option>
              <option>This Year</option>
            </select>
          </div>
          <div class="chart-body">
            <canvas ref="pieChartRef"></canvas>
          </div>
        </div>

        <!-- Spending Trend Chart -->
        <div class="chart-card">
          <div class="chart-header">
            <h4><i class="bi bi-graph-up"></i> Spending Trend</h4>
            <select class="chart-period-select">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div class="chart-body">
            <canvas ref="trendChartRef"></canvas>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="recent-section">
        <div class="section-header">
          <h4><i class="bi bi-clock-history"></i> Recent Transactions</h4>
          <a href="#" class="view-all-link" @click.prevent>
            View All <i class="bi bi-arrow-right-short"></i>
          </a>
        </div>

        <div class="transactions-list">
          <div class="transaction-item">
            <div class="transaction-icon expense">
              <i class="bi bi-arrow-up"></i>
            </div>
            <div class="transaction-info">
              <div class="transaction-category">Food & Dining</div>
              <div class="transaction-description">Starbucks Coffee</div>
              <div class="transaction-date">Mar 26, 2026</div>
            </div>
            <div class="transaction-amount expense">- ¥48.00</div>
            <div class="transaction-actions">
              <button class="action-btn edit">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="action-btn delete">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>

          <div class="transaction-item">
            <div class="transaction-icon expense">
              <i class="bi bi-arrow-up"></i>
            </div>
            <div class="transaction-info">
              <div class="transaction-category">Transportation</div>
              <div class="transaction-description">Metro Card Top-up</div>
              <div class="transaction-date">Mar 25, 2026</div>
            </div>
            <div class="transaction-amount expense">- ¥150.00</div>
            <div class="transaction-actions">
              <button class="action-btn edit">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="action-btn delete">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>

          <div class="transaction-item">
            <div class="transaction-icon income">
              <i class="bi bi-arrow-down"></i>
            </div>
            <div class="transaction-info">
              <div class="transaction-category">Salary</div>
              <div class="transaction-description">March Salary</div>
              <div class="transaction-date">Mar 25, 2026</div>
            </div>
            <div class="transaction-amount income">+ ¥8,500.00</div>
            <div class="transaction-actions">
              <button class="action-btn edit">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="action-btn delete">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>

          <div class="transaction-item">
            <div class="transaction-icon expense">
              <i class="bi bi-arrow-up"></i>
            </div>
            <div class="transaction-info">
              <div class="transaction-category">Shopping</div>
              <div class="transaction-description">Weekly Groceries</div>
              <div class="transaction-date">Mar 24, 2026</div>
            </div>
            <div class="transaction-amount expense">- ¥320.50</div>
            <div class="transaction-actions">
              <button class="action-btn edit">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="action-btn delete">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>

          <div class="transaction-item">
            <div class="transaction-icon expense">
              <i class="bi bi-arrow-up"></i>
            </div>
            <div class="transaction-info">
              <div class="transaction-category">Entertainment</div>
              <div class="transaction-description">Netflix Subscription</div>
              <div class="transaction-date">Mar 23, 2026</div>
            </div>
            <div class="transaction-amount expense">- ¥88.00</div>
            <div class="transaction-actions">
              <button class="action-btn edit">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="action-btn delete">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <a href="#" class="action-card" @click.prevent>
          <i class="bi bi-plus-circle"></i>
          <span>Add Transaction</span>
        </a>
        <a href="#" class="action-card" @click.prevent>
          <i class="bi bi-bar-chart-steps"></i>
          <span>View AI Reports</span>
        </a>
        <a href="#" class="action-card" @click.prevent>
          <i class="bi bi-tags"></i>
          <span>Manage Categories</span>
        </a>
        <a href="#" class="action-card" @click.prevent>
          <i class="bi bi-person-circle"></i>
          <span>Profile</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import NavBar from '../components/NavBar.vue'

const pieChartRef = ref(null)
const trendChartRef = ref(null)
let pieChart = null
let trendChart = null

// Static chart data
const categoryData = {
  labels: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills'],
  values: [2850, 1250, 2100, 980, 1240]
}

const trendData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  values: [320, 280, 450, 380, 520, 680, 420]
}

// Initialize charts
const initCharts = () => {
  if (pieChartRef.value) {
    pieChart = new Chart(pieChartRef.value, {
      type: 'doughnut',
      data: {
        labels: categoryData.labels,
        datasets: [{
          data: categoryData.values,
          backgroundColor: ['#9CAF9A', '#C9A9A6', '#A8BFCC', '#D4CDC3', '#B7A99A'],
          borderWidth: 0,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { size: 12 } }
          }
        }
      }
    })
  }

  if (trendChartRef.value) {
    trendChart = new Chart(trendChartRef.value, {
      type: 'line',
      data: {
        labels: trendData.labels,
        datasets: [{
          label: 'Daily Spending',
          data: trendData.values,
          borderColor: '#E68A5E',
          backgroundColor: 'rgba(230, 138, 94, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#E68A5E',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(180, 170, 160, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    })
  }
}

onMounted(() => {
  initCharts()
})
</script>

<style scoped>
/* ==================== Dashboard Styles ==================== */
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #F5F0E8 0%, #E8E2D9 100%);
}

.dashboard-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

/* Welcome Section */
.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.welcome-text h2 {
  font-size: 28px;
  color: #5C5B5A;
  margin: 0;
}

.welcome-text .username {
  background: linear-gradient(135deg, #5C5B5A 0%, #9CAF9A 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
}

.welcome-text p {
  color: #9B9792;
  margin: 4px 0 0;
}

.date-badge {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 40px;
  font-size: 14px;
  color: #5C5B5A;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(92, 91, 90, 0.1);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.income-card .stat-icon {
  background: rgba(159, 175, 154, 0.2);
  color: #7C9A7A;
}

.expense-card .stat-icon {
  background: rgba(201, 169, 166, 0.2);
  color: #C9A9A6;
}

.balance-card .stat-icon {
  background: rgba(168, 191, 204, 0.2);
  color: #8FBCAA;
}

.transaction-card .stat-icon {
  background: rgba(212, 205, 195, 0.2);
  color: #B7A99A;
}

.stat-info h3 {
  font-size: 14px;
  font-weight: 500;
  color: #9B9792;
  margin: 0 0 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #5C5B5A;
  margin: 0;
}

.stat-trend {
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.stat-trend.positive {
  color: #7C9A7A;
}

.stat-trend.negative {
  color: #C9A9A6;
}

.stat-trend.neutral {
  color: #B7A99A;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.chart-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.chart-header h4 {
  margin: 0;
  color: #5C5B5A;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-period-select {
  background: #F5F0E8;
  border: none;
  border-radius: 12px;
  padding: 6px 12px;
  font-size: 12px;
  color: #5C5B5A;
  cursor: pointer;
}

.chart-body {
  height: 280px;
  position: relative;
}

/* Recent Section */
.recent-section {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 20px;
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.section-header h4 {
  margin: 0;
  color: #5C5B5A;
  display: flex;
  align-items: center;
  gap: 8px;
}

.view-all-link {
  color: #9CAF9A;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  transition: color 0.2s ease;
}

.view-all-link:hover {
  color: #7C9A7A;
}

/* Transactions List */
.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(245, 240, 232, 0.5);
  border-radius: 16px;
  transition: background 0.2s ease;
}

.transaction-item:hover {
  background: rgba(245, 240, 232, 0.8);
}

.transaction-icon {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.transaction-icon.income {
  background: rgba(159, 175, 154, 0.2);
  color: #7C9A7A;
}

.transaction-icon.expense {
  background: rgba(201, 169, 166, 0.2);
  color: #C9A9A6;
}

.transaction-info {
  flex: 1;
}

.transaction-category {
  font-weight: 600;
  color: #5C5B5A;
}

.transaction-description {
  font-size: 12px;
  color: #9B9792;
  margin-top: 2px;
}

.transaction-date {
  font-size: 11px;
  color: #C0BAB2;
  margin-top: 4px;
}

.transaction-amount {
  font-weight: 700;
  font-size: 18px;
}

.transaction-amount.income {
  color: #7C9A7A;
}

.transaction-amount.expense {
  color: #C9A9A6;
}

.transaction-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
  color: #C0BAB2;
}

.action-btn.edit:hover {
  background: rgba(159, 175, 154, 0.2);
  color: #7C9A7A;
}

.action-btn.delete:hover {
  background: rgba(201, 169, 166, 0.2);
  color: #C9A9A6;
}

/* Quick Actions */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.action-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #5C5B5A;
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(92, 91, 90, 0.1);
}

.action-card i {
  font-size: 28px;
  color: #9CAF9A;
}

.action-card span {
  font-size: 14px;
  font-weight: 500;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(92, 91, 90, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #F0EAE2;
}

.modal-header h3 {
  margin: 0;
  color: #5C5B5A;
  font-size: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #C0BAB2;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #5C5B5A;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #5C5B5A;
  font-weight: 500;
  font-size: 14px;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #F0EAE2;
  border-radius: 12px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  background: white;
}

.form-control:focus {
  outline: none;
  border-color: #9CAF9A;
}

.type-selector {
  display: flex;
  gap: 12px;
}

.type-btn {
  flex: 1;
  padding: 12px;
  border: 2px solid #F0EAE2;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #5C5B5A;
}

.type-btn.active {
  border-color: #9CAF9A;
  background: rgba(159, 175, 154, 0.1);
  color: #7C9A7A;
}

.type-btn i {
  font-size: 16px;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #7C9A7A 0%, #5B7A59 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin-top: 8px;
  font-size: 16px;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    padding: 16px;
  }
  
  .welcome-section {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .welcome-text h2 {
    font-size: 24px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .stat-card {
    padding: 16px;
  }
  
  .transaction-item {
    flex-wrap: wrap;
  }
  
  .transaction-actions {
    margin-left: auto;
  }
  
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .action-card {
    padding: 16px;
  }
  
  .action-card i {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .dashboard-content {
    padding: 12px;
  }
  
  .chart-body {
    height: 220px;
  }
  
  .transaction-item {
    padding: 12px;
  }
  
  .transaction-icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .transaction-amount {
    font-size: 16px;
  }
}
</style>