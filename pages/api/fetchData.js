
import Papa from "papaparse";

export async function getData() {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQK253p5XAMI07RIzUc5QVmkq1-HIokRKM7HMpxFGb1BY8lZv3JbizLQZ08Nl_-k0mRBt08xwhCgH6N/pub?gid=100625340&single=true&output=csv"
  );
  const data = await res.text();
  const parsed = await new Promise((resolve, reject) => {
    Papa.parse(data, {
      header: true,
      complete: (result) => resolve(result.data),
      error: reject,
    });
  });

  return parsed;
}
