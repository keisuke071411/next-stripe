export interface CurrentUser {
  uid: string;
  email: string;
  displayName: string;
  imagePath: string;
  subscriptionStatus:
    | "incomplete"
    | "incomplete_expired"
    | "trialing"
    | "active"
    | "past_due"
    | "canceled"
    | "unpaid";
  stripeCustomerId: string;
}
