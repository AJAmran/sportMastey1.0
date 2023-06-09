import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";

const imgToken = import.meta.env.VITE_IMG_TOKEN;

const AddCalsses = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const img_url = `https://api.imgbb.com/1/upload?key=${imgToken}`;

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.classImage[0]);
    fetch(img_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const imgURL = imgData.data.display_url;
          const {
            className,
            instructorName,
            instructorEmail,
            availableSeats,
            price,
          } = data;
          const classInfo = {
            className,
            instructorName,
            instructorEmail,
            availableSeats: parseFloat(availableSeats),
            price: parseFloat(price),
            image: imgURL,
            status: "pending"
          };
          console.log(classInfo);
          fetch('http://localhost:5000/classes', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(classInfo)
          })
          .then(res => res.json())
          .then(cls =>{
            if(cls.insertedId
              ){
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Class added Successfully",
                  showConfirmButton: false,
                  timer: 1000,
                });
              }
          })
        }
      });
  };

  return (
    <div className="ml-64">
      <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-md border-2 border-gray-800 mt-4 ml"
    >
      <h2 className="text-2xl mb-6 text-center">Add Class</h2>

      <div className="mb-4">
        <label htmlFor="className" className="text-gray-800 block">
          Class name:
        </label>
        <input
          {...register("className")}
          id="className"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="classImage" className="text-gray-800 block">
          Class Image:
        </label>
        <input
          {...register("classImage")}
          id="classImage"
          type="file"
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="instructorName" className="text-gray-800 block">
          Instructor name:
        </label>
        <input
          {...register("instructorName")}
          id="instructorName"
          value={user.displayName} // Set the value from the user context
          readOnly // Make the input read-only
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="instructorEmail" className="text-gray-800 block">
          Instructor email:
        </label>
        <input
          {...register("instructorEmail")}
          id="instructorEmail"
          value={user.email} // Set the value from the user context
          readOnly // Make the input read-only
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="availableSeats" className="text-gray-800 block">
          Available seats:
        </label>
        <input
          type="number"
          {...register("availableSeats")}
          id="availableSeats"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="text-gray-800 block">
          Price:
        </label>
        <input
          type="number"
          step="0.01"
          {...register("price")}
          id="price"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 rounded-md w-full"
      >
        Add
      </button>
    </form>
    </div>
  );
};

export default AddCalsses;
