import { Helmet } from "react-helmet-async";
import SectionTItle from "../../../Components/Shared/SectionTitle/SectionTItle";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

  const { register, handleSubmit, reset } = useForm();

  const handleAddClass = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(image_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        if (imageResponse.success) {
          const imgURL = imageResponse.data.display_url;
          const {
            className,
            instructorName,
            instructorEmail,
            available,
            price,
          } = data;

          const newClass = {
            class: className,
            name: instructorName,
            email: instructorEmail,
            image: imgURL,
            available,
            price: parseFloat(price),
            status: "pending",
          };
          axiosSecure.post("/class", newClass).then((response) => {
            if (response.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "New Class has been added successfuly",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Harmony Hill | Add Classes</title>
      </Helmet>
      <SectionTItle heading={"Add A New Class"}></SectionTItle>
      <form
        onSubmit={handleSubmit(handleAddClass)}
        className=" w-3/5 mx-auto space-y-3 bg-sky-400  rounded-md p-5"
      >
        <div className="flex gap-10 items-center justify-between">
          <div className="space-y-2 w-1/2">
            <label
              className="block  text-xl font-semibold "
              htmlFor="className"
            >
              Class Name
            </label>
            <input
              type="text"
              id="className"
              placeholder="Enter Class Name Here"
              className="border  rounded-md w-full p-3 border-sky-300 focus:outline-0 "
              {...register("className", { required: true })}
            />
          </div>
          <div className="space-y-2 w-1/2">
            <label
              className="block  text-xl font-semibold "
              htmlFor="classImage"
            >
              Class Image
            </label>
            <input
              type="file"
              id="classImage"
              className="border-4  rounded-md w-full p-2  border-sky-300 focus:outline-0 "
              {...register("classImage", { required: true })}
            />
          </div>
        </div>
        <div className="flex justify-between gap-10 py-2">
          <div className="space-y-2 w-1/2">
            <label
              className="block  text-xl font-semibold "
              htmlFor="instructorName"
            >
              Instructor Name
            </label>
            <input
              type="text"
              id="instructorName"
              defaultValue={user?.displayName}
              placeholder="Enter Instructor Name Here"
              className="border  rounded-md w-full p-3 border-sky-300 focus:outline-0 "
              {...register("instructorName", { required: true })}
            />
          </div>
          <div className=" space-y-2 w-1/2">
            <label
              className="block  text-xl font-semibold "
              htmlFor="instructorEmail"
            >
              Instructor Email
            </label>
            <input
              type="email"
              id="InstructorEmail"
              defaultValue={user?.email}
              placeholder="Enter Your Email Here"
              className="border  rounded-md w-full p-3 border-sky-300 focus:outline-0 "
              {...register("instructorEmail", { required: true })}
            />
          </div>
        </div>
        <div className="flex justify-between gap-10">
          <div className="space-y-2 w-1/2">
            <label
              className="block  text-xl font-semibold "
              htmlFor="available"
            >
              Available Seats
            </label>
            <input
              type="number"
              id="available"
              placeholder="Available Seats"
              className="border  rounded-md w-full p-3 border-sky-300 focus:outline-0 "
              {...register("available", { required: true })}
            />
          </div>
          <div className="space-y-2 w-1/2">
            <label className="block  text-xl font-semibold " htmlFor="price">
              Price
            </label>
            <input
              type="text"
              id="price"
              placeholder="Price"
              className="border  rounded-md w-full p-3 border-sky-300 focus:outline-0 "
              {...register("price", { required: true })}
            />
          </div>
        </div>
        <div className="py-4 ">
          <input
            type="submit"
            value="ADD CLASS"
            className=" btn w-full bg-emerald-400 focus:outline-0 border-emerald-400  "
          />
        </div>
      </form>
    </div>
  );
};

export default AddClasses;
