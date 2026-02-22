import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
const List = () => {
  const Navigator=useNavigate()
   const [formattedData, setFormattedData] = useState([]);
  useEffect(() => {
    async function getData(params) {
      const data = await fetch("/api/backend_dev/gettabledata.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "test",
          password: "123456",
        }),
      });
      const res = await data.json();
      // console.log("DATA", res.TABLE_DATA.data);
      const mapped = res.TABLE_DATA.data.map((item) => ({
        name: item[0],
        department: item[1],
        city: item[2],
        id: item[3],
        joinedAt: item[4],
        salary: Number(item[5].replace(/[$,]/g, "")),
      }));
      setFormattedData(mapped);
    }
    getData();
  }, []);
  console.log(formattedData);
  const avgSalary =
    formattedData.reduce((sum, emp) => sum + emp.salary, 0) /
    formattedData.length;

    const departments = [
      ...new Set(formattedData.map((emp) => emp.department)),
  ];
  
  /*
  1
: 
Array(6)
0
: 
"Garrett Winters"
1
: 
"Accountant"
2
: 
"Tokyo"
3
:   
"8422"
4
: 
"2011/07/25"
5
: 
"$170,750"
  */
  const buildSalaryBuckets = (employees) => {
    const salaries = employees.map((e) => e.salary);

    const min = Math.min(...salaries);
    const max = Math.max(...salaries);

    const bucketCount = 8;
    const rangeSize = Math.ceil((max - min) / bucketCount);

    const buckets = [];

    for (let i = 0; i < bucketCount; i++) {
      const lower = min + i * rangeSize;
      const upper = lower + rangeSize;

      buckets.push({
        name: `${Math.floor(lower / 1000)}k-${Math.floor(upper / 1000)}k`,
        count: 0,
        min: lower,
        max: upper,
      });
    }

    employees.forEach((emp) => {
      const bucketIndex = Math.min(
        Math.floor((emp.salary - min) / rangeSize),
        bucketCount - 1,
      );
      buckets[bucketIndex].count++;
    });

    return buckets;
  };
  const chartData = buildSalaryBuckets(formattedData);
  return (
    <div>
      <section className="m-2 w-full h-[25vh] flex flex-row gap-5 justify-center items-center mt-10 ">
        <div className="w-[200px] h-[200px] border border-amber-500 rounded-lg m-15  flex flex-col gap-5 items-center justify-center text-2xl hover:bg-amber-100 transition-transform ease-in-out ">
          <div className="">Total Employees</div>
          <h2 className="text-4xl">{formattedData.length}</h2>
        </div>

        <div className="w-[200px] h-[200px] border border-blue-500 rounded-lg m-15  flex flex-col gap-5 items-center justify-center text-2xl hover:bg-blue-100 transition-transform ease-in-out ">
          <div className="">Average Salary</div>
          <h2 className="text-4xl">$ {Math.ceil(avgSalary)}</h2>
        </div>

        <div className="w-[200px] h-[200px] border border-green-500 rounded-lg m-15  flex flex-col gap-5 items-center justify-center text-2xl hover:bg-green-100 transition-transform ease-in-out ">
          <div className="">Departments</div>
          <h2 className="text-4xl">{departments.length}+</h2>
        </div>

        <div className="w-[200px] h-[200px] border border-red-500 rounded-lg m-15  flex flex-col gap-5 items-center justify-center text-2xl hover:bg-red-100 transition-transform ease-in-out ">
          <div className="">Users</div>
          <h2 className="text-4xl">100+</h2>
        </div>
      </section>

      <section className="mt-5 relative">
        <div className="mt-8 flex justify-center items-center text-2xl absolute left-150">
          BarChart of Employees vs Salary Range
        </div>
        <div className="my-10 scale-x-75 ml-0 ">
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className='flex flex-col justify-center items-center'>
        <h1 className="text-4xl">All Employees</h1>

        <div className="flex m-5 flex-wrap justify-center items-center gap-5">
          {formattedData.map((emp) => {
            return (
              <div key={emp.id} className="m-5 hover:shadow-cyan-600 hover:shadow-md hover:scale-110 transition-transform  ease-in-out duration-300" onClick={() => {
                Navigator(`/profile/${emp.id}`);
              }
              }>
                <div className="bg-white shadow-md rounded-xl p-5 border hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-gray-800">
                      {emp.name}
                    </h2>
                    <p className="text-sm text-gray-500">{emp.department}</p>

                    <div className="mt-3 text-sm text-gray-700">
                      <p>
                        <span className="font-medium">City:</span> {emp.city}
                      </p>
                      <p>
                        <span className="font-medium">Employee ID:</span>{" "}
                        {emp.id}
                      </p>
                      <p>
                        <span className="font-medium">Joined:</span>{" "}
                        {emp.joinedAt}
                      </p>
                    </div>

                    <div className="mt-4 text-lg font-semibold text-blue-600 text-center">
                      ${emp.salary.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          )}
        </div>
      </section>
    </div>
  );
}

export default List