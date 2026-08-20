const AUTH_MESSAGES = {
  'Invalid login credentials': 'E-mail ou senha incorretos.',
  'Email not confirmed': 'Confirme seu e-mail antes de entrar.',
  'User already registered': 'Este e-mail já tem uma conta.',
  'Password should be at least 6 characters': 'A senha precisa ter pelo menos 6 caracteres.',
  'Unable to validate email address: invalid format': 'Confira se o e-mail foi digitado corretamente.',
  'Email rate limit exceeded': 'Muitas tentativas seguidas. Espere um pouco e tente novamente.',
}

export function friendlyAuthError(error) {
  if (!error) return ''
  return AUTH_MESSAGES[error.message] || 'Não conseguimos concluir agora. Tente novamente.'
}
