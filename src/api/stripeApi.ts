import { CurrentUser } from "~/store/auth";

interface CreateCheckOutRequest {
  customerId: string;
  priceId: string;
}

export class StripeApi {
  private apiUrl: string;

  constructor(apiUrl: string) {
    if (!apiUrl) throw new Error("Runtime error invalid argument");

    this.apiUrl = apiUrl;
  }

  async createStripeUser(currentUser: CurrentUser) {
    const res = await fetch(`${this.apiUrl}/createStripeUser`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentUser)
    });

    return res;
  }

  async checkOutForStripe(createCheckOutRequest: CreateCheckOutRequest) {
    const res = await fetch(`${this.apiUrl}/stripeCheckOut`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createCheckOutRequest)
    });

    return res;
  }

  async getPaymentList(stripeCustomerId: string) {
    const res = await fetch(`${this.apiUrl}/getPaymentList`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain"
      },
      body: stripeCustomerId
    });

    return res;
  }

  async getProductList() {
    const res = await fetch(`${this.apiUrl}/getProductList`, {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain"
      }
    });

    return res;
  }

  async getSubscriptionList(stripeCustomerId: string) {
    const res = await fetch(`${this.apiUrl}/getSubscriptionList`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain"
      },
      body: stripeCustomerId
    });

    return res;
  }

  async cancelSubscription(stripeCustomerId: string) {
    const res = await fetch(`${this.apiUrl}/cancelSubscription`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain"
      },
      body: stripeCustomerId
    });

    return res;
  }
}
