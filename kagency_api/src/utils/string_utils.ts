module.exports = {
  checkValidEmail: (email: string) => {
    const emailRegexp = /\S+@\S+\.\S+/;
    return emailRegexp.test(String(email).toLowerCase());
  },

  convertHTMLData: (text: string) => {
    return text.replace(/'/g, '"');
  },
};
