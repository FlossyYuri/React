module.exports = (app) => {
  function existsOrError(value, msg) {
    if (!value) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if (typeof value == "string" && !value.trim()) throw msg;
  }
  function validName(name, msg) {
    if (
      name.length < 3 ||
      name.length > 100 ||
      !/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]+$/.test(name)
    )
      throw msg;
  }
  function validBI(bi, msg) {
    if (bi.length !== 13) throw msg;
  }
  function validAddress(address, msg) {
    if (
      !address.zipCode ||
      !address.publicPlace ||
      !address.neighborHood ||
      !address.city
    )
      throw msg;
  }
  function validPhones(phones, msg) {
    if (phones.length === 0) throw msg;
    else
      phones.forEach((phone) => {
        if (phone.length !== 9) throw msg;
      });
  }
  function validEmails(emails, msg) {
    if (emails.length === 0) throw msg;
    else
      emails.forEach((email) => {
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
          throw msg;
      });
  }

  return {
    existsOrError,
    validName,
    validBI,
    validAddress,
    validPhones,
    validEmails,
  };
};
