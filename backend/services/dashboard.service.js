const db = require("../config/db.config");

async function getKpis() {
  try {
    const [rows] = await db.execute(
      "SELECT (SELECT COUNT(*) FROM customer) as total_customers, " +
        "(SELECT COUNT(*) FROM `order` WHERE order_status = 1) as active_orders, " +
        "(SELECT SUM(order_price) FROM `order` WHERE order_status = 2) as total_revenue"
    );
    return rows[0];
  } catch (error) {
    throw new Error("Error getting KPIs");
  }
}

const getOrderTrends = async () => {
  try {
    const sql = `SELECT
    TO_CHAR(order_date, 'YYYY-MM') AS month,
    COUNT(*) AS orders
FROM orders
GROUP BY month
ORDER BY month;
`;

    const orderTrends = await query(sql);

    return orderTrends;
  } catch (error) {
    throw new Error("Error getting order trends");
  }
};

const getRevenueBreakdown = async () => {
  try {
    const sql = `SELECT
    TO_CHAR(order_date, 'YYYY-MM') AS month,
    SUM(order_total_price) AS revenue
FROM orders
JOIN order_info ON orders.order_id = order_info.order_id
GROUP BY month
ORDER BY month;
`;
    const revenueBreakdown = await query(sql);
    return revenueBreakdown;
  } catch (error) {
    throw new Error("Error getting revenu breakdown");
  }
};

module.exports = { getKPIs, getOrderTrends, getRevenueBreakdown };
