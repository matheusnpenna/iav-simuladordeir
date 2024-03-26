export function toHumanDate(date) {
  if (!date) return "";
  let [dt, tm] = date.split("T");
  dt = dt
    .split("-")
    .reverse()
    .join("/");
  tm = tm ? " " + tm.substr(0, 5) : "";
  return `${dt}${tm}`;
}
export function removeTimeZone(d) {
  return d && d[d.length - 1] == "Z" ? `${d}`.slice(0, d.length - 1) : d;
}

export function toComputerDate(date) {
  if (!date) return null;
  let [dt, tm] = date.split(" ");
  dt = dt
    .split("/")
    .reverse()
    .join("-");
  tm = tm ? "T" + tm.substr(0, 5) : "";
  return `${dt}${tm}`;
}

export const getCurrencySymbol = currency => {
  let c = currency.toLowerCase();
  switch (c) {
    case "brl":
      return "R$";
    case "usd":
      return "US$";
    default:
      return "$";
  }
};

export const formatMoney = (
  amount,
  decimalCount = 2,
  decimal = ",",
  thousands = "."
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {}
};

export function dayDiff(dateString) {
  var today = new Date();
  var date = new Date(dateString);

  // To calculate the time difference of two dates
  var differenceInTime = date.getTime() - today.getTime();

  // To calculate the no. of days between two dates
  return Math.floor(differenceInTime / (1000 * 3600 * 24));
}

export const formFields = (fields, initial = {}) => {
  const form = {};
  const errors = {};
  for (const i in fields) {
    const field = fields[i];
    form[field] =
      initial &&
      (initial[field] !== "" ||
        initial[field] !== undefined ||
        initial[field] !== null)
        ? initial[field]
        : "";
    errors[field] = [];
  }
  return { form, errors, loading: false };
};

export const removeMask = maskedValue => {
  return maskedValue
    .replace(/\s/g, "")
    .replace(/-/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/\D/g, "")
    .trim();
};

export const getArrayOfDaysInMonth = (year, month) => {
  var numDaysInMonth, daysInWeek, daysIndex, index, day, daysArray;

  numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const isLeapYear = !(year % 4) && (!!(year % 100) || !(year % 400));

  if (!!isLeapYear) numDaysInMonth[1] = 29;

  daysInWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  daysIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  index = daysIndex[new Date(year, month - 1, 1).toString().split(" ")[0]];

  daysArray = [];

  for (day = 1; day <= numDaysInMonth[month - 1]; day++) {
    if (day === 1) {
      const end = daysInWeek.findIndex(d => d === daysInWeek[index]);

      for (let weekIndex = end - 1; weekIndex >= 0; weekIndex--) {
        const beforeMonthDaysCount =
          month === 1 ? numDaysInMonth[11] : numDaysInMonth[month - 2];
        daysArray.push({
          day: beforeMonthDaysCount - weekIndex,
          isCurrentMonth: false,
          monthPosition: "before"
        });
      }

      daysArray.push({ day, isCurrentMonth: true });
    } else if (day === numDaysInMonth[month - 1]) {
      daysArray.push({ day, isCurrentMonth: true, monthPosition: "current" });

      const start = daysInWeek.findIndex(d => d === daysInWeek[index]);

      for (let weekIndex = 1; weekIndex <= 6 - start; weekIndex++) {
        daysArray.push({
          day: weekIndex,
          isCurrentMonth: false,
          monthPosition: "next"
        });
      }
    } else {
      daysArray.push({ day, isCurrentMonth: true });
    }

    index++;
    if (index == 7) index = 0;
  }

  return daysArray;
};

export const getYearRange = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const clearObject = object => {
  for (const i in object) {
    if (object[i] === "" || object[i] === undefined || object[i] === null) {
      delete object[i];
    }
  }
  return object;
};

