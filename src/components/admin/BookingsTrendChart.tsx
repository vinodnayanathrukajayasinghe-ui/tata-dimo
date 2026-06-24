"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function BookingsTrendChart({
  data,
}: {
  data: { date: string; serviceBookings: number; testDrives: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1c1c1e15" vertical={false} />
        <XAxis dataKey="date" tickFormatter={(d: string) => d.slice(5)} fontSize={12} stroke="#1c1c1e60" />
        <YAxis allowDecimals={false} fontSize={12} stroke="#1c1c1e60" />
        <Tooltip />
        <Area type="monotone" dataKey="serviceBookings" name="Service Bookings" stroke="#1A4F8B" fill="#1A4F8B26" strokeWidth={2} />
        <Area type="monotone" dataKey="testDrives" name="Test Drives" stroke="#F2811D" fill="#F2811D26" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
