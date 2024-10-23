import nodemailer from 'nodemailer'

const adminEmail = process.env.ADMIN_EMAIL;
const adminName = process.env.ADMIN_NAME;
const host = process.env.ADMIN_HOST;
const adminPassword = process.env.ADMIN_PASSWORD;
const port = EMAIL_PORT;

export const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: true,
  auth: {
    user: adminEmail,
    pass: adminPassword
  }
});

export const mailOptions = {
  from: adminName,
  to: adminName,
};

// const mailersend = require('mailersend')({
//   apiKey: MAILER_API,
// });

// const sendOrderEmail = async (orderData) => {
//   const orderId = generateUniqueId(); // implement a unique ID generator
//   const { name, email, phone, state } = orderData;
//   const cartItems = cartItems.map((item) => ({
//     name: item.name,
//     quantity: item.quantity,
//     price: item.price,
//   }));

//   const emailTemplate = `
//     <h2>Order Confirmation</h2>
//     <p>Order ID: ${orderId}</p>
//     <p>Customer Name: ${name}</p>
//     <p>Email: ${email}</p>
//     <p>Phone: ${phone}</p>
//     <p>State: ${state}</p>
//     <h3>Order Summary:</h3>
//     <ul>
//       ${cartItems.map((item) => `<li>${item.name} x ${item.quantity} - ${item.price}</li>`).join('')}
//     </ul>
//     <p>Total: ${totalAmount}</p>
//   `;

//   const message = {
//     from: {
//       email: 'sales@shoptiles.ng',
//     },
//     to: [
//       {
//         email: 'user-email@example.com', // customer email
//       },
//       {
//         email: 'sales@shoptiles.ng', // your email
//       },
//     ],
//     subject: `Order Confirmation - ${orderId}`,
//     html: emailTemplate,
//   };

//   try {
//     const response = await mailersend.send(message);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const generateUniqueId = () => {
//   // implement a unique ID generator (e.g., UUID)
//   return 'ORDER-' + Math.random().toString(36).substr(2, 9);
// };