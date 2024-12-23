import { BiLeftArrow } from "react-icons/bi";
import useGetTermsCondition from "../../../../Hook/GetPublicDataHook/useGetTermsCondition";

function TermsCondition() {
  const content = useGetTermsCondition({});
  return (
    <>
      <div className=" py-8 pb-0 px-4  sm:px-6 lg:px-20 lg:mt-4">
        {/* <div className="max-w-[97%] mx-auto">
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div> */}

        <section className="terms-and-conditions text-sm md:text-xl text-gray-800">
          <div className="mx-auto">
            <h1 className="text-2xl md:text-4xl font-semibold mb-6">Terms & Conditions</h1>

            <p className="mb-9">
              Welcome to Multisports. Before placing an order, please read the terms & conditions carefully. Please note that Multisports Ltd. reserves all the rights to change the terms & conditions and it can be changed anytime.
            </p>

            <h2 className="text-xl md:text-2xl text-gray-600 font-semibold md:font-bold mb-4">Product Availability:</h2>
            <p className="mb-9">
              We inform you that our featured items have limited quantities. Most of the products displayed on our website are also available at our outlets till products are in stock. Because of the limited availability, the nature of production, and technical issues, stock cannot be updated automatically. Due to all these reasons, we currently do not have the opportunity to automatically update our stock, but we are working on developing automatic stock updates. At this moment, we are updating stock manually in a specific timely manner. In such cases, even if the product appears on the website, the delivery may be disrupted.
            </p>

            <h2 className="text-xl md:text-2xl text-gray-600 font-semibold md:font-bold mb-4">Pricing Policy:</h2>
            <p className="mb-9">
              The prices displayed on the website are quoted in Bangladeshi Currency (BDT), including VAT and tax. In the case of a pricing mismatch due to system malfunction, Multisports Ltd. reserves the right to cancel any order anytime. Please note, online and outlet product prices can sometimes differ according to our promotional activities.
            </p>

            <h2 className="text-xl md:text-2xl text-gray-600 font-semibold md:font-bold mb-4">Order Policy:</h2>
            <p className="mb-9">
              Once an order is placed by the customer, it will be confirmed by us within the next working day. After that, we will proceed with shipping, following our shipping policy. Multisports Ltd. reserves the right to cancel the order based on product availability, and in the case of advance payment, customers will be refunded following our refund policy. Once the order is confirmed, the customer cannot cancel the order for both Cash on Delivery (COD) and prepaid payment orders.
            </p>

            <h2 className="text-xl md:text-2xl text-gray-600 font-semibold md:font-bold mb-4">Shipping Policy:</h2>
            <p className="mb-9">
              We offer home delivery services within Dhaka city and outside Dhaka. Customers can also collect the products from the nearest courier hub. Maximum delivery time is 3-5 working days within Dhaka Metropolitan and 7-10 working days outside Dhaka (Delivery time may vary according to government policies, weather calamities, and unforeseen circumstances). As we engage with courier partners for product delivery, the delivery process is not entirely under our control. If the product is damaged or lost for any reason, we will take appropriate action considering the circumstances.
            </p>

            <h2 className="text-xl md:text-2xl text-gray-600 font-semibold md:font-bold mb-4">Cash On Delivery Policy:</h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-500 mb-2">Inside Dhaka</h3>
              <ul className="list-disc list-inside mb-4">
                <li>During delivery, customers must check the products (color, size, quality, and quantity) in front of the delivery agent. No complaints will be accepted after that.</li>
                <li>Customers can get a one-time free replacement or exchange facility. After that, if we send the correct product and the customer chooses to change or replace it at their wish, a delivery charge will apply each time.</li>
                <li>No return fee will be applicable if the customer returns the product after checking it in front of the delivery agent.</li>
                <li>Customers will get free home delivery service on purchases worth Tk 390 or more. A delivery charge of Tk 50 will apply for purchases below Tk 390.</li>
                <li>Delivery time: 3-5 working days.</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-500 mb-2">Outside Dhaka</h3>
              <ul className="list-disc list-inside mb-4">
                <li>Customers must check the products in front of the delivery agent. No complaints will be accepted after that.</li>
                <li>Customers can get a one-time free replacement or exchange facility. Additional replacements will incur delivery charges.</li>
                <li>Delivery charge: Tk 100 (may vary based on quantity and weight).</li>
                <li>Delivery time: 5-7 working days.</li>
              </ul>
            </div>

            <h2 className="text-xl md:text-2xl text-gray-600 font-semibold md:font-bold mb-4">Quality & Color Inconsistency:</h2>
            <p className="mb-9">
              We strive to provide the best quality products at reasonable prices. In case of any quality issues, we offer a 15-day exchange facility. Note that due to lighting, graphics, and monitor inconsistencies, colors may appear slightly different.
            </p>

            <h2 className="text-xl md:text-2xl text-gray-600 font-semibold md:font-bold mb-4">Refund Policy:</h2>
            <ul className="list-disc list-inside mb-4">
              <li>If we are unable to deliver the ordered product.</li>
              <li>If we mistakenly deliver different products without informing the customer.</li>
              <li>If the customer receives a faulty product.</li>
            </ul>
            <p className="mb-9">
              Refunds will be processed within 7-10 days for advance payments.
            </p>

            <h2 className="text-xl md:text-2xl text-gray-600 font-semibold md:font-bold mb-4">Data Policy:</h2>
            <p className="mb-9">
              We store customers’ basic data (name, mobile, email, address, etc.) for promotional purposes only. We assure that your data will not be shared without your permission.
            </p>

            <h2 className="text-xl md:text-2xl text-gray-600 font-semibold md:font-bold mb-4">Disclaimer:</h2>
            <p className="mb-9">
              Multisports Ltd. reserves the right to correct any errors or update information on the website at any time without prior notice. Please note that the content is presented "as is" without claims of accuracy.
            </p>

            <h2 className="text-xl md:text-2xl text-gray-600 font-semibold md:font-bold mb-4">Legal Information:</h2>
            <p className="mb-9">
              This website is owned and operated by Multisports Ltd. All content, including text, graphics, and images, is protected under Bangladeshi and international copyright laws. Unauthorized use is prohibited.
            </p>

            <h2 className="text-xl md:text-2xl text-gray-600 font-semibold md:font-bold mb-4">Correspondence & Communications:</h2>
            <p>
              Comments, feedback, and suggestions submitted through this website will be considered the property of Multisports Ltd. Your name will not be used in connection with any such materials without your permission or unless required by law.
            </p>
          </div>
        </section>


      </div>
    </>
  );
}

export default TermsCondition;
