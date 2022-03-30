import { initializeApp, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Request, Response, https } from "firebase-functions";
import { CurrentUser } from "./types";

// exports.stripe_webhook = https.onRequest(async (request: Request, response: Response) => {
//   const app: App = initializeApp();
//   console.log(app);
//   console.log(request);
//   console.log(response);

//   const firestore = getFirestore();
//   const snapshot = await firestore
//     .collection("user")
//     .where("stripeCustomerId", "==", "cus_LPNd0BryLYpYXf")
//     .get();

//   const user = snapshot.docs.map((doc) => doc.data() as CurrentUser);

//   await firestore
//     .collection("user")
//     .doc(user[0].uid)
//     .update({
//       subscriptionStatus: "active",
//     });
// });

exports.stripe_webhook = https.onRequest(
  async (request: Request, response: Response | any) => {
    const app: App = initializeApp();
    const firestore = getFirestore();

    const event = request.body;

    console.log("options", app.options);

    try {
      switch (event.type) {
        // case "checkout.session.completed": {
        //   const paymentIntent = event.data.object;
        //   console.log("checkout", paymentIntent);
        //   response.json({ received: true });
        //   break;
        // }
        case "customer.subscription.created": {
          // const subscriptionCreate = event.data.object;
          // console.log("subscription_create", subscriptionCreate.customer);

          const snapshot = await firestore
            .collection("user")
            .where("stripeCustomerId", "==", "cus_LPNd0BryLYpYXf")
            .get();

          console.log("snapshot", snapshot);

          const user = snapshot.docs.map((doc) => {
            console.log("doc", doc.data());
            return doc.data() as CurrentUser;
          });

          console.log("user", user[0]);
          console.log("userId", user[0].uid);

          await firestore.collection("user").doc("cus_LPRP86cXWr0dgC").update({
            subscriptionStatus: "active",
          });

          // console.log("test", test);
          response.json({ received: true });
          break;
        }
        // case "customer.subscription.updated": {
        //   const subscriptionUpdate = event.data.object;
        //   console.log("subscription_update", subscriptionUpdate);
        //   response.json({ received: true });
        //   break;
        // }
        // case "payout.created": {
        //   const payoutCreate = event.data.object;
        //   console.log("payout.created", payoutCreate);
        //   response.json({ received: true });
        //   break;
        // }
        // case "payout.paid": {
        //   const paid = event.data.object;
        //   console.log("payout.paid", paid);
        //   response.json({ received: true });
        //   break;
        // }
        default: {
          // 想定していないイベントが通知された場合
          return response.status(400).end();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);
