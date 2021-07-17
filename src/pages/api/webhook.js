import { buffer } from "micro";
import * as admin from "firebase-admin";

// Secure a connection to FIREBASE from the backend
const serviceAccount = require("../../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SIGNING_SECRET);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulFillorder = async (session) => {
  console.log("Fullfill order", session);

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS, order ${session.id} had been added to DB `);
    });
};

module.exports = async (req, res) => {
  if (req.method === "POST") {
    console.log("iam here");
    const requestBuffer = await buffer(req);
    console.log(requestBuffer, "Req bufer !!!");
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log("Error in construct webhooks", error.message);
      res.status(400).send(`Webhook error ${error.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.objects;

      // Fulfill the order...
      return fulFillorder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`WEBHOOK Error, ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyparser: false,
    externalResolver: true,
  },
};
