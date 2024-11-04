"use client";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useState } from "react";
import CartItemComponent from "./CartItemComponent";
import Link from "next/link";


const bangladeshDistricts = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barishal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chapai Nawabganj",
  "Chattogram",
  "Chuadanga",
  "Cox's Bazar",
  "Cumilla",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon"
];


const bangladeshSubdistricts = [
  {
    district: "Bagerhat",
    subdistricts: ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"]
  },
  {
    district: "Bandarban",
    subdistricts: ["Bandarban Sadar", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi", "Alikadam"]
  },
  {
    district: "Barguna",
    subdistricts: ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata", "Taltali"]
  },
  {
    district: "Barishal",
    subdistricts: ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Barishal Sadar", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"]
  },
  {
    district: "Bhola",
    subdistricts: ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"]
  },
  {
    district: "Bogra",
    subdistricts: ["Adamdighi", "Bogra Sadar", "Dhunat", "Dupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatala"]
  },
  {
    district: "Brahmanbaria",
    subdistricts: ["Akhaura", "Bancharampur", "Brahmanbaria Sadar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail", "Ashuganj"]
  },
  {
    district: "Chandpur",
    subdistricts: ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Dakshin", "Matlab Uttar", "Shahrasti"]
  },
  {
    district: "Chapai Nawabganj",
    subdistricts: ["Bholahat", "Gomastapur", "Nachole", "Nawabganj Sadar", "Shibganj"]
  },
  {
    district: "Chattogram",
    subdistricts: ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Chattogram Sadar", "Fatikchhari", "Hathazari", "Lohagara", "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda"]
  },
  {
    district: "Chuadanga",
    subdistricts: ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"]
  },
  {
    district: "Cox's Bazar",
    subdistricts: ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"]
  },
  {
    district: "Cumilla",
    subdistricts: ["Barura", "Brahmanpara", "Burichang", "Chandina", "Cumilla Adarsha Sadar", "Cumilla Sadar Dakshin", "Daudkandi", "Debidwar", "Homna", "Laksam", "Meghna", "Monohorgonj", "Muradnagar", "Nangalkot", "Titas"]
  },
  {
    district: "Dhaka",
    subdistricts: ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"]
  },
  {
    district: "Dinajpur",
    subdistricts: ["Birampur", "Birganj", "Birol", "Bochaganj", "Chirirbandar", "Dinajpur Sadar", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"]
  },
  {
    district: "Faridpur",
    subdistricts: ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"]
  },
  {
    district: "Feni",
    subdistricts: ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Fulgazi", "Parshuram", "Sonagazi"]
  },
  {
    district: "Gaibandha",
    subdistricts: ["Fulchhari", "Gaibandha Sadar", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"]
  },
  {
    district: "Gazipur",
    subdistricts: ["Gazipur Sadar", "Kaliganj", "Kapasia", "Sreepur", "Tongi"]
  },
  {
    district: "Gopalganj",
    subdistricts: ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"]
  },
  {
    district: "Habiganj",
    subdistricts: ["Ajmiriganj", "Bahubal", "Baniachang", "Chunarughat", "Habiganj Sadar", "Lakhai", "Madhabpur", "Nabiganj", "Shaistaganj"]
  },
  {
    district: "Jamalpur",
    subdistricts: ["Bakshiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"]
  },
  {
    district: "Jashore",
    subdistricts: ["Abhaynagar", "Bagherpara", "Chaugachha", "Jashore Sadar", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"]
  },
  {
    district: "Jhalokathi",
    subdistricts: ["Jhalokathi Sadar", "Kathalia", "Nalchity", "Rajapur"]
  },
  {
    district: "Jhenaidah",
    subdistricts: ["Harinakunda", "Jhenaidah Sadar", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"]
  },
  {
    district: "Joypurhat",
    subdistricts: ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"]
  },
  {
    district: "Khagrachari",
    subdistricts: ["Dighinala", "Khagrachari Sadar", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"]
  },
  {
    district: "Khulna",
    subdistricts: ["Batiaghata", "Dacope", "Dumuria", "Koyra", "Paikgachha", "Phultala", "Rupsa", "Terokhada", "Khulna Sadar"]
  },
  {
    district: "Kishoreganj",
    subdistricts: ["Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Katiadi", "Kishoreganj Sadar", "Karimganj", "Kuliarchar", "Mithamain", "Nikli", "Pakundia", "Tarail"]
  },
  {
    district: "Kurigram",
    subdistricts: ["Bhurungamari", "Char Rajibpur", "Chilmari", "Kurigram Sadar", "Nageshwari", "Phulbari", "Rajarhat", "Raomari", "Ulipur"]
  },
  {
    district: "Kushtia",
    subdistricts: ["Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Kushtia Sadar", "Mirpur"]
  },
  {
    district: "Lakshmipur",
    subdistricts: ["Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati", "Kamalnagar"]
  },
  {
    district: "Lalmonirhat",
    subdistricts: ["Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"]
  },
  {
    district: "Madaripur",
    subdistricts: ["Madaripur Sadar", "Kalkini", "Rajoir", "Shibchar"]
  },
  {
    district: "Magura",
    subdistricts: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"]
  },
  {
    district: "Manikganj",
    subdistricts: ["Daulatpur", "Ghior", "Harirampur", "Manikganj Sadar", "Saturia", "Shivalaya", "Singair"]
  },
  {
    district: "Meherpur",
    subdistricts: ["Gangni", "Meherpur Sadar", "Mujibnagar"]
  },
  {
    district: "Moulvibazar",
    subdistricts: ["Barlekha", "Juri", "Kamalganj", "Kulaura", "Moulvibazar Sadar", "Rajnagar", "Sreemangal"]
  },
  {
    district: "Munshiganj",
    subdistricts: ["Gazaria", "Lohajang", "Munshiganj Sadar", "Sirajdikhan", "Sreenagar", "Tongibari"]
  },
  {
    district: "Mymensingh",
    subdistricts: ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Mymensingh Sadar", "Muktagachha", "Nandail", "Phulpur", "Trishal"]
  },
  {
    district: "Naogaon",
    subdistricts: ["Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mahadebpur", "Naogaon Sadar", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"]
  },
  {
    district: "Narail",
    subdistricts: ["Kalia", "Lohagara", "Narail Sadar"]
  },
  {
    district: "Narayanganj",
    subdistricts: ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon"]
  },
  {
    district: "Narsingdi",
    subdistricts: ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"]
  },
  {
    district: "Natore",
    subdistricts: ["Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Naldanga", "Natore Sadar", "Singra"]
  },
  {
    district: "Netrokona",
    subdistricts: ["Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua", "Madan", "Mohanganj", "Netrokona Sadar", "Purbadhala"]
  },
  {
    district: "Nilphamari",
    subdistricts: ["Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar", "Saidpur"]
  },
  {
    district: "Noakhali",
    subdistricts: ["Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Kabirhat", "Noakhali Sadar", "Senbagh", "Subarnachar"]
  },
  {
    district: "Pabna",
    subdistricts: ["Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Pabna Sadar", "Santhia", "Sujanagar"]
  },
  {
    district: "Panchagarh",
    subdistricts: ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"]
  },
  {
    district: "Patuakhali",
    subdistricts: ["Bauphal", "Dashmina", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"]
  },
  {
    district: "Pirojpur",
    subdistricts: ["Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Pirojpur Sadar", "Nesarabad (Swarupkathi)", "Zianagar"]
  },
  {
    district: "Rajbari",
    subdistricts: ["Baliakandi", "Goalandaghat", "Pangsha", "Rajbari Sadar", "Kalukhali"]
  },
  {
    district: "Rajshahi",
    subdistricts: ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohonpur", "Paba", "Puthia", "Tanore", "Rajshahi Sadar"]
  },
  {
    district: "Rangamati",
    subdistricts: ["Baghaichhari", "Barkal", "Juraichhari", "Kaptai", "Kawkhali", "Langadu", "Nannerchar", "Rajasthali", "Rangamati Sadar"]
  },
  {
    district: "Rangpur",
    subdistricts: ["Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirgasa", "Rangpur Sadar", "Taraganj"]
  },
  {
    district: "Satkhira",
    subdistricts: ["Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Satkhira Sadar", "Shyamnagar", "Tala"]
  },
  {
    district: "Shariatpur",
    subdistricts: ["Bhedarganj", "Damudya", "Gosairhat", "Naria", "Shariatpur Sadar", "Zajira"]
  },
  {
    district: "Sherpur",
    subdistricts: ["Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"]
  },
  {
    district: "Sirajganj",
    subdistricts: ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullahpara"]
  },
  {
    district: "Sunamganj",
    subdistricts: ["Bishwamvarpur", "Chhatak", "Derai", "Dharampasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sulla", "Sunamganj Sadar", "Tahirpur", "Shantiganj"]
  },
  {
    district: "Sylhet",
    subdistricts: ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Sylhet Sadar", "Zakiganj", "Dakshin Surma"]
  },
  {
    district: "Tangail",
    subdistricts: ["Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"]
  },
  {
    district: "Thakurgaon",
    subdistricts: ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"]
  }
];






const Cart = ({ isShow, setIsShow }) => {
  const { cartItems, removeFromCart, updateCartQuantity, totalPrice } =
    useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const discount = 17.4;


  return (
    <div
      className={`w-[550px] h-screen bg-white rounded-lg shadow-lg p-4 absolute top-0 right-0 z-50 transition-all duration-500 pr-10 pl-5 flex flex-col ${
        isShow ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="text-sm text-gray-500 mb-2 border-b border-gray-300">
        your shopping cart
      </div>

      <div
        className="border-b pb-4 h-full overflow-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        {cartItems?.length > 0 ?
          cartItems?.map((item) => (
            <CartItemComponent
              item={item}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
              key={item._id}
              isCartArea={true}
            />
          )): 

          <div className="flex flex-col items-center justify-center gap-5 h-full w-full">
          <h3>Empty Cart</h3>
          <p>Please Add Product to View</p>
          <Link href={"/products/all"} className="bg-blue-500 text-white hover:bg-neutral-800 rounded-lg py-2 px-5">Go To Shop</Link>
          </div>
          
          }
      </div>

      <div className="border-b pb-4 mt-auto pt-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>subtotal</span>
          <span className="font-medium">${totalPrice}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>discounts</span>
          <span className="font-medium">-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>shipping</span>
          <span className="font-medium">free</span>
        </div>
      </div>

      <div className="border-b pb-4 mt-4">
        <div className="flex justify-between text-lg font-bold">
          <span>your total</span>
          <span>${totalPrice - discount}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4 text-center">
        <Link href={"/cart"} className="col-span-2" onClick={() => setIsShow(false)}>
        <button className="  text-sm border border-black rounded-md px-5 py-2 w-full">
          View Cart
        </button>
        </Link>

        <Link href={"/checkout"} className="col-span-2" onClick={() => setIsShow(false)}>
        <button
          type="button"
          className="px-4 py-2 bg-black text-white rounded w-full"
          
        >
          
          Checkout
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
