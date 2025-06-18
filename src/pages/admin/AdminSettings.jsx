// import React, { useState, useEffect } from 'react';
// import { FiSave, FiMapPin, FiPhone, FiMail, FiDollarSign, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const AdminSettings = () => {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [settings, setSettings] = useState({
//     businessName: 'K. Vishwanathan Tex',
//     businessAddress: {
//       street: '',
//       city: '',
//       state: '',
//       pincode: ''
//     },
//     contactDetails: {
//       phone: '',
//       email: '',
//       whatsapp: ''
//     },
//     paymentDetails: {
//       gpayUpiId: ''
//     },
//     socialMedia: {
//       facebook: '',
//       instagram: '',
//       twitter: ''
//     }
//   });

//   useEffect(() => {
//     fetchSettings();
//   }, []);

//   const fetchSettings = async () => {
//     try {
//       const response = await axios.get('/settings');
//       setSettings(response.data);
//     } catch (error) {
//       console.error('Error fetching settings:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       await axios.put('/settings', settings);
//       toast.success('Settings updated successfully');
//     } catch (error) {
//       toast.error('Error updating settings');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleChange = (section, field, value) => {
//     setSettings(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }));
//   };

//   const handleDirectChange = (field, value) => {
//     setSettings(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Store Settings</h1>
//           <p className="text-gray-600 mt-2">Manage your business information and contact details</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Business Information */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
//               <FiMapPin className="mr-2 h-5 w-5" />
//               Business Information
//             </h2>

//             <div className="space-y-4">
//               <div>
//                 <label className="form-label">Business Name</label>
//                 <input
//                   type="text"
//                   value={settings.businessName}
//                   onChange={(e) => handleDirectChange('businessName', e.target.value)}
//                   className="form-input"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="form-label">Street Address</label>
//                   <input
//                     type="text"
//                     value={settings.businessAddress.street}
//                     onChange={(e) => handleChange('businessAddress', 'street', e.target.value)}
//                     className="form-input"
//                     placeholder="Street address"
//                   />
//                 </div>
//                 <div>
//                   <label className="form-label">City</label>
//                   <input
//                     type="text"
//                     value={settings.businessAddress.city}
//                     onChange={(e) => handleChange('businessAddress', 'city', e.target.value)}
//                     className="form-input"
//                     placeholder="City"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="form-label">State</label>
//                   <input
//                     type="text"
//                     value={settings.businessAddress.state}
//                     onChange={(e) => handleChange('businessAddress', 'state', e.target.value)}
//                     className="form-input"
//                     placeholder="State"
//                   />
//                 </div>
//                 <div>
//                   <label className="form-label">Pincode</label>
//                   <input
//                     type="text"
//                     value={settings.businessAddress.pincode}
//                     onChange={(e) => handleChange('businessAddress', 'pincode', e.target.value)}
//                     className="form-input"
//                     placeholder="Pincode"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Details */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
//               <FiPhone className="mr-2 h-5 w-5" />
//               Contact Details
//             </h2>

//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="form-label">Phone Number</label>
//                   <input
//                     type="tel"
//                     value={settings.contactDetails.phone}
//                     onChange={(e) => handleChange('contactDetails', 'phone', e.target.value)}
//                     className="form-input"
//                     placeholder="+91 9876543210"
//                   />
//                 </div>
//                 <div>
//                   <label className="form-label">WhatsApp Number</label>
//                   <input
//                     type="tel"
//                     value={settings.contactDetails.whatsapp}
//                     onChange={(e) => handleChange('contactDetails', 'whatsapp', e.target.value)}
//                     className="form-input"
//                     placeholder="+91 9876543210"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="form-label">Email Address</label>
//                 <input
//                   type="email"
//                   value={settings.contactDetails.email}
//                   onChange={(e) => handleChange('contactDetails', 'email', e.target.value)}
//                   className="form-input"
//                   placeholder="contact@kvt.com"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Payment Details */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
//               <FiDollarSign className="mr-2 h-5 w-5" />
//               Payment Details
//             </h2>

//             <div>
//               <label className="form-label">GPay UPI ID</label>
//               <input
//                 type="text"
//                 value={settings.paymentDetails.gpayUpiId}
//                 onChange={(e) => handleChange('paymentDetails', 'gpayUpiId', e.target.value)}
//                 className="form-input"
//                 placeholder="yourname@paytm"
//               />
//               <p className="text-sm text-gray-500 mt-1">
//                 This UPI ID will be displayed to customers for direct payments
//               </p>
//             </div>
//           </div>

//           {/* Social Media */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
//               <FiFacebook className="mr-2 h-5 w-5" />
//               Social Media Links
//             </h2>

//             <div className="space-y-4">
//               <div>
//                 <label className="form-label flex items-center">
//                   <FiFacebook className="mr-2 h-4 w-4" />
//                   Facebook Page
//                 </label>
//                 <input
//                   type="url"
//                   value={settings.socialMedia.facebook}
//                   onChange={(e) => handleChange('socialMedia', 'facebook', e.target.value)}
//                   className="form-input"
//                   placeholder="https://facebook.com/yourpage"
//                 />
//               </div>

