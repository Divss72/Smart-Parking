// Mock sensor and IoT device data
export const sensorDevices = [
    { id: 'ESP32-001', type: 'ultrasonic', location: 'Sec 17 - Zone A', status: 'online', battery: 92, lastPing: '2s ago' },
    { id: 'ESP32-002', type: 'ultrasonic', location: 'Sec 17 - Zone B', status: 'online', battery: 87, lastPing: '1s ago' },
    { id: 'ESP32-003', type: 'magnetic', location: 'Sec 17 - Zone C', status: 'offline', battery: 12, lastPing: '15m ago' },
    { id: 'RPI-001', type: 'camera', location: 'Sec 17 - Entry', status: 'online', battery: null, lastPing: '0s ago' },
    { id: 'LORA-001', type: 'magnetic', location: 'Sec 22 - Zone A', status: 'online', battery: 78, lastPing: '3s ago' },
    { id: 'LORA-002', type: 'ultrasonic', location: 'Sec 22 - Zone B', status: 'warning', battery: 23, lastPing: '8s ago' },
    { id: 'ESP32-004', type: 'ultrasonic', location: 'Sec 35 - L1', status: 'online', battery: 95, lastPing: '1s ago' },
    { id: 'ESP32-005', type: 'magnetic', location: 'Sec 35 - L2', status: 'online', battery: 88, lastPing: '2s ago' },
    { id: 'RPI-002', type: 'camera', location: 'Sec 35 - Entry', status: 'online', battery: null, lastPing: '0s ago' },
    { id: 'JETSON-001', type: 'edge', location: 'Sec 17 - Edge Node', status: 'online', battery: null, lastPing: '0s ago', gpu: '62%', cpu: '45%' },
    { id: 'JETSON-002', type: 'edge', location: 'Sec 35 - Edge Node', status: 'online', battery: null, lastPing: '0s ago', gpu: '71%', cpu: '53%' },
    { id: 'ESP32-006', type: 'ultrasonic', location: 'Elante - L1', status: 'online', battery: 90, lastPing: '1s ago' },
    { id: 'RPI-003', type: 'camera', location: 'Elante - Entry A', status: 'online', battery: null, lastPing: '0s ago' },
    { id: 'RPI-004', type: 'camera', location: 'Elante - Entry B', status: 'warning', battery: null, lastPing: '30s ago' },
    { id: 'ESP32-007', type: 'ultrasonic', location: 'ISBT - Zone A', status: 'online', battery: 85, lastPing: '2s ago' },
    { id: 'LORA-003', type: 'magnetic', location: 'ISBT - Zone B', status: 'offline', battery: 5, lastPing: '2h ago' },
];

export const gateControllers = [
    { id: 'GATE-17A', location: 'Sec 17 - Entry A', qrScanner: 'online', fastagReader: 'online', barrier: 'open', vehiclesProcessed: 142 },
    { id: 'GATE-17B', location: 'Sec 17 - Entry B', qrScanner: 'online', fastagReader: 'offline', barrier: 'closed', vehiclesProcessed: 89 },
    { id: 'GATE-35A', location: 'Sec 35 - Entry', qrScanner: 'online', fastagReader: 'online', barrier: 'open', vehiclesProcessed: 234 },
    { id: 'GATE-EL-A', location: 'Elante - Entry A', qrScanner: 'online', fastagReader: 'online', barrier: 'open', vehiclesProcessed: 456 },
    { id: 'GATE-EL-B', location: 'Elante - Entry B', qrScanner: 'warning', fastagReader: 'online', barrier: 'open', vehiclesProcessed: 398 },
    { id: 'GATE-ISBT', location: 'ISBT - Entry', qrScanner: 'online', fastagReader: 'online', barrier: 'open', vehiclesProcessed: 312 },
];

