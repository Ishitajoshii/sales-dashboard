exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sales').del()
  await knex('sales').insert([
    {date: '2024-01-01', revenue: 1500.00},
    {date: '2024-01-02', revenue: 1650.50},
    {date: '2024-01-03', revenue: 1400.25},
    {date: '2024-01-04', revenue: 1700.75},
    {date: '2024-01-05', revenue: 1550.00},
    {date: '2024-01-06', revenue: 1800.50},
    {date: '2024-01-07', revenue: 1600.25},
    {date: '2024-01-08', revenue: 1900.75},
    {date: '2024-01-09', revenue: 1750.00},
    {date: '2024-01-10', revenue: 2000.50},
    {date: '2024-01-11', revenue: 1800.25},
    {date: '2024-01-12', revenue: 2100.75},
    {date: '2024-01-13', revenue: 1950.00},
    {date: '2024-01-14', revenue: 2200.50},
    {date: '2024-01-15', revenue: 2000.25},
    {date: '2024-01-16', revenue: 2300.75},
    {date: '2024-01-17', revenue: 2150.00},
    {date: '2024-01-18', revenue: 2400.50},
    {date: '2024-01-19', revenue: 2200.25},
    {date: '2024-01-20', revenue: 2500.75},
    {date: '2024-01-21', revenue: 2350.00},
    {date: '2024-01-22', revenue: 2600.50},
    {date: '2024-01-23', revenue: 2400.25},
    {date: '2024-01-24', revenue: 2700.75},
    {date: '2024-01-25', revenue: 2550.00},
    {date: '2024-01-26', revenue: 2800.50},
    {date: '2024-01-27', revenue: 2600.25},
    {date: '2024-01-28', revenue: 2900.75},
    {date: '2024-01-29', revenue: 2750.00},
    {date: '2024-01-30', revenue: 3000.50},
    {date: '2024-01-31', revenue: 2800.25}
  ]);
};