//               <div>
//                 <label className="form-label flex items-center">
//                   <FiInstagram className="mr-2 h-4 w-4" />
//                   Instagram Profile
//                 </label>
//                 <input
//                   type="url"
//                   value={settings.socialMedia.instagram}
//                   onChange={(e) => handleChange('socialMedia', 'instagram', e.target.value)}
//                   className="form-input"
//                   placeholder="https://instagram.com/yourprofile"
//                 />
//               </div>

//               <div>
//                 <label className="form-label flex items-center">
//                   <FiTwitter className="mr-2 h-4 w-4" />
//                   Twitter Profile
//                 </label>
//                 <input
//                   type="url"
//                   value={settings.socialMedia.twitter}
//                   onChange={(e) => handleChange('socialMedia', 'twitter', e.target.value)}
//                   className="form-input"
//                   placeholder="https://twitter.com/yourprofile"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Save Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={saving}
//               className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {saving ? (
//                 <>
//                   <div className="spinner mr-2"></div>
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <FiSave className="mr-2 h-4 w-4" />
//                   Save Settings
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminSettings;


import React, { useState, useEffect } from 'react';
import { FiSave, FiMapPin, FiPhone, FiMail, FiDollarSign, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const defaultSettings = {
  businessName: '',
  businessAddress: {
    street: '',
    city: '',
    state: '',
    pincode: ''
  },
  contactDetails: {
    phone: '',
    email: '',
    whatsapp: ''
  },
  paymentDetails: {
    gpayUpiId: ''
  },
  socialMedia: {
    facebook: '',
    instagram: '',
    twitter: ''
  }
};

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/settings');
      // Merge fetched data with default structure to avoid undefined errors
      const safeSettings = {
        ...defaultSettings,
        ...response.data,
        businessAddress: {
          ...defaultSettings.businessAddress,
          ...response.data.businessAddress
        },
        contactDetails: {
          ...defaultSettings.contactDetails,
          ...response.data.contactDetails
        },
        paymentDetails: {
          ...defaultSettings.paymentDetails,
          ...response.data.paymentDetails
        },
        socialMedia: {
          ...defaultSettings.socialMedia,
          ...response.data.socialMedia
        }
      };
      setSettings(safeSettings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put('/settings', settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleDirectChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-gray-600 mt-2">Manage your business information and contact details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* === Business Info === */}
          <Section title="Business Information" icon={<FiMapPin />}>

            <Input label="Business Name" value={settings.businessName}
              onChange={(e) => handleDirectChange('businessName', e.target.value)} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Street Address" value={settings.businessAddress.street}
                onChange={(e) => handleChange('businessAddress', 'street', e.target.value)} />
              <Input label="City" value={settings.businessAddress.city}
                onChange={(e) => handleChange('businessAddress', 'city', e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="State" value={settings.businessAddress.state}
                onChange={(e) => handleChange('businessAddress', 'state', e.target.value)} />
              <Input label="Pincode" value={settings.businessAddress.pincode}
                onChange={(e) => handleChange('businessAddress', 'pincode', e.target.value)} />
            </div>

          </Section>

          {/* === Contact Info === */}
          <Section title="Contact Details" icon={<FiPhone />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Phone" value={settings.contactDetails.phone}
                onChange={(e) => handleChange('contactDetails', 'phone', e.target.value)} />
              <Input label="WhatsApp" value={settings.contactDetails.whatsapp}
                onChange={(e) => handleChange('contactDetails', 'whatsapp', e.target.value)} />
            </div>
            <Input label="Email" value={settings.contactDetails.email}
              onChange={(e) => handleChange('contactDetails', 'email', e.target.value)} />
          </Section>

          {/* === Payment Info === */}
          <Section title="Payment Details" icon={<FiDollarSign />}>
            <Input label="GPay UPI ID" value={settings.paymentDetails.gpayUpiId}
              onChange={(e) => handleChange('paymentDetails', 'gpayUpiId', e.target.value)}
              placeholder="yourname@paytm" />
            <p className="text-sm text-gray-500 mt-1">This UPI ID will be shown to customers.</p>
          </Section>

          {/* === Social Media === */}
          <Section title="Social Media Links" icon={<FiFacebook />}>
            <Input label="Facebook" icon={<FiFacebook />} value={settings.socialMedia.facebook}
              onChange={(e) => handleChange('socialMedia', 'facebook', e.target.value)} />
            <Input label="Instagram" icon={<FiInstagram />} value={settings.socialMedia.instagram}
              onChange={(e) => handleChange('socialMedia', 'instagram', e.target.value)} />
            <Input label="Twitter" icon={<FiTwitter />} value={settings.socialMedia.twitter}
              onChange={(e) => handleChange('socialMedia', 'twitter', e.target.value)} />
          </Section>

          {/* === Save Button === */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="spinner mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// === Helper Components ===

const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
      {icon}
      <span className="ml-2">{title}</span>
    </h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const Input = ({ label, value, onChange, placeholder = '', icon = null }) => (
  <div>
    <label className="form-label flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-input"
    />
  </div>
);

export default AdminSettings;
