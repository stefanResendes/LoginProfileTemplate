export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) {
    return 'Email cannot be empty.';
  }
  if (!re.test(email)) {
    return 'Ooops! We need a valid email address.';
  }
  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) {
    return 'Password cannot be empty.';
  }
  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) {
    return 'Name cannot be empty.';
  }
  return '';
};

export const firstNameValidator = firstName => {
  if (!firstName || firstName.length <= 0) {
    return 'First Name cannot be empty.';
  }
  return '';
};

export const middleNameValidator = middleName => {
  if (!middleName || middleName.length <= 0) {
    return 'Middle Name cannot be empty.';
  }
  return '';
};

export const lastNameValidator = lastName => {
  if (!lastName || lastName.length <= 0) {
    return 'Last Name cannot be empty.';
  }
  return '';
};

export const phoneValidator = (phone, field) => {
  if (!phone || phone.length <= 0) {
    return field + ' Phone number can not be blank.';
  } else if (phone.length > 10) {
    return field + ' Phone number is too long.';
  } else if (phone.length < 10) {
    return field + ' Phone number is too short.';
  }
};

export const addressValidator = address => {
  if (!address || address.length <= 0) {
    return 'Address can not be empty.';
  }
};

export const bioValidator = bio => {
  if (!bio || bio.length <= 0) {
    return 'Bio can not be empty.';
  }
};

export const hobbiesValidator = hobbies => {
  if (!hobbies || hobbies.length <= 0) {
    return 'Hobbies can not be empty.';
  }
};