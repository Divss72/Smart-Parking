// Mock analytics data for charts and dashboards

export const hourlyOccupancy = {
    labels: ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'],
    datasets: [
        { label: 'Sector 17', data: [12, 35, 65, 82, 91, 95, 89, 78, 85, 92, 88, 95, 90, 72, 55, 30] },
        { label: 'Sector 35', data: [8, 22, 48, 67, 78, 82, 85, 70, 75, 80, 85, 88, 82, 65, 45, 20] },
        { label: 'Elante', data: [5, 12, 30, 55, 72, 82, 90, 88, 85, 88, 92, 95, 93, 85, 70, 45] },
    ]
};

export const weeklyRevenue = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [45200, 48100, 52300, 49800, 62100, 78400, 71200],
};

export const monthlyRevenue = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [1240000, 1180000, 1350000, 1290000, 1420000, 1380000, 1510000, 1460000, 1520000, 1580000, 1620000, 1750000],
};

export const paymentBreakdown = {
    labels: ['UPI', 'FASTag', 'Cards', 'Digital Wallet', 'Cash'],
    data: [42, 28, 15, 10, 5],
    colors: ['#00d4ff', '#00e676', '#bb86fc', '#ffc107', '#ff9800'],
};

export const demandPrediction = {
    labels: ['Now', '+1h', '+2h', '+3h', '+4h', '+5h', '+6h', '+7h', '+8h'],
    actual: [78, 82, 88, null, null, null, null, null, null],
    predicted: [78, 84, 89, 92, 95, 90, 82, 70, 55],
    confidence_upper: [78, 88, 94, 98, 100, 96, 90, 80, 65],
    confidence_lower: [78, 80, 84, 86, 90, 84, 74, 60, 45],
};

export const sectorHeatmap = [
    { sector: 'Sector 17', occupancy: 77, trend: 'up' },
    { sector: 'Sector 22', occupancy: 89, trend: 'stable' },
    { sector: 'Sector 35', occupancy: 69, trend: 'down' },
    { sector: 'Sector 26', occupancy: 95, trend: 'up' },
    { sector: 'ISBT Sec 43', occupancy: 78, trend: 'up' },
    { sector: 'PU Campus', occupancy: 75, trend: 'stable' },
    { sector: 'Elante', occupancy: 78, trend: 'up' },
    { sector: 'Sec 34', occupancy: 53, trend: 'down' },
    { sector: 'Rock Garden', occupancy: 79, trend: 'stable' },
    { sector: 'Sukhna Lake', occupancy: 80, trend: 'up' },
    { sector: 'Sector 7', occupancy: 73, trend: 'down' },
    { sector: 'Sector 15', occupancy: 84, trend: 'stable' },
];

export const evAdoptionTrend = {
    labels: ['2022', '2023', '2024', '2025', '2026'],
    evVehicles: [120, 340, 780, 1450, 2800],
    evCharging: [850, 2200, 5400, 12000, 24000],
};

export const congestionData = {
    labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM'],
    sectors: {
        'Sector 17': [15, 65, 88, 82, 78, 90, 85, 45],
        'Sector 22': [10, 55, 82, 78, 72, 85, 80, 35],
        'Elante': [5, 30, 68, 85, 78, 88, 92, 65],
    }
};

export const systemStats = {
    totalParkingLots: 12,
    totalSlots: 3760,
    totalOccupied: 2896,
    totalSensors: 3729,
    activeSensors: 3698,
    totalCameras: 156,
    onlineCameras: 151,
    todayRevenue: 407200,
    todayViolations: 97,
    todayVehicles: 12847,
    avgOccupancy: 77,
    evChargingSessions: 145,
};