export const cameraFeeds = [
    { id: 'CAM-17-01', location: 'Sec 17 - Entry Gate', status: 'online', resolution: '1080p', anpr: true, fps: 30, detections: 1247 },
    { id: 'CAM-17-02', location: 'Sec 17 - Zone A', status: 'online', resolution: '720p', anpr: false, fps: 25, detections: 0 },
    { id: 'CAM-17-03', location: 'Sec 17 - Zone B', status: 'offline', resolution: '1080p', anpr: true, fps: 0, detections: 0 },
    { id: 'CAM-35-01', location: 'Sec 35 - L1 Entry', status: 'online', resolution: '4K', anpr: true, fps: 30, detections: 2341 },
    { id: 'CAM-35-02', location: 'Sec 35 - L2 Overview', status: 'online', resolution: '1080p', anpr: false, fps: 30, detections: 0 },
    { id: 'CAM-EL-01', location: 'Elante - Entry A', status: 'online', resolution: '4K', anpr: true, fps: 30, detections: 4521 },
    { id: 'CAM-EL-02', location: 'Elante - Entry B', status: 'warning', resolution: '4K', anpr: true, fps: 15, detections: 3100 },
    { id: 'CAM-EL-03', location: 'Elante - L1 Overview', status: 'online', resolution: '1080p', anpr: false, fps: 30, detections: 0 },
    { id: 'CAM-ISBT-01', location: 'ISBT - Entry', status: 'online', resolution: '1080p', anpr: true, fps: 30, detections: 1890 },
    { id: 'CAM-SUK-01', location: 'Sukhna Lake - Entry', status: 'online', resolution: '1080p', anpr: true, fps: 30, detections: 987 },
];

export const mqttMessages = [
    { topic: 'parking/sec17/A01', payload: { slot_id: 'A01', status: 'occupied', timestamp: '2026-03-13T10:15:00' } },
    { topic: 'parking/sec17/A02', payload: { slot_id: 'A02', status: 'vacant', timestamp: '2026-03-13T10:15:01' } },
    { topic: 'sensor/ESP32-001/health', payload: { device_id: 'ESP32-001', battery: 92, temp: 34, status: 'ok' } },
    { topic: 'parking/sec35/B15', payload: { slot_id: 'B15', status: 'occupied', timestamp: '2026-03-13T10:15:02' } },
    { topic: 'camera/CAM-17-01/anpr', payload: { plate: 'CH01-AB-1234', confidence: 0.97, timestamp: '2026-03-13T10:15:03' } },
    { topic: 'gate/GATE-17A/event', payload: { action: 'barrier_open', token: 'TK-7829', timestamp: '2026-03-13T10:15:04' } },
    { topic: 'parking/elante/C07', payload: { slot_id: 'C07', status: 'vacant', timestamp: '2026-03-13T10:15:05' } },
    { topic: 'sensor/LORA-001/health', payload: { device_id: 'LORA-001', battery: 78, temp: 31, status: 'ok' } },
    { topic: 'camera/CAM-35-01/anpr', payload: { plate: 'PB10-CD-5678', confidence: 0.94, timestamp: '2026-03-13T10:15:06' } },
    { topic: 'parking/sec22/A11', payload: { slot_id: 'A11', status: 'occupied', timestamp: '2026-03-13T10:15:07' } },
];

export const violationAlerts = [
    { id: 'v1', type: 'unauthorized', plate: 'HR26-XX-9999', location: 'Sec 17 - Zone A', time: '10:12 AM', severity: 'critical' },
    { id: 'v2', type: 'overtime', plate: 'CH01-AB-4567', location: 'Sec 22 - B08', time: '10:08 AM', severity: 'warning' },
    { id: 'v3', type: 'wrong_slot', plate: 'PB65-CD-1234', location: 'Sec 35 - EV Zone', time: '09:55 AM', severity: 'warning' },
    { id: 'v4', type: 'tampering', plate: null, location: 'CAM-17-03', time: '09:42 AM', severity: 'critical' },
    { id: 'v5', type: 'unauthorized', plate: 'DL08-MN-3456', location: 'Elante - Zone B', time: '09:30 AM', severity: 'critical' },
    { id: 'v6', type: 'overtime', plate: 'CH02-EF-7890', location: 'Sukhna Lake - A15', time: '09:15 AM', severity: 'warning' },
    { id: 'v7', type: 'suspicious', plate: null, location: 'ISBT - Zone A', time: '08:50 AM', severity: 'info' },
];