export function isValidCPF(cpf) {
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  cpf = cpf.split("");
  const validator = cpf
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    .map(el => +el);
  const toValidate = pop =>
    cpf
      .filter((digit, index, array) => index < array.length - pop && digit)
      .map(el => +el);
  const rest = (count, pop) =>
    ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) *
      10) %
      11) %
    10;
  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
}

export function isValidCNPJ(cnpj) {
  const format = value => value.replace(/[^\d]+/g, "");
  const isValidNumber = (value, count) =>
    format(value).length === count && !format(value).match(/(\d)\1{10}/);
  const sum = (array, start) =>
    array.reduce((total, el, i) => total + el * (start - i), 0);
  const rest = value => value % 11;

  const validator = value =>
    format(value)
      .split("")
      .splice(format(value).length - 2)
      .map(el => +el);

  const toValidate = (value, end, start = 0) =>
    format(value)
      .split("")
      .filter((digit, index, array) => index >= start && index <= end && digit)
      .map(el => +el);

  const validate = (firstDigit, lastDigit, validator) =>
    firstDigit === validator[0] && lastDigit === validator[1];

  if (!isValidNumber(cnpj, 14)) return false;

  const digit = sum => (rest(sum) < 2 ? 0 : 11 - rest(sum));

  const firstDigit = digit(
    sum(toValidate(cnpj, 3), 5) + sum(toValidate(cnpj, 11, 4), 9)
  );
  const lastDigit = digit(
    sum(toValidate(cnpj, 4), 6) + sum(toValidate(cnpj, 12, 5), 9)
  );

  return validate(firstDigit, lastDigit, validator(cnpj));
}

export function membersBaseURL() {
  if (document.location.href.indexOf("staging") > 0) {
    return "https://api-staging.members.blitzpay.com.br/v1/";
  }
  return "https://api.members.blitzpay.com.br/v1/";
}

export function findIn(source = {}, term = "") {
  function normalizeObj(obj) {
    return JSON.stringify(obj)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  return normalizeObj(source).match(
    term
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  );
}

export function is_file_size_exceeds_limit_in_mb(file_size, limit_in_mb) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = parseInt(Math.floor(Math.log(file_size) / Math.log(1024)));
  const size = Math.round(file_size / Math.pow(1024, i), 2) + " " + sizes[i];

  return (
    (size.match("MB") && /([^MB]*)MB/.exec(size)[1] > limit_in_mb) || i > 2
  );
}

export const youtubeParser = url => {
  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|live\/|watch\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : false;
};

export const vimeoParser = url => {
  var firstPart = url.split("?")[0].split("/");
  return firstPart[firstPart.length - 1];
};

export const datesString = dates => {
  const format = date =>
    date
      .split("-")
      .reverse()
      .join("/");
  return dates && dates.length === 2
    ? `${format(dates[0])} - ${format(dates[1])}`
    : "";
};

export const duration_seconds_to_humanized = duration => {
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;
  let ret = "";
  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
};

export const humanized_to_duration_seconds = time_str => {
  const durationArray = time_str.split(":");
  const seconds =
    parseInt(durationArray[0]) * 60 * 60 +
    parseInt(durationArray[1]) * 60 +
    parseInt(durationArray[2]);
  return seconds;
};

export const updateArrayItem = (array, item, field = "id") => {
  return array.map(i => (i[field] === item[field] ? item : i));
};

export const deleteArrayItem = (array, item, field = "id") => {
  return array.filter(i => i[field] !== item[field]);
};

export const deletePaginatedItem = (
  array,
  item,
  pagination = 20,
  field = "id"
) => {
  if (pagination && array.length === pagination) return false;

  return array.filter(i => i[field] !== item[field]);
};

export const addPaginatedItem = (array, item, pagination = 20) => {
  if (pagination && array.length === pagination) array.pop();
  array.push(item);
  return array;
};

export const is_valid_br_date_str = date_str => {
  return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
    date_str
  );
};

