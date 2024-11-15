import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import useGetAllDistrict from '../../../Hook/GetPublicDataHook/useGetAllDistrict';



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




const ShippingForm = ({setShippingAddress}) => {
  const [formData, setFormData] = useState({
    recipientName: '',
    contactNumber: '',
    district: '',
    area: '',
    address: '',
    postCode: '',
    deliveryType: 'Home',
  });

  const district = useGetAllDistrict({})

  const [subdistricts, setSubdistricts] = useState([]);

  const [errors, setErrors] = useState({});

  const axiosSecure = useAxiosSecure();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if(name === "district"){
        const subdistrictArray = district.find(district => district.district === value);
        setSubdistricts(subdistrictArray.subdistricts);
    }


    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.recipientName) formErrors.recipientName = 'Recipient Name is required';
    if (!formData.contactNumber) formErrors.contactNumber = 'Contact Number is required';
    if (!formData.district) formErrors.district = 'District/City selection is required';
    if (!formData.area) formErrors.area = 'Area/Thana/Upazilla selection is required';
    if (!formData.address) formErrors.address = 'Address is required';
    if (!formData.postCode) formErrors.postCode = 'Post Code is required';
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData, "formData")

    if (validateForm()) {

        // formData.userId = user._id;
        // formData.email = user.email;
      try {
        const response = await axiosSecure.post('/shipping', formData);

        console.log(response, "response")

        if(response.status === 200 || response.status === 201){
          localStorage.setItem('shippingAddress', JSON.stringify(response.data?.data));
          setShippingAddress(response.data?.data);
            setFormData({
              ...formData,
              recipientName: '',
              contactNumber: '',
              district: '',
              area: '',
              address: '',
              postCode: '',
              deliveryType: 'Home',
            });
            return;
        }

        
        
      } catch (error) {
        console.error('Error submitting form:', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error submitting the form.',
          icon: 'error',
          confirmButtonText: 'Ok',
          customClass: 'border-none',
          buttonsStyling: false,
        });
      }
    }
  };

  useEffect(() => {
    const stringShippingAddress = localStorage.getItem('shippingAddress');
    const localShippingAddress = stringShippingAddress ? JSON.parse(stringShippingAddress) : null;

    console.log(localShippingAddress, "localShippingAddress")
    if(localShippingAddress){
      formData.recipientName = localShippingAddress.recipientName;
      formData.contactNumber = localShippingAddress.contactNumber;
      formData.district = localShippingAddress.district;
      formData.area = localShippingAddress.area;
      formData.address = localShippingAddress.address;
      formData.postCode = localShippingAddress.postCode;
      formData.deliveryType = localShippingAddress.deliveryType;
    }
    
  }, [formData])

  return (
    <div className="w-full mx-auto p-6 border rounded-md mb-12 bg-white shadow-lg max-w-[600px]">
      <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recipient Name */}
          <div>
            <label className="block font-semibold mb-1">Recipient Name *</label>
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border p-2 w-full rounded"
            />
            {errors.recipientName && (
              <p className="text-red-500 text-sm mt-1">{errors.recipientName}</p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block font-semibold mb-1">Contact Number *</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="Mobile Number"
              className="border p-2 w-full rounded"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
            )}
          </div>

          {/* District/City */}
          <div>
            <label className="block font-semibold mb-1">District/City *</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Select District/City Name</option>
              {district.length > 0 && district.map((item, index) => (
                <option key={index} value={item.district}>{item.district}</option>
              ))}
              {/* Add more options as necessary */}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">{errors.district}</p>
            )}
          </div>

          {/* Area/Thana/Upazilla */}
          <div>
            <label className="block font-semibold mb-1">Area/Thana/Upazilla *</label>
            <select
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Area/Thana/Upazilla</option>
              {
                subdistricts.map((subdistrict, index) => (
                  <option key={index} value={subdistrict}>{subdistrict}</option>
                ))
              }
              {/* Add more options as necessary */}
            </select>
            {errors.area && (
              <p className="text-red-500 text-sm mt-1">{errors.area}</p>
            )}
          </div>

          {/* Post Code */}
          <div>
            <label className="block font-semibold mb-1">Post Code *</label>
            <input
              type="text"
              name="postCode"
              value={formData.postCode}
              onChange={handleInputChange}
              placeholder="Post Code"
              className="border p-2 w-full rounded"
            />
            {errors.postCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postCode}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="House / Building / Street"
              className="border p-2 w-full rounded"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Delivery Type */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Select Effective Delivery *</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="deliveryType"
                  value="Home"
                  checked={formData.deliveryType === 'Home'}
                  onChange={handleInputChange}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">Home</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="deliveryType"
                  value="Office"
                  checked={formData.deliveryType === 'Office'}
                  onChange={handleInputChange}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">Office</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
