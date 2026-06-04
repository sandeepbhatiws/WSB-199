import React, { useEffect, useState } from 'react'
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";
import iziToast from "izitoast";
import axios from 'axios';

export default function AddProduct() {
  let [parentCategories, setParentCategories] = useState([]);
  let [subCategories, setSubCategories] = useState([]);
  let [materials, setMaterials] = useState([]);
  let [parentCategoryId, setParentCategoryId] = useState('');
  let [subCategoryId, setSubCategoryId] = useState('');
  let [materialId, setMaterialId] = useState('');
  let [productId, setProductId] = useState('');
  var [productDetails, setProductDetails] = useState('');
  let [productMaterialInfo, setProductMaterialInfo] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setProductId(params.id)

    if (params.id) {
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/details/${params.id}`)
          .then((result) => {
              if (result.data._status) {
                  setProductDetails(result.data._data)
                  setParentCategoryId(result.data._data.parent_category_id._id)
                  setSubCategoryId(result.data._data.sub_category_id._id)
                  setMaterialId(result.data._data.material_id._id)

                  setProductMaterialInfo({
                    label : result.data._data.material_id.name,
                    value : result.data._data.material_id._id
                  })

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
  }, [])

  //Parent Category
  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/parent-category`, {
      status: true,
      id: parentCategoryId
    })
      .then((result) => {
        if (result.data._status) {
          setParentCategories(result.data._data);
        } else {
          setParentCategories([])
        }
      })
      .catch(() => {
        iziToast.error({
          title: "Error",
          message: "Something went wrong.",
          position: "topRight",
        });
      })
  }, [])

  // Sub Category
  useEffect(() => {
    if (parentCategoryId) {
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/sub-category`, {
        status: true,
        id: subCategoryId,
        parent_category_id: parentCategoryId
      })
        .then((result) => {
          if (result.data._status) {
            setSubCategories(result.data._data);
          } else {
            setSubCategories([])
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
  }, [parentCategoryId])

  //Materials
  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/materials`, {
      status: true,
      id: materialId
    })
      .then((result) => {
        if (result.data._status) {
          var newData = result.data._data.map((v) => {

            v.value = v._id
            v.label = v.name
            return v;
          })
          setMaterials(newData);
        } else {
          setMaterials([])
        }
      })
      .catch(() => {
        iziToast.error({
          title: "Error",
          message: "Something went wrong.",
          position: "topRight",
        });
      })
  }, [])

  const handleParentCategory = (e) => {
    ErrorHandler(e)
    if (e.target.value != '') {
      setParentCategoryId(e.target.value)
    } else {
      setParentCategoryId('')
      setSubCategories([])
    }
  }

  let [errors, setErrors] = useState([]);
  let [SelectedImage, setSelectedImage] = useState("");
  let [imageBlocks, setImageBlocks] = useState([
    { image: null, file: null }
  ]);

  let [colors, setColors] = useState([]);

  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
  ];

  let handleSingleImageChange = (event) => {
    const file = event.target.files[0];
    ErrorHandler(event)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    console.log(reader);

    reader.onloadend = () => {
      const updated = [...imageBlocks];
      updated[index].image = reader.result;
      updated[index].file = file;

      // last block pe image select hui → new block add
      if (index === imageBlocks.length - 1) {
        updated.push({ image: null, file: null });
      }
      setImageBlocks(updated);

      setErrors(errors.filter(e => e !== "multi_image"));
    };
    reader.readAsDataURL(file);
  };

  let ErrorHandler = (event) => {
    let fieldName = event.target.name;
    let value = event.target.value;

    if (!value || value.trim() === "") {
      if (!errors.includes(fieldName)) {
        setErrors([...errors, fieldName]);
      }
    } else {
      let updated = errors.filter((v) => v !== fieldName);
      setErrors(updated);
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    let form = e.target;
    let fields = form.querySelectorAll(
      "input, textarea, select"
    );

    let newErrors = [];

    fields.forEach((field) => {
      if (
        field.name &&
        field.type !== "file" &&
        !field.value.trim()
      ) {
        newErrors.push(field.name);
      }
    });

    // single image check
    if (!SelectedImage) {
      newErrors.push("image");
    }

    // multiple image check
    const hasImage = imageBlocks.some(
      (b) => b.image !== null
    );

    if (!hasImage) {
      newErrors.push("multi_image");
    }

    newErrors = [...new Set(newErrors)];
    setErrors(newErrors);

    console.log(newErrors);

    if (newErrors.length === 0) {
      if (productId) {
        axios.put(`${import.meta.env.VITE_API_BASE_URL}/product/update/${productId}`, event.target)
          .then((result) => {
            if (result.data._status == true) {
              e.target.reset()
              navigate('/product/view')
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
          .catch((error) => {
            console.log(error)
            iziToast.error({
              title: "Error",
              message: "Something went wrong.",
              position: "topRight",
            });
          })
      } else {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/create`, event.target)
          .then((result) => {
            if (result.data._status == true) {
              e.target.reset()
              navigate('/product/view')
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
          .catch((error) => {
            console.log(error)
            iziToast.error({
              title: "Error",
              message: "Something went wrong.",
              position: "topRight",
            });
          })
      }

      //   const materialValues = materials.map(m => m.value);
      //   const colorValues = colors.map(c => c.value);

      //   console.log(materialValues);
      //   console.log(colorValues);

      //   form.reset();
      //   setSelectedImage("");
      //   setImageBlocks([{ image: null, file: null }]);
      //   setMaterials([]);
      //   setColors([]);

    }

  };


  const handleRemoveBlock = (index) => {
    const updated = imageBlocks.filter((_, i) => i !== index);

    // kam se kam 1 block rehna chahiye
    if (updated.length === 0) {
      setImageBlocks([{ image: null, file: null }]);
    } else {
      setImageBlocks(updated);
    }
  };

  return (
    <section className="w-full">

      {/* Breadcrumb */}
      <nav className="flex border-b sticky top-0 z-[9999] bg-white px-6 py-3 shadow-sm">
        <ol className="inline-flex items-center space-x-2 text-gray-600">

          <li>
            <a href="#" className="text-md font-medium hover:text-indigo-600">
              Home
            </a>
          </li>

          <li>/</li>

          <li>
            <a href="#" className="text-md font-medium hover:text-indigo-600">
              Product
            </a>
          </li>

          <li>/</li>

          <li>
            <span className="text-md font-semibold text-gray-900">
              { productId ? 'Update Product' : 'Add Product' }
            </span>
          </li>

        </ol>
      </nav>

      {/* BODY */}
      <div className="w-full min-h-[680px] px-5 bg-slate-50 py-10">
        <div className="mx-auto">

          <h3 className="text-[24px] font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 py-3 px-5 rounded-t-lg text-white border border-indigo-500">
            { productId ? 'Update Product' : 'Add Product' }
          </h3>

          <form
            onSubmit={handleSubmit}
            className="border border-slate-200 border-t-0 bg-white p-6 rounded-b-lg shadow-sm"
          >
            <div className='flex gap-3'>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Parent Category</label>
                <select onChange={handleParentCategory} name="parent_category_id" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Parent Category</option>

                  {
                    parentCategories.map((v, i) => {
                      return (
                        <option value={v._id} key={i} selected={ parentCategoryId == v._id ? 'selected' : '' }>{v.name}</option>
                      )
                    })
                  }
                </select>
                {errors.includes("parent_category_id") && <p className="text-red-600 text-sm mt-1">Parent category is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Sub Category</label>
                <select onChange={ErrorHandler} name="sub_category_id" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Sub Category</option>

                  {
                    subCategories.map((v, i) => {
                      return (
                        <option value={v._id} key={i} selected={ subCategoryId == v._id ? 'selected' : '' }>{v.name}</option>
                      )
                    })
                  }
                </select>
                {errors.includes("sub_category_id") && <p className="text-red-600 text-sm mt-1">Sub category is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Sub Sub Category</label>
                <select onChange={ErrorHandler} name="sub_sub_category_id" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Sub Sub Category</option>
                  {
                    subCategories.map((v, i) => {
                      return (
                        <option value={v._id} key={i} selected={ subCategoryId == v._id ? 'selected' : '' }>{v.name}</option>
                      )
                    })
                  }
                </select>
                {errors.includes("sub_sub_category_id") && <p className="text-red-600 text-sm mt-1">Sub Sub category is required</p>}
              </div>
            </div>

            <div className='flex gap-3'>
              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Product Name</label>
                <input type="text" defaultValue={productDetails.name} name="name" onKeyUp={ErrorHandler} placeholder="Enter product name" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("name") && <p className="text-red-600 text-sm mt-1">Product name is required</p>}
              </div>

              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Product Type</label>
                <select onChange={ErrorHandler} name="product_type" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Product Type</option>
                  <option value="1" selected={ productDetails.product_type == 1 ? 'selected' : '' } >Featured</option>
                  <option value="2" selected={ productDetails.product_type == 2 ? 'selected' : '' } >New Arrivals</option>
                  <option value="3" selected={ productDetails.product_type == 3 ? 'selected' : '' } >On Sale</option>
                </select>
                {errors.includes("product_type") && <p className="text-red-600 text-sm mt-1">Product Type is required</p>}
              </div>

              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">
                  Materials
                </label>

                <Select
                  options={materials}
                  name="material_id"
                  value={ productMaterialInfo }
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable='true'
                  onChange={(value) => {
                    setProductMaterialInfo(value);
                    setMaterialId(value._id);
                    if (value._id) {
                      setErrors(errors.filter(e => e !== "material_id"));
                    }
                  }}
                />
                {errors.includes("material_id") && (
                  <p className="text-red-600 text-sm mt-1">
                    Materials required
                  </p>
                )}
              </div>

              {/* <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">
                  Colors
                </label>

                <Select
                  options={colorOptions}
                  // isMulti
                  name='color_id'
                  value={colors}
                  onChange={(value) => {
                    setColors(value);

                    console.log(value);

                    if (value.length > 0) {
                      setErrors(errors.filter(e => e !== "colors"));
                    }
                  }}
                />

                {errors.includes("color_id") && (
                  <p className="text-red-600 text-sm mt-1">
                    Colors required
                  </p>
                )}

              </div> */}
            </div>

            <div className='flex gap-3'>
              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Is Trending</label>
                <select onChange={ErrorHandler} name="is_trending" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Is Trending</option>
                  <option value="1" selected={ productDetails.is_trending == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_trending == 2 ? 'selected' : '' }>No</option>
                </select>
                {errors.includes("is_trending") && <p className="text-red-600 text-sm mt-1">Is Trending is required</p>}
              </div>

              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Is Best Selling</label>
                <select onChange={ErrorHandler} name="is_best_sellings" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Is Best Selling</option>
                  <option value="1" selected={ productDetails.is_best_sellings == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_best_sellings == 2 ? 'selected' : '' }>No</option>
                </select>
                {errors.includes("is_best_sellings") && <p className="text-red-600 text-sm mt-1">Is Best Selling is required</p>}
              </div>

              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Product Code</label>
                <input type="text" defaultValue={productDetails.product_code} name="product_code" onKeyUp={ErrorHandler} placeholder="Enter product code" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("product_code") && <p className="text-red-600 text-sm mt-1">Product code is required</p>}
              </div>

              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Dimension</label>
                <input type="text" defaultValue={productDetails.dimension} name="dimension" onKeyUp={ErrorHandler} placeholder="Enter Dimension" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("dimension") && <p className="text-red-600 text-sm mt-1">Dimension is required</p>}
              </div>
            </div>

            <div className='flex gap-3'>
              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Estimate Delivery days</label>
                <input type="text" defaultValue={productDetails.estimate_delivery_days} name="estimate_delivery_days" onKeyUp={ErrorHandler} placeholder="Enter Estimate Delivery days" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("estimate_delivery_days") && <p className="text-red-600 text-sm mt-1">Estimate Delivery days is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Actual Price</label>
                <input type="number" defaultValue={productDetails.actual_price} name="actual_price" onKeyUp={ErrorHandler} min={1} placeholder="Enter actual price" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("actual_price") && <p className="text-red-600 text-sm mt-1">Actual Price is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Sale Price</label>
                <input type="number" defaultValue={productDetails.sale_price} name="sale_price" min={1} onKeyUp={ErrorHandler} placeholder="Enter price" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("sale_price") && <p className="text-red-600 text-sm mt-1">Sale Price is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Order</label>
                <input type="number" defaultValue={productDetails.order} name="order" min={1} onKeyUp={ErrorHandler} placeholder="Enter order" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("order") && <p className="text-red-600 text-sm mt-1">Order is required</p>}
              </div>

            </div>

            <div className='mb-6'>
              <label className="block mb-2 text-md font-medium text-gray-700">Short Description</label>
              <textarea name="short_description" onKeyUp={ErrorHandler} placeholder="Enter short description" defaultValue={productDetails.short_description} className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              {errors.includes("short_description") && <p className="text-red-600 text-sm mt-1">Short description is required</p>}
            </div>

            <div className='mb-6'>
              <label className="block mb-2 text-md font-medium text-gray-700">Description</label>
              <textarea name="long_description" onKeyUp={ErrorHandler} placeholder="Enter description" defaultValue={productDetails.long_description} className="text-[17px] min-h-[150px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              {errors.includes("long_description") && <p className="text-red-600 text-sm mt-1">Description is required</p>}
            </div>

            <div className='flex mb-6 flex-col'>
              <label className="block mb-2 text-md font-medium text-gray-700">
                Image
              </label>

              <div className="relative w-60 h-60 border border-slate-200 rounded-lg overflow-hidden shadow bg-slate-100">

                {!SelectedImage && (
                  <div className="relative w-full h-full overflow-hidden bg-slate-200 rounded-lg flex flex-col items-center justify-center gap-4">
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
                  onChange={handleSingleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {errors.includes("image") && (
                <p className="text-red-600 text-sm mt-1">Image is required</p>
              )}
            </div>

            <div className="flex  mb-6 flex-col">
              <label className="block mb-2 text-md font-medium text-gray-700">
                Multiple Images
              </label>

              <div className="flex flex-wrap gap-5">

                {imageBlocks.map((block, index) => (

                  <div key={index} className="relative">

                    {/* remove button */}
                    {block.image && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBlock(index)}
                        className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                      >
                        ✕
                      </button>
                    )}

                    <div className="relative w-60 h-60 border border-slate-200 rounded-lg overflow-hidden shadow bg-slate-100">

                      {!block.image && (
                        <div className="relative w-full h-full overflow-hidden bg-slate-200 rounded-lg flex flex-col items-center justify-center gap-4">

                          <div className="absolute inset-0 bg-slate-300 animate-pulse"></div>

                          <div className="absolute inset-0 bg-gradient-to-r 
                            from-transparent via-white/40 to-transparent
                            animate-[shimmer_1.8s_linear_infinite]">
                          </div>

                          <div className="relative z-10 flex flex-col items-center gap-3">
                            <MdOutlineDriveFolderUpload
                              className="text-slate-600"
                              size={55}
                            />
                            <div className="w-28 h-3 bg-slate-400 rounded-full"></div>
                            <div className="w-20 h-3 bg-slate-400 rounded-full"></div>
                          </div>

                        </div>
                      )}

                      {block.image && (
                        <img
                          src={block.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}

                      <input
                        type="file"
                        name='images'
                        accept="image/*"
                        onChange={(e) => handleMultipleImageChange(e, index)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />

                    </div>
                  </div>
                ))}
              </div>

              {errors.includes("multi_image") && (
                <p className="text-red-600 text-sm mt-1">
                  At least one image required
                </p>
              )}
            </div>

            <div className='flex justify-end'>
              <button type="submit" className="mt-3 text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all">{ productId ? 'Update' : 'Submit' }</button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}
