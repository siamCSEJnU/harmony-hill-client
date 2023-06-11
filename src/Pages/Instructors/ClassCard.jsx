const ClassCard = ({ item }) => {
  console.log(item);
  return (
    <div className="bg-blue-100 p-3 rounded-md space-y-3 ">
      <img src={item.image} alt="classPhoto" className="w-96 rounded-md  " />
      <div className="space-y-2 font-semibold text-lg ">
        <h3 className="text-3xl font-bold text-center mb-5">{item.class}</h3>
        <p>Price : ${item.price}</p>
        <p>Available Seats : {item.available}</p>
      </div>
      <div className="text-center ">
        <button className="btn w-full bg-emerald-400 my-5">Check Out</button>
      </div>
    </div>
  );
};

export default ClassCard;
