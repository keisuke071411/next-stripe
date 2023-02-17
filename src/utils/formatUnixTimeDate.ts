type Format = "jp" | "us";
type Locale = "fr-CA" | "ja-JP";
type DateStyle = "long" | "full" | "medium" | "short" | undefined;
type TimeStyle = "long" | "full" | "medium" | "short" | undefined;

/**
 * @param {string} unixDate  変換したいDateオブジェクトを引数に指定
 * @param {Format | undefined} format フォーマットを指定する
 * @param {boolean | undefined} time 時間表示の有無を指定する
 * @return {string} formatがundefinedならYYYY-MM-DD, usならYYYY/MM/DD, jpならYYYY年MM月DD日のフォーマットで返却される
 */
export const formatUnixTimeDate = (
  unixDate: number,
  format?: Format,
  time?: boolean
) => {
  let locales: Locale = "fr-CA";
  let dateStyle: DateStyle = "short";

  switch (format) {
    case "jp":
      locales = "ja-JP";
      dateStyle = "long";
      break;
    case "us":
      locales = "ja-JP";
  }

  const timeStyle: TimeStyle = time ? "medium" : undefined;

  return Intl.DateTimeFormat(locales, {
    dateStyle,
    timeStyle
  }).format(new Date(unixDate * 1000));
};
