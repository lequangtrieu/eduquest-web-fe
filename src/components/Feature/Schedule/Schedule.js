import { useEffect, useState } from "react";
import axios from "axios";

export default function Schedule() {

    const [message, setMessage] = useState("")

    setTimeout(function() {
        
      }, 4000);

    useEffect(() => {
        async function fetchData() {
          try {
            const userId = localStorage.getItem('userId')

            const response = await axios.get(
                `https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/Schedule/get`,
                {
                    params: {
                        userId: userId,
                    },
                }
            );
            console.log(response.data);
            setMessage(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
    }, [])

    return (
        <div>
            <div className="w-100 d-flex justify-content-center text-uppercase mt-5">
                <h1 className="">Schedule</h1>
            </div>
            <div className="w-100 d-flex justify-content-center mt-3 mb-5">
            <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
                </thead>
                <tbody dangerouslySetInnerHTML={{ __html: message }} />
            </table>
            </div>
        </div>
    );
}