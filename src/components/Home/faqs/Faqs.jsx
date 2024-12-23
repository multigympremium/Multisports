import useGetAllFaq from "../../../Hook/GetPublicDataHook/useGetAllFaq";

const Faqs = () => {
  // const content = useGetAllFaq({});
  return (
    <>
      <div className=" mx-auto py-8 pb-1 px-4  sm:px-6 lg:px-8">
        <h2 className="text-center md:text-3xl font-semibold mb-6 text-lg md:mb-12">Frequently Asked Questions (FAQ)</h2>
        {/* <div className=" mx-auto space-y-8">
          {content.length > 0 &&
            content.map((item, index) => (
              <div
                tabIndex={index}
                className="collapse collapse-arrow border-base-300 border"
                key={index}
              >
                <div className="collapse-title text-xl font-medium">
                  {item.question}
                </div>
                <div className="collapse-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {faqData.map((item, index) => (
            <div
              tabIndex={index}
              className="collapse rounded-md collapse-arrow border-base-300 border"
              key={index}
            >
              <div className="collapse-title md:text-xl font-medium">
                {item.question}
              </div>
              <div className="collapse-content">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const faqData = [
  { question: "What is Multisports?", answer: "Multisports is an e-commerce platform dedicated to providing high-quality sports equipment, apparel, and accessories. We cater to athletes of all levels, from beginners to professionals, offering a wide range of products to meet diverse sporting needs." },
  { question: "How can I place an order?", answer: "Placing an order on Multisports is simple and convenient. Browse our catalog to find the products you love, add them to your cart, and proceed to checkout. You will be guided through a secure payment process to complete your purchase." },
  { question: "What payment methods do you accept?", answer: "We accept various payment methods to make shopping easy for you. These include all major credit and debit cards, PayPal, and other secure payment gateways. Your transactions are protected with advanced encryption technology." },
  { question: "How do I track my order?", answer: "After your order is shipped, you will receive a confirmation email containing a tracking number and a link to the courier service's website. You can use this information to monitor your package's status and estimated delivery date." },
  { question: "What is your return policy?", answer: "We strive to ensure customer satisfaction with every purchase. If you are not completely satisfied, we offer a hassle-free 30-day return policy. Please make sure the item is unused and in its original condition with all tags and packaging intact." },
  { question: "Do you ship internationally?", answer: "Yes, Multisports proudly serves customers worldwide. Our international shipping options vary by destination, and fees are calculated at checkout. Delivery times depend on the shipping method and location, but we work to ensure timely delivery." },
  { question: "Can I cancel my order?", answer: "Yes, you can cancel your order within 24 hours of placement or before it has been shipped. To cancel, please contact our customer support team as soon as possible, and they will assist you in processing your request." },
  { question: "How do I contact customer support?", answer: "Our customer support team is here to help! You can reach us via our contact form on the website, send us an email, or call our dedicated hotline. Our friendly representatives are available to assist with any inquiries or concerns you may have." },
  { question: "Are there discounts for bulk purchases?", answer: "Yes, we offer special discounts for bulk orders to support schools, teams, and organizations. Please contact our sales department with your requirements, and we will provide a tailored quote for your bulk purchase." },
  { question: "Do you offer gift cards?", answer: "Absolutely! Multisports gift cards are a perfect choice for sports enthusiasts. They are available in various denominations and can be redeemed for any product on our website, making them an ideal gift for any occasion." },
  { question: "What brands do you carry?", answer: "We are proud to partner with leading sports brands such as Nike, Adidas, Puma, Under Armour, and many others. Our extensive collection ensures you have access to the best quality products for your sporting needs." },
  { question: "Is my personal information secure on your website?", answer: "Your security is our top priority. We utilize advanced encryption technology and secure payment gateways to protect your personal and financial information. Shop with confidence knowing your data is safe with us." },
  { question: "Do you offer installation services for sports equipment?", answer: "Yes, we provide professional installation services for selected sports equipment. Our team ensures that your equipment is set up correctly and safely, so you can focus on enjoying your sports activities." },
  { question: "What kind of warranties do you provide?", answer: "We stand behind the quality of our products. Most items come with a manufacturer’s warranty, and additional warranty options may be available at checkout for added peace of mind." },
  { question: "Can I customize products for my team?", answer: "Yes, we offer customization services for team uniforms and equipment. You can add your team logo, player names, and numbers to create a personalized look." },
  { question: "How do I know if a product is in stock?", answer: "Product availability is displayed on each product page. If an item is out of stock, you can opt to receive notifications when it becomes available again." },
  { question: "Do you have a loyalty program?", answer: "Yes, our loyalty program rewards customers with points for each purchase. Points can be redeemed for discounts on future orders. Join today to start earning rewards." },
  { question: "Can I schedule a delivery?", answer: "We offer scheduled delivery options for your convenience. Choose your preferred date and time at checkout, and our team will ensure timely delivery." },
  { question: "Do you sell refurbished equipment?", answer: "Yes, we offer a selection of certified refurbished equipment that meets our high-quality standards. These items are thoroughly inspected and come with a warranty." },
  { question: "How can I stay updated on new arrivals and offers?", answer: "Subscribe to our newsletter and follow us on social media to stay informed about the latest products, exclusive deals, and upcoming promotions." },
  { question: "Can I get help choosing the right product?", answer: "Our customer support team is happy to assist you in finding the right product for your needs. Contact us via live chat, email, or phone for personalized recommendations." },
  { question: "What should I do if I receive a damaged item?", answer: "If your item arrives damaged, please contact our customer support team immediately. We will arrange for a replacement or refund and cover any associated shipping costs." },
  { question: "Are there eco-friendly products available?", answer: "Yes, we are committed to sustainability and offer a variety of eco-friendly products. Look for the eco-friendly badge on product pages to identify these items." },
  { question: "Can I recycle old equipment through your store?", answer: "Yes, we offer recycling programs for selected sports equipment. Contact us for more information on how to responsibly recycle your old gear." }
];


export default Faqs;