export const timeFromNow = date => {
  const removeTimeZone = d =>
    d && d[d.length - 1] == "Z" ? `${d}`.slice(0, d.length - 1) : d;

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const olderDate = new Date(removeTimeZone(date));
  const currentDate = new Date();

  const diff = ((olderDate - currentDate) / _MS_PER_DAY) * -1;

  const formatter = new Intl.RelativeTimeFormat("pt-BR", {
    hourCycle: "h24",
    numeric: "auto",
    timeStyle: "short",
    style: "short",
    timeZone: "America/Sao_Paulo"
  });

  switch (true) {
    case diff > 365:
      return formatter.format(-Math.floor(diff / 365), "year");
    case diff > 30:
      return formatter.format(-Math.floor(diff / 30), "month");
    case diff > 7:
      return formatter.format(-Math.floor(diff / 7), "week");
    case diff > 1:
      return formatter.format(-Math.round(diff), "days");
    case diff > 0.04:
      return formatter.format(-Math.round(diff * 24), "hour");
    default:
      return formatter.format(-Math.round(diff * 24 * 60), "minutes");
  }
};
/*
 * @Param error_data -> error.response.data from action
 * @Param show_msg -> this.$message.error or this.$message.warning
 * @Param TRANSLATE_FIELD_MAP -> A dictionary to drive user what field is an error
 * * For use this params you have pass a object translating the fields
 * * or add the translation object in src/constants/fields.js and pass the name of object
 * * exported in default
 * @Param msg_preffix -> Add a preffix to msg
 * @Param msg_suffix -> Add suffix to msg
 */
export const get_error_msg = (
  error_data,
  FIELD_TRANSLATION,
  fallback_msg,
  msg_preffix = "",
  msg_suffix = "",
  return_type = "string"
) => {
  if (!error_data) return fallback_msg;

  const _ = require("lodash");

  const ALL_TRANSLATED_FIELDS = require("../constants/fields.js");

  let TRANSLATE_FIELD_MAP = FIELD_TRANSLATION;

  if (_.isString(FIELD_TRANSLATION)) {
    TRANSLATE_FIELD_MAP = ALL_TRANSLATED_FIELDS[FIELD_TRANSLATION];
  }

  let msg = fallback_msg;
  let field = "";
  const get_field = (val, key) =>
    val && val[key] ? `Campo: ${val[key]} - ` : "";
  const handle_return = (message, field) => {
    if (return_type == "string") return message;

    return { field, message };
  };

  for (let key in error_data) {
    if (["detail", "message"].includes(key) && _.isString(error_data[key])) {
      return handle_return(
        `${msg_preffix}${error_data[key]}${msg_suffix}`,
        key
      );
    } else {
      for (let i in error_data[key]) {
        const item = error_data[key][i];

        if (_.isString(item)) {
          field = get_field(TRANSLATE_FIELD_MAP, key);
          return handle_return(
            `${msg_preffix}${field}${item}${msg_suffix}`,
            key
          );
        }

        if (_.isObject(item) && Object.keys(item).length) {
          return get_error_msg(
            item,
            TRANSLATE_FIELD_MAP[key],
            fallback_msg,
            msg_preffix,
            msg_suffix
          );
        }
      }
    }
  }

  return msg;
};

export const is_valid_range_date = (start, end) => {
  const moment = require("moment");
  const start_date = moment(start, "DD/MM/YYYY HH:mm");
  const end_date = moment(end, "DD/MM/YYYY HH:mm");
  if (start_date.isValid() && end_date.isValid()) {
    return end_date.isAfter(start_date);
  }
  return false;
};

export const get_operation_system = () => {
  switch (true) {
    case window.navigator.userAgent.indexOf("Win") != -1:
      return "windows";
    case window.navigator.userAgent.indexOf("Mac") != -1:
      return "macos";
    case window.navigator.userAgent.indexOf("Linux") != -1:
      return "linux";
    default:
      return null;
  }
};
