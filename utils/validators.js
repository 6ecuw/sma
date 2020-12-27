module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {}
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty'
  } else if (!email.match(emailPattern)) {
    errors.email = 'Email must be a valid email address'
  }

  if (password === '') {
    errors.password = 'Password must not be empty'
  } else if (password !== confirmPassword) {
    errors.password = 'Passwords must match'
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  }
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {}

  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  }
}