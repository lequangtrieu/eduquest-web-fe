import AdminLayout from "../../Common/Admin/AdminLayout";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(...registerables);

export default function Statistic() {
    const [barData, setBarData] = useState(null);
    const [doughnutData, setDoughnutData] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(0);

    // useEffect(() => {
    //     fetch("https://localhost:7091/api/statistic/statistic")
    //         .then(response => response.json())
    //         .then(data => {

    //             if (data) {
    //                 // Cập nhật Bar Chart
    //                 setBarData({
    //                     labels: data.topCourses.map(c => c.courseTitle), // Tên khóa học
    //                     datasets: [
    //                         {
    //                             label: "Quantity Purchased",
    //                             data: data.topCourses.map(c => c.totalSales), // Tổng lượt mua
    //                             backgroundColor: "rgba(30, 0, 255, 0.47)",
    //                             borderColor: "rgba(75, 192, 192, 1)",
    //                             borderWidth: 1,
    //                             borderRadius: 5,
    //                         },
    //                     ],
    //                 });

    //                 // Cập nhật Doughnut Chart
    //                 setDoughnutData({
    //                     labels: data.revenueDistribution.map(r => r.courseTitle), // Tên khóa học
    //                     datasets: [
    //                         {
    //                             label: "Revenue Share",
    //                             data: data.revenueDistribution.map(r => r.revenuePercentage), // Phần trăm doanh thu
    //                             backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#8e44ad", "#f39c12"],
    //                             hoverOffset: 4,
    //                         },
    //                     ],
    //                 });

    //                 // Cập nhật tổng doanh thu
    //                 setTotalRevenue(data.totalRevenue);
    //             }
    //         })
    //         .catch(error => console.error("Error fetching statistics:", error));
    // }, []);

    useEffect(() => {
        // Dữ liệu khóa học
        const courses = [
            { name: "React", sales: 3, price: 500000 },
            { name: "Advanced Python", sales: 10, price: 400000 },
            { name: "Angular", sales: 4, price: 600000 },
            { name: "Introduction to AI", sales: 7, price: 300000 },
            { name: "Node.js", sales: 1, price: 450000 }
        ];

        // *1. Dữ liệu cho Bar Chart (Số lượng mua)*
        const barData = {
            labels: courses.map(course => course.name), 
            datasets: [
                {
                    label: "Số lượng mua", 
                    data: courses.map(course => course.sales), 
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
                }
            ]
        };
        

        // *2. Dữ liệu cho Doughnut Chart (Phần trăm doanh thu)*
        const total = courses.reduce((sum, course) => sum + course.sales * course.price, 0);
        const doughnutData = {
            labels: courses.map(course => course.name),
            datasets: [
                {
                    data: courses.map(course => ((course.sales * course.price) / total) * 100),
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
                }
            ]
        };

        // Cập nhật state
        setBarData(barData);
        setDoughnutData(doughnutData);
        setTotalRevenue(total);
    }, []);

    // *Cấu hình biểu đồ*
    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Thống kê khóa học" }
        }
    };

    return (
        <AdminLayout>
            <h1 style={{ textAlign: "left", fontSize: "25px", fontWeight: "bold", color: "#4e73df" }}>
                System Statistic
            </h1>
            <h3 style={{ textAlign: "left", fontSize: "20px", fontWeight: "bold", color: "rgba(171, 43, 8, 0.86)", marginLeft: "30px" }}>
                Total Revenue: {totalRevenue.toLocaleString()} $
            </h3>
            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ width: "60%" }}>
                    {barData ? <Bar data={barData} options={options} /> : <p>Loading...</p>}
                </div>
                <div style={{ width: "40%" }}>
                    {doughnutData ? <Doughnut data={doughnutData} options={options} /> : <p>Loading...</p>}
                </div>
            </div>
        </AdminLayout>
    );
}