function generateRandomPassword(length: number = 12): string {
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'
  const specialChars = '!@#$%^&*'
  
  const allChars = lowerCaseChars + upperCaseChars + digits + specialChars;

  const passwordArray = [
      lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)],
      upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)],
      digits[Math.floor(Math.random() * digits.length)],
      specialChars[Math.floor(Math.random() * specialChars.length)],
  ];

  for (let i = passwordArray.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length)
      passwordArray.push(allChars[randomIndex])
  }

  return passwordArray.sort(() => 0.5 - Math.random()).join('')
}