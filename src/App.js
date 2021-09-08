import React, { useEffect, useState } from "react";
import "./App.css";
import data from "./data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import fdata from "./fdata.json";
import FamilyReadOnly from "./components/FamilyReadOnly";


const App = () => {
  const [employees, setEmployees] = useState(data);
  const [familys, setFamily] = useState(fdata);
  const [sdata, setSData] = useState([]);
  const [qs1, setQs1] = useState(false);
  const [qs2, setQs2] = useState(false);
  const [qs3, setQs3] = useState(false);
  const [qs4, setQs4] = useState(false);
  const [qs5, setQs5] = useState(false);
  const [qs6, setQs6] = useState(false);
  const [qs7, setQs7] = useState(false);
  const [qs8, setQs8] = useState(false);

  var sqldata = []


  useEffect(() => {
    // Query 1
    var min = employees[0].SALARY;
    var minemp = employees[0];
    employees.forEach((employee) => {
      if (employee.SALARY < min) {
        min = employee.SALARY
        minemp = employee;
      }
    });
    sqldata.push(minemp);


    // Query 2
    var salless50emp = [];
    employees.forEach((employee) => {
      if (employee.SALARY < 50000) {
        salless50emp.push(employee);
      }
    })
    sqldata.push(salless50emp);


    // Query 3
    var max2 = [employees[0].SALARY, employees[0].SALARY];
    var mvar2 = []
    var max2emp = [employees[0], employees[0]];
    employees.forEach((employee) => {
      if (employee.SALARY >= max2[0]) {
        max2[1] = max2[0];
        max2[0] = employee.SALARY
        max2emp[1] = max2emp[0];
        mvar2.push(max2emp[1]);
        max2emp[0] = employee;
      }
    })
    mvar2 = mvar2.filter(uniqueDepart);
    sqldata.push(mvar2);



    // Query 4
    var mp = [];
    employees.forEach((employee) => {
      if (employee.CITY === "Mumbai" || employee.CITY === "Pune") {
        mp.push(employee);
      }
    })
    sqldata.push(mp);


    // Query 5
    function uniqueDepart(value, index, self) {
      return self.indexOf(value) === index;
    }
    var department = []
    employees.forEach((employee) => department.push(employee.DEPARTMENT));
    department = department.filter(uniqueDepart);
    var deptsal1 = Array.from(Array(department.length).keys())
    deptsal1.forEach((_, i) => deptsal1[i] = 0);
    employees.forEach((employee, i) => {
      var t = department.findIndex((dept) => dept === employee.DEPARTMENT)
      if (employee.SALARY > deptsal1[t]) {
        deptsal1[t] = employee.SALARY
      }
    })
    var fdept = []
    for (var i = 0; i < department.length; i++) {
      fdept[i] = {
        Department: department[i],
        Salary: deptsal1[i]
      }
    }
    sqldata.push(fdept);


    // Query 6
    var fdetail = []
    familys.forEach((family) => {
      if (family.ID === "E3") {
        fdetail.push(family);
      }
    })
    sqldata.push(fdetail);


    // Query 7
    var scs = []
    familys.forEach((family) => {
      if (family.AGE >= 60 && family.AGE <= 80) {
        scs.push(family);
      }
    })
    var fsc = [];
    scs.forEach((sc) => {
      var t = employees.find((employee) => employee.ID === sc.ID);
      fsc.push(t);
    })
    fsc = fsc.filter(uniqueDepart);
    sqldata.push(fsc);


    // Query 8
    var fdm = []
    familys.forEach((family) => {
      if (family.RELATION === "Wife" || family.RELATION === "Husband") {
        fdm.push(family);
      }
    })
    var fdemp = [];
    fdm.forEach((fam) => {
      var t = employees.find((employee) => employee.ID === fam.ID);
      fdemp.push(t);
    })
    fdemp = fdemp.filter(uniqueDepart);
    sqldata.push(fdemp);

    setSData(sqldata);
  }, []);
  console.log("last ", sdata);
  const slen = sdata.length;

  return (
    <div className="app-container">
      <table className="employee">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Department</th>
            <th>City</th>
            <th>Joining Date</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map((employee) => (
              <ReadOnlyRow
                employee={employee}
                key={employee.ID}
              />
            ))
          }
        </tbody>
      </table>

      <table className="family">
        <thead>
          <tr>
            <th>FID</th>
            <th>ID</th>
            <th>Name</th>
            <th>Relation</th>
            <th>Gender</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {
            familys.map((family) => (
              <FamilyReadOnly family={family} key={family.FID} />
            ))
          }
        </tbody>
      </table>
      {
        slen === 8 && (
          <>
            <div className="questions">
              <h1 className="stitle">SOME SQL QUERIES ON ABOVE TABLE</h1>
              <div className="q1">
                <p>1. Find an employee whose salary is minimum.</p>
                <button className="sqlbtn" onClick={() => setQs1(!qs1)}><span>{qs1 ? 'Hide Table' : 'Show table'}</span></button>
                {
                  qs1 && <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Department</th>
                        <th>City</th>
                        <th>Joining Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        <tr>
                          <td>{sdata[0].ID}</td>
                          <td>{sdata[0].NAME}</td>
                          <td>{sdata[0].SALARY}</td>
                          <td>{sdata[0].DEPARTMENT}</td>
                          <td>{sdata[0].CITY}</td>
                          <td>{sdata[0].JOINING_DATE}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                }
              </div>
              <div className="q2">
                <p>2. Find employees whose salary is less than 50000.</p>
                <button className="sqlbtn" onClick={() => setQs2(!qs2)}><span>{qs2 ? 'Hide Table' : 'Show table'}</span></button>
                {
                  qs2 && <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Department</th>
                        <th>City</th>
                        <th>Joining Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        sdata[1].map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.ID}</td>
                              <td>{item.NAME}</td>
                              <td>{item.SALARY}</td>
                              <td>{item.DEPARTMENT}</td>
                              <td>{item.CITY}</td>
                              <td>{item.JOINING_DATE}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                }
              </div>
              <div className="q3">
                <p>3. Find an employee whose salary is 2nd highest.</p>
                <button className="sqlbtn" onClick={() => setQs3(!qs3)}><span>{qs3 ? 'Hide Table' : 'Show table'}</span></button>
                {
                  qs3 && <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Department</th>
                        <th>City</th>
                        <th>Joining Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        sdata[2].map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.ID}</td>
                              <td>{item.NAME}</td>
                              <td>{item.SALARY}</td>
                              <td>{item.DEPARTMENT}</td>
                              <td>{item.CITY}</td>
                              <td>{item.JOINING_DATE}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                }
              </div>
              <div className="q4">
                <p>4. Find employees who live in 'Mumbai' and 'Pune'.</p>
                <button className="sqlbtn" onClick={() => setQs4(!qs4)}><span>{qs4 ? 'Hide Table' : 'Show table'}</span></button>
                {
                  qs4 && <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Department</th>
                        <th>City</th>
                        <th>Joining Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        sdata[3].map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.ID}</td>
                              <td>{item.NAME}</td>
                              <td>{item.SALARY}</td>
                              <td>{item.DEPARTMENT}</td>
                              <td>{item.CITY}</td>
                              <td>{item.JOINING_DATE}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                }
              </div>
              <div className="q5">
                <p>5. Find the maximum salary of each department..</p>
                <button className="sqlbtn" onClick={() => setQs5(!qs5)}><span>{qs5 ? 'Hide Table' : 'Show table'}</span></button>
                {
                  qs5 && <table>
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        sdata[4].map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.Department}</td>
                              <td>{item.Salary}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                }
              </div>
              <div className="q6">
                <p>6. Find family details of 'Dhananjay'.</p>
                <button className="sqlbtn" onClick={() => setQs6(!qs6)}><span>{qs6 ? 'Hide Table' : 'Show table'}</span></button>
                {
                  qs6 && <table>
                    <thead>
                      <tr>
                        <th>FID</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Relation</th>
                        <th>Gender</th>
                        <th>Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        sdata[5].map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.FID}</td>
                              <td>{item.ID}</td>
                              <td>{item.NAME}</td>
                              <td>{item.RELATION}</td>
                              <td>{item.GENDER}</td>
                              <td>{item.AGE}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                }
              </div>
              <div className="q7">
                <p>7. Find employees whose parents are senior citizens.</p>
                <button className="sqlbtn" onClick={() => setQs7(!qs7)}><span>{qs7 ? 'Hide Table' : 'Show table'}</span></button>
                {
                  qs7 && <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Department</th>
                        <th>City</th>
                        <th>Joining Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        sdata[2].map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.ID}</td>
                              <td>{item.NAME}</td>
                              <td>{item.SALARY}</td>
                              <td>{item.DEPARTMENT}</td>
                              <td>{item.CITY}</td>
                              <td>{item.JOINING_DATE}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                }
              </div>
              <div className="q8">
                <p>8. Find employees who are married (family details Husband/Wife).</p>
                <button className="sqlbtn" onClick={() => setQs8(!qs8)}><span>{qs8 ? 'Hide Table' : 'Show table'}</span></button>
                {
                  qs8 && <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Department</th>
                        <th>City</th>
                        <th>Joining Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        sdata[2].map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.ID}</td>
                              <td>{item.NAME}</td>
                              <td>{item.SALARY}</td>
                              <td>{item.DEPARTMENT}</td>
                              <td>{item.CITY}</td>
                              <td>{item.JOINING_DATE}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </>
        )
      }
    </div >
  );
};

export default App;