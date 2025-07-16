import Breadcrumb from "@/components/ui/Breadcrumb";
import Map from "@/components/map/Map";

const ContactPage = () => {
  return (
    <>
      <Breadcrumb title="Contact Us" backgroundImageUrl="/images/banner1.jpg" />

      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-gray-800 font-jost mb-4">
                Send Us a Message
              </h2>
              <p className="text-gray-500 mb-8">
                Have a question or need to schedule a service? Fill out the form
                below and we&apos;ll get back to you as soon as possible.
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-customeRed focus:border-customeRed"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-4 border border-gray-300 rounded-md focus:ring-customeRed focus:border-customeRed"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-4 border border-gray-300 rounded-md focus:ring-customeRed focus:border-customeRed"
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full p-4 border border-gray-300 rounded-md focus:ring-customeRed focus:border-customeRed"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-customeRed text-white font-bold py-4 px-6 rounded-md hover:bg-red-700 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Column: Contact Details & Map */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 font-jost mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <i className="flaticon-pin text-customeRed text-4xl mt-1"></i>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Our Address
                      </h3>
                      <p className="text-gray-500">
                        Lot 4127, Jalan Rizab Yaakob, Kampung Bukit Hijau, 45800
                        Kuala Selangor, Selangor, Malaysia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <i className="flaticon-email text-customeRed text-4xl mt-1"></i>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Email Us
                      </h3>
                      <a
                        href="mailto:abegarage@gmail.com"
                        className="text-gray-500 hover:text-customeRed"
                      >
                        abegarage@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <i className="flaticon-call text-customeRed text-4xl mt-1"></i>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Call Us
                      </h3>
                      <p className="text-gray-500">(319) 555-0123</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-80 rounded-md overflow-hidden shadow-lg">
                <Map />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
