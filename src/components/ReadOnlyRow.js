import React from "react";

const ReadOnlyRow = ({ employee }) => {
    return (
        <tr>
            <td>{employee.ID}</td>
            <td>{employee.NAME}</td>
            <td>{employee.SALARY}</td>
            <td>{employee.DEPARTMENT}</td>
            <td>{employee.CITY}</td>
            <td>{employee.JOINING_DATE}</td>
        </tr>
    );
};

export default ReadOnlyRow;