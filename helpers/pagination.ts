
require('dotenv').config()

const PER_PAGE_RECORDS = 10

export const setPagination = (pages: any) => {

  const per_page = pages.per_page ? Number.parseInt(pages.per_page) : (PER_PAGE_RECORDS)
  const current_page = pages.current_page ? Number.parseInt(pages.current_page) : 1
  const offset = (current_page * per_page) - per_page

  const result = {
    per_page,
    current_page,
    offset
  };
  return result;
}

export const getPagination = (per_page: number, total_item: number, current_page: number) => {
  const total_page = Math.ceil(total_item / per_page);
  const previous_page = (current_page == 0 ? null : current_page - 1);
  const result = {
    total_item,
    per_page,
    total_page,
    current_page,
    previous_page
  };
  return result;
}
export const parseToFloat = (num: any) => {
  num = num.toString(); //If it's not already a String
  num.indexOf(".") == -1;
  if (num.indexOf('.') == -1) {
  } else {
    num = num.slice(0, (num.indexOf(".")) + 3); //With 3 exposing the hundredths place
  }
  return Number(num)
}