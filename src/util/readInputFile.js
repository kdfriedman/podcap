// wrap FileReader api in promise to handle as async operation. FileReader does not return promise natively.
const readInputFile = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    const img = new Image();
    fileReader.onload = (e) => {
      img.src = fileReader.result;
      img.onload = (evt) => {
        return resolve(e.target.result);
      };
    };
    fileReader.onerror = (e) => reject(e);
    // convert to base64 string
    fileReader.readAsDataURL(file);
  });
};

export default readInputFile;
