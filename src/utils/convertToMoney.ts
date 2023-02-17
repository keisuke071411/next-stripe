/**
 * @param {number | null} payment 変換したいpaymentを引数に指定
 * @return {string} paymentが存在していれば、日本円に変換して返却する
 */
export const convertToMoney = (payment: number | null) => {
  if (!payment) return "";

  return payment.toLocaleString("ja-JP", {
    style: "currency",
    currency: "JPY"
  });
};
