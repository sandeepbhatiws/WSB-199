import React from 'react'

export default function Table({data}) {
    
    return (
        <>
            <div class="outer_data">
                <div>
                    <h2>User Data</h2>
                </div>
                <div class="user_data">
                    <table border="1" width="100%" cellpadding="10" cellspacing="0">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                            </tr>
                        </thead>
                        <tbody id="user_data">
                            {
                                data.length > 0
                                ?
                                data.map((v,i) => {
                                    return(
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{ v.name }</td>
                                            <td>{ v.email }</td>
                                            <td>{ v.mobile_number }</td>
                                        </tr>
                                    )
                                })
                                :
                                <tr className='center'>
                                    <td colSpan={4}>No Record Found !!</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
