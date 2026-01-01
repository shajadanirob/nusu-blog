'use client';
import { useCreateOrderMutation } from "@/redux/feature/order/orderApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

// Function to generate a unique order number
const generateOrderNumber = () => {
  const prefix = "HWA";
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
  return `${prefix}${randomNumber}`;
};

const Page = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryZone, setDeliveryZone] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedThana, setSelectedThana] = useState("");
  const [thanas, setThanas] = useState([]);

  // State for order details
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  // Retrieve cart items from local storage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDeliveryCharge = (district) => {
    let charge = district === "Dhaka City" ? 60 : 120; // Adjust delivery charges
    setDeliveryCharge(charge);
    setDeliveryZone(district); // Set the selected district
  };

  useEffect(() => {
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalCost(total + deliveryCharge);
  }, [cartItems, deliveryCharge]);

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedThana(""); // Reset thana selection
    handleDeliveryCharge(district); // Update delivery charge on district change

    
  };



  // Create order mutation
  const [createOrder] = useCreateOrderMutation();

  const handleOrderSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Generate a unique order number
    const OrderNumber = generateOrderNumber();

    // Constructing order details to match the Order interface
    const orderDetails = {
      userName: customerName,
      userMobile: customerPhone,
      userAddress: fullAddress,
      location: deliveryZone,
      feedback: instructions,
      status: "PENDING", // Set default status
      items: cartItems.map(item => ({
        productId: item._id,
        itemName: item.name,
        itemImage: item.imageOne,
        itemQuantity: item.quantity,
        itemPrice: Number(item.price), // Ensure itemPrice is a number
        productType: item.type || "default", // Ensure productType is provided
      })),
      totalPrice: totalCost,
      OrderNumber: OrderNumber, // Include the generated order number
    };
console.log(orderDetails);
    // Show loading toast
    const loadingToast = toast.loading("Placing your order...");

    try {
      const response = await createOrder(orderDetails).unwrap(); // Use unwrap to handle success and errors
      console.log(response); // Debug: Check response
      Swal.fire({
        text: `Thank You ${customerName}`,
        title: `Order placed successfully! Your Order Number is: ${OrderNumber}`,
        imageUrl: "https://i.ibb.co.com/DYFyKW7/success.png",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
      // Show success message with order number
      // Clear the cart after order submission
      setCartItems([]);
      localStorage.setItem("cart", JSON.stringify([]));
    } catch (error) {
      console.error("Failed to place order: ", error);
      toast.error("Failed to place order, please try again."); // Show error message
    } finally {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-10">
      <div className="sm:flex shadow-md my-10">
        {/* Billing Details */}
        <div className="lg:w-full w-full px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">বিলিং ডিটেইল</h1>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5" onSubmit={handleOrderSubmit}>
            <div>
              <label className="block text-sm font-medium">আপনার নাম লিখুন *</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg mt-1"
                placeholder="সম্পূর্ণ নামটি লিখুন"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">আপনার মোবাইল নাম্বারটি লিখুন *</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg mt-1"
                placeholder="১১ ডিজিটের মোবাইল নাম্বারটি লিখুন"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="w-full block text-sm font-medium">জেলা সিলেক্ট করুন *</label>
              <select
                className="w-full border border-gray-300 p-2 rounded-lg mt-1"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                required
              >
                <option value="">Select</option>
                <option value="Dhaka City">Dhaka City</option>
                <option value="Outside Dhaka">Outside Dhaka</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">সম্পূর্ণ ঠিকানা *</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg mt-1"
                placeholder="রোড নাম/নাম্বার, বাড়ী নাম/নাম্বার, ফ্ল্যাট নাম্বার"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">নির্দেশনা</label>
              <textarea
                className="w-full border border-gray-300 p-2 rounded-lg mt-1"
                placeholder="আপনার পেমেন্ট কেন রিফান্ড রিকোয়েস্ট ফাঁকেন, এখানে উল্লেখ করতে পারেন"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg md:col-span-2 ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={cartItems.length === 0}
            >
              অর্ডার সম্পন্ন করুন
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-full w-full px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">অর্ডার সারাংশ</h1>
          </div>
          <div className="mt-5">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center">
                  <Image src={item.imageOne} alt={item.name} width={50} height={50} />
                  <div className="ml-4">
                    <h2 className="text-xs md:text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm">৳ {item.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    -
                  </button>
                  <p className="mx-2">{item.quantity}</p>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    disabled={item.quantity === 10} // Maximum quantity limit
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Subtotal</h2>
              <p className="text-lg">৳ {totalCost - deliveryCharge}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Delivery Charge</h2>
              <p className="text-lg">৳ {deliveryCharge}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Total</h2>
              <p className="text-lg">৳ {totalCost}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
