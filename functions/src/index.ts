import { Request, Response, https } from "firebase-functions";
import { db } from "./handlers/firebase";
import { CurrentUser } from "./types";

exports.stripe_webhook = https.onRequest(
  async (request: Request, response: Response): Promise<void> => {
    const event = request.body;

    try {
      switch (event.type) {
        // case "checkout.session.completed": {
        //   const paymentIntent = event.data.object;
        //   console.log("checkout", paymentIntent);
        //   response.json({ received: true });
        //   break;
        // }
        case "customer.subscription.created": {
          const stripeCustomerId = event.data.object.customer;

          if (!stripeCustomerId)
            throw new Error("Failed to get stripeCustomerId");

          const snapshot = await db
            .collection("user")
            .where("stripeCustomerId", "==", stripeCustomerId)
            .get();

          if (!snapshot) throw new Error("Corresponding user does not exist");

          const user = snapshot.docs.map((doc) => doc.data() as CurrentUser);

          await db.collection("user").doc(user[0].uid).update({
            subscriptionStatus: "active",
          });

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
          response.status(400).end();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);
