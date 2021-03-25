type SimApiCallProps = {
  successMsg: string;
  errorMsg: string;
  timeout: number;
};
const simApiCall = ({
  timeout,
  errorMsg,
  successMsg,
}: SimApiCallProps): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = Math.floor(Math.random() * 2);
      if (res) {
        resolve(successMsg);
      } else {
        reject(errorMsg);
      }
    }, timeout);
  });

export default simApiCall;
