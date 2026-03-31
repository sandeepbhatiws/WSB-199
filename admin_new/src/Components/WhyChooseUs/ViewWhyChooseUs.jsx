import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import iziToast from "izitoast";

export default function ViewWhyChooseUs() {

  const [openFilter, setOpenFilter] = useState(false);
  const [filterData, setFilterData] = useState({ title: "", order: "" });
  const [selectedRecord, setSelectedRecord] = useState([]);

  const applyFilter = (e) => {
    e.preventDefault();

    let obj = {
      title: e.target.title.value,
      order: e.target.order.value,
    };

    setFilterData(obj);

    iziToast.success({
      title: "Success",
      message: "Filter applied successfully!",
      position: "topRight",
    });
  };

  const clearFilter = () => {

    let obj = { title: "", order: "" };
    setFilterData(obj);

    iziToast.info({
      title: "Cleared",
      message: "All filters removed",
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
  };

  const changeStatus = () => {

    if (selectedRecord.length > 0) {

      iziToast.success({
        title: "Success",
        message: "Status changed successfully",
        position: "topRight",
      });

      setSelectedRecord([])

    } else {

      iziToast.error({
        title: "No Selection",
        message: "Please select at least one record.",
        position: "topRight",
      });

    }

  };

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
        message: "Do you really want to delete selected records?",
        position: "center",
        buttons: [
          [
            "<button><b>YES</b></button>",
            function (instance, toast) {

              setSelectedRecord([]);

              iziToast.success({
                title: "Deleted",
                message: "Selected records deleted successfully.",
                position: "topRight",
              });

              instance.hide({}, toast);
            },
            true,
          ],
          [
            "<button>NO</button>",
            function (instance, toast) {

              iziToast.info({
                title: "Cancelled",
                message: "Delete cancelled.",
                position: "topRight",
              });

              instance.hide({}, toast);

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

        {/* Breadcrumb */}

        <nav className="flex border-b-2 bg-white py-3 px-6">
          <ol className="inline-flex items-center space-x-2">

            <li>
              <a className="text-md font-medium text-gray-700 hover:text-blue-600">
                Home
              </a>
            </li>

            <li>
              / <a className="text-md font-medium text-gray-700 hover:text-blue-600">Why Choose Us</a>
            </li>

            <li>
              / <span className="text-md font-medium text-gray-500">View Records</span>
            </li>

          </ol>
        </nav>

        {/* FILTER */}

        <div
          className={`p-4 overflow-hidden transition-all duration-300 ease-out 
          ${openFilter ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >

          <form
            onSubmit={applyFilter}
            className="relative p-3 rounded-lg border w-full bg-white shadow-sm"
          >

            <button
              type="button"
              onClick={() => setOpenFilter(false)}
              className="absolute right-4 top-4 text-[28px] text-gray-600 hover:text-black"
            >
              <MdOutlineClose />
            </button>

            <p className="font-bold py-2 text-[20px]">FILTER</p>

            <div className="flex items-center gap-6">

              <div className="mb-5">

                <label className="block mb-2 font-medium">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={filterData.title}
                  onChange={(e) =>
                    setFilterData({ ...filterData, title: e.target.value })
                  }
                  placeholder="Enter title"
                  className="border-2 border-gray-300 shadow-sm w-full rounded-md px-2 py-1 text-[17px]"
                />

              </div>

              <div className="mb-5">

                <label className="block mb-2 font-medium">
                  Order
                </label>

                <input
                  type="number"
                  name="order"
                  min={1}
                  value={filterData.order}
                  onChange={(e) =>
                    setFilterData({ ...filterData, order: e.target.value })
                  }
                  className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3"
                  placeholder="Enter order"
                />

              </div>

            </div>

            <div className="flex items-center gap-3 pt-2">

              <button
                type="button"
                onClick={clearFilter}
                className="text-white bg-gray-500 hover:bg-gray-600 px-6 py-2.5 rounded-lg"
              >
                Clear
              </button>

              <button
                type="submit"
                className="text-white bg-purple-700 hover:bg-purple-800 px-6 py-2.5 rounded-lg"
              >
                Apply
              </button>

            </div>

          </form>

        </div>

        {/* MAIN */}

        <div className="p-4">

          <div className="bg-slate-100 flex justify-between items-center p-3 rounded-t-md border border-slate-400">

            <div className="text-[26px] font-semibold">
              View Why Choose Us
            </div>

            <div className="flex gap-3 items-center">

              <button
                onClick={() => setOpenFilter(true)}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm border"
              >
                <FaFilter /> Filter
              </button>

              <button
                onClick={deleteRecords}
                disabled={selectedRecord.length === 0}
                className="text-white disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple-700 hover:bg-purple-800 text-sm px-5 py-2.5 rounded-lg"
              >
                Delete All
              </button>

              <button
                onClick={changeStatus}
                disabled={selectedRecord.length === 0}
                className="text-white disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple-700 hover:bg-purple-800 text-sm px-5 py-2.5 rounded-lg"
              >
                Change Status
              </button>

            </div>

          </div>

          {/* TABLE */}

          <div className="border border-t-0 rounded-b-md border-slate-400">

            <div className="overflow-x-auto">

              <table className="w-full text-left text-gray-700">

                <thead className="text-sm uppercase bg-gray-50 border-b">

                  <tr>

                    <th className="px-2 w-[100px] py-3">
                      <input
                        type="checkbox"
                        className="mr-2 w-4 h-4 cursor-pointer text-purple-600 bg-gray-100 border-gray-300 rounded"
                      />
                      Select
                    </th>

                    <th className="px-2 py-3">S.No</th>
                    <th className="px-2 py-3">Title</th>
                    <th className="px-2 py-3">Image</th>
                    <th className="px-2 py-3">Order</th>
                    <th className="px-2 py-3">Status</th>
                    <th className="px-2 py-3">Action</th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="bg-white border-b">

                    <td className="px-2 py-4">
                      <input
                        type="checkbox"
                        onClick={() => SingleCheckSelect(1)}
                        checked={selectedRecord.includes(1)}
                        className="w-4 h-4 text-purple-600 cursor-pointer"
                      />
                    </td>

                    <td className="px-2 py-4">1</td>
                    <td className="px-2 py-4">Fast Service</td>

                    <td className="px-2 py-4">
                      <img
                        className="w-[50px]"
                        src="https://www.wscubetech.com/_next/image?url=https%3A%2F%2Fdeen3evddmddt.cloudfront.net%2Fimages%2Fhome-images%2Fjaipur-center.png&w=256&q=75"
                      />
                    </td>

                    <td className="px-2 py-4">1</td>

                    <td className="px-2 py-4 text-green-600 font-bold">
                      Active
                    </td>

                    <td className="px-2 py-4">
                      <Link>Edit</Link>
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}