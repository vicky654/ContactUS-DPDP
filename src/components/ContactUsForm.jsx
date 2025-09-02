import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ConsentModal from "../Modals/ConsentModal";
import { callApi } from "../utils/callApi";
import { FaLinkedin, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ThanksPage from "./ThanksPage";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ContactForm() {
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [templateText, setTemplateText] = useState("");
  const [selectedLang, setSelectedLang] = useState("en");

  const navigate = useNavigate();

   const apiUrl = import.meta.env.VITE_API_URL;
  // console.log(apiUrl, "apiUrl")

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number")
      .required("Contact is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    topic: Yup.string().required("Please select a topic"),
    message: Yup.string().required("Message is required"),
    otp: showOtp
      ? Yup.string().length(6, "OTP must be 6 digits")
      : Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      contact: "",
      email: "",
      topic: "",
      message: "",
      otp: "",
    },
    validationSchema,
    

    onSubmit: async (values, { resetForm, setValues }) => {
      if (!showOtp) {
        try {
          setLoading(true);
          const response = await callApi(
            `${apiUrl}/create_consent`,
            "POST", // ✅ still POST but params go in query string
            {
              name: values.fullName,
              department: "careers",
              email: values.email,
              phone: values.contact,
              message: values.message,
            }
          );

          if (response?.otp) {
            alert("OTP sent successfully to your email");
            setData(response);
            setShowOtp(true);
            setValues({ ...values, otp: "" });
          } else {
            alert("Invalid Email. Please try again.");
          }
        } catch (err) {
          alert(err.message || "Something went wrong!");
        } finally {
          setLoading(false);
        }
      } else {
        if (!values.otp || values.otp.length !== 6) {
          alert("OTP must be 6 digits");
          return;
        }

        if (data?.otp !== values.otp) {
          alert("OTP did not match. Try again!");
          return;
        }

        await openConsentModal(values);
      }
    },
  });

  const openConsentModal = async (values) => {
    try {
      setLoading(true);
      const response = await callApi(
        `${apiUrl}/get/template_details`,
        "GET",
        { department_name: "Careers" }
      );
      setTemplateText(response?.data || "No template found");
      setShowConsentModal(true);
    } catch (error) {
      alert(error.message || "Failed to load consent template");
    } finally {
      setLoading(false);
    }
  };

  const handleConsent = async () => {
    try {
      setLoading(true);
      const response = await callApi(
        `${apiUrl}/create_consent`,
        "POST",
        {
          name: formik.values.fullName,
          department: "careers",
          email: formik.values.email,
          phone: formik.values.contact,
          otp: formik.values.otp,
        }
      );

      if (
        response?.code === 200 &&
        response?.data?.message !== "OTP not matched"
      ) {
        // alert("Consent Given. Thank you!");
        navigate("/thanks-page");

        setShowOtp(false);
        setShowConsentModal(false);
        formik.resetForm();
      } else {
        alert(response?.data?.message || "OTP verification failed");
      }
    } catch (error) {
      alert(error.message || "Consent submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="bg-white shadow-md rounded-2xl flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden">
          {/* LEFT SIDE */}
          <div className="bg-[#0B113C] text-white w-full lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Contact Us</h2>
              <p className="text-sm mb-6">
                DPD Consultants (A Privacyium Tech Pvt. Ltd. Company)
                <br />
                Have a query? Feel free to contact our privacy experts
              </p>
              <div className="space-y-3 text-md">
                <p>📞 1800-5311-777</p>
                <p>✉️ info@dpdpconsultants.com</p>
                <p>For consultations and product demo</p>
                <p className="font-semibold">
                  Fill out your details to be contacted
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-sm font-semibold mb-2">Follow us:</p>
              <div className="flex space-x-5 text-2xl">
                <a
                  href="https://www.linkedin.com/company/dpdpconsultants/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.youtube.com/@DPDPConsultants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition-colors"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://x.com/socialdpdp43979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transition-colors"
                >
                  <FaXTwitter />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="w-full lg:w-2/3 p-6 sm:p-8">
            <h2 className="text-lg font-bold mb-6">
               DPDPA Compliance Services | Data Privacy Experts |
              DPD Consultants
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Enter Your FullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>

              {/* Contact + Email */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="contact"
                    type="text"
                    placeholder="Enter Your Contact Number"
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.contact && formik.errors.contact && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.contact}
                    </p>
                  )}
                </div>

                <div className="w-full sm:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic <span className="text-red-500">*</span>
                </label>
                <select
                  name="topic"
                  value={formik.values.topic}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Topic</option>
                  <option value="compliance_evaluation">
                    Compliance Evaluation & Risk Assessment
                  </option>
                  <option value="policy_development">
                    Assist in Policy Development
                  </option>
                  <option value="training_education">
                    Training & Education Programs
                  </option>
                  <option value="data_audit_analysis">
                    Comprehensive Data Audit & Analysis
                  </option>
                  <option value="incident_response">
                    Incident Response Planning
                  </option>
                  <option value="live_demos">Live Demonstrations</option>
                  <option value="gap_assessment">
                    Gap Assessment & Remediation
                  </option>
                  <option value="dpo_service">
                    Data Protection Officer as a Service
                  </option>
                  <option value="contract_review">Contract Review</option>
                  <option value="consulting_advisory">
                    Consulting, Advisory, and Audit
                  </option>
                </select>
                {formik.touched.topic && formik.errors.topic && (
                  <p className="text-red-500 text-sm">{formik.errors.topic}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Enter Your Message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.message}
                  </p>
                )}
              </div>

              {/* OTP */}
              {showOtp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="otp"
                    type="text"
                    placeholder="Enter Your OTP"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                  {formik.touched.otp && formik.errors.otp && (
                    <p className="text-red-500 text-sm">{formik.errors.otp}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0B113C] text-white py-2 rounded-lg hover:bg-[#0b113ca8] hover:cursor-pointer transition disabled:opacity-50"
              >
                {loading ? "Processing..." : showOtp ? "Submit OTP" : "Submit"}
              </button>
            </form>
          </div>
        </div>

        {/* ✅ Consent Modal */}
        <ConsentModal
          visible={showConsentModal}
          onClose={() => setShowConsentModal(false)}
          onAgree={handleConsent}
          lang={selectedLang}
          setLang={setSelectedLang}
          templateText={templateText}
        />
      </div>
      <Footer/>
    </>
  );
}
