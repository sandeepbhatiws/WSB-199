import React from 'react'
import { toast } from 'react-toastify';

export default function Form({userData, setUserData}) {

    const formHandler = (e) => {
        e.preventDefault();

        const data = {
            name : e.target.name.value,
            email : e.target.email.value,
            mobile_number : e.target.mobile_number.value,
        }

        const finalData = [data, ...userData]; 
        setUserData(finalData)
        localStorage.setItem('userInfo', JSON.stringify(finalData))
        console.log(data);
        e.target.reset();
        toast.success('Data Saved.');
    }

    return (
        <>
            <div class="outer_form">
                <div>
                    <h1>User Form</h1>
                </div>
                <form id="form_handler" onSubmit={formHandler} autocomplete="off">
                    <div class="form-control">
                        <label>Name</label>
                        <input type="text" name="name" autocomplete="off" />
                    </div>
                    <div class="form-control">
                        <label>Email</label>
                        <input type="text" name="email" />
                    </div>
                    <div class="form-control">
                        <label>Mobile Number</label>
                        <input type="text" name="mobile_number" />
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>

                </form>
            </div>
        </>
    )
}
