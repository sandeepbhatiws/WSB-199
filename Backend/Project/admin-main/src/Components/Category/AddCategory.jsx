import axios from 'axios';
import iziToast from 'izitoast';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineDriveFolderUpload } from "react-icons/md";

export default function AddCategory() {

    let [SelectedImage, setSelectedImage] = useState("");
    let [errors, setErrors] = useState([]);

    let handleimagechange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);

                let updated = errors.filter((v) => v !== 'image');
                setErrors(updated);
            };
            reader.readAsDataURL(file);
        }
    };

    var [categoryId, setCategoryId] = useState('');
    var [categoryDetails, setCategoryDetails] = useState('');

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        setCategoryId(params.id);

        if (params.id) {
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/category/details/${params.id}`)
                .then((result) => {
                    if (result.data._status) {
                        setCategoryDetails(result.data._data)
                        if(result.data._data.image){
                            setSelectedImage(result.data._image_path+'/'+result.data._data.image)
                        }
                    } else {
                        iziToast.error({
                            title: "Error",
                            message: result.data._messsage,
                            position: "topRight",
                        });
                    }
                })
                .catch(() => {
                    iziToast.error({
                        title: "Error",
                        message: "Something went wrong.",
                        position: "topRight",
                    });
                })
        }

    }, [params])

    let formhandler = (event) => {
        event.preventDefault();

        let form = event.target;
        let fields = form.querySelectorAll('input')

        let newErrors = [];

        fields.forEach((field) => {
            if(field.name != 'image'){
                if (!field.value.trim()) {
                    newErrors.push(field.name);
                }
            }
        });

        if (!SelectedImage) {
            newErrors.push("image");
        }

        newErrors = [...new Set(newErrors)];
        setErrors(newErrors);

        console.log(newErrors);

        if (newErrors.length === 0) {

            if (categoryId) {
                axios.put(`${import.meta.env.VITE_API_BASE_URL}/category/update/${categoryId}`, event.target)
                    .then((result) => {
                        if (result.data._status == true) {
                            event.target.reset()
                            navigate('/category/view')
                            iziToast.success({
                                title: "Success",
                                message: result.data._message,
                                position: "topRight",
                            });
                        } else {
                            iziToast.error({
                                title: "Error",
                                message: result.data._message,
                                position: "topRight",
                            });
                        }
                    })
                    .catch(() => {
                        iziToast.error({
                            title: "Error",
                            message: "Something went wrong.",
                            position: "topRight",
                        });
                    })
            } else {
                axios.post(`${import.meta.env.VITE_API_BASE_URL}/category/create`, event.target)
                    .then((result) => {
                        if (result.data._status == true) {
                            event.target.reset()
                            navigate('/category/view')
                            iziToast.success({
                                title: "Success",
                                message: result.data._message,
                                position: "topRight",
                            });
                        } else {
                            iziToast.error({
                                title: "Error",
                                message: result.data._message,
                                position: "topRight",
                            });
                        }
                    })
                    .catch(() => {
                        iziToast.error({
                            title: "Error",
                            message: "Something went wrong.",
                            position: "topRight",
                        });
                    })
            }


        }
    };

    let ErrorHandler = (event) => {
        let fieldName = event.target.name;

        if (event.target.value === "") {

            if (!errors.includes(fieldName)) {
                setErrors([...errors, fieldName]);
            }

        } else {
            let updated = errors.filter((v) => v !== fieldName);
            setErrors(updated);
        }
    };




    return (
        <>
            <section className="w-full">

                {/* Breadcrumb */}
                <nav className="flex border-b bg-white px-6 py-3 shadow-sm">
                    <ol className="inline-flex items-center space-x-2 text-gray-600">
                        <li><a className="text-md font-medium hover:text-indigo-600">Home</a></li>
                        <li>/</li>
                        <li><a className="text-md font-medium hover:text-indigo-600">Category</a></li>
                        <li>/</li>
                        <li className="font-semibold text-gray-900">{ categoryId ? 'Update Category' : 'Add Category' }</li>
                    </ol>
                </nav>


                {/* Body */}
                <div className="w-full min-h-[680px] px-5 bg-slate-50 py-10">

                    <div className="mx-auto">

                        <h3 className="text-[24px] font-semibold 
                        bg-gradient-to-r from-indigo-600 to-indigo-500
                        py-3 px-5 rounded-t-lg text-white border border-indigo-500">

                            { categoryId ? 'Update Category' : 'Add Category' }

                        </h3>


                        <form
                            onSubmit={formhandler}
                            className="border border-slate-200 border-t-0 gap-6 flex bg-white p-6 rounded-b-lg shadow-sm"
                        >

                            {/* IMAGE AREA */}
                            <div className='flex flex-col'>
                                <label className="block mb-2 text-md font-medium text-gray-700">
                                    Image
                                </label>

                                <div className="relative w-60 h-60 border border-slate-200 rounded-lg overflow-hidden shadow bg-slate-100">

                                    {!SelectedImage && (
                                        <div className="relative w-full z-0 h-full overflow-hidden bg-slate-200 rounded-lg flex flex-col items-center justify-center gap-4">

                                            <div className="absolute inset-0 bg-slate-300 animate-pulse"></div>

                                            <div className="absolute inset-0 bg-gradient-to-r 
                                                    from-transparent via-white/40 to-transparent
                                                    animate-[shimmer_1.8s_linear_infinite]">
                                            </div>

                                            <div className="relative z-10 flex flex-col items-center gap-3">
                                                <MdOutlineDriveFolderUpload className="text-slate-600" size={55} />
                                                <div className="w-28 h-3 bg-slate-400 rounded-full"></div>
                                                <div className="w-20 h-3 bg-slate-400 rounded-full"></div>
                                            </div>
                                        </div>
                                    )}

                                    {SelectedImage && (
                                        <img
                                            src={SelectedImage}
                                            alt="Selected"
                                            className="w-full h-full object-cover"
                                        />
                                    )}

                                    <input
                                        type="file"
                                        name='image'
                                        accept="image/*"
                                        onChange={handleimagechange}
                                        className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                                    />
                                </div>

                                {errors.includes("image") && (
                                    <p className="text-red-600 text-sm mt-1">Image is required</p>
                                )}
                            </div>


                            {/* FORM FIELDS */}
                            <div className='basis-[100%]'>

                                {/* Category Name */}
                                <div className="mb-6">

                                    <label className="block mb-2 text-md font-medium text-gray-700">
                                        Category Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        defaultValue={categoryDetails.name}
                                        onKeyUp={ErrorHandler}
                                        className="text-[17px] border border-slate-300 text-gray-900 rounded-lg 
                                        focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500
                                        block w-full py-2.5 px-3"
                                        placeholder="Enter category name"
                                    />

                                    {errors.includes("name") && (
                                        <p className="text-red-600 text-sm mt-1">
                                            Name is required
                                        </p>
                                    )}

                                </div>


                                {/* Order */}
                                <div className="">

                                    <label className="block mb-2 text-md font-medium text-gray-700">
                                        Order
                                    </label>

                                    <input
                                        type="number"
                                        onKeyUp={ErrorHandler}
                                        defaultValue={categoryDetails.order}
                                        name="order"
                                        min={1}
                                        autoComplete="off"
                                        className="text-[17px] border border-slate-300 text-gray-900 rounded-lg 
                                        focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500
                                        block w-full py-2.5 px-3"
                                        placeholder="Enter order number"
                                    />

                                </div>
                                {errors.includes("order") && (
                                    <p className="text-red-600 text-sm mt-1">Order is required</p>
                                )}


                                <div className='flex justify-end'>
                                    <button
                                        type="submit"
                                        className="mt-3 cursor-pointer text-white 
                                        bg-indigo-600 hover:bg-indigo-700
                                        focus:ring-4 focus:ring-indigo-300
                                        font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all"
                                    >
                                        { categoryId ? 'Update' : 'Submit' }
                                    </button>

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </section>
        </>
    )
}