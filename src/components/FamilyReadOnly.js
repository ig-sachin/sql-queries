import React from 'react'

const FamilyReadOnly = ({ family }) => {
    return (
        <tr>
            <td>{family.FID}</td>
            <td>{family.ID}</td>
            <td>{family.NAME}</td>
            <td>{family.RELATION}</td>
            <td>{family.GENDER}</td>
            <td>{family.AGE}</td>
        </tr>
    )
}

export default FamilyReadOnly
