import React, { Component } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import "./UsageSummary.css";

class UsageSummary extends Component {
    render() {
        const data2 = [
            { name: 'Geeksforgeeks', students: 400, color: '#8E7AB5' },
            { name: 'Technical scripter', students: 700, color: '#B784B7' },
            { name: 'Geek-i-knack', students: 200, color: '#EEA5A6' },
            { name: 'Geek-o-mania', students: 1000, color: '#E493B3' }
        ];

        return (
            <div>
                <h2>Usage Summary</h2>
                <div className="pie-chart-container">
                    <PieChart width={500} height={400}>
                        <Pie data={data2} dataKey="students" nameKey="name" cx="50%" cy="50%" legendType="circle">
                            {data2.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
        );
    }
}

export default UsageSummary;
