import { https } from "firebase-functions/v2";
import { db } from "./handlers/firebase";
import { CurrentUser } from "./types";

exports.stripeWebhook = https.onRequest(
  { region: "asia-northeast1", memory: "256MiB" },
  async (request, response): Promise<void> => {
    const event = request.body;

    if (!event.type) {
      response.status(500).json({ message: "event body is not found." }).end();
      return;
    }

    try {
      switch (event.type) {
        // case "checkout.session.completed": {
        //   const paymentIntent = event.data.object;
        //   console.log("checkout", paymentIntent);
        //   response.json({ received: true });
        //   break;
        // }
        case "customer.subscription.deleted": {
          const stripeCustomerId = event.data.object.customer;

          if (!stripeCustomerId) {
            throw new Error("Failed to get stripeCustomerId");
          }

          const snapshot = await db
            .collection("user")
            .where("stripeCustomerId", "==", stripeCustomerId)
            .get();

          if (!snapshot) throw new Error("Corresponding user does not exist");

          const user = snapshot.docs.map((doc) => doc.data() as CurrentUser);

          await db.collection("user").doc(user[0].uid).update({
            subscriptionStatus: "cancel"
          });

          response.status(200).json({ received: true });
          break;
        }
        case "customer.subscription.created": {
          const stripeCustomerId = event.data.object.customer;

          if (!stripeCustomerId) {
            throw new Error("Failed to get stripeCustomerId");
          }

          const snapshot = await db
            .collection("user")
            .where("stripeCustomerId", "==", stripeCustomerId)
            .get();

          if (!snapshot) throw new Error("Corresponding user does not exist");

          const user = snapshot.docs.map((doc) => doc.data() as CurrentUser);

          await db.collection("user").doc(user[0].uid).update({
            subscriptionStatus: "active"
          });

          response.status(200).json({ received: true });
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
          response.status(400).json({ message: "event type failure." }).end();
        }
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Authenticate failure." }).end();
    }
  }
);
