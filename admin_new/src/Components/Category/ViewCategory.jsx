import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import iziToast from "izitoast";

export default function ViewCategory() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterData, setFilterData] = useState({})
  const [selectedRecord, setSelectedRecord] = useState([])

  const applyFilter = (e) => {
    e.preventDefault();

    let obj = {
      name: e.target.name.value,
    };

    setFilterData(obj);

    iziToast.success({
      title: "Success",
      message: "Filter applied successfully!",
      position: "topRight",
    });


  };



  const SingleCheckSelect = (id) => {
    if (selectedRecord.includes(id)) {
      let finalData = selectedRecord.filter((v) => {
        if (v != id) {
          return v
        }
      })

      setSelectedRecord(finalData)
    } else {
      let finalData = [...selectedRecord, id]
      setSelectedRecord(finalData)
    }


  }

  const changeStatus = () => {
    if (selectedRecord.length > 0) {
      iziToast.success({
        title: "Success",
        message: "Status Change suces",
        position: "topRight",
      });

      setSelectedRecord([])
    } else {
      iziToast.error({
        title: "No Selection",
        message: "Please select at least one record to delete.",
        position: "topRight",
      });
    }


  }

  const deleteRecords = () => {
    if (selectedRecord.length > 0) {

      iziToast.question({
        timeout: 20000,
        close: true,
        overlay: true,
        displayMode: "once",
        id: "delete-confirm",
        zindex: 999999,
        title: "Are you sure?",
        message: "Do you really want to delete selected records? This action cannot be undone.",
        position: "center",
        buttons: [
          [
            "<button><b>YES</b></button>",
            function (instance, toast) {
              // ---- Perform Delete ----
              setSelectedRecord([]);

              iziToast.success({
                title: "Deleted",
                message: "Selected records have been deleted successfully.",
                position: "topRight",
              });

              instance.hide({ transitionOut: "fadeOut" }, toast);
            },
            true,
          ],
          [
            "<button>NO</button>",
            function (instance, toast) {
              iziToast.info({
                title: "Cancelled",
                message: "Delete action cancelled.",
                position: "topRight",
              });
              instance.hide({ transitionOut: "fadeOut" }, toast);
            },
          ],
        ],
      });

    } else {
      iziToast.error({
        title: "No Selection",
        message: "Please select at least one record to delete.",
        position: "topRight",
      });
    }
  };

  return (
    <>
      <section className="w-full">

        {/* ---------------- Breadcrumb ---------------- */}
        <nav className="flex border-b-2 bg-white py-3 px-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li><a className="text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
            <li>/ <a className="text-md font-medium text-gray-700 hover:text-blue-600">Category</a></li>
            <li>/ <span className="text-md font-medium text-gray-500">View Category</span></li>
          </ol>
        </nav>

        {/* ---------------- FILTER BOX ---------------- */}

        <div
          className={`px-1 overflow-hidden transition-all duration-300 ease-out 
              ${openFilter ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
               `}
        >

          <form
            onSubmit={applyFilter}
            className="py-3 relative px-6 my-3 rounded-lg border w-full bg-white shadow-sm"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setOpenFilter(false)}
              className="absolute right-4 cursor-pointer top-4 text-[28px] text-gray-600 hover:text-black"
            >
              <MdOutlineClose />
            </button>


            <p className="font-bold py-2 text-[20px]">FILTER</p>

            {/* Input Fields */}
            <div className="flex items-center gap-6">
              <div className="mb-5">
                <label className="block mb-2 font-medium">Category Name</label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={filterData.name}

                  placeholder="Enter Category Name"
                  className="border-2 border-gray-300 shadow-sm w-full rounded-lg px-2 py-1 text-[17px]"
                />
              </div>


            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="reset"
                onClick={() => setFilterData({})}
                className="text-white cursor-pointer bg-gray-500 hover:bg-gray-600 px-6 py-2.5 rounded-lg"
              >
                Clear
              </button>

              <button
                type="submit"
                className="text-white cursor-pointer bg-purple-700 hover:bg-purple-800 px-6 py-2.5 rounded-lg"
              >
                Apply
              </button>
            </div>
          </form>
        </div>



        {/* ---------------- MAIN CONTENT ---------------- */}
        <div className="max-w-[1220px] mx-auto py-5">

          {/* ---------------- Header ---------------- */}
          <div className="bg-slate-100 flex justify-between items-center py-3 px-4 rounded-t-md border border-slate-400">
            <div className="text-[26px] font-semibold">View Category</div>

            <div className="flex gap-3 items-center">

              {/* Filter Button */}
              <button
                onClick={() => setOpenFilter(true)}
                className="flex items-center gap-2 bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm border"
              >
                <FaFilter /> Filter
              </button>

              <button onClick={deleteRecords} disabled={selectedRecord.length == 0} className="text-white disabled:bg-[grey] disabled:cursor-not-allowed  cursor-pointer bg-purple-700 hover:bg-purple-800 text-sm px-5 py-2.5 rounded-lg">
                Delete All
              </button>

              <button onClick={changeStatus} disabled={selectedRecord.length == 0} className="text-white disabled:bg-[grey] disabled:cursor-not-allowed   cursor-pointer bg-purple-700 hover:bg-purple-800 text-sm px-5 py-2.5 rounded-lg">
                Change Status
              </button>
            </div>
          </div>

          {/* ---------------- TABLE ---------------- */}
          <div className="border border-t-0 rounded-b-md border-slate-400">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-700">
                <thead className="text-sm uppercase bg-gray-50 border-b">
                  <tr>
                    <th className="px-2 w-[100px] py-3"><input name="deleteCheck" id="purple-checkbox"
                      type="checkbox"
                      class="mr-2 w-4 h-4 cursor-pointer text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" value="" />    Select</th>
                    <th className="px-2 w-[60px] py-3">S. No.</th>
                    <th className="px-2  py-3">Name</th>
                    <th className="px-2 w-[100px]  py-3">Image</th>
                    <th className="px-2 w-[50px]  py-3">Order</th>
                    <th className="px-2 w-[100px]  py-3">Status</th>
                    <th className="px-2 w-[100px] py-3">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {/* Row 1 */}
                  <tr className="bg-white border-b">
                    <td className="px-2 py-4">
                      <input type="checkbox" onClick={() => SingleCheckSelect(1)} checked={selectedRecord.includes(1)} className="w-4 h-4 text-purple-600 cursor-pointer" />
                    </td>

                    <td className="px-2 py-4">1</td>
                    <td className="px-2 py-4">Red</td>
                    <td className="px-2 py-4">
                      <img className="w-[50px]" src="https://www.wscubetech.com/_next/image?url=https%3A%2F%2Fdeen3evddmddt.cloudfront.net%2Fimages%2Fhome-images%2Fjaipur-center.png&w=256&q=75" alt="" />

                    </td>
                    <td className="px-2 py-4">1</td>
                    <td className="px-2 py-4 text-green-600 font-bold">Active</td>

                    <td className="px-2 py-4  gap-3">
                      <Link>
                        <FaEdit className=" text-[gold] text-xl"/>
                      </Link>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="bg-white border-b">
                    <td className="px-2 py-4">
                      <input type="checkbox" onClick={() => SingleCheckSelect(1)} checked={selectedRecord.includes(1)} className="w-4 h-4 text-purple-600 cursor-pointer" />
                    </td>

                    <td className="px-2 py-4">1</td>
                    <td className="px-2 py-4">Red</td>
                    <td className="px-2 py-4">
                      <img className="w-[50px]" src="https://www.wscubetech.com/_next/image?url=https%3A%2F%2Fdeen3evddmddt.cloudfront.net%2Fimages%2Fhome-images%2Fjaipur-center.png&w=256&q=75" alt="" />

                    </td>
                    <td className="px-2 py-4">1</td>
                    <td className="px-2 py-4 text-red-600 font-bold">Inactive</td>

                    <td className="px-2 py-4  gap-3">
                      <Link>

                      <FaEdit className=" text-[gold] text-xl"/>
                        
                      </Link>
                    </td>
                  </tr>


                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